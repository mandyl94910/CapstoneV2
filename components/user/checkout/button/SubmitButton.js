import React from "react";

const SubmitButton = ({ label = "Continue to shipping", onClick }) => {
  return (
    <button
      type="submit" 
      className="bg-indigo-500 text-white px-4 py-3 rounded-md"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SubmitButton;
