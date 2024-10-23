//pages\all-products\index.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';  // Import dynamic to enable dynamic loading
import CateSidebar from '../../components/category/CateSidebar';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { useRouter } from 'next/router';

// Dynamically load ProductGrid component, disable SSR
// only load this component when being visited
const ProductGrid = dynamic(() => import('../../components/category/ProductGrid'), { ssr: false });

/**
 * Helped by chatGPT
 * Products Component
 * 
 * This component displays a list of products based on categories.
 * It allows users to filter products by categories, search for products,
 * and sort the product list.
 *
 * Features:
 * - Fetch categories and products from the API.
 * - Display a sidebar for category selection.
 * - Implement pagination for product listings.
 * - Dynamically load the ProductGrid component.
 */
export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);  // Initialize as an empty array
  const [currentPage, setCurrentPage] = useState(1);  
  const [sortOption, setSortOption] = useState('default');
  const productsPerPage = 16; 
  const [loading, setLoading] = useState(false); 
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');  // Used to save the user's search input
  const { searchQuery: routerSearchQuery, categoryId } = router.query;  // Securely deconstruct searchQuery from router.query


  // helped by chatGPT
  /** prompt: the top level category 'All Products' and all second level categories all 
  * have attribute sub_for === 1, how can i retrieve the top level category without changing
  * the database structure
  */
  // hardcode the top level 'all products'
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

  // Fetch products based on the selected category or URL parameter
  useEffect(() => {
    // define the method
    async function fetchProducts(){
      setLoading(true); // set loading to true before fetching data
      try {
        let productsResponseData;
        // give priority to searchQuery
        if (routerSearchQuery){
          // clear category when searching
          setSelectedCategory('');
          const searchResponse = await axios.get(`http://localhost:3001/api/productsName?query=${routerSearchQuery}`)
          productsResponseData = searchResponse.data;
        } else if(categoryId && parseInt(categoryId, 10) !== 1) {
          
          if (!categories.length) {
            // if categories haven't been loaded, wait, this happen when visit the category page with specific URL
            // otherwise it cannot set selected category to selected status
            console.log('Categories are still empty, waiting to load.');
            return;
          }

          setSearchQuery('');
          // get category object with id categoryId
          const selectedCategoryObj = findCategoryById(categories, parseInt(categoryId, 10));
          setSelectedCategory(selectedCategoryObj.name);
          // based on category selected
          const productsResponse = await axios.get(`http://localhost:3001/api/products/categories/${categoryId}`);
          productsResponseData = productsResponse.data;
          
        } else {
          // this make the link to 'All Products' on header work  
          // show all products by default
          setSelectedCategory('All Products');
          const productsResponse = await axios.get('http://localhost:3001/api/products');
          productsResponseData = productsResponse.data;
        }

        setProducts(productsResponseData);

      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // set loading to false after fetching data
      }
    }

    // call the method when router is ready
    if (router.isReady && categories.length > 0){
      fetchProducts();
    }
    
  },[routerSearchQuery, categoryId, router.isReady, categories.length]);


  function findCategoryById(categoryTree, id) {
    for (let category of categoryTree) {
      if (category.id === id) {
        return category;  // if category is current level
      }
      if (category.subcategories) {
        const foundSubcategory = findCategoryById(category.subcategories, id);  // if category is sub level
        if (foundSubcategory) {
          return foundSubcategory;
        }
      }
    }
    return null;  
  }

  // Handle category selection for the selected category
  const handleCategorySelect = async (category) => {
    setSearchQuery('');
    setSelectedCategory(category.name); // Update the selected category
    setCurrentPage(1); 

    router.push(`/all-products?categoryId=${category.id}`);
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
      // case 'topRated':
      //   sortedProducts.sort((a,b) => a.price - b.price);
      //   break;
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
      <Header/> 
      <div className="flex ml-6 mt-6">
        <CateSidebar
          categories={categories}  // Pass categories data to CateSidebar
          selectedCategory={selectedCategory}  // Pass the selected category to CateSidebar
          onCategorySelect={handleCategorySelect}  // Handle category selection
        />
        <div className="flex-1 p-6">
          <div className='flex items-center justify-between'>
            <div className="flex justify-between mb-6">
              {/* Display the appropriate title according to the different situations */}
              {routerSearchQuery? (
                  <h1 className="text-2xl font-bold">Products including "{routerSearchQuery}"</h1>
                ) : (
                  <h1 className="text-2xl font-bold">{selectedCategory}</h1>  // Display the selected category
                )}
 
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

          {/* ProductGrid is only rendered on the client side */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            currentProducts.length > 0 ? (
              <ProductGrid products={currentProducts} />
            ) : (
              <p>No products available</p>
            )
          )}
     
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
