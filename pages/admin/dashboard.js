import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import Stats from "../../components/admin/dashboard/Stats";
import Product from "../../components/admin/dashboard/Products";
import SalesReport from "../../components/admin/dashboard/SalesReport";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header title="Dashboard" />
        <Stats />
        <div className="grid grid-cols-2 gap-6">
          <Product />
          <SalesReport />
        </div>
      </div>
    </div>
  );
}
