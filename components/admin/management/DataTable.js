import React, { useState } from "react";

const DataTable = ({ columns, data, onEdit, onDelete, itemsPerPage = 5 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Get the data for the current page
  const currentData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change when a page button is clicked
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageRange = () => {
    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(currentPage + 4, totalPages);
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <div className="relative">
      <div className="overflow-auto" style={{ minHeight: "300px" }}>
        <table className="w-full bg-gray-100 border-separate border-spacing-0">
          <thead>
            <tr className="bg-gray-400 text-left">
              {columns.map((col, index) => (
                <th key={index} className="p-3 border border-gray-300">
                  {col}
                </th>
              ))}

              <th className="p-3 border border-gray-300"></th>
              <th className="p-3 border border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row) => (
              <tr key={row.product_id} className="bg-white even:bg-gray-100">
                {Object.values(row).map((value, idx) => (
                  <td key={idx} className="p-3 border border-gray-300">
                    {value}
                  </td>
                ))}
                <td className="p-2 border border-gray-300 w-24">
                  <button
                    onClick={() => onEdit(row.product_id)}
                    className="bg-green-500 text-white py-1 px-4 rounded"
                  >
                    Edit
                  </button>
                </td>
                <td className="p-2 border border-gray-300 w-24">
                  <button
                    onClick={() => onDelete(row.product_id)}
                    className="bg-red-500 text-white py-1 px-4 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-3">
          {/* Page buttons */}
          {getPageRange().map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`mx-1 px-3 py-2 rounded ${
                  currentPage === page
                    ? "bg-indigo-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {page}
              </button>
        ))}

        {/* Dropdown for selecting the page */}
        <select
              className="border border-gray-300 rounded px-2 py-1 mr-4 ml-5"
              value={currentPage}
              onChange={(e) => handlePageChange(Number(e.target.value))}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <option key={page} value={page}>
                  Page {page}
                </option>
              ))}
            </select>
      </div>
    </div>
  );
};

export default DataTable;