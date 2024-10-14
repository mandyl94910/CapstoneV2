import React, { useEffect, useState } from "react";
import ContactForm from "../../components/user/checkout/ContactForm"; // 컴포넌트로 사용
import PaymentMethods from "../../components/user/checkout/PaymentMethods";
import AddressForm from "../../components/user/checkout/AddressForm"; // 예시 경로
import OrderSummary from "../../components/user/checkout/OrderSummary";
import Image from "next/image";
import CheckoutNav from "../../components/user/checkout/CheckoutNav";

// 로고 경로 설정
const LOGO_SRC = "/logo.png";

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

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartItems);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
  };

  const handleCancel = () => {
    console.log("Canceled");
  };

  // 로그인 버튼 클릭 시 동작할 함수
  const handleLogin = () => {
    console.log("Login clicked");
  };

  return (
    <div className="container mx-auto lg:px-40 p-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left Section */}
      <div>
        {/* 사이트 로고 */}
        <div className="mb-4">
          <Image
            src="/logo.png"
            alt="로고"
            width={165} // 너비 지정
            height={52} // 높이도 같이 지정
            priority
          />
        </div>

        {/* 네비게이션 바 */}
        <CheckoutNav />

        {/* Express Checkout */}
        <PaymentMethods />

        {/* Contact Form 사용 */}
        <ContactForm handleLogin={handleLogin} />

        {/* Shipping Address */}
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
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
};

export default CheckoutPage;
