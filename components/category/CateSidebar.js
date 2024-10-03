import React, { useState } from 'react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';

/**
 * helped by chatGPT
 * prompt：create a sidebar for categories with subcategories，categories can be expanded when being clicked
 * @param {*} param0 
 * @returns 
 */
const CateSidebar = ({ categories, selectedCategory, onCategorySelect }) => {
  const [expandedCategories, setExpandedCategories] = useState({}); // State to manage expanded/collapsed categories
  const [selectedParent, setSelectedParent] = useState(null); // Track selected parent category


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
    const isParentSelected = selectedParent === category.name && !isSelected; // Check if the parent is selected but not as a specific category

    return (
      <li
        key={category.id}
        className={`p-2 mb-2 rounded ${isSelected ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'} ${level > 0 ? 'pl-6 cursor-pointer' : 'cursor-pointer'}`}
        // onClick={() => {
        //   if (!isParent) {
        //     // If it's not a parent category, select only the clicked subcategory
        //     onCategorySelect(category); 
        //   }
        // }}
        onClick={onCategorySelect(category)}
      >
        <div className="flex justify-between items-center">
          <span 
            //className={`${isSelected ? 'text-white' : ''}`}
            className={`${isSelected || isParentSelected ? 'text-white' : ''}`}
            onClick={() => {
              if (isParent) {
                // Click the parent to expand/collapse, but only select the parent when not expanding
                setSelectedParent(category.name); // Mark parent as selected
                onCategorySelect(category); // Select the parent category
              }
            }}
          >
            {category.name}
          </span>
          {isParent && (
            <span className="ml-2 cursor-pointer" onClick={() => toggleCategory(category.id)}>
              {isExpanded ? (
                <FaAngleUp className= {`${isSelected ? 'text-white text-sm' : 'text-gray-500 text-sm'} `}/> 
                ): (
                <FaAngleDown className= {`${isSelected ? 'text-white text-sm' : 'text-gray-500 text-sm'} `}/>
                )}
            </span> // Show angleDown for collapsed and angleUp for expanded categories
          )}
        </div>

        {isParent && isExpanded && (
          <ul className="ml-4 mt-2"> {/* Only display subcategories if the parent is expanded */}
            {category.subcategories.map(subcategory => (
              <li
                key={subcategory.id}
                className={`p-2 mb-2 rounded ${selectedCategory === subcategory.name ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'} pl-6 cursor-pointer`}
                onClick={() => {
                  onCategorySelect(subcategory); // Select the clicked subcategory
                  setSelectedParent(null); // Deselect the parent category
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
