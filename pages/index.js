// C:\CPRG306\CapstoneV2\pages\index.js
import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Banner from '../components/homepage/Banner';
import axios from 'axios'; // Use axios for HTTP requests
import Footer from '../components/common/Footer';
import CategoryHomeGrid from '../components/homepage/CategoryHomeGrid';
import OnSale from '../components/homepage/OnSale';
import ScrollingBar from '../components/homepage/ScrollingBar';

function Home() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  // useEffect to fetch products and cache them
  useEffect(() => {
    const fetchAndCacheProducts = async () => {
      try {
        // Get products with their details
        const response = await axios.get('http://localhost:3001/api/products');
        const products = response.data;
        
        // Cache the products list
        await axios.post('http://localhost:3001/api/cache/products', products);
        
        // For each product, cache its details and reviews
        if (products.data && Array.isArray(products.data)) {
          for (const product of products.data) {
            try {
              // Cache product details
              await axios.post(`http://localhost:3001/api/cache/product-details/${product.product_id}`, product);

              // Fetch and cache reviews
              const reviewsResponse = await axios.get(`http://localhost:3001/api/reviews/${product.product_id}`);
              if (reviewsResponse.data) {
                await axios.post(`http://localhost:3001/api/cache/reviews/${product.product_id}`, reviewsResponse.data);
              }
            } catch (error) {
              console.error(`Error caching data for product ${product.product_id}:`, error);
            }
          }
        }
        
        setItems(products.data);
      } catch (error) {
        console.error('Error fetching or caching products:', error);
      }
    };

    fetchAndCacheProducts();
  }, []);
  
  // Add a new product
  const addItem = () => {
    if (newItem.trim()) {
      axios.post('http://localhost:3001/products', { product_name: newItem })
        .then(response => {
          const newProduct = response.data; // Here we get the full product information returned by the backend.
          setItems(items => [...items, newProduct]); // Update status with returned new products
          setNewItem(''); // Clear input fields
        })
        .catch(error => console.error('Error adding product:', error));
    }
  };

  // Delete a product
  const deleteItem = (product_id) => {
    axios.delete(`http://localhost:3001/products/${product_id}`) // Use the new field name for deletion operation
      .then(() => {
        setItems(currentItems => currentItems.filter(item => item.product_id !== product_id)); // Remove the deleted product from the list
      })
      .catch(error => console.error('Error deleting product:', error));
  };

  return (
    <div>
      <Header/>
      <Banner/>
      <CategoryHomeGrid />
      <OnSale />
      <ScrollingBar />
      <Footer />
    </div>
  );
}

export default Home;
