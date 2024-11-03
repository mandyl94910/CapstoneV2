import React, { useEffect, useState } from "react";
import ContactForm from "../../components/user/checkout/ContactForm";
import AddressForm from "../../components/user/checkout/AddressForm";
import OrderSummary from "../../components/user/checkout/OrderSummary";
import Image from "next/image";
import CheckoutNav from "../../components/user/checkout/CheckoutNav";
import { useRouter } from "next/router";

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
  const [totalAmount, setTotalAmount] = useState(0);
  const router = useRouter();
  const { customer_id } = router.query;
  const [customerInfo, setCustomerInfo] = useState(null);
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    console.log("customer id is :", customer_id);

    if (storedFormData) {
      setFormData(storedFormData); // If formData exists in localStorage, set it
    }

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);

    const storedCustomerInfo = JSON.parse(localStorage.getItem("customerInfo"));
    const storedAddresses = JSON.parse(localStorage.getItem("addresses"));

    if (storedCustomerInfo) {
      setCustomerInfo(storedCustomerInfo); // 如果 `customerInfo` 已经存在于 `localStorage` 中，则设置
    } else if (customer_id) {
      fetchCustomerInfo(customer_id); // 如果没有存储 `customerInfo`，则调用 `fetchCustomerInfo`
    }
    if (storedAddresses) {
      setAddresses(storedAddresses);
    } else if (customer_id) {
      fetchCustomerInfo(customer_id);
    }
  }, [customer_id]);

  // Function to fetch customer information using customer_id
  const fetchCustomerInfo = async (customer_id) => {
    try {
      const [userResponse, addressResponse] = await Promise.all([
        fetch(`http://localhost:3001/api/getUser?customer_id=${customer_id}`, {
          method: "GET",
          credentials: "include", // 确保传递 Cookies
        }),
        fetch(`http://localhost:3001/api/addresses/${customer_id}`, {
          method: "GET",
          credentials: "include",
        }),
      ]);
      if (!userResponse.ok || !addressResponse.ok) {
        throw new Error("Failed to fetch customer data");
      }
      // 获取用户信息和地址信息
      const userData = await userResponse.json();
      const addressData = await addressResponse.json();
      if (userData && addressData) {
        setCustomerInfo(userData);
        setAddresses(addressData);
        localStorage.setItem("customerInfo", JSON.stringify(userData));
        localStorage.setItem("addresses", JSON.stringify(addressData));
        console.log("Customer info and addresses loaded:", {
          userData,
          addressData,
        });
      } else {
        console.warn("Received empty data:", { userData, addressData });
      }
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

  const handleTotalCalculated = (amount) => {
    setTotalAmount(amount);
    console.log("Total Amount Calculated:", amount);
  };

  const handleSubmit = () => {
    localStorage.setItem("formData", JSON.stringify(formData));
    console.log("Form Data Submitted: ", formData);
    router.push("/checkout/shippingPage");
  };

  const handleCancel = () => {
    console.log("Canceled");
  };

  const handleLogin = () => {
    console.log("Login clicked");
  };

  return (
    <div className="container mx-auto lg:px-40 p-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <div className="mb-4">
          <Image src="/logo.png" alt="Logo" width={165} height={52} priority />
        </div>

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

      <div className="border p-6 rounded-lg shadow-md bg-white sticky top-6">
        <OrderSummary cart={cart} onTotalCalculated={handleTotalCalculated} />{" "}
      </div>
    </div>
  );
};

export default CheckoutPage;
