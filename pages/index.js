import React, { useEffect, useState } from 'react';
import Header from './Header';
import Banner from './Banner';
import axios from 'axios'; // 使用axios进行HTTP请求

function Home({ user, onLogout }) {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  // 获取所有的items
  useEffect(() => {
    axios.get('http://localhost:3001/items') // 后端获取items的API
      .then(response => setItems(response.data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  // 添加新item
  const addItem = () => {
    if (newItem.trim()) {
      axios.post('http://localhost:3001/items', { name: newItem })
        .then(response => {
          setItems([...items, response.data]); // 更新items列表
          setNewItem('');
        })
        .catch(error => console.error('Error adding item:', error));
    }
  };

  // 删除item
  const deleteItem = (id) => {
    axios.delete(`http://localhost:3001/items/${id}`)
      .then(() => {
        setItems(items.filter(item => item.id !== id));
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <div>
      <Header user={user} onLogout={onLogout} />
      <Banner />
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
          {items.map(item => (
            <li key={item.id} className="flex justify-between items-center border-b py-2">
              {item.name}
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
