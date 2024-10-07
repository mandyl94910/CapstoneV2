//C:\CPRG306\CapstoneV2\components\admin\management\ProductManagement.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios"; 
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";
import Switch from "../Switch";

const ProductManagement = () => {
  const [products, setProducts] = useState([]); // Initialized as an empty array, waiting to be populated with data from the API
  const router = useRouter(); // Initialize the Next.js router
  const [productStats, setProductStats] = useState({
    totalProducts: "Loading...",
    totalCategories: "Loading...",
    totalValue: "Loading..."
  });

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/products-admin/datatable"
        );
        const fetchedProducts = response.data;
        setProducts(fetchedProducts); // Update the status using the data retrieved from the API
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    async function fetchProductStats() {
      try {
        const [totalProductsRes, totalCategoriesRes, totalValueRes] = await Promise.all([
          axios.get('http://localhost:3001/api/total-products'),
          axios.get('http://localhost:3001/api/total-categories'),
          axios.get('http://localhost:3001/api/total-value')
        ]);

        setProductStats({
          totalProducts: totalProductsRes.data.totalProducts,
          totalCategories: totalCategoriesRes.data.totalCategories,
          totalValue: `$${totalValueRes.data.totalValue.toFixed(2)}`
        });

        console.log("Updated productStats:", {
          totalProducts: totalProductsRes.data.totalProducts,
          totalCategories: totalCategoriesRes.data.totalCategories,
          totalValue: `$${totalValueRes.data.totalValue.toFixed(2)}`
        });
      } catch (error) {
        console.error("Error fetching product stats:", error);
      }
    }

    fetchProducts();
    fetchProductStats();
  }, []);

  const stats = [
    {
      title: "Total Products",
      value: productStats.totalProducts,
      description: "Based on current inventory",
    },
    {
      title: "Total Categories",
      value: productStats.totalCategories,
      description: "Categories available",
    },
    {
      title: "Total Value",
      value: productStats.totalValue,
      description: "Estimated total value",
    },
  ];

  // Toggle visibility state
    const handleToggleVisibility = async (productId) => {
      const product = products.find(p => p.product_id === productId);
    const updatedVisibility = !product.visibility;
    try {
      const response = await axios.post('http://localhost:3001/api/products-admin/changeVisibility', {
        productId: productId,
        visibility: updatedVisibility
      });
      if (response.data) {
        const updatedProducts = products.map(p =>
          p.product_id === productId ? { ...p, visibility: updatedVisibility } : p
        );
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Error updating visibility:', error);
    }
  };

  const handleEdit = (index) => {
    console.log("Edit product:", index);
  };

  const handleDelete = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) { 
      try {
        const response = await axios.delete(`http://localhost:3001/api/products-admin/delete/${productId}`); 
        if (response.data.prompt) {
          //// If the user chooses to make the product invisible
          if (confirm(response.data.message)) { 
            await axios.delete(`http://localhost:3001/api/products-admin/delete/${productId}?action=hide`);
          }
        } else if (response.data.success) {
          console.log("Product deleted:", productId);
          await refreshProductList();
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const refreshProductList = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/products-admin/datatable");
      setProducts(response.data);
    } catch (error) {
      console.error("Error refreshing product list:", error);
    }
  };

  const handleAddProduct = () => {
    router.push("/admin/addProduct"); // Redirect to the Add Product page
  };

  return (
    <div className="border-t-2">
      {/* Product Data Table */}
      <div className="bg-white p-4 rounded shadow-md">
        <DataTable
          columns={[
            "Product ID",
            "Product Name",
            "Price",
            "Quantity",
            "Category",
            "Visibility",
          ]}
          data={products.map((product) => {
            return {
              id: product.product_id,
              product_name: product.product_name,
              price: product.price,
              quantity: product.quantity,
              category:
                product.Category && product.Category.name
                  ? product.Category.name
                  : "N/A", // 访问 Category.name
              visibility: (
                <Switch
                  checked={!product.visibility}
                  onChange={() => handleToggleVisibility(product.product_id)}
                />
              ),
            };
          })}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {/* Add Product Button at the bottom-right corner */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Product Info Cards */}
      <InfoCards stats={stats} />
    </div>
  );
};

export default ProductManagement;
