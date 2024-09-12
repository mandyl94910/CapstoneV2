
import React, { useState } from 'react';
import Sidebar2 from '../../components/category/Sidebar2';
import ProductGrid from '../../components/category/ProductGrid';
import Header from '../Header';

const categories = [
  { name: 'All Products', isSubcategory: false },
  { name: 'Computers & Accessories', isSubcategory: false },
  { name: 'Computers', isSubcategory: true, parent: 'Computers & Accessories' },
  { name: 'Keyboard', isSubcategory: true, parent: 'Computers & Accessories' },
  { name: 'Mouse', isSubcategory: true, parent: 'Computers & Accessories' },
  { name: 'Mobile Phones & Accessories', isSubcategory: false },
  { name: 'Smart Home Devices', isSubcategory: false },
  { name: 'TVs & Home Entertainment', isSubcategory: false },
  { name: 'Gaming Accessories', isSubcategory: false },
  { name: 'Cameras & Photography Gear', isSubcategory: false }
];

// initial products are all products
const initialProducts = [
  { id:1, name: 'Product Name', price: '100.99', image: '/products/laptop.jpg' },
  { id:2, name: 'Product Name', price: '100.99', image: '/products/laptop.jpg' },
  { id:3, name: 'Product Name', price: '100.99', image: '/products/laptop.jpg' },
  { id:4, name: 'Product Name', price: '100.99', image: '/products/laptop.jpg' },
  { id:5, name: 'Product Name', price: '100.99', image: '/products/laptop.jpg' },
  { id:6, name: 'Product Name', price: '100.99', image: '/products/laptop.jpg' },
  { id:7, name: 'Product Name', price: '100.99', image: '/products/laptop.jpg' },
  { id:8, name: 'Product Name', price: '100.99', image: '/products/laptop.jpg' },
];

export default function Products({user, onLogout}) {
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
