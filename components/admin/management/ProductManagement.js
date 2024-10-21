import React, { useState, useEffect } from "react";
//For page jumps and URL parameter management
import { useRouter } from "next/router";
import axios from "axios";
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";
import Switch from "../Switch";
import { saveAs } from "file-saver";

const ProductManagement = () => {
  const [products, setProducts] = useState([]); // Initial state for storing product data
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const router = useRouter(); // Next.js router for navigation
  const [productStats, setProductStats] = useState({
    totalProducts: "Loading...",
    totalCategories: "Loading...",
    totalValue: "Loading...",
  });
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Fetch product data and stats when the component mounts
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/products-admin/datatable"
        );
        setProducts(response.data); // Set the fetched data into the state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    async function fetchProductStats() {
      try {
        const [totalProductsRes, totalCategoriesRes, totalValueRes] =
        //An array with all the results is returned when all the Promises in the array have completed (succeeded or failed)
          await Promise.all([
            axios.get("http://localhost:3001/api/total-products"),
            axios.get("http://localhost:3001/api/total-categories"),
            axios.get("http://localhost:3001/api/total-value"),
          ]);

        // Update product stats based on the API responses
        setProductStats({
          totalProducts: totalProductsRes.data.totalProducts,
          totalCategories: totalCategoriesRes.data.totalCategories,
          totalValue: `$${totalValueRes.data.totalValue.toFixed(2)}`,
        });
      } catch (error) {
        console.error("Error fetching product stats:", error);
      }
    }

    if (router.query.refresh) {
      fetchProducts();
      fetchProductStats();

      // shallow is true means that the update changes the URL path, but does not reload the data and components on the page.
      //the second slot means set the displayed link. Because i dont need it so i set it to undefined.
      router.replace("/admin/product", undefined, { shallow: true });
    } else {
      fetchProducts();
      fetchProductStats();
    }
    //if the boolean refresh is true then refresh the whole page
  }, [router.query.refresh]);

  // Check if `products` is an array before filtering
  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          // Filter products based on product name or category that match the search query
          product.product_name
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          (product.Category &&
            product.Category.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()))
      )
    : [];

  // Stats array for InfoCards
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

  // Toggle product visibility status
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
        // Update the product array to reflect the new visibility status
        const updatedProducts = products.map((p) =>
          //if we find the exact product in database(p.productid=productid)
          p.product_id === productId
          //update the attribute of visibility
            ? { ...p, visibility: updatedVisibility }
            //otherwise return the product itself
            : p
        );
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error("Error updating visibility:", error);
    }
  };

  // Edit product function (currently a placeholder)
  const handleEdit = (productId) => {
    router.push({
      pathname: '/admin/editProduct',
      query: { productId: productId }, 
    }).then(() => {
      setLastUpdated(Date.now()); 
    });
  };

  // Delete product function
  const handleDelete = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await axios.delete(
          `http://localhost:3001/api/products-admin/delete/${productId}`
        );
        if (response.data.success) {
          console.log("Product deleted:", productId);
          setLastUpdated(Date.now()); // Refresh the product list after deletion
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Navigate to the Add Product page
  const handleAddProduct = () => {
    router.push("/admin/addProduct");
  };

  const downloadExcel = () => {
    window.location.href = "http://localhost:3001/api/export-products";
  };

  return (
    <div className="border-t-2">
      {/* Container for product data table */}
      <div className="bg-white p-4 rounded shadow-md">
        {/* Search Bar above the DataTable */}
        <div className="mb-4">
          {/* Input field to capture search query */}
          <input
            type="text"
            value={searchQuery} // Set input value to the searchQuery state
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
            placeholder="🔍 Search by Product Name or Category"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Render DataTable with filtered products based on search query */}
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
          onEdit={handleEdit} // Handle edit action
          onDelete={handleDelete} // Handle delete action
        />
        {/* Add Product Button */}
        <div className="flex justify-between mt-4">
        <button
          onClick={downloadExcel}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Download Product Data
        </button>
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
