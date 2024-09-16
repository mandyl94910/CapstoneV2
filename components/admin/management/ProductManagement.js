import React, { useState } from "react";
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";

const ProductManagement = () => {
  const [orders, setOrders] = useState([
    {
      orderNo: "1000A2T34",
      productName: "Product 1",
      price: "$126.44",
      shipTo: "User1",
      orderPlaced: "June 29, 2024",
      status: "Prepared",
    },
    {
      orderNo: "1000A2T34",
      productName: "Product 1",
      price: "$126.44",
      shipTo: "User1",
      orderPlaced: "June 29, 2024",
      status: "Delivered",
    },
  ]);

  const orderColumns = [
    "Order No",
    "Product name",
    "Price",
    "Ship to",
    "Order Placed",
    "Status",
  ];

  const handleEdit = (index) => {
    console.log("Edit order:", index);
  };

  const handleDelete = (index) => {
    console.log("Delete order:", index);
    // Add logic to delete the order
  };

  const orderStats = [
    {
      title: "Total Sales",
      value: "$3740.25",
      description: "Based on 28 June 2024",
    },
    {
      title: "Total Products",
      value: "79",
      description: "Based on 28 June 2024",
    },
    {
      title: "Total Orders",
      value: "22",
      description: "Based on 28 June 2024",
    },
  ];

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      <div className="bg-white p-4 rounded shadow-md">
        <DataTable
          columns={orderColumns}
          data={orders}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <InfoCards stats={orderStats} />
    </div>
  );
};

export default ProductManagement;
