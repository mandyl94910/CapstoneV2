import React from "react";

const Header = ({ title }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex space-x-4 items-center">
        <i className="text-xl">lock</i>
        <i className="text-xl">mail</i>
        <i className="text-xl">notification</i>
        <img
          className="w-8 h-8 rounded-full"
          src="https://via.placeholder.com/150"
          alt="User Profile"
        />
      </div>
    </div>
  );
};

export default Header;
