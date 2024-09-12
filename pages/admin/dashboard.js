import React from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Header from "../../components/dashboard/Header";
import Stats from "../../components/dashboard/Stats";
import Product from "../../components/dashboard/Products";
import SalesReport from "../../components/dashboard/SalesReport";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header title="Dashboard"/>
        <Stats />
        <div className="grid grid-cols-2 gap-6">
          <Product />
          <SalesReport />
        </div>
      </div>
    </div>
  );
}
