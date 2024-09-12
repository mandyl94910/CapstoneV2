import React from 'react';

const Sidebar2 = ({ categories, selectedCategory, onCategorySelect }) => {
  return (
    <div className="w-64 bg-white border-r-2 border-gray-200 p-4">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={`cursor-pointer p-2 ${
              selectedCategory === category.name ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'
            } ${category.isSubcategory ? 'pl-6' : ''}`}
            onClick={() => onCategorySelect(category.name)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar2;
