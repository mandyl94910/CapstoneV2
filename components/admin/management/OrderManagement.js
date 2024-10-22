import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";
import { saveAs } from "file-saver"; 

const OrderManagement = () => {
  const [orders, setOrders] = useState([]); // State to hold order data
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const router = useRouter(); // Next.js router for navigation
  const [orderStats, setOrderStats] = useState({
    totalSales: "Loading...",
    totalProducts: "Loading...",
    totalOrders: "Loading...",
  });
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // Fetch order data and order statistics when the component mounts
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/order-admin/datatable"
        );
        setOrders(response.data); // Set the orders data from the API response
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    async function fetchOrderStats() {
      try {
        const [totalSalesRes, totalProductsRes, totalOrdersRes] =
          await Promise.all([
            axios.get("http://localhost:3001/api/total-sales"),
            axios.get("http://localhost:3001/api/total-products"),
            axios.get("http://localhost:3001/api/total-orders"),
          ]);

        setOrderStats({
          totalSales: `$${totalSalesRes.data.totalSales.toFixed(2)}`,
          totalProducts: totalProductsRes.data.totalProducts,
          totalOrders: totalOrdersRes.data.totalOrders,
        });
      } catch (error) {
        console.error("Error fetching order stats:", error);
      }
    }

    fetchOrders(); // Fetch order data
    fetchOrderStats(); // Fetch order statistics
  }, []);

  // Filter orders based on Order No, Product Name, and Customer Name
  const filteredOrders = orders.filter((order) => {
    // Check if properties are defined and convert them to strings to avoid undefined errors
    return (
      (order.order_id &&
        order.order_id
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) || // Filter by Order ID
      (order.product_id &&
        order.product_id
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) || // Filter by Product ID
      (order.customer_name &&
        order.customer_name.toLowerCase().includes(searchQuery.toLowerCase())) // Filter by Customer Name
    );
  });

  // Placeholder for edit functionality
  const handleEdit = (orderId) => {
    router.push({
      pathname: '/admin/editOrder',
      query: { orderId: orderId }, 
    }).then(() => {
      setLastUpdated(Date.now()); 
    });
  };

  // Placeholder for delete functionality
  const handleDelete = (orderId) => {
    console.log("Delete order:", index);
  };

  // Navigate to Add Order page
  const handleAddOrder = () => {
    router.push("/admin/addOrder"); // Redirect to the Add Order page
  };

  // Array to hold order stats for displaying in InfoCards component
  const stats = [
    {
      title: "Total Sales",
      value: orderStats.totalSales,
      description: `Based on ${new Date().toLocaleDateString("en-CA")}`,
    },
    {
      title: "Total Products",
      value: orderStats.totalProducts,
      description: `Based on ${new Date().toLocaleDateString("en-CA")}`,
    },
    {
      title: "Total Orders",
      value: orderStats.totalOrders,
      description: `Based on ${new Date().toLocaleDateString("en-CA")}`,
    },
  ];

  const downloadOrderExcel = () => {
    window.location.href = "http://localhost:3001/api/export-orders";
  };

  return (
    <div className="border-t-2">
      {/* Container for search bar and DataTable */}
      <div className="bg-white p-4 rounded shadow-md">
        {/* Search Bar above the DataTable */}
        <div className="mb-4">
          {/* Search input field */}
          <input
            type="text"
            value={searchQuery} // Bind input value to searchQuery state
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on user input
            placeholder="🔍 Search by Order No, Product ID, or Customer Name"
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Order Data Table */}
        <DataTable
          columns={[
            "Order ID",
            "Product Name",
            "Total",
            "Customer Name",
            "Order Date",
            "Status",
          ]}
          data={filteredOrders.map((order) => ({
            id: order.order_id, // 设置 id 为 order_id
            product_name: order.product_name,
            total: order.total,
            customer_name: order.customer_name,
            order_date: new Date(order.order_date).toLocaleDateString(),
            status: order.status,
          }))} // 在这里使用 .map() 来映射数据
          onEdit={(orderId) => handleEdit(orderId)} // 使用 id 进行编辑操作
          onDelete={(orderId) => handleDelete(orderId)} // 使用 id 进行删除操作
        />
        <div className="flex justify-between mt-4">
          <button
            onClick={downloadOrderExcel}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Download Order Data
          </button>
        </div>
      </div>
      

      {/* Order Info Cards */}
      <InfoCards stats={stats} />
    </div>
  );
};

export default OrderManagement;
