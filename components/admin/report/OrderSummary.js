import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderSummary = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [salesByProduct, setSalesByProduct] = useState(0);

  useEffect(() => {
    async function fetchOrderSummary() {
      try {
        const response = await axios.get("http://localhost:3001/api/orders-summary");
        setOrderCount(response.data.order_count);
        setTotalSales(response.data.total_sales);
        setSalesByProduct(response.data.sales_by_product);
      } catch (error) {
        console.error("Error fetching order summary data:", error);
      }
    }

    fetchOrderSummary();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-semibold">ORDERS LAST 30 DAYS</h2>
      <p className="text-4xl font-bold mt-2">${totalSales.toFixed(2)}</p>
      <div className="mt-4 border-t pt-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-700">Sales over time</span>
          <span className="text-gray-500">{orderCount} orders</span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-700">Sales by product</span>
          <span className="text-gray-500">{salesByProduct.toFixed(0)} products</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
