// C:\CPRG306\CapstoneV2\pages\index.js
import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Banner from '../components/homepage/Banner';
import axios from 'axios'; // Use axios for HTTP requests
import Footer from '../components/common/Footer';
import CategoryHomeGrid from '../components/homepage/CategoryHomeGrid';
import OnSale from '../components/homepage/OnSale';

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
      {/* testing add funtion ///////////////////
      <div className="container mx-auto mt-8">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
          className="border p-2 rounded mr-2"
        />
        <button onClick={addItem} className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Item
        </button>
        <ul className="mt-4">
          {Array.isArray(items) && items.length > 0 ? (
            items.map(item => (
              <li key={item.product_id} className="flex justify-between items-center border-b py-2">
                {item.product_name} {/* Use the new field names to display product names */}
                {/* <button
                  onClick={() => deleteItem(item.product_id)} // Use the new field name to delete products
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))
          ) : (
            <li>No items found</li>
          )}
        </ul>
      </div> */} 
      <CategoryHomeGrid />
      <OnSale />
      <Footer />
    </div>
  );
}

export default Home;
