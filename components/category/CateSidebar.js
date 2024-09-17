//C:\CPRG306\CapstoneV2\components\category\CateSidebar.js
import React, { useState } from 'react';

const CateSidebar = ({ categories, selectedCategory, onCategorySelect }) => {
  // Use an array to store the IDs of multiple expanded categories, allowing multiple parent categories to be expanded simultaneously
  const [expandedCategories, setExpandedCategories] = useState([]);

  // Toggle expand/collapse state
  const toggleExpandCategory = (categoryId) => {
    setExpandedCategories(prevState =>
      prevState.includes(categoryId) 
        ? prevState.filter(id => id !== categoryId) // If already expanded, collapse on click
        : [...prevState, categoryId] // If not expanded, expand on click
    );
  };

  // Recursive function to render categories and their subcategories
  const renderCategories = (category, level = 0) => {
    const isExpanded = expandedCategories.includes(category.id); // Check if the current category is expanded
    const isParent = category.subcategories && category.subcategories.length > 0; // Check if it is a parent category

    return (
      <li
        key={category.id}
        className={`cursor-pointer p-2 mb-2 rounded ${selectedCategory === category.name ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'} ${level > 0 ? 'pl-6' : ''}`}
        onClick={() => isParent ? toggleExpandCategory(category.id) : onCategorySelect(category)} // Expand/collapse parent category on click, select subcategory on click
      >
        {category.name}
        {isParent && (
          <span className="ml-2">{isExpanded ? '-' : '+'}</span> // Display an arrow for parent categories
        )}
        {isExpanded && isParent && (
          <ul className="ml-4 mt-2">
            {category.subcategories.map(subcategory => renderCategories(subcategory, level + 1))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="w-64 bg-white border-r-2 border-gray-200 p-4">
      <ul>
        {categories
          .filter(category => category.name !== 'All Products') // Filter out "All Products"
          .map(category => renderCategories(category)) // Render categories
        }
      </ul>
    </div>
  );
};

export default CateSidebar;
