import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";


const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isBackendAvailable, setIsBackendAvailable] = useState(true);
  const router = useRouter();
  const searchRef = useRef(null);

  useEffect(() => {
    // 点击外部时关闭下拉菜单
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 实时获取搜索建议
  const fetchSuggestions = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const response = await fetch(`/api/productsName?query=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      if (data && Array.isArray(data.data)) {
        setSuggestions(data.data.slice(0, 5));
        setShowSuggestions(true);
        setIsBackendAvailable(true);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Search suggestion error:', error);
      setIsBackendAvailable(false);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length >= 1) { // 当输入至少1个字符时才开始搜索
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (product) => {
    setQuery(product.product_name);
    setShowSuggestions(false);
    handleSearchQueryChange(product.product_name);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchQueryChange(query);
      setShowSuggestions(false);
    }
  };

  const handleSearchQueryChange = async (query) => {
    if (!isBackendAvailable) {
      console.warn('Backend service is not available');
      return;
    }
    router.replace({
      pathname: "/all-products",
      query: { searchQuery: query },
    });
  };

  // 添加清除输入的处理函数
  const handleClearInput = () => {
    setQuery("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-[500px] font-lato" ref={searchRef}>
      {/* 将form和suggestions放在同一个容器内 */}
      <div className="w-full">
        <form className="relative flex w-full" onSubmit={(e) => e.preventDefault()}>
          <div className="flex w-full border-2 border-gray-200 rounded-2xl
            transition-all duration-300 
            shadow-[0_2px_8px_rgba(0,0,0,0.08)] 
            hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]
            focus-within:border-blue-500">
            <div className="relative flex-1">
              <button 
                className="absolute left-2 -translate-y-1/2 top-1/2 p-1"
                onClick={() => handleSearchQueryChange(query)}
                type="button"
              >
                <svg
                  width="17"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  aria-labelledby="search"
                  className="w-5 h-5 text-gray-700"
                >
                  <path
                    d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                    stroke="currentColor"
                    strokeWidth="1.333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              
              <input
                type="text"
                placeholder="Search for anything"
                value={query}
                className="w-full px-8 pr-10 py-3 
                  focus:outline-none placeholder-gray-400 
                  border-none bg-transparent
                  font-lato font-normal text-base text-gray-700
                  placeholder:font-lato placeholder:font-normal placeholder:text-base"
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              
              {query && (
                <button 
                  type="reset"
                  onClick={handleClearInput}
                  className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => handleSearchQueryChange(query)}
              className="px-6 py-3 bg-white text-gray-700
                hover:bg-blue-500 hover:text-white rounded-xl
                transition-colors duration-200
                text-base font-normal font-lato uppercase
                border-l-2 border-gray-200"
            >
              Search
            </button>
          </div>
        </form>

        {/* 修改下拉菜单样式和定位 */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-white border-2 border-gray-200 
            rounded-xl shadow-lg z-50 overflow-hidden
            transition-all duration-200 ease-in-out">
            {suggestions.map((product) => (
              <div
                key={product.product_id}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer
                  transition-colors duration-150 border-b border-gray-100 last:border-none"
                onClick={() => handleSuggestionClick(product)}
              >
                <div className="flex items-center justify-between font-lato text-base">
                  <span className="text-gray-700">{product.product_name}</span>
                  {product.price && (
                    <span className="ml-4 text-gray-500 font-normal">
                      ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
