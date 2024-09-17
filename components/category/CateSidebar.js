import React from 'react';

const CateSidebar = ({ categories, selectedCategory, onCategorySelect }) => {

  // Function to render categories and their subcategories
  const renderCategories = (category, level = 0) => {
    const isParent = category.subcategories && category.subcategories.length > 0; // Check if the category is a parent

    return (
      <li
        key={category.id}
        className={`p-2 mb-2 rounded ${selectedCategory === category.name ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'} ${level > 0 ? 'pl-6 cursor-pointer' : ''}`} // Only child categories are clickable
        onClick={() => {
          if (!isParent) {
            onCategorySelect(category); // Only child categories trigger the product loading
          }
        }}
      >
        {category.name}
        {isParent && (
          <ul className="ml-4 mt-2"> {/* Always display subcategories below the parent category */}
            {category.subcategories.map(subcategory => renderCategories(subcategory, level + 1))} {/* Recursively render subcategories */}
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
