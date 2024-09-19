import React from "react";

const Switch = ({ checked, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div className="flex items-center space-x-2">
        {/* ON Label */}
        <span
          className={`font-semibold ${
            !checked ? "text-green-500" : "text-gray-400"
          }`}
        >
          On
        </span>
        <div
          className={`w-11 h-6 bg-gray-200 rounded-full peer-focus:ring-4 peer-focus:ring-blue-300 transition-all duration-300 ease-in-out`}
        >
          <div
            className={`w-5 h-5 bg-gray-400 rounded-full shadow-md transform ${
              !checked ? "translate-x-1" : "translate-x-6"
            } transition-transform duration-300 ease-in-out`}
          />
        </div>
        {/* OFF Label */}
        <span
          className={`font-semibold ${
            checked ? "text-red-500" : "text-gray-400"
          }`}
        >
          Off
        </span>
      </div>
    </label>
  );
};

export default Switch;
