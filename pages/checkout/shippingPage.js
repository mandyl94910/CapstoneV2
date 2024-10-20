import React, { useEffect, useState } from "react";
import ShippingMethod from "../../components/user/checkout/shipping/Method";
import OrderSummary from "../../components/user/checkout/OrderSummary";
import { useRouter } from "next/router";
import CheckoutNav from "../../components/user/checkout/CheckoutNav";
import ReturnButton from "../../components/user/checkout/button/ReturnButton";
import SubmitButton from "../../components/user/checkout/button/SubmitButton";
import Image from "next/image";
import UserInfo from "../../components/user/checkout/UserInfo";
import PaymentForm from "../../components/user/checkout/PaymentForm"; // Import PaymentForm
import { Elements } from "@stripe/react-stripe-js"; // Import Elements from Stripe
import { loadStripe } from "@stripe/stripe-js"; // Import Stripe library

const stripePromise = loadStripe(
  "pk_test_51QBpyuCdc6M7JQRmFrFgrt1YCO0hrVm9kz3upoRGO9nF95lsrQubHW2pjyU7Z85QwtcyV4A7c2wuemnjHlxsSPbS00RcBMChwy"
); // Load Stripe publishable key

const ShippingPage = () => {
  const [formData, setFormData] = useState({}); // State to hold user information
  const [cart, setCart] = useState([]); // State to hold cart items
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(""); // State to hold selected shipping method

  const router = useRouter(); // Hook to handle routing

  // Load user information and cart items from localStorage when the component mounts
  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedFormData) setFormData(storedFormData); // Set user information if available
    setCart(cartItems); // Set cart items from localStorage
  }, []);

  // Function to handle payment success
  const handlePaymentSuccess = (paymentMethod) => {
    console.log("Payment Method:", paymentMethod); // Log the payment method
    alert("Payment was successful! Thank you for your order."); // Alert for successful payment
    // Additional logic can be added here (e.g., redirect to a success page)
  };

  // Function to handle the action of returning to the information page
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

        {/* Shipping Info */}
        <UserInfo formData={formData} />

        {/* Shipping method selection */}
        <ShippingMethod
          selectedMethod={selectedShippingMethod}
          setSelectedMethod={setSelectedShippingMethod}
        />

        {/* Payment Form wrapped in Elements */}
        <Elements stripe={stripePromise}>
          <PaymentForm onPaymentSuccess={handlePaymentSuccess} />
        </Elements>

        {/* Return and Confirm buttons */}
        <div className="flex justify-between mt-8">
          <ReturnButton onClick={handleReturn} label="Return to information" />
          <SubmitButton
            label="Confirm"
            onClick={() => {
              // Additional payment processing logic can be added here.
            }}
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
