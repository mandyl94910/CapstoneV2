import React, { useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Link from 'next/link'; 
import Image from 'next/image'; 
import { useAuth } from "../../hooks/useAuth";
import SearchBar from '../common/SearchBar';


function Header({ onSearchQueryChange }) {

  const { user, onLogout } = useAuth();
  const [searchResults, setSearchResults] = useState([]);
 
  const handleSearch = async (query) => {
    try {
      const response = await fetch(`http://localhost:3001/api/productsName?query=${query}`);
      //response.json() is a method that returns a Promise that will parse the stream of the response body and convert it to a JSON object.
      //This is because the server usually sends JSON data in the form of a string,
      //and the front-end needs to convert this JSON string into a JavaScript object so that it can be used by other functions or operations in the program.
      const data = await response.json();
      setSearchResults(data);
      onSearchQueryChange(query,data);  // Update the search status in the parent component
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <header className="bg-white py-4 flex justify-between items-center shadow-md">
      <nav className="flex space-x-6 pl-16 "> {/* Increase space between the links */}
        <Link href="/admin-dashboard" 
          className="hover:text-blue-600">
          admin dashboard
        </Link>
        <Link href="/all-products?categoryId=1"  
          className="hover:text-blue-600"
          >
          All Products
        </Link>
        <Link href="#">
          Tap
        </Link>
        <Link href="#">
          Tap
        </Link>
      </nav>
      <Link href="/">
        <div 
          className=" relative mx-8 cursor-pointer"
          // set the container size
          style={{height:'52px', width:'165px'}}
        > 
          <Image
            src="/logo.png"
            alt="Logo"
            // image size
            width={165}
            height={52}
            style={{ objectFit:"cover" }}
            priority
          />
        </div>
      </Link>
      <div className="flex items-center space-x-8"> {/* Increase space between elements */}
        <div className="relative">
          <SearchBar onSearch={handleSearch} />  {/* pass handleSearch to SearchBar */}
        </div>
        <Link href='/cart'>
          <FaShoppingCart className="text-2xl cursor-pointer hover:text-blue-600" /> {/* Increase size of the cart icon */}
        </Link>
      
        {user ? (
          <div className="flex items-center space-x-4 pr-16">
            <Link href='/user-profile'>
              <div className="hover:underline hover:text-blue-600 text-blue-600">
                Welcome, {user.customer_name}
              </div>
            </Link>
            
            {/* User Profile */}
            <Link href='/user-profile'>
              <img
                className="min-w-10 h-10 rounded-full hover:opacity-80 transition-opacity duration-300"
                src="/user.webp" //hardcode path for testing
                // src={`/images/${user.image}`}      //retrieve from database
                alt="User Profile"
              />
            </Link>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm w-24"
              onClick={onLogout}
            >
              Log Out
            </button>
          </div>
        ) : (
          <Link href="/login" className="pr-16">
            <button 
            className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700  w-24"
            >LOG IN</button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
