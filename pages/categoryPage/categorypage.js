
import React, { useState } from 'react';
import Sidebar2 from '../../components/category/Sidebar2';
import ProductGrid from '../../components/category/ProductGrid';
import Header from '../Header';

const categories = [
  'All Products',
  'Computers & Accessories',
  'Computers',
  'Keyboard',
  'Mouse',
  'Mobile Phones & Accessories',
  'Smart Home Devices',
  'TVs & Home Entertainment',
  'Gaming Accessories',
  'Cameras & Photography Gear'
];

const initialProducts = [
  { name: 'Product Name', price: '10.99', image: '/products/laptop.jpg' },
  { name: 'Product Name', price: '10.99', image: '/products/laptop.jpg' },
  { name: 'Product Name', price: '10.99', image: '/products/laptop.jpg' },
  { name: 'Product Name', price: '10.99', image: '/products/laptop.jpg' },
  { name: 'Product Name', price: '10.99', image: '/products/laptop.jpg' },
  { name: 'Product Name', price: '10.99', image: '/products/laptop.jpg' },
  { name: 'Product Name', price: '10.99', image: '/products/laptop.jpg' },
  { name: 'Product Name', price: '10.99', image: '/products/laptop.jpg' },
];

export default function CategoryPage({user, onLogout}) {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [products, setProducts] = useState(initialProducts);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <main>
        <Header user={user} onLogout={onLogout} />
        
        <div className="flex">
            <Sidebar2
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={handleCategorySelect}
            />

            {/* Product Grid */}
            <div className="flex-1 p-6">
                <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">{selectedCategory}</h1>
                <div>
                    <label htmlFor="sort" className="mr-2">Sort By</label>
                    <select id="sort" className="border rounded-md p-1">
                    <option value="price">Price</option>
                    <option value="name">Name</option>
                    </select>
                </div>
                </div>
                <ProductGrid products={products} />
            </div>
        </div>
    </main>
  );
}
