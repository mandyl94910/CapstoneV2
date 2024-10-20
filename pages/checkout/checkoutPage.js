//C:\proj309\CapstoneV2\pages\checkout\checkoutPage.js
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
  const { customer_id } = router.query;
  const [customerInfo, setCustomerInfo] = useState(null);
  const [addresses, setAddresses] = useState([]);

  // useEffect to remove formData from localStorage and load cart data on page load
  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    if (storedFormData) {
      setFormData(storedFormData); // If formData exists in localStorage, set it
    }

    // Get cart data from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);

    if (customer_id) {
      fetchCustomerInfo(customer_id);
    }
  }, [customer_id]);

  // Function to fetch customer information using customer_id
  const fetchCustomerInfo = async (customer_id) => {
    try {
      const [userResponse, addressResponse] = await Promise.all([
        fetch(`http://localhost:3001/api/getUser?customer_id=${customer_id}`, {
          method: 'GET',
          credentials: 'include'  // 确保传递 Cookies
        }),
        fetch(`http://localhost:3001/api/addresses/${customer_id}`, {
          method: 'GET',
          credentials: 'include'
        })
      ]);
      if (!userResponse.ok || !addressResponse.ok) {
        throw new Error('Failed to fetch customer data');
      }
      // 获取用户信息和地址信息
      const userData = await userResponse.json();
      const addressData = await addressResponse.json();
      setCustomerInfo(userData);  // 存储用户信息
      setAddresses(addressData);
      console.log("Customer info loaded:", {addressData});

      // can set the default address here
      // if (addressData.length > 0) {
      //   const address = addressData[0]; // 假设只使用第一个地址
      //   setFormData((prevFormData) => ({
      //     ...prevFormData,
      //     phone: userData.phone,
      //     first_name: address.first_name,
      //     last_name: address.last_name,
      //     street: address.street,
      //     city: address.city,
      //     province: address.province,
      //     postal: address.postal,
      //     country: address.country,
      //     address_Id: address.id
      //   }));
      // }
    } catch (error) {
      console.error("Error loading customer information:", error);
    }
  };

  // Function to handle form submission
  const handleSubmit = () => {
    // Save form data to localStorage
    localStorage.setItem("formData", JSON.stringify(formData));
    localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
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
        {customerInfo ? (
          <div className="p-4 rounded-md">
            <h3 className="text-xl font-semibold">
              Thank you for shopping, {customerInfo.customer_name}!
            </h3>
          </div>
        ) : (
          <ContactForm handleLogin={handleLogin} />
        )}

        {/* Shipping Address Form */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
          <AddressForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            onCancel={handleCancel}
            addresses={addresses}
            customerInfo={customerInfo}
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
