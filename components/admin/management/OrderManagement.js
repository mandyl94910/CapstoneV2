import React, { useState } from "react";
import { useRouter } from "next/router"; // Next.js router for navigation
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
  {
    orderNo: "1000A2T36",
    productName: "Product 3",
    price: "$55.00",
    shipTo: "User3",
    orderPlaced: "July 3, 2024",
    status: "Shipped",
  },
  {
    orderNo: "1000A2T37",
    productName: "Product 4",
    price: "$150.00",
    shipTo: "User4",
    orderPlaced: "July 5, 2024",
    status: "Prepared",
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
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const router = useRouter(); // Next.js router for navigation

  // Filter orders based on Order No, Product Name, and Ship To
  const filteredOrders = orders.filter((order) => {
    return (
      order.orderNo.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter by Order No
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()) || // Filter by Product Name
      order.shipTo.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by Ship To
    );
  });

  // Placeholder for edit functionality
  const handleEdit = (index) => {
    console.log("Edit order:", index);
  };

  // Placeholder for delete functionality
  const handleDelete = (index) => {
    console.log("Delete order:", index);
  };

  // Navigate to Add Order page
  const handleAddOrder = () => {
    router.push("/admin/addOrder"); // Redirect to the Add Order page
  };

  return (
    <div className="border-t-2">
      {/* Container for search bar and DataTable */}
      <div className="bg-white p-4 rounded shadow-md">
        {/* Search Bar above the DataTable */}
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order No, Product Name, or Ship To"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Order Data Table */}
        <DataTable
          columns={[
            "Order No",
            "Product Name",
            "Price",
            "Ship To",
            "Order Placed",
            "Status",
          ]}
          data={filteredOrders.map((order) => ({
            orderNo: order.orderNo,
            productName: order.productName,
            price: order.price,
            shipTo: order.shipTo,
            orderPlaced: order.orderPlaced,
            status: order.status,
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
