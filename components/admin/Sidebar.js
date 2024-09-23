import React from "react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="w-40 h-screen bg-indigo-400 flex flex-col items-center py-4 space-y-6">
      <div className="w-full text-white flex justify-center mb-6">
        <i className="icon icon-dashboard"></i>
      </div>
      <ul className="space-y-6 text-white">
        <li>
          <Link href="/admin/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link href="/admin/product">Products</Link>
        </li>
        <li>
          <Link href="/admin/order">Orders</Link>
        </li>
        <li>
          <Link href="/admin/user">Users</Link>
        </li>
        <li>
          <Link href="/admin/report">Reports</Link>
        </li>
        <li>
          <Link href="/admin/settings/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
