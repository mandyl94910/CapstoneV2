import React, { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Link from 'next/link'; 
import Image from 'next/image'; 
import { useAuth } from "../../hooks/useAuth";


function Header() {

  const { user, onLogout } = useAuth();


  return (
    <header className="bg-white py-4 flex justify-between items-center shadow-md">
      <nav className="flex space-x-6 pl-16 "> {/* Increase space between the links */}
        <Link href="/admin-dashboard" className="hover:text-blue-500">
          admin dashboard
        </Link>
        <Link href="/all-products"  className="hover:text-blue-500">
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
          className="flex items-center space-x-2 px-8 min-h-4"
          style={{minHeight:'80px', minWidth:'200px'}}
        > 
          <Image
            src="/logo.png"
            alt="Logo"
            width={200}
            height={80}
            className="cursor-pointer"
          />
          {/* <div className="text-2xl font-bold">TOP Tradings</div> */}
        </div>
      </Link>
      <div className="flex items-center space-x-8"> {/* Increase space between elements */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="p-2 border rounded pl-10" 
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" /> {/* Adjust icon position */}
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
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-red-600 text-sm w-24"
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
