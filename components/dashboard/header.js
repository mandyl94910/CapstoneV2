// Header.js
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex space-x-4 items-center">
        <i className="icon icon-lock text-2xl"></i>
        <i className="icon icon-mail text-2xl"></i>
        <i className="icon icon-notification text-2xl"></i>
        <img
          className="w-10 h-10 rounded-full"
          src="user.jpg"
          alt="User Profile"
        />
      </div>
    </div>
  );
};

export default Header;
