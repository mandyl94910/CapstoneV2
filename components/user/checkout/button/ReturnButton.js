import React from "react";
import { FaAngleLeft } from "react-icons/fa";

const ReturnButton = ({ onClick, label = "Return to cart" }) => {
  return (
    <button
      type="button"
      className="text-gray-500 text-sm hover:underline flex items-center"
      onClick={onClick}
    >
      <FaAngleLeft className="mr-2" />
      {label}
    </button>
  );
};

export default ReturnButton;
