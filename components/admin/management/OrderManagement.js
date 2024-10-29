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
  const [trackingNumberInput, setTrackingNumberInput] = useState(""); // tracking number input
  const [shippingMethod, setShippingMethod] = useState("UPS"); // default shipping method
  const [orderToShip, setOrderToShip] = useState(null); // The current order to ship
  const [showTrackingModal, setShowTrackingModal] = useState(false); 


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

  // open tracking number modal to enter tracking number
  const openTrackingModal = (orderId) => {
    setOrderToShip(orderId);
    setShowTrackingModal(true);
  };

  const handleShipOrder = async () => {
    if (!trackingNumberInput) {
      alert("Please enter a tracking number.");
      return;
    }

    const shipDate = new Date();

    try {
      const response = await axios.put(
        `http://localhost:3001/api/order/${orderToShip}/ship`,
        { trackingNumber: trackingNumberInput,
          shippingMethod: shippingMethod,
          status: "shipped",
          shipDate: shipDate,
         }
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.order_id === orderToShip
            ? {
              ...order,
              status: "shipped",
              tracking_number: trackingNumberInput,
              shipping_method: shippingMethod,
              ship_date: shipDate,
            }
            : order
        )
      );
      alert("Order shipped successfully!");
      setTrackingNumberInput("");
      setShippingMethod("UPS");
      setOrderToShip(null); // reset order id to ship
      setShowTrackingModal(false); 
    } catch (error) {
      console.error("Error shipping order:", error);
    }
  };


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
            "newStatus",
          ]}
          data={filteredOrders.map((order) => ({
            id: order.order_id, // 设置 id 为 order_id
            product_name: order.product_name,
            total: order.total,
            customer_name: order.customer_name,
            order_date: new Date(order.order_date).toLocaleDateString(),
            status: order.status,
            // add action to ship order / change order status
            newStatus: (
              order.status === "pending" ? (
                <button
                  onClick={() => openTrackingModal(order.order_id)}
                  className="bg-yellow-500 text-white py-1 px-2 rounded w-20"
                >
                  To Ship
                </button>
              ) : order.status === "cancelled" || order.status === "refunded" ? (
                <span className="text-gray-500">{order.status}</span>
              ) : (
                <span className="text-green-500">{order.status}</span>
              )
            ),
          }))} // 在这里使用 .map() 来映射数据
          onEdit={(orderId) => handleEdit(orderId)} // 使用 id 进行编辑操作
          onDelete={(orderId) => handleDelete(orderId)} // 使用 id 进行删除操作
        />

        {/* Tracking Number entering modal */}
        {showTrackingModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg relative w-[300px]">
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-black"
                onClick={() => setShowTrackingModal(false)}
              >
                ✕
              </button>
              <h2 className="mt-3 font-bold">Enter Shipping Info:</h2>
              <hr className="mt-1 mb-3"/>

              {/* Shipping Method drop down */}
              <label className="text-sm text-gray-700">Shipping Method</label>
              <select
                value={shippingMethod}
                onChange={(e) => setShippingMethod(e.target.value)}
                className="border p-2 rounded w-full mb-4"
              >
                <option value="UPS">UPS</option>
                <option value="FedEx">FedEx</option>
                <option value="DHL">DHL</option>
                <option value="Canada Post">Canada Post</option>
              </select>

              {/* Tracking Number input */}
              <label className="text-sm text-gray-700">Tracking Number</label>
              <input
                type="text"
                value={trackingNumberInput}
                onChange={(e) => setTrackingNumberInput(e.target.value)}
                placeholder="Enter tracking number"
                className="border p-2 rounded w-full mb-4"
              />
              <div className="flex justify-between">
                <button
                  className="bg-gray-200 px-4 py-2 rounded-lg"
                  onClick={() => setShowTrackingModal(false)} // close modal
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={handleShipOrder}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between mt-4">
          <button
            onClick={downloadOrderExcel}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Download Order Table
          </button>
        </div>
      </div>
      

      {/* Order Info Cards */}
      <InfoCards stats={stats} />
    </div>
  );
};

export default OrderManagement;
