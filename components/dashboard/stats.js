// DashboardStats.js
import React from "react";

const Stats = () => {
  return (
    <div className="grid grid-cols-4 gap-4 my-6">
      <div className="p-4 bg-blue-100 rounded shadow-md flex flex-col items-center">
        <i className="icon icon-views text-3xl text-blue-500"></i>
        <h3 className="text-lg font-semibold mt-2">Total Views</h3>
        <p className="text-xl">124</p>
        <span className="text-sm text-gray-500">Based on 28 June 2024</span>
      </div>
      <div className="p-4 bg-blue-100 rounded shadow-md flex flex-col items-center">
        <i className="icon icon-products text-3xl text-blue-500"></i>
        <h3 className="text-lg font-semibold mt-2">Total Products</h3>
        <p className="text-xl">79</p>
        <span className="text-sm text-gray-500">Based on 28 June 2024</span>
      </div>
      <div className="p-4 bg-blue-100 rounded shadow-md flex flex-col items-center">
        <i className="icon icon-users text-3xl text-blue-500"></i>
        <h3 className="text-lg font-semibold mt-2">Total Users</h3>
        <p className="text-xl">25</p>
        <span className="text-sm text-gray-500">Based on 28 June 2024</span>
      </div>
      <div className="p-4 bg-blue-100 rounded shadow-md flex flex-col items-center">
        <i className="icon icon-sales text-3xl text-blue-500"></i>
        <h3 className="text-lg font-semibold mt-2">Total Sales</h3>
        <p className="text-xl">$740.25</p>
        <span className="text-sm text-gray-500">Based on 28 June 2024</span>
      </div>
    </div>
  );
};

export default Stats;
