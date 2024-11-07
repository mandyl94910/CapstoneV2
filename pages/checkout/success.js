// pages/admin/OrderDetails.js
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Player } from "@lottiefiles/react-lottie-player";

const OrderDetails = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const [isAnimationVisible, setIsAnimationVisible] = useState(true);
  const [orderData, setOrderData] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimationVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("customerInfo");
    const storedOrderData = localStorage.getItem("orderData");

    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
    }
  }, []);

  // Save all items in the order as a notification to localStorage
  useEffect(() => {
    if (orderData && userInfo) {
      const notification = {
        customerName: userInfo.customer_name,
        orderId: orderData.orderId,
        items: orderData.items.map((item) => item.name), // 모든 아이템 이름 저장
        orderTime: new Date().toISOString(),
      };

      const notifications =
        JSON.parse(localStorage.getItem("notifications")) || [];
      notifications.unshift(notification); // 최신 알림을 맨 앞에 추가
      localStorage.setItem("notifications", JSON.stringify(notifications));
    }
  }, [orderData, userInfo]);

  return (
    <div className="container mx-auto px-6 py-12 bg-white rounded-lg shadow-md max-w-lg relative">
      <div className="absolute top-4 right-4">
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
          {orderData?.status || "In progress"}
        </span>
      </div>

      {isAnimationVisible && (
        <div className="absolute -top-20 inset-x-0 flex justify-center items-center">
          <Player
            autoplay
            loop={false}
            src="/animations/firework.json"
            style={{ height: 300, width: 300 }}
          />
        </div>
      )}

      {userInfo && orderData && (
        <>
          <div className="text-center mt-16">
            <h1 className="text-3xl font-bold text-gray-500 mb-6">
              Thank you for your order, {userInfo.customer_name || "Customer"}!
            </h1>
          </div>

          <div className="text-left">
            <h2 className="text-2xl font-bold text-gray-500 mb-2">
              Order #{orderData.orderId}
            </h2>
            <p className="text-lg font-medium text-gray-500 mb-2">Items:</p>
            <ul className="list-disc ml-5 mb-4">
              {orderData.items.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-500 flex items-center mb-2"
                >
                  {item.imageUrl ? (
                    <img
                      src={`/images/${item.imageUrl.split(",")[0]}`}
                      alt={item.name}
                      className="w-10 h-10 object-cover rounded-lg mr-3"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded-lg mr-3 flex items-center justify-center">
                      <span className="text-gray-500 text-xs">No Image</span>
                    </div>
                  )}
                  {item.name}
                </li>
              ))}
            </ul>
            <p className="text-gray-500 mb-1">
              Start time: {orderData.orderDate}
            </p>
            <p className="text-gray-500 mb-1">
              Courier: {orderData.shippingMethod}
            </p>
            <p className="text-gray-500">Address: {orderData.address}</p>
          </div>

          <div className="mt-4 text-left">
            <h3 className="text-xl font-semibold text-gray-500">
              Customer Details
            </h3>
            <p className="text-gray-500">Name: {userInfo.customer_name}</p>
            <p className="text-gray-500">Email: {userInfo.email}</p>
            <p className="text-gray-500">Phone: {userInfo.phone}</p>
          </div>

          <div className="mt-10 text-center flex justify-center space-x-4">
            <button
              onClick={() => router.push("/")}
              className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-indigo-600 transition"
            >
              Go to Home
            </button>
            <button
              onClick={() => router.push("/all-products?categoryId=1")}
              className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-indigo-600 transition"
            >
              Order More Products
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetails;
