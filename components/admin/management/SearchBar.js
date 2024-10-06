import React from "react";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  placeholder = "Search...",
}) => {
  // 검색 입력 필드의 변경 핸들러
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="mb-2">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="border p-2 rounded w-full"
      />
    </div>
  );
};

export default SearchBar;
