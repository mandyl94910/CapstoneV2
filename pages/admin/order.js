import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import OrderManagement from "../../components/admin/management/OrderManagement";

const OrderPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header title="Order Management" />
        <OrderManagement />
      </div>
    </div>
  );
};

export default OrderPage;
