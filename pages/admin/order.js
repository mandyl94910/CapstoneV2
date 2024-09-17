import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import DataTable from "../../components/admin/management/DataTable";
import InfoCards from "../../components/admin/management/InfoCards";

// order info
const orderData = [
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
];

// order status
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
  { title: "Total Orders", value: "22", description: "Based on 28 June 2024" },
];

const OrderPage = () => {
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
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header title="Order Management" />
        <div className="bg-white p-4 rounded shadow-md">
          <DataTable
            columns={orderColumns}
            data={orderData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
        <InfoCards stats={orderStats} />
      </div>
    </div>
  );
};

export default OrderPage;
