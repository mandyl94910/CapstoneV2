
import React, { useEffect, useState } from 'react';
import CateSidebar from '../../components/category/CateSidebar';
import ProductGrid from '../../components/category/ProductGrid';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { useRouter } from 'next/router';
import axios from 'axios';

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
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [products, setProducts] = useState([initialProducts]);

  useEffect(()=> {
    const { category } = router.query;
    if (category) {
      setSelectedCategory(decodeURIComponent(category));

      axios.get(`http://localhost:3001/all-products?category=${encodeURIComponent(category)}`)
        .then((response) => {
          console.log(`products in ${category}:`, response.data); 
          setProducts(response.data);
        })
        .catch((error) => {
          console.error('Error fetching products:', error);
        });
    }
  },[router.query]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);

    router.push(`/all-products?category=${encodeURIComponent(category)}`);
  };

  return (
    <main>
        <Header user={user} onLogout={onLogout} />
        
        <div className="flex ml-6 mt-6">
            <CateSidebar
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

        <Footer />
    </main>
  );
}
