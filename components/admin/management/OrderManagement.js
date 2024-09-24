import React, { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter for navigation
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";

// Initial order data
const initialOrderData = [
  {
    orderNo: "1000A2T34",
    productName: "Product 1",
    price: "$126.44",
    shipTo: "User1",
    orderPlaced: "June 29, 2024",
    status: "Prepared",
  },
  {
    orderNo: "1000A2T35",
    productName: "Product 2",
    price: "$98.22",
    shipTo: "User2",
    orderPlaced: "July 1, 2024",
    status: "Delivered",
  },
];

// Order stats information
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

const OrderManagement = () => {
  const [orders, setOrders] = useState(initialOrderData); // State for orders
  const router = useRouter(); // Next.js router for navigation

  // Placeholder for edit functionality
  const handleEdit = (index) => {
    console.log("Edit order:", index);
  };

  // Placeholder for delete functionality
  const handleDelete = (index) => {
    console.log("Delete order:", index);
  };

  // Navigate to Add Order page (if needed later)
  const handleAddOrder = () => {
    router.push("/admin/addOrder"); // Redirect to the Add Order page
  };

  return (
    <div className="border-t-2 ">
      {/* Order Data Table */}
      <div className="bg-white p-4 rounded shadow-md">
        <DataTable
          columns={[
            "Order No",
            "Product Name",
            "Price",
            "Ship To",
            "Order Placed",
            "Status",
          ]}
          data={orders.map((order, index) => ({
            ...order,
          }))}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Order Info Cards */}
      <InfoCards stats={orderStats} />
    </div>
  );
};

export default OrderManagement;
