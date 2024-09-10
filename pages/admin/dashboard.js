import React from "react";
import Sidebar from "../../components/dashboard/sidebar";
import Header from "../../components/dashboard/header";
import Stats from "../../components/dashboard/stats";
import Product from "../../components/dashboard/products";
import Sales from "../../components/dashboard/sales";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header />
        <Stats />
        <div className="grid grid-cols-2 gap-6">
          <Product />
          <Sales />
        </div>
      </div>
    </div>
  );
}
