import React, { useState } from 'react';

const CateSidebar = ({ categories, selectedCategory, onCategorySelect }) => {
  const [expandedCategories, setExpandedCategories] = useState({}); // State to manage expanded/collapsed categories

  // Toggle category expansion
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prevState => ({
      ...prevState,
      [categoryId]: !prevState[categoryId]
    }));
  };

  // Function to render categories and their subcategories
  const renderCategories = (category, level = 0) => {
    const isParent = category.subcategories && category.subcategories.length > 0; // Check if the category is a parent
    const isExpanded = expandedCategories[category.id]; // Check if this category is expanded

    return (
      <li
        key={category.id}
        className={`p-2 mb-2 rounded ${selectedCategory === category.name ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'} ${level > 0 ? 'pl-6 cursor-pointer' : 'cursor-pointer'}`}
        onClick={() => {
          if (!isParent) {
            // If it's not a parent category, just select the category
            onCategorySelect(category);
          }
        }}
      >
        <div className="flex justify-between items-center" onClick={() => isParent && toggleCategory(category.id)}>
          <span>{category.name}</span>
          {isParent && (
            <span className="ml-2">{isExpanded ? '-' : '+'}</span> // Show + for collapsed and - for expanded categories
          )}
        </div>

        {isParent && isExpanded && (
          <ul className="ml-4 mt-2"> {/* Only display subcategories if the parent is expanded */}
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
          .filter(category => category.name !== 'All Products') // Filter out the "All Products" category
          .map(category => renderCategories(category)) // Render each category in the list
        }
      </ul>
    </div>
  );
};

export default CateSidebar;
