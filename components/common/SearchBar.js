//C:\CPRG306\CapstoneV2\components\common\SearchBar.js
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useRouter } from 'next/router'; // 引入 useRouter

const SearchBar = ({ onSearch }) => {
const [query, setQuery] = useState('');
const router = useRouter(); // 使用 useRouter 进行页面跳转
  
    const handleInputChange = (e) => {
      setQuery(e.target.value);
      // 可以选择在每次输入变化时触发搜索
      // onSearch(e.target.value);
    };
  
    //using async for future explore
    const handleSearch = async() => {
        onSearch(query) // 用户点击搜索按钮时触发搜索
        router.push({
            pathname: '/all-products/products',
            query: { searchQuery: query },
          });
    };
  
    return (
        <div className="flex items-center space-x-8"> {/* 搜索框和按钮之间的间距 */}
        {/* 搜索框 */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            value={query} // 绑定搜索输入框的值
            className="p-2 border rounded pl-10"
            onChange={handleInputChange}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        
        {/* 按钮 */}
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
          Search
        </button>
      </div>
    );
  };
  
  export default SearchBar;