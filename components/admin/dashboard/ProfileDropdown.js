import React, { useState } from "react";
import Link from "next/link";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaDesktop,
  FaPaypal,
  FaMoneyCheck,
} from "react-icons/fa";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* User Profile Icon */}
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <img
          className="w-10 h-10 rounded-full"
          src="https://via.placeholder.com/150"
          alt="User Profile"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {/* Profile Info */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">Admin1</h3>
            <p className="text-sm text-gray-500">admin1@gmail.com</p>
          </div>

          {/* Menu Options */}
          <div className="p-2">
            <Link
              href="/profile"
              className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <FaUser className="text-lg" />
              <span>My Profile</span>
            </Link>
            <Link
              href="/admin/settings/settings"
              className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <FaCog className="text-lg" />
              <span>Account Settings</span>
            </Link>
            <Link
              href="/device-management"
              className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <FaMoneyCheck className="text-lg" />
              <span>Payment System</span>
            </Link>
          </div>

          {/* Sign Out */}
          <div className="p-2 border-t border-gray-100">
            <Link
              href="/"
              className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-red-50 rounded-md"
            >
              <FaSignOutAlt className="text-lg text-red-500" />
              <span>Sign Out</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
