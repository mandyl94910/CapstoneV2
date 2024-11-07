import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FaAddressBook,
  FaCube,
  FaDollarSign,
  FaTruck,
  FaClipboardList,
  FaBarcode,
} from "react-icons/fa";

const Sidebar = () => {
  const router = useRouter(); // Get the current route

  // Helper function to check if a route is active
  const isActive = (pathname) => router.pathname === pathname;

  return (
    <div className="w-40 min-h-screen bg-indigo-400 flex flex-col items-center py-4 space-y-6">
      <div className="w-full text-white flex justify-center mb-6">
        <i className="icon icon-dashboard"></i>
      </div>
      <ul className="space-y-6 text-white">
        <li>
          <Link href="/admin/dashboard" className="flex items-center">
            <div
              className={`flex items-center space-x-2 ${
                isActive("/admin/dashboard") ? "text-yellow-300" : "text-white"
              }`}
            >
              <FaClipboardList className="mr-2" />
              <span>Dashboard</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/admin/product" className="flex items-center">
            <div
              className={`flex items-center space-x-2 ${
                isActive("/admin/product") ? "text-yellow-300" : "text-white"
              }`}
            >
              <FaCube className="mr-2" />
              <span>Products</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/admin/order" className="flex items-center">
            <div
              className={`flex items-center space-x-2 ${
                isActive("/admin/order") ? "text-yellow-300" : "text-white"
              }`}
            >
              <FaTruck className="mr-2" />
              <span>Orders</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/admin/user" className="flex items-center">
            <div
              className={`flex items-center space-x-2 ${
                isActive("/admin/user") ? "text-yellow-300" : "text-white"
              }`}
            >
              <FaAddressBook className="mr-2" />
              <span>Users</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/admin/report" className="flex items-center">
            <div
              className={`flex items-center space-x-2 ${
                isActive("/admin/report") ? "text-yellow-300" : "text-white"
              }`}
            >
              <FaDollarSign className="mr-2" />
              <span>Reports</span>
            </div>
          </Link>
        </li>
        <li>
          <Link href="/admin/scanner" className="flex items-center">
            <div
              className={`flex items-center space-x-2 ${
                isActive("/admin/scanner") ? "text-yellow-300" : "text-white"
              }`}
            >
              <FaBarcode className="mr-2" />
              <span>Scanner</span>
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
