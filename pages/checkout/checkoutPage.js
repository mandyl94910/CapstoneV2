import React, { useEffect, useState } from "react";
import ContactForm from "../../components/user/checkout/ContactForm";
import AddressForm from "../../components/user/checkout/AddressForm";
import OrderSummary from "../../components/user/checkout/OrderSummary";
import Image from "next/image";
import CheckoutNav from "../../components/user/checkout/CheckoutNav";
import { useRouter } from "next/router"; // Importing useRouter hook

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    street: "",
    city: "",
    province: "",
    postal: "",
    country: "Canada",
    is_default: false,
  });

  const [cart, setCart] = useState([]); // State to store cart items
  const router = useRouter(); // Defining the useRouter hook for navigation

  // useEffect to remove formData from localStorage and load cart data on page load
  useEffect(() => {
    // Remove formData from localStorage on page refresh
    localStorage.removeItem("formData");

    // Get cart data from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);

    // Keep form data in its initial state
  }, []);

  // Function to handle form submission
  const handleSubmit = () => {
    // Save form data to localStorage
    localStorage.setItem("formData", JSON.stringify(formData));
    console.log("Form Data Submitted: ", formData);
    // Navigate to ShippingPage
    router.push("/checkout/shippingPage");
  };

  // Function to handle cancel action
  const handleCancel = () => {
    console.log("Canceled");
  };

  // Function to navigate to cart page when the 'Return to cart' button is clicked
  const handleReturnToCart = () => {
    router.push("/cart"); // Navigate to the cart page
  };

  // Function to handle login action (triggered by the login button in the form)
  const handleLogin = () => {
    console.log("Login clicked");
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

        {/* Contact Form */}
        <ContactForm handleLogin={handleLogin} />

        {/* Shipping Address Form */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
          <AddressForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            onCancel={handleCancel}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="border p-6 rounded-lg shadow-md bg-white sticky top-6">
        {/* Order Summary Component */}
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
};

export default CheckoutPage;
