//C:\CPRG306\CapstoneV2\components\admin\management\ProductManagement.js
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios"; // 确保已导入axios
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";
import Switch from "../Switch";

const ProductManagement = () => {
  const [products, setProducts] = useState([]); // Initialized as an empty array, waiting to be populated with data from the API

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/products-admin/datatable"
        );
        setProducts(response.data); // Update the status using the data retrieved from the API
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

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

  const router = useRouter(); // Initialize the router

  // Toggle visibility state
    const handleToggleVisibility = async (index) => {
    const product = products[index];
    const updatedVisibility = !product.visibility;
    try {
      const response = await axios.post('http://localhost:3001/api/products-admin/changeVisibility', {
        productId: product.product_id,
        visibility: updatedVisibility
      });
      if (response.data) {
        const updatedProducts = [...products];
        updatedProducts[index].visibility = updatedVisibility;
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error('Error updating visibility:', error);
    }
  };

  const handleEdit = (index) => {
    console.log("Edit product:", index);
  };

  const handleDelete = (index) => {
    console.log("Delete product:", index);
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
          data={products.map((product, index) => {
            return {
              product_id: product.product_id,
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
                  onChange={() => handleToggleVisibility(index)}
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
      <InfoCards stats={productStats} />
    </div>
  );
};

export default ProductManagement;
