//C:\CPRG306\CapstoneV2\pages\all-products\products.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';  // Import dynamic to enable dynamic loading
import CateSidebar from '../../components/category/CateSidebar';
import Header from '../Header';
import Footer from '../../components/common/Footer';

// Dynamically load ProductGrid component, disable SSR
const ProductGrid = dynamic(() => import('../../components/category/ProductGrid'), { ssr: false });

export default function Products({ user, onLogout }) {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);  // Initialize as an empty array

  // Fetch categories and products when the component mounts
  useEffect(() => {
    async function fetchCategoriesAndProducts() {
      try {
        // Fetch category data from the API
        const response = await axios.get('http://localhost:3001/api/categories');
        const categoriesData = response.data;

        // Build a tree structure for the categories
        const categoryTree = categoriesData
          .filter(cat => cat.sub_for === 1) // Filter top-level categories
          .map(parent => ({
            ...parent,
            subcategories: categoriesData.filter(sub => sub.sub_for === parent.id), // Find all subcategories
          }));

        setCategories(categoryTree);

        // Fetch all products, no longer filtering by category
        const productsResponse = await axios.get('http://localhost:3001/api/products'); // Request all products
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching categories or products:', error);  // Log any errors
      }
    }

    fetchCategoriesAndProducts();
  }, []);

  // Handle category selection and fetch products for the selected category
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category.name); // Update the selected category
    try {
      const response = await axios.get(`http://localhost:3001/api/products/category/${category.id}`);
      setProducts(response.data);  // Update products based on the selected category
    } catch (error) {
      console.error('Error fetching products by category:', error);  // Log any errors
    }
  };

  return (
    <main>
      <Header user={user} onLogout={onLogout} />  {/* Pass user and logout functionality to the Header */}
      <div className="flex ml-6 mt-6">
        <CateSidebar
          categories={categories}  // Pass categories data to CateSidebar
          selectedCategory={selectedCategory}  // Pass the selected category to CateSidebar
          onCategorySelect={handleCategorySelect}  // Handle category selection
        />
        <div className="flex-1 p-6">
          <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-bold">{selectedCategory}</h1>  {/* Display the selected category */}
          </div>
          <ProductGrid products={products} />  {/* ProductGrid is only rendered on the client side */}
        </div>
      </div>
      <Footer />  {/* Render the Footer component */}
    </main>
  );
}
