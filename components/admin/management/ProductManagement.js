import React, { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter for navigation
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";
import Switch from "../Switch";

// Initial product data
const initialProductData = [
  {
    product_id: 1,
    product_name: "iPhone 13",
    price: "$799.00",
    quantity: 20,
    category: "Mobile Phones & Accessories / Smartphones",
    visibility: false,
  },
  {
    product_id: 2,
    product_name: "Samsung Galaxy S21",
    price: "$699.00",
    quantity: 15,
    category: "Mobile Phones & Accessories / Smartphones",
    visibility: true,
  },
  {
    product_id: 3,
    product_name: "LG Smart TV",
    price: "$1299.00",
    quantity: 5,
    category: "TV & Home Entertainment / Televisions",
    visibility: true,
  },
  {
    product_id: 4,
    product_name: "HP EliteBook Laptop",
    price: "$1199.00",
    quantity: 10,
    category: "Computers & Accessories / Laptops",
    visibility: true,
  },
  {
    product_id: 5,
    product_name: "Sony PlayStation 5",
    price: "$499.00",
    quantity: 8,
    category: "Gaming & Accessories / Consoles",
    visibility: true,
  },
  {
    product_id: 6,
    product_name: "Canon EOS R5",
    price: "$3899.00",
    quantity: 12,
    category: "Cameras & Photography Gear / Digital Cameras",
    visibility: false,
  },
];

// Product status information
const productStats = [
  {
    title: "Total Products",
    value: "72",
    description: "Based on 28 June 2024",
  },
  {
    title: "Total Categories",
    value: "15",
    description: "Based on 28 June 2024",
  },
  {
    title: "Total Values",
    value: "$3.2k",
    description: "Based on 28 June 2024",
  },
];

const ProductManagement = () => {
  const [products, setProducts] = useState(initialProductData);
  const router = useRouter(); // Initialize the router

  // Toggle visibility state
  const handleToggleVisibility = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].visibility = !updatedProducts[index].visibility;
    setProducts(updatedProducts);
  };

  const handleEdit = (index) => {
    console.log("Edit product:", index);
  };

  const handleDelete = (index) => {
    console.log("Delete product:", index);
  };

  // Navigate to the Add Product page
  const handleAddProduct = () => {
    router.push("/admin/addProduct"); // Redirect to the Add Product page
  };

  return (
    <div>
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
              ...product,
              visibility: (
                <Switch
                  checked={product.visibility} // Ensure checked state reflects visibility
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
            onClick={handleAddProduct} // Navigate to Add Product page on click
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
