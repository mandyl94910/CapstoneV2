import React from "react";
import Link from "next/link";
import ProfileDropdown from "../admin/dashboard/ProfileDropdown";
import { FaShieldAlt, FaEnvelope, FaBell } from "react-icons/fa";

const Header = ({ title }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-xl font-bold text-slate-600">{title}</h1>
      <div className="flex space-x-6 items-center">
        {/* Protection */}
        <Link href="/admin/protection">
          <FaShieldAlt className="text-2xl text-green-500" />
        </Link>

        {/* Mail */}
        <Link href="/admin/">
          <FaEnvelope className="text-2xl text-yellow-500" />
        </Link>

        {/* Notification */}
        <Link href="/admin/">
          <FaBell className="text-2xl text-orange-500" />
        </Link>

        {/* User Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default Header;
