// C:\CPRG306\CapstoneV2\pages\index.js
import React, { useEffect, useState } from 'react';
import Header from '../components/common/Header';
import Banner from './Banner';
import axios from 'axios'; // Use axios for HTTP requests
import Footer from '../components/common/Footer';
import CategoryHomeGrid from '../components/category/CategoryHomeGrid';

function Home({ user, onLogout }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(response => {
        console.log('Received data:', response.data); // Log the received data structure
        setItems(response.data); // Set state to store product data
      })
      .catch(error => console.error('Error fetching products:', error));
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
      <Header user={user} onLogout={onLogout} />
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
      <Footer />
    </div>
  );
}

export default Home;
