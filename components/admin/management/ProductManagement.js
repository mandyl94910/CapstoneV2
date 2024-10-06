import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";
import Switch from "../Switch";

const ProductManagement = () => {
  const [products, setProducts] = useState([]); // State for storing product data
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const router = useRouter(); // Next.js router

  useEffect(() => {
    // Fetch product data when the component mounts
    async function fetchProducts() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/products-admin/datatable"
        );
        setProducts(response.data); // Update the state with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Filter products based on Product Name and Category
  const filteredProducts = products.filter((product) => {
    return (
      product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.Category &&
        product.Category.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  // Product status information
  const productStats = [
    {
      title: "Total Products",
      value: products.length.toString(),
      description: "Based on current inventory",
    },
    {
      title: "Total Categories",
      value: "15",
      description: "Categories available",
    },
    {
      title: "Total Values",
      value: "$3.2k",
      description: "Estimated total value",
    },
  ];

  // Toggle product visibility
  const handleToggleVisibility = async (productId) => {
    const product = products.find((p) => p.product_id === productId);
    const updatedVisibility = !product.visibility;
    try {
      const response = await axios.post(
        "http://localhost:3001/api/products-admin/changeVisibility",
        {
          productId: productId,
          visibility: updatedVisibility,
        }
      );
      if (response.data) {
        const updatedProducts = products.map((p) =>
          p.product_id === productId
            ? { ...p, visibility: updatedVisibility }
            : p
        );
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error("Error updating visibility:", error);
    }
  };

  // Handle product edit
  const handleEdit = (index) => {
    console.log("Edit product:", index);
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/products-admin/delete/${productId}`
        );
        if (response.data.success) {
          console.log("Product deleted:", productId);
          await refreshProductList();
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Refresh the product list after deletion
  const refreshProductList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/products-admin/datatable"
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Error refreshing product list:", error);
    }
  };

  // Navigate to the Add Product page
  const handleAddProduct = () => {
    router.push("/admin/addProduct");
  };

  return (
    <div className="border-t-2">
      {/* Product Data Table */}
      <div className="bg-white p-4 rounded shadow-md">
        {/* Search Bar added above the DataTable */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Product Name or Category"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Render DataTable with filtered products */}
        <DataTable
          columns={[
            "Product ID",
            "Product Name",
            "Price",
            "Quantity",
            "Category",
            "Visibility",
          ]}
          data={filteredProducts.map((product) => {
            return {
              id: product.product_id,
              product_name: product.product_name,
              price: product.price,
              quantity: product.quantity,
              category:
                product.Category && product.Category.name
                  ? product.Category.name
                  : "N/A",
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
        {/* Add Product Button */}
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
      <InfoCards stats={productStats} />
    </div>
  );
};

export default ProductManagement;
