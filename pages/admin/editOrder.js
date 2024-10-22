import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";


const EditOrder = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customer_id: "",
    total: "",
    total_tax: "",
    status: "",
    order_date: "",
    ship_date: "",
    shipping_method: "",
    tracking_number: "",
    complete_date: "",
    first_name: "",
    last_name: "",
    street: "",
    city: "",
    province: "",
    postal: "",
    country: "",
    phone: ""
  });
  const [validationMessage, setValidationMessage] = useState("");

  const { orderId } = router.query;
  const [products, setProducts] = useState([]);

  useEffect(() => {
    console.log('order Id is',orderId)
    if (orderId) {
      fetchOrderDetails(orderId);
      fetchOrderProducts(orderId);
    }
    
  }, [orderId]);

  // Fetch order details from the API
  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/orders/${orderId}`);
      const order = response.data;

      console.log('customer_id is :',order.customer_id)

      // 直接从 order.address_data 中提取字段
        const address = order.address_data || {};  // 确保 address_data 存在
        const formattedAddress = `${address.first_name} ${address.last_name}, ${address.street}, ${address.city}, ${address.province}, ${address.postal}, ${address.country}, ${address.phone}`;
      // 更新 formData，添加所有订单相关信息
      setFormData({
        customer_id: order.customer_id,
        total: order.total,
        total_tax: order.total_tax,
        status: order.status,
        order_date: order.order_date,
        ship_date: order.ship_date,
        shipping_method: order.shipping_method,
        tracking_number: order.tracking_number,
        complete_date: order.complete_date,
        first_name: address.first_name || "",
        last_name: address.last_name || "",
        street: address.street || "",
        city: address.city || "",
        province: address.province || "",
        postal: address.postal || "",
        country: address.country || "",
        phone: address.phone || ""
      });
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const fetchOrderProducts = async (orderId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/orders/${orderId}/products`);
      const products = response.data;
      setProducts(products);
      console.log('product of this order is :',products)
    } catch (error) {
      console.error("Error fetching order products:", error);
    }
  };

  const handleChange = (e) => { 
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: value.trim() !== "" ? value : prev[name], // 保持旧数据，避免空白验证
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    try {
      // 转换地址数据为 JSONB 格式
      const formattedAddress = {
        first_name: formData.first_name,
        last_name: formData.last_name,
        street: formData.street,
        city: formData.city,
        province: formData.province,
        postal: formData.postal,
        country: formData.country,
        phone: formData.phone
      };
  
      const updatedData = {
        ...formData,
        address_data: formattedAddress,  // 将地址部分作为 JSON 格式
      };
  
      // 调用后端更新函数
      const response = await axios.put(`http://localhost:3001/api/update-orders/${orderId}`, updatedData);
      router.push({
        pathname: "/admin/order",
        query: { refresh: true },
      });
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  const validateForm = () => {
    const {
      first_name,
      last_name,
      street,
      city,
      province,
      postal,
      country,
      phone,
      total
    } = formData;
  
    // 检查地址数据
    if (!first_name || !last_name || !street || !city || !province || !postal || !country || !phone) {
      setValidationMessage("Please fill in all the address fields.");
      return false;
    }
  
    // 验证邮编格式（假设为加拿大邮编格式：A1A 1A1）
    const postalRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
    if (!postalRegex.test(postal)) {
      setValidationMessage("Invalid postal code format. It should be like A1A 1A1.");
      return false;
    }
  
    // 验证电话号码格式（假设为10位数字）
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setValidationMessage("Phone number must be 10 digits.");
      return false;
    }
  
    // 验证总额是否有效
    if (!total || total <= 0) {
      setValidationMessage("Total must be greater than 0.");
      return false;
    }
  
    setValidationMessage("");
    return true;
  };

  const handleCancel = () => {
    router.push("/admin/orders");
  };

  const statusOptions = ["complete", "shipped", "pending"];
  const shippingOptions = ["UPS", "FedEx", "DHL", "Canada Post"];

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-4 overflow-y-auto">
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow-md w-3/5 flex flex-col" // 左侧信息区域占60%
    >
      <h2 className="text-xl font-bold mb-4">Edit Order</h2>

      {/* Order ID and Customer ID on the same row */}
      <div className="flex justify-between space-x-4 mb-4">
        <div className="w-1/2">
            <label className="block text-gray-700 mb-2">Order ID</label>
            <input
            type="text"
            value={orderId ? orderId : "Loading..."}
            className="w-full p-2 border rounded bg-gray-100 text-gray-500"
            readOnly
            />
        </div>

        <div className="w-1/2">
            <label className="block text-gray-700 mb-2">Customer ID</label>
            <input
            type="text"
            value={formData.customer_id}
            className="w-full p-2 border rounded bg-gray-100 text-gray-500"
            readOnly
            />
        </div>
      </div>

       {/* Address fields */}
        <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="col-span-1">
            <label className="block text-gray-700 mb-2">First Name</label>
            <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full p-1 border rounded"
            required
            />
        </div>
        <div className="col-span-1">
            <label className="block text-gray-700 mb-2">Last Name</label>
            <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full p-1 border rounded"
            required
            />
        </div>
        <div className="col-span-1">
            <label className="block text-gray-700 mb-2">Street</label>
            <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="w-full p-1 border rounded"
            required
            />
        </div>

        <div className="col-span-1">
            <label className="block text-gray-700 mb-2">City</label>
            <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="w-full p-1 border rounded"
            required
            />
        </div>
        <div className="col-span-1">
            <label className="block text-gray-700 mb-2">Province</label>
            <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            className="w-full p-1 border rounded"
            required
            />
        </div>
        <div className="col-span-1">
            <label className="block text-gray-700 mb-2">Postal Code</label>
            <input
            type="text"
            name="postal"
            value={formData.postal}
            onChange={handleChange}
            className="w-full p-1 border rounded"
            required
            />
        </div>

        <div className="col-span-1">
            <label className="block text-gray-700 mb-2">Country</label>
            <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="w-full p-1 border rounded"
            required
            />
        </div>
        <div className="col-span-1">
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-1 border rounded"
            required
            />
        </div>
        </div>


      {/* Total and Total Tax */}
      <div className="flex justify-between space-x-4 mb-4">
        <div className="w-1/2">
          <label className="block text-gray-700 mb-2">Total</label>
          <input
            type="number"
            step="0.01"
            name="total"
            value={formData.total}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100 text-gray-500"
            readOnly
          />
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700 mb-2">Total Tax</label>
          <input
            type="number"
            step="0.01"
            name="total_tax"
            value={formData.total_tax}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100 text-gray-500"
            readOnly
          />
        </div>
      </div>

        {/* Status */}
        <div className="mb-4">
        <label className="block text-gray-700 mb-2">Status</label>
        <select
            name="status"
            value={formData.status} 
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
        >
            {/* 显示所有状态选项，包括当前状态 */}
            {statusOptions.map((status) => (
            <option key={status} value={status}>
                {status.charAt(0) + status.slice(1)} {/* 首字母大写 */}
            </option>
            ))}
        </select>
        </div>


      {/* Order Date and Ship Date - Readonly */}
      <div className="flex justify-between space-x-4 mb-4">
        <div className="w-1/2">
          <label className="block text-gray-700 mb-2">Order Date</label>
          <input
            type="date"
            name="order_date"
            value={formData.order_date.split("T")[0]}
            className="w-full p-2 border rounded bg-gray-100 text-gray-500"
            readOnly
          />
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700 mb-2">Ship Date</label>
          <input
            type="date"
            name="ship_date"
            value={formData.ship_date ? formData.ship_date.split("T")[0] : ""}
            onChange={handleChange}
            className="w-full p-2 border rounded bg-gray-100 text-gray-500"
            readOnly
          />
        </div>
      </div>

      {/* Shipping Method and Tracking Number */}
      <div className="flex justify-between space-x-4 mb-4">
        <div className="mb-4">
            <label className="block text-gray-700 mb-2">Shipping Method</label>
            <select
            name="shipping_method"
            value={formData.shipping_method} // 当前运输方式显示
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            >
            {/* 显示所有运输方式选项 */}
            {shippingOptions.map((method) => (
                <option key={method} value={method}>
                {method}
                </option>
            ))}
            </select>
        </div>

        <div className="w-1/2">
          <label className="block text-gray-700 mb-2">Tracking Number</label>
          <input
            type="text"
            name="tracking_number"
            value={formData.tracking_number}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Complete Date - Readonly */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Complete Date</label>
        <input
          type="date"
          name="complete_date"
          value={formData.complete_date ? formData.complete_date.split("T")[0] : ""}
          className="w-full p-2 border rounded bg-gray-100 text-gray-500"
          readOnly
        />
      </div>

      {/* Validation Message */}
      {validationMessage && (
        <div className="text-red-500 mb-4">{validationMessage}</div>
      )}

      {/* Submit and Cancel Buttons */}
      <div className="flex justify-center space-x-6">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-6 rounded"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-red-500 text-white py-2 px-6 rounded"
        >
          Cancel
        </button>
      </div>
    </form>

    {/* Right-side product information list */}
    <div className="bg-white p-6 rounded shadow-md w-2/5 flex flex-col ml-5">
    {products.length > 0 ? (
        products.map((product) => (
        <div
            key={product.id}
            className="flex flex-col p-4 mb-4 border border-gray-300 rounded-lg shadow hover:shadow-lg transition-shadow"
        >
            <div className="flex justify-between items-center mb-2">
            <div className="text-gray-600 font-medium">
                <strong>ID:</strong> {product.id}
            </div>
            <div className="text-gray-600 font-medium">
                <strong>Name:</strong> {product.name}
            </div>
            </div>
            <div className="flex justify-between items-center">
            <div className="text-gray-700">
                <strong>Price:</strong> ${product.price}
            </div>
            <div className="text-gray-700">
                <strong>Quantity:</strong> {product.quantity}
            </div>
            </div>
            {/* 新增 total 字段 */}
            <div className="flex justify-between items-center mt-2">
            <div className="text-gray-700 font-medium">
                <strong>Total:</strong> ${(product.price * product.quantity).toFixed(2)}
            </div>
            </div>
        </div>
        ))
    ) : (
        <div className="text-gray-500">No products found for this order.</div>
    )}
    </div>
  </div>
);
};

export default EditOrder;
