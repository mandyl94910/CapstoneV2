import React, { useState } from "react";
import PaginationButton from "./PaginationButton"; // Import the new PaginationButton component

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

  // Calculate the range of pages to be displayed (maximum 4 pages)
  const getPageRange = () => {
    let startPage, endPage;
    if (totalPages <= 4) {
      // If total pages are less than or equal to 4, show all pages
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 2) {
        // Show first 4 pages if currentPage is in the first 2 pages
        startPage = 1;
        endPage = 4;
      } else if (currentPage >= totalPages - 1) {
        // Show last 4 pages if currentPage is in the last 2 pages
        startPage = totalPages - 3;
        endPage = totalPages;
      } else {
        // Show 4 pages around the current page
        startPage = currentPage - 1;
        endPage = currentPage + 2;
      }
    }
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  return (
    <div className="relative">
      <div className="overflow-auto" style={{ minHeight: "300px" }}>
        <table className="w-full bg-slate-500 border-separate border-spacing-0">
          <thead>
            <tr className="bg-slate-500 text-white text-left">
              {columns.map((col, index) => (
                <th key={index} className="p-3 border border-slate-600">
                  {col}
                </th>
              ))}

              <th className="p-3 border border-gray-300"></th>
              <th className="p-3 border border-gray-300"></th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((row) => (
              <tr key={row.id} className="bg-white even:bg-gray-100">
                {Object.values(row).map((value, idx) => (
                  <td key={idx} className="p-3 border border-gray-300">
                    {value}
                  </td>
                ))}
                <td className="p-2 border border-gray-300 w-24">
                  <button
                    onClick={() => onEdit(row.id)}
                    className="bg-green-500 text-white py-1 px-4 rounded"
                  >
                    Edit
                  </button>
                </td>
                <td className="p-2 border border-gray-300 w-24">
                  <button
                    onClick={() => onDelete(row.id)}
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
      <div className="flex justify-center items-center mt-4">
        {/* Previous Button */}
        <PaginationButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1
              ? "bg-gray-300 text-gray-500"
              : "bg-gray-300 text-gray-500"
          } w-10 h-10`}
        >
          ◀
        </PaginationButton>

        {/* Page Buttons */}
        {getPageRange().map((page) => (
          <PaginationButton
            key={page}
            onClick={() => handlePageChange(page)}
            className={`${
              currentPage === page
                ? "bg-slate-500 text-white"
                : "bg-gray-200 text-slate-700"
            } w-10 h-10`} // Fixed size for pagination buttons
          >
            {page}
          </PaginationButton>
        ))}

        {/* Next Button */}
        <PaginationButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500"
              : "bg-gray-300 text-gray-500"
          } w-10 h-10`}
        >
          ▶
        </PaginationButton>
      </div>
    </div>
  );
};

export default DataTable;
