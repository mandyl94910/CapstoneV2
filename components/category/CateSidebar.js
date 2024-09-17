import React from 'react';

const CateSidebar = ({ categories, selectedCategory, onCategorySelect }) => {

  // 函数用于渲染类目和它的子类目
  const renderCategories = (category, level = 0) => {
    const isParent = category.subcategories && category.subcategories.length > 0; // 判断是否是父类目

    return (
      <li
        key={category.id}
        className={`p-2 mb-2 rounded ${selectedCategory === category.name ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'} ${level > 0 ? 'pl-6 cursor-pointer' : ''}`} // 子类才是可点击的
        onClick={() => {
          if (!isParent) {
            onCategorySelect(category); // 只有子类能触发产品加载
          }
        }}
      >
        {category.name}
        {isParent && (
          <ul className="ml-4 mt-2"> {/* 直接显示子类 */}
            {category.subcategories.map(subcategory => renderCategories(subcategory, level + 1))} {/* 递归渲染子类 */}
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
