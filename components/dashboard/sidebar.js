import React from "react";

const Sidebar = () => {
  return (
    <div className="w-20 h-screen bg-gray-800 text-white flex flex-col items-center py-4">
      <ul className="space-y-6">
        <li>
          <i className="icon icon-dashboard text-2xl"></i>
        </li>
        <li>
          <i className="icon icon-products text-2xl"></i>
        </li>
        <li>
          <i className="icon icon-users text-2xl"></i>
        </li>
        <li>
          <i className="icon icon-sales text-2xl"></i>
        </li>
        <li>
          <i className="icon icon-settings text-2xl"></i>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
