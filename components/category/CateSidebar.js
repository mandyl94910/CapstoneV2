import React, { useState } from 'react';

const CateSidebar = ({ categories, selectedCategory, onCategorySelect }) => {
  // 使用数组存储多个展开的类目 ID，允许多个父类同时展开
  const [expandedCategories, setExpandedCategories] = useState([]);

  // 切换展开/收起状态
  const toggleExpandCategory = (categoryId) => {
    setExpandedCategories(prevState =>
      prevState.includes(categoryId) 
        ? prevState.filter(id => id !== categoryId) // 如果已展开，点击后收起
        : [...prevState, categoryId] // 如果未展开，点击后展开
    );
  };

  // 渲染类目及其子类目的递归函数
  const renderCategories = (category, level = 0) => {
    const isExpanded = expandedCategories.includes(category.id); // 判断当前类目是否展开
    const isParent = category.subcategories && category.subcategories.length > 0; // 判断是否为父类目

    return (
      <li
        key={category.id}
        className={`cursor-pointer p-2 mb-2 rounded ${selectedCategory === category.name ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'} ${level > 0 ? 'pl-6' : ''}`}
        onClick={() => isParent ? toggleExpandCategory(category.id) : onCategorySelect(category)} // 点击父类展开/收起，点击子类选中
      >
        {category.name}
        {isParent && (
          <span className="ml-2">{isExpanded ? '-' : '+'}</span> // 父类目时显示箭头
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
          .filter(category => category.name !== 'All Products') // 过滤掉 "All Products"
          .map(category => renderCategories(category)) // 渲染类目
        }
      </ul>
    </div>
  );
};

export default CateSidebar;
