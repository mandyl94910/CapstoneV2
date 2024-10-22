import React, { useEffect, useState, useRef } from "react";
import ShippingMethod from "../../components/user/checkout/shipping/Method";
import OrderSummary from "../../components/user/checkout/OrderSummary";
import { useRouter } from "next/router";
import CheckoutNav from "../../components/user/checkout/CheckoutNav";
import ReturnButton from "../../components/user/checkout/button/ReturnButton";
import Image from "next/image";
import UserInfo from "../../components/user/checkout/UserInfo";
import PaymentForm from "../../components/user/checkout/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Initialize Stripe with the publishable key
const stripePromise = loadStripe(
  "pk_test_51QBpyuCdc6M7JQRmFrFgrt1YCO0hrVm9kz3upoRGO9nF95lsrQubHW2pjyU7Z85QwtcyV4A7c2wuemnjHlxsSPbS00RcBMChwy"
);

const ShippingPage = () => {
  // State management for various data used in the component
  const [clientSecret, setClientSecret] = useState(""); // Stripe client secret
  const [formData, setFormData] = useState({}); // User form data
  const [cart, setCart] = useState([]); // Cart items
  const [selectedShippingMethod, setSelectedShippingMethod] = useState(""); // Selected shipping method
  const [subtotal, setSubtotal] = useState(0); // Subtotal before tax
  const [totalAmount, setTotalAmount] = useState(0); // Total amount including tax
  const paymentCreated = useRef(false); // Prevent duplicate PaymentIntent creation
  const TAX_RATE = 0.05; // Tax rate (5%)
  const router = useRouter(); // Router for navigation

  // Load initial data and calculate subtotal
  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    if (storedFormData) setFormData(storedFormData); // Set user form data
    setCart(cartItems); // Set cart items

    // Calculate the subtotal (before tax)
    const calculatedSubtotal = cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + price * quantity;
    }, 0);

    setSubtotal(calculatedSubtotal); // Set subtotal state
  }, []);

  // Calculate total amount including tax
  useEffect(() => {
    if (subtotal > 0) {
      const taxAmount = parseFloat((subtotal * TAX_RATE).toFixed(2)); // Calculate tax
      const total = parseFloat((subtotal + taxAmount).toFixed(2)); // Calculate total
      setTotalAmount(total); // Set total amount state
    }
  }, [subtotal]); // Recalculate when subtotal changes

  // Create a PaymentIntent (only once) to avoid duplicate requests
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/api/payment/create-payment-intent",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              amount: Math.round(totalAmount * 100), // Convert to cents for Stripe
              currency: "cad", // Set currency to CAD
            }),
          }
        );
        const data = await response.json();
        console.log("Client Secret:", data.clientSecret); // Log client secret
        setClientSecret(data.clientSecret); // Store client secret in state
      } catch (error) {
        console.error("Error creating PaymentIntent:", error); // Log errors
        paymentCreated.current = false; // Reset flag if creation fails
      }
    };

    // Ensure PaymentIntent is created only once
    if (totalAmount > 0 && !paymentCreated.current) {
      console.log("Sending request to create payment intent");
      paymentCreated.current = true; // Prevent duplicate requests
      createPaymentIntent(); // Call the function to create PaymentIntent
    }
  }, [totalAmount]); // Trigger when totalAmount changes

  // Handle successful payment
  const handlePaymentSuccess = (paymentIntent) => {
    console.log("Payment Intent:", paymentIntent); // Log successful payment
    router.push("/checkout/success"); // Navigate to success page
  };

  // Handle return to previous page
  const handleReturn = () => {
    router.push("/checkout/checkoutPage"); // Navigate back to checkout
  };

  return (
    <div className="container mx-auto lg:px-40 p-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        {/* Logo */}
        <div className="mb-4">
          <Image src="/logo.png" alt="Logo" width={165} height={52} priority />
        </div>

        {/* Checkout navigation */}
        <CheckoutNav />

        <h2 className="text-2xl font-bold mb-4">Shipping</h2>

        {/* Display user information */}
        <UserInfo formData={formData} />

        {/* Shipping method selection */}
        <ShippingMethod
          selectedMethod={selectedShippingMethod}
          setSelectedMethod={setSelectedShippingMethod}
        />

        {/* Stripe Elements for payment */}
        <Elements stripe={stripePromise}>
          {clientSecret && (
            <PaymentForm
              clientSecret={clientSecret} // Pass client secret to PaymentForm
              onPaymentSuccess={handlePaymentSuccess} // Handle successful payment
            />
          )}
        </Elements>

        {/* Return button */}
        <div className="flex justify-between mt-8">
          <ReturnButton onClick={handleReturn} label="Return to information" />
        </div>
      </div>

      {/* Order summary on the right side */}
      <div className="border p-6 rounded-lg shadow-md bg-white sticky top-6">
        <OrderSummary
          cart={cart} // Pass cart items to OrderSummary
          province={"AB"} // Province for calculation (example: Alberta)
          onTotalCalculated={setSubtotal} // Callback to set subtotal
        />
      </div>
    </div>
  );
};

export default ShippingPage;
