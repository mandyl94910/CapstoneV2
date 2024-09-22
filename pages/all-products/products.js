//C:\CPRG306\CapstoneV2\pages\all-products\products.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';  // Import dynamic to enable dynamic loading
import { useRouter } from 'next/router'; 
import CateSidebar from '../../components/category/CateSidebar';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

// Dynamically load ProductGrid component, disable SSR
const ProductGrid = dynamic(() => import('../../components/category/ProductGrid'), { ssr: false });

export default function Products({ user, onLogout }) {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);  // Initialize as an empty array
  const [productDisplayed, setProductDisplayed] = useState([]); // 创建 productDisplayed 状态，默认为传递过来的数据或空数组
  const [currentPage, setCurrentPage] = useState(1);  
  const [searchQuery, setSearchQuery] = useState('');  // 新增状态，用于保存用户的搜索输入
  const productsPerPage = 20;  
  const router = useRouter();  // 获取路由对象
  const { searchQuery: routerSearchQuery } = router.query;  // 安全地从 router.query 解构出 searchQuery

  // 更新搜索输入
  const handleSearchQueryChange = (query,searchResults) => {
    setSearchQuery(query);
    setProductDisplayed(searchResults);  // 更新显示的产品为搜索结果
  };

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

        // 如果 productDisplayed 为空，获取所有产品
        if (routerSearchQuery) {
          const searchResponse = await axios.get(`http://localhost:3001/api/productsName?query=${routerSearchQuery}`);
          setProducts(searchResponse.data);  // 更新搜索结果
          setProductDisplayed(searchResponse.data);  // 更新当前显示的产品为搜索结果
          setSearchQuery(routerSearchQuery);  // 更新搜索查询  
        } else if (productDisplayed.length === 0) {
          const productsResponse = await axios.get('http://localhost:3001/api/products'); 
          setProducts(productsResponse.data);
          setProductDisplayed(productsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching categories or products:', error); // 捕获并打印错误
      }
    }

    // 只有当 router.query 准备好时才执行 fetchCategoriesAndProducts
    if (router.isReady) {
      fetchCategoriesAndProducts();
    }

  }, [router.isReady, routerSearchQuery]);

  // Handle category selection and fetch products for the selected category
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category.name); // Update the selected category
    setCurrentPage(1); 
    try {
      const response = await axios.get(`http://localhost:3001/api/products/category/${category.id}`);
      if (response.data.length > 0) {
        setProductDisplayed(response.data); // 更新当前显示的产品为选中的类别产品
      } else {
        console.warn('No products found for this category.');
        setProductDisplayed([]);  // 清空显示的产品
      }
    } catch (error) {
      console.error('Error fetching products by category:', error);  // Log any errors
    }
  };

  //calculate the products should be displayed
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // paginate
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(products.length / productsPerPage);
  
  // Generate an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <main>
      <Header 
      user={user} 
      onLogout={onLogout} 
      onSearchQueryChange={handleSearchQueryChange} 
      />  {/* Pass user and logout functionality to the Header */}
      <div className="flex ml-6 mt-6">
        <CateSidebar
          categories={categories}  // Pass categories data to CateSidebar
          selectedCategory={selectedCategory}  // Pass the selected category to CateSidebar
          onCategorySelect={handleCategorySelect}  // Handle category selection
        />
        <div className="flex-1 p-6">
          <div className="flex justify-between mb-6">
            {/* 根据不同的情况显示相应的标题 */}
          {searchQuery ? (
              <h1 className="text-2xl font-bold">Products including "{searchQuery}"</h1>
            ) : (
              <h1 className="text-2xl font-bold">{selectedCategory}</h1>  // Display the selected category
            )}
        </div>
        <ProductGrid products={productDisplayed} />  {/* ProductGrid is only rendered on the client side */}
        
        {/* Pagination */}
        <div className="flex justify-center items-center mt-4">
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                onClick={() => paginate(pageNumber)}
                className={`px-2 py-2 mx-1 ${
                  currentPage === pageNumber
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-300 text-black'
                } rounded ${pageNumber === currentPage ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                disabled={pageNumber === currentPage}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />  {/* Render the Footer component */}
    </main>
  );
}
