//C:\CPRG306\CapstoneV2\pages\all-products\products.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';  // 引入 dynamic 以实现动态加载
import CateSidebar from '../../components/category/CateSidebar';
import Header from '../Header';
import Footer from '../../components/common/Footer';

// 动态加载 ProductGrid 组件，禁用 SSR
const ProductGrid = dynamic(() => import('../../components/category/ProductGrid'), { ssr: false });

export default function Products({ user, onLogout }) {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);  // 初始化为空数组

  useEffect(() => {
    async function fetchCategoriesAndProducts() {
      try {
        // 获取类别数据
        const response = await axios.get('http://localhost:3001/api/categories');
        const categoriesData = response.data;

        // 构建类目的树形结构
        const categoryTree = categoriesData
          .filter(cat => cat.sub_for === 1) // 一级类目
          .map(parent => ({
            ...parent,
            subcategories: categoriesData.filter(sub => sub.sub_for === parent.id), // 找到所有子类目
          }));

        setCategories(categoryTree);

        // 获取所有产品，不再过滤类别
        const productsResponse = await axios.get('http://localhost:3001/api/products'); // 请求所有产品
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching categories or products:', error);
      }
    }

    fetchCategoriesAndProducts();
  }, []);

  const handleCategorySelect = async (category) => {
    setSelectedCategory(category.name);
    try {
      const response = await axios.get(`http://localhost:3001/api/products/category/${category.id}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products by category:', error);
    }
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
        <div className="flex-1 p-6">
          <div className="flex justify-between mb-6">
            <h1 className="text-2xl font-bold">{selectedCategory}</h1>
          </div>
          <ProductGrid products={products} />  {/* ProductGrid 只在客户端渲染 */}
        </div>
      </div>
      <Footer />
    </main>
  );
}
