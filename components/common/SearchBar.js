import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";

const buttonStyles = `
  inline-block border-transparent px-4 py-2 text-center border border-blue-100 rounded-r-lg
  hover:bg-blue-400 hover:border-black  hover:ring-black 
`;

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchQueryChange(query);
    }
  };

  const handleSearchQueryChange = async (query) => {
    router.replace({
      pathname: "/all-products",
      query: { searchQuery: query },
    });
  };

  return (
    <div className="flex items-center mr-20">
      {/* search box */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          value={query} // Bind the value of the search input box
          className="p-2 border rounded-l-lg pl-10 w-[450px]" // Adjusted width to w-72
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Trigger search on Enter key press
        />
        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>

      {/* buttons */}
      <button
        onClick={() => handleSearchQueryChange(query)}
        className={buttonStyles}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
