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
  const [totalAmount, setTotalAmount] = useState(0); // 총 금액 상태 추가
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("formData");

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
  }, []);

  const handleTotalCalculated = (amount) => {
    setTotalAmount(amount); // 총 금액을 상태로 저장
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

        <ContactForm handleLogin={handleLogin} />

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

      <div className="border p-6 rounded-lg shadow-md bg-white sticky top-6">
        <OrderSummary cart={cart} onTotalCalculated={handleTotalCalculated} />{" "}
        {/* 함수 전달 */}
      </div>
    </div>
  );
};

export default CheckoutPage;
