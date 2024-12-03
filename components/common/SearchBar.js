import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";

const buttonStyles = `
  inline-block px-4 py-2 text-center border border-gray-500 text-gray-700 rounded-r-lg
  hover:bg-blue-400 hover:border-black hover:ring-black 
`;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
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
      const data = await response.json();

      if (data && Array.isArray(data.data)) {
        setSuggestions(data.data.slice(0, 5));
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      setSuggestions([]);
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
    router.replace({
      pathname: "/all-products",
      query: { searchQuery: query },
    });
  };

  return (
    <div className="flex items-center mr-20" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          className="p-2 border border-gray-400 rounded-l-lg pl-10 w-[450px]"
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        
        {/* 搜索建议下拉菜单 */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-50">
            {suggestions.map((product) => (
              <div
                key={product.product_id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSuggestionClick(product)}
              >
                <div className="flex items-center">
                  <span className="text-gray-700">{product.product_name}</span>
                  {product.price && (
                    <span className="ml-auto text-gray-500">
                      ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={() => {
          handleSearchQueryChange(query);
          setShowSuggestions(false);
        }}
        className={buttonStyles}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
