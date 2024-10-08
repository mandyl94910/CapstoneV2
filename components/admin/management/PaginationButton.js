import React from "react";

// A reusable PaginationButton component for pagination controls
const PaginationButton = ({ onClick, disabled, children, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mx-0.5 px-3 py-2 rounded ${className} ${
        disabled ? "cursor-not-allowed" : "hover:bg-gray-300"
      }`}
    >
      {children}
    </button>
  );
};

export default PaginationButton;
