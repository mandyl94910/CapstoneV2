//C:\CPRG306\CapstoneV2\pages\all-products\products.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';  // Import dynamic to enable dynamic loading
import CateSidebar from '../../components/category/CateSidebar';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { useAuth } from '../../hooks/useAuth';

// Dynamically load ProductGrid component, disable SSR
const ProductGrid = dynamic(() => import('../../components/category/ProductGrid'), { ssr: false });

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);  // Initialize as an empty array
  const [currentPage, setCurrentPage] = useState(1);  
  const [sortOption, setSortOption] = useState('default');
  const productsPerPage = 16; 
  const { user, onLogout } = useAuth();

  // helped by chatGPT
  /* prompt: the top level category 'All Products' and all second level categories all 
  have attribute sub_for === 1, how can i retrieve the top level category without changing
  the database structure
  */
  // hardcode the top level all products
  const allProductsCategory = {
    id: 1,  // same as the `sub_for = 1` for second level categories at database
    name: 'All Products',
    sub_for: null,
    subcategories: []
  };
  // Fetch category name for sidebar when open this page
  useEffect(() => {
      async function fetchAllCategories(){
        try {
          //fetch categories
          const response = await axios.get('http://localhost:3001/api/categories')
          const categories = response.data;
          // Build a tree structure for the categories
          const categoryTree = [allProductsCategory, ...categories
            .filter(cat => cat.sub_for === 1) // Filter top-level categories
            .map(parent => ({
              ...parent,
              subcategories: categories.filter(sub => sub.sub_for === parent.id), // Find all subcategories
            }))
          ];

          setCategories(categoryTree);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      }

      fetchAllCategories();

  },[]);


  // Fetch all products when open this page
  useEffect(() => {
    async function fetchAllProducts(){
      try {
        const productsResponse = await axios.get('http://localhost:3001/api/products'); // Request all products
        console.log('Fetched products:', productsResponse.data);
        setProducts(productsResponse.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchAllProducts();

  },[])
        

  // Fetch categories and products when the component mounts
  // useEffect(() => {
  //   async function fetchCategoriesAndProducts() {
  //     try {
  //       // Fetch category data from the API
  //       const response = await axios.get('http://localhost:3001/api/categories');
  //       const categoriesData = response.data;

  //       // Build a tree structure for the categories
  //       const categoryTree = categoriesData
  //         .filter(cat => cat.sub_for === 1) // Filter top-level categories
  //         .map(parent => ({
  //           ...parent,
  //           subcategories: categoriesData.filter(sub => sub.sub_for === parent.id), // Find all subcategories
  //         }));

  //       setCategories(categoryTree);

  //       // Fetch all products, no longer filtering by category
  //       const productsResponse = await axios.get('http://localhost:3001/api/products'); // Request all products
  //       setProducts(productsResponse.data);
  //     } catch (error) {
  //       console.error('Error fetching categories or products:', error);  // Log any errors
  //     }
  //   }

  //   fetchCategoriesAndProducts();

  // }, []);

  // Handle category selection and fetch products for the selected category
  
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category.name); // Update the selected category
    // console.log(category.name); // works here
    setCurrentPage(1); 
    try {
      if (category.id === 1) {
        // when select 'All Products', get all products
        const response = await axios.get('http://localhost:3001/api/products');
        console.log('All Products',response.data);
        setProducts(response.data);
      } else{
        //fetch products that belong to category and its subCategory
        const response = await axios.get(`http://localhost:3001/api/products/categories/${category.id}`);
        // const response = await axios.get(`http://localhost:3001/api/products/association`);
        console.log('Products for selected category',response.data);
        setProducts(response.data);  // Update products based on the selected category
      }
          
    } catch (error) {
      console.error('Error fetching products by category:', error);  // Log any errors
    }
  };

  

  const handleSortChange = (e) => {
    //get new option when user change it
    const option = e.target.value;
    setSortOption(option);

    const sortedProducts = [...products];
    // sort products based on option chose
    switch (option) {
      case 'priceLowToHigh':
        sortedProducts.sort((a,b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        sortedProducts.sort((a,b) => b.price - a.price);
        break;
      case 'newest':
        sortedProducts.sort((a,b) => b.register_date - a.register_date);
        break;
      case 'topRated':
        sortedProducts.sort((a,b) => a.price - b.price);
        break;
      // case 'Sales':
      //   sortedProducts.sort((a,b) => a.price - b.price);
      //   break;
      default:
        break;
    }
    setProducts(sortedProducts);
  }

  //calculate the products should be displayed
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  // if 
  const currentProducts = Array.isArray(products) ? products.slice(indexOfFirstProduct, indexOfLastProduct) : [];

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
      <Header user={user} onLogout={onLogout} />  {/* Pass user and logout functionality to the Header */}
      <div className="flex ml-6 mt-6">
        <CateSidebar
          categories={categories}  // Pass categories data to CateSidebar
          selectedCategory={selectedCategory}  // Pass the selected category to CateSidebar
          onCategorySelect={handleCategorySelect}  // Handle category selection
        />
        <div className="flex-1 p-6">
          <div className='flex items-center justify-between'>
            <div className="flex justify-between mb-6">
              <h1 className="text-2xl font-bold">{selectedCategory}</h1>  {/* Display the selected category */}
            </div>
            <select value={sortOption} onChange={handleSortChange} className="border border-gray-300 px-4 py-2 rounded-lg">
              <option value='default'>Sort By</option>
              <option value='priceLowToHigh'>Price Low to High</option>
              <option value='priceHighToLow'>Price High to Low</option>
              <option value='newest'>Newest</option>
              <option value='topRated'>Top Rated</option>
              {/* <option>Sales</option> */}
            </select>
          </div>

          <ProductGrid products={currentProducts} />  {/* ProductGrid is only rendered on the client side */}
        
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
