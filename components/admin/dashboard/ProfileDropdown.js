import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FaUser, FaCog, FaSignOutAlt, FaMoneyCheck } from "react-icons/fa";

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false); // Manage dropdown state
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    title: "",
    profilePicture: "https://via.placeholder.com/150", // Default placeholder image
  });

  // Fetch admin details on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/profile-admin")
      .then((response) => {
        setAdminDetails({
          name: response.data.name || "",
          title: response.data.title || "",
          profilePicture:
            `/images/${response.data.image}` ||
            "https://via.placeholder.com/150",
        });
      })
      .catch((error) => console.error("Error fetching admin details:", error));
  }, []);

  return (
    <div className="relative">
      {/* User Profile Icon */}
      <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
        <img
          className="w-10 h-10 rounded-full"
          src={adminDetails.profilePicture} // Use the profile picture from state
          alt="User Profile"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          {/* Profile Info */}
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-800">{adminDetails.name}</h3>
            <p className="text-sm text-gray-500">{adminDetails.title}</p>
          </div>

          {/* Menu Options */}
          <div className="p-2">
            <Link
              href="/admin/adminProfile"
              className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-slate-300 rounded-md"
            >
              <FaUser className="text-lg" />
              <span>My Profile</span>
            </Link>
            <Link
              href="/admin/settings/settings"
              className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-slate-300 rounded-md"
            >
              <FaCog className="text-lg" />
              <span>Account Settings</span>
            </Link>
            <Link
              href="/device-management"
              className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-slate-300 rounded-md"
            >
              <FaMoneyCheck className="text-lg" />
              <span>Payment System</span>
            </Link>
          </div>

          {/* Sign Out */}
          <div className="p-2 border-t border-gray-100">
            <Link
              href="/"
              className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-red-100 rounded-md"
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
