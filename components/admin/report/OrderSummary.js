import React, { useEffect, useState } from "react";
/**
 * helped by chatGPT
 * prompt: axios is a library for sending HTTP requests, 
 * specialized for transferring data between the client and the server, 
 * supporting various HTTP methods (GET, POST, PUT, etc.) 
 * and simplifying the handling of requests and responses.
 */
import axios from "axios";
/**
 * helped by chatGPT
 * prompt: Initializes the state variable orderCount with a default value of 0.
 * Purpose: This provides orderCount with a starting value, 
 * ensuring it has a defined state before any data is fetched.
 */
const OrderSummary = () => {
  const [orderCount, setOrderCount] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [salesByProduct, setSalesByProduct] = useState(0);

  /**
   * helped by chatGPT
   * prompt: used to send a GET request to the specified URL
   * retrieves data from this endpoint and returns a Promise. 
   * When resolved, it contains the response data from the server, 
   * which you can then process.
   */
  useEffect(() => {
    async function fetchOrderSummary() {
      try {
        /**
         * helped by chatGPT
         * prompt: axios.get: Sends a GET request to retrieve data from the server.like retrieving a list of items or fetching user details.
         * axios.post: Sends a POST request to send data to the server.as adding a new user or submitting a form.
         * axios.put: Sends a PUT request to update existing data on the server.like updating user information.
         */
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
