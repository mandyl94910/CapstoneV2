//C:\CPRG306\CapstoneV2\components\admin\management\OrderManagement.js
import React, { useState,useEffect  } from "react";
import { useRouter } from "next/router"; // Import useRouter for navigation
import axios from "axios";
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";

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
  const [orders, setOrders] = useState([]); // State for orders
  const router = useRouter(); // Next.js router for navigation
  const [orderStats, setOrderStats] = useState({
    totalSales: "Loading...",
    totalProducts: "Loading...",
    totalOrders: "Loading..."
  });

  // Fetch orders when the component mounts
  useEffect(() => {
    async function fetchOrders() {
      try {
        const response = await axios.get('http://localhost:3001/api/order-admin/datatable');
        console.log('Fetched orders:', response.data);
        setOrders(response.data);  // Update orders state
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    }

    async function fetchOrderStats() {
      try {
        const [totalSalesRes, totalProductsRes, totalOrdersRes] = await Promise.all([
          axios.get('http://localhost:3001/api/total-sales'),
          axios.get('http://localhost:3001/api/total-products'),
          axios.get('http://localhost:3001/api/total-orders')
        ]);

        setOrderStats({
          totalSales: `$${totalSalesRes.data.totalSales.toFixed(2)}`,
          totalProducts: totalProductsRes.data.totalProducts,
          totalOrders: totalOrdersRes.data.totalOrders
        });

        console.log("Updated orderStats:", {
          totalSales: `$${totalSalesRes.data.totalSales.toFixed(2)}`,
          totalProducts: totalProductsRes.data.totalProducts,
          totalOrders: totalOrdersRes.data.totalOrders
        });
      } catch (error) {
        console.error("Error fetching order stats:", error);
      }
    }
    
    fetchOrders();  // Call the fetchOrders function when the component mounts
    fetchOrderStats();
  }, []);

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

  const stats = [
    {
      title: "Total Sales",
      value: orderStats.totalSales,
      description: `Based on ${new Date().toLocaleDateString()}`,
    },
    {
      title: "Total Products",
      value: orderStats.totalProducts,
      description: `Based on ${new Date().toLocaleDateString()}`,
    },
    {
      title: "Total Orders",
      value: orderStats.totalOrders,
      description: `Based on ${new Date().toLocaleDateString()}`,
    },
  ];

  return (
    <div className="border-t-2 ">
      {/* Order Data Table */}
      <div className="bg-white p-4 rounded shadow-md">
        <DataTable
          columns={[
            "Order ID",
            "Product ID",
            "Total",
            "Customer Name",
            "Order Date",
            "Status",
          ]}
          data={orders.map((order) => ({
            orderNo: order.order_id,
            productID: order.product_id,
            total: order.total,
            customerName: order.customer_name,
            orderDate: new Date(order.order_date).toLocaleDateString(),
            status: order.status,
          }))}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Order Info Cards */}
      <InfoCards stats={stats} />
    </div>
  );
};

export default OrderManagement;
