import React, { useEffect } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Link from 'next/link'; 
import Image from 'next/image'; 

function Header({ user, onLogout }) {


  return (
    <header className="bg-white py-4 flex justify-between items-center shadow-md">
      <nav className="flex space-x-6 pl-16"> {/* Increase space between the links */}
        <Link href="/admin-dashboard">
          admin dashboard
        </Link>
        <Link href="/all-products">
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
            width={140}
            height={60}
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
          <FaShoppingCart className="text-2xl cursor-pointer hover:text-blue-500" /> {/* Increase size of the cart icon */}
        </Link>
      
        {user ? (
          <div className="flex items-center space-x-4">
            <div className="hover:underline hover:text-blue-600">
              Welcome, {user.name}!
            </div>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={onLogout}
            >
              LOG OUT
            </button>
          </div>
        ) : (
          <Link href="/login" className="pr-16">
            <button className="bg-blue-500 text-white rounded-lg px-4 py-2 font-medium">LOG IN</button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;