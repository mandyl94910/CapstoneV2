import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Player } from "@lottiefiles/react-lottie-player";

const OrderDetails = () => {
  const router = useRouter();
  const [isAnimationVisible, setIsAnimationVisible] = useState(true);

  // Hide animation after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsAnimationVisible(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const orderData = {
    id: 5913,
    item: {
      name: "Gaming headset",
      imageUrl: "/images/category/gaming_accessories.webp",
    },
    startTime: "27 Oct 2024, 15:43:23",
    courier: { name: "UPS" },
    address: "4517 Washington Ave. Manchester, Kentucky",
  };

  return (
    <div className="container mx-auto px-6 py-12 bg-white rounded-lg shadow-md max-w-lg relative">
      {/* Status badge */}
      <div className="absolute top-4 right-4">
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
          In progress
        </span>
      </div>

      {/* Fireworks animation (positioned at the top) */}
      {isAnimationVisible && (
        <div className="absolute -top-20 inset-x-0 flex justify-center items-center">
          <Player
            autoplay
            loop={false}
            src="/animations/firework.json" // Local file path
            style={{ height: 300, width: 300 }}
          />
        </div>
      )}

      {/* Congratulations message */}
      <div className="text-center mt-16">
        <h1 className="text-3xl font-bold text-slate-600 mb-6">
          Thank you for your order!
        </h1>
      </div>

      {/* Centered product image */}
      <div className="flex justify-center mb-8">
        <Image
          src={orderData.item.imageUrl}
          alt={orderData.item.name}
          width={150}
          height={150}
          className="rounded-lg"
        />
      </div>

      {/* Order information */}
      <div className="text-left">
        <h2 className="text-2xl font-bold mb-2">Order #{orderData.id}</h2>
        <p className="text-lg font-medium mb-2">Item: {orderData.item.name}</p>
        <p className="text-gray-500 mb-1">Start time: {orderData.startTime}</p>
        <p className="text-gray-500 mb-1">Courier: {orderData.courier.name}</p>
        <p className="text-gray-500">Address: {orderData.address}</p>
      </div>

      {/* Button section */}
      <div className="mt-10 text-center flex justify-center space-x-4">
        {/* Go to Home button */}
        <button
          onClick={() => router.push("/")}
          className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-indigo-600 transition"
        >
          Go to Home
        </button>

        {/* Order more products button */}
        <button
          onClick={() => router.push("/all-products?categoryId=1")}
          className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-sm hover:bg-indigo-600 transition"
        >
          Order More Products
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
