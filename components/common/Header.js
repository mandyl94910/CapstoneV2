//C:\CPRG306\CapstoneV2\components\common\Header.js
import React, { useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Link from 'next/link'; 
import Image from 'next/image'; 
import SearchBar from '../common/SearchBar';

function Header({ user, onLogout, onSearchQueryChange  }) {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`http://localhost:3001/api/productsName?query=${query}`);
      const data = await response.json();
      setSearchResults(data);
      onSearchQueryChange(query,data);  // 更新父组件中的搜索状态
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

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
        <SearchBar onSearch={handleSearch} />  {/* 传递 handleSearch 到 SearchBar */}
        </div>
        <Link href='/cart'>
          <FaShoppingCart className="text-2xl cursor-pointer hover:text-blue-500" /> {/* Increase size of the cart icon */}
        </Link>
      
        {/* 显示搜索结果 */}
        {/* <div> */}
          {/* {searchResults.length > 0 ? ( */}
            {/* <ul> */}
              {/* {searchResults.map((result, index) => ( */}
                {/* <li key={index}> */}
                  {/* 访问 result 对象的各个属性进行渲染 */}
                  {/* <h3>{result.product_name}</h3> */}
                  {/* 其他你想要展示的属性 */}
                {/* </li> */}
              {/* ))} */}
            {/* </ul> */}
          {/* ) : ( */}
            {/* <p>No products found.</p> */}
          {/* )} */}
        {/* </div> */}
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
