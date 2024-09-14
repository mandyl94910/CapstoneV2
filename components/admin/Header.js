import React from "react";
import Link from "next/link";
import { FaShieldAlt, FaEnvelope, FaBell } from "react-icons/fa";

const Header = ({ title }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex space-x-6 items-center">
        {/* Protection */}
        <Link href="/admin/protection">
          <FaShieldAlt className="text-2xl text-indigo-500" />
        </Link>

        {/* Mail */}
        <Link href="/admin/">
          <FaEnvelope className="text-2xl text-indigo-500" />
        </Link>

        {/* Notification */}
        <Link href="/admin/">
          <FaBell className="text-2xl text-indigo-500" />
        </Link>

        {/* User Profile */}
        <img
          className="w-10 h-10 rounded-full"
          src="https://via.placeholder.com/150"
          alt="User Profile"
        />
      </div>
    </div>
  );
};

export default Header;
