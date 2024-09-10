// ProductTable.js
import React from "react";

const Products = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="w-full bg-gray-200 text-left">
            <th className="py-2 px-4">No</th>
            <th className="py-2 px-4">Product Name</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Sold</th>
            <th className="py-2 px-4">View</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2 px-4">1</td>
            <td className="py-2 px-4">Product 1</td>
            <td className="py-2 px-4">Active</td>
            <td className="py-2 px-4">2</td>
            <td className="py-2 px-4">25</td>
          </tr>
          <tr>
            <td className="py-2 px-4">2</td>
            <td className="py-2 px-4">Product 2</td>
            <td className="py-2 px-4">Active</td>
            <td className="py-2 px-4">2</td>
            <td className="py-2 px-4">125</td>
          </tr>
          <tr>
            <td className="py-2 px-4">3</td>
            <td className="py-2 px-4">Product 3</td>
            <td className="py-2 px-4">Active</td>
            <td className="py-2 px-4">2</td>
            <td className="py-2 px-4">51</td>
          </tr>
          <tr>
            <td className="py-2 px-4">4</td>
            <td className="py-2 px-4">Product 4</td>
            <td className="py-2 px-4">Inactive</td>
            <td className="py-2 px-4">2</td>
            <td className="py-2 px-4">7</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Products;
