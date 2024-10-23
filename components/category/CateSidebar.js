//components\category\CateSidebar.js
import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

/**
 * Helped by chatGPT
 * CateSidebar Component
 * 
 * This component renders a sidebar for categories with expandable/collapsible subcategories.
 * Users can click on a category to expand or collapse its subcategories.
 *
 * Props:
 * - categories: An array of category objects, each potentially containing subcategories.
 * - selectedCategory: The name of the currently selected category.
 * - onCategorySelect: A callback function to handle the selection of a category.
 *
 * Features:
 * - Supports expanding and collapsing parent categories.
 * - Displays subcategories when their parent category is expanded.
 * - Highlights the selected category with a different background color.
 */
const CateSidebar = ({ categories, selectedCategory, onCategorySelect }) => {
  const [expandedCategories, setExpandedCategories] = useState({}); // State to manage expanded/collapsed categories


  // Toggle category expansion for parent categories
  const toggleCategory = (categoryId) => {
    setExpandedCategories(prevState => ({
      // keep the prevState of all other parent Id
      ...prevState,
      // toggle the state for the category with categoryId
      [categoryId]: !prevState[categoryId]
    }));
  };


  // Function to render categories and their subcategories
  const renderCategories = (category, level = 0) => {
    const isParent = category.subcategories && category.subcategories.length > 0; // Check if the category is a parent
    const isExpanded = expandedCategories[category.id]; // Check if this category is expanded
    const isSelected = selectedCategory === category.name; // Check if this category is selected
   
    return (
      <li
        key={category.id}
        // lever > 0 means it is a child category, and it will have pl-6
        className={`p-2 mb-2 rounded ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'} ${level > 0 ? 'pl-6 cursor-pointer' : 'cursor-pointer'}`}
        onClick={() => {
          {/* if it is a parent category, toggle its expansion status */}
          if (isParent) {
            toggleCategory(category.id);
          }
          onCategorySelect(category); 
        }}
      >

        {/* Category name and the Angle icon (if it is a parent category)*/}
        <div className="flex justify-between items-center">
          <span>
            {category.name}
          </span>
          
          {/* only show this angle icon when its a parent category */}
          {isParent && (
            <span className="ml-2 cursor-pointer">
              {/* Show angleUp or angleDown based on if the parent category is expanded or not */}
              {isExpanded ? (
                <FaAngleUp className= {`${isSelected ? 'text-white text-sm' : 'text-gray-500 text-sm'} `}/> 
                ): (
                <FaAngleDown className= {`${isSelected ? 'text-white text-sm' : 'text-gray-500 text-sm'} `}/>
                )}
            </span>
          )}
        </div>

        {/* if it is an expanded parent category, show its subcategories */}
        {isParent && isExpanded && (
          <ul className="ml-4 mt-2"> {/* Only display subcategories if the parent is expanded */}
            {category.subcategories.map(subcategory => (
              <li
                key={subcategory.id}
                className={`p-2 mb-2 rounded ${selectedCategory === subcategory.name ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'} pl-6 cursor-pointer`}
                onClick={() => {
                  onCategorySelect(subcategory); // Select the clicked subcategory
                }}
              >
                {subcategory.name}
              </li>
            ))} 
          </ul>
        )}
      </li>
    );

  };

  return (
    <div className="w-64 bg-white border-r-2 border-gray-200 p-4">
      <ul>
        <li
          className={`p-2 mb-2 rounded ${selectedCategory === 'All Products' ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'} cursor-pointer`}
          onClick={() => onCategorySelect({ id: 1, name: 'All Products' })} // Handle 'All Products' selection
        >
          All Products
        </li>
        {categories
          .filter(category => category.name !== 'All Products') // Filter out the "All Products" category
          .map(category => renderCategories(category)) // Render each category in the list
        }
      </ul>
    </div>
  );
};

export default CateSidebar;
