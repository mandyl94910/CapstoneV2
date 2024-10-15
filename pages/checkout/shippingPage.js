import React, { useEffect, useState } from "react";
import ShippingMethod from "../../components/user/checkout/shipping/Method";
import OrderSummary from "../../components/user/checkout/OrderSummary";
import { useRouter } from "next/router";
import CheckoutNav from "../../components/user/checkout/CheckoutNav";
import ReturnButton from "../../components/user/checkout/button/ReturnButton";
import SubmitButton from "../../components/user/checkout/button/SubmitButton";
import Image from "next/image";

const ShippingPage = () => {
  const [formData, setFormData] = useState({}); // State to hold form data
  const [cart, setCart] = useState([]); // State to hold cart items
  const [selectedShippingMethod, setSelectedShippingMethod] =
    useState("standard"); // Default shipping method selected

  const router = useRouter(); // Hook to handle routing

  // Load form data and cart items from localStorage on component mount
  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedFormData) setFormData(storedFormData); // Set form data if available
    setCart(cartItems); // Set cart items from localStorage
  }, []);

  // Function to handle the continue to payment action
  const handleContinueToPayment = () => {
    console.log("Selected Shipping Method: ", selectedShippingMethod);
    router.push("/checkout/payment"); // Navigate to the payment page
  };

  // Function to handle the return to information page action
  const handleReturn = () => {
    router.push("/checkout/checkoutPage"); // Navigate back to the information page
  };

  return (
    <div className="container mx-auto lg:px-40 p-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left Section */}
      <div>
        {/* Site logo */}
        <div className="mb-4">
          <Image src="/logo.png" alt="Logo" width={165} height={52} priority />
        </div>

        {/* Navigation bar */}
        <CheckoutNav />

        <h2 className="text-2xl font-bold mb-4">Shipping</h2>

        {/* Name, Contact, and Shipping Address displayed in a styled box */}
        <div className="border border-slate-400 p-4 rounded-lg mb-4">
          {/* Name */}
          <div className="flex justify-between items-center">
            <p className="text-slate-500">Name</p>
            <p className="font-semibold">
              {formData.first_name} {formData.last_name}
            </p>
          </div>
          <hr className="my-2" />

          {/* Contact */}
          <div className="flex justify-between items-center">
            <p className="text-slate-500">Contact</p>
            <p className="font-semibold">{formData.phone}</p>
          </div>
          <hr className="my-2" />

          {/* Shipping Address */}
          <div className="flex justify-between items-center">
            <p className="text-slate-500">Ship to</p>
            <p className="font-semibold">
              {formData.street}, {formData.city}, {formData.province}{" "}
              {formData.postal}, {formData.country}
            </p>
          </div>
        </div>

        {/* Shipping method selection */}
        <ShippingMethod
          selectedMethod={selectedShippingMethod}
          setSelectedMethod={setSelectedShippingMethod}
        />

        {/* Return and Continue buttons */}
        <div className="flex justify-between mt-8">
          <ReturnButton onClick={handleReturn} label="Return to information" />
          <SubmitButton
            label="Continue to payment"
            onClick={handleContinueToPayment}
          />
        </div>
      </div>

      {/* Right Section - Order Summary */}
      <div className="border p-6 rounded-lg shadow-md bg-white sticky top-6">
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
};

export default ShippingPage;
