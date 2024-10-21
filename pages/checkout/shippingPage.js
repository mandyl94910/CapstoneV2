import React, { useEffect, useState } from "react";
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

const stripePromise = loadStripe(
  "pk_test_51QBpyuCdc6M7JQRmFrFgrt1YCO0hrVm9kz3upoRGO9nF95lsrQubHW2pjyU7Z85QwtcyV4A7c2wuemnjHlxsSPbS00RcBMChwy"
);

const ShippingPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [formData, setFormData] = useState({});
  const [cart, setCart] = useState([]);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [totalAmount, setTotalAmount] = useState(0); // 총 결제 금액 상태
  const [isTaxIncluded, setIsTaxIncluded] = useState(false); // 세금 포함 여부

  const router = useRouter();

  useEffect(() => {
    const storedFormData = JSON.parse(localStorage.getItem("formData"));
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    if (storedFormData) setFormData(storedFormData);
    setCart(cartItems);

    // 총 금액 계산
    const calculatedTotal = cartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity) || 0;
      return total + price * quantity;
    }, 0);

    setTotalAmount(calculatedTotal); // 총 금액 설정
  }, []);

  // 세금 계산 후 총 금액 업데이트
  useEffect(() => {
    if (totalAmount > 0 && !isTaxIncluded) {
      const taxAmount = totalAmount * 0.05; // 예: 5% 세금
      setTotalAmount(totalAmount + taxAmount); // 세금 포함 총 금액
      setIsTaxIncluded(true); // 세금이 포함되었음을 표시
    }
  }, [totalAmount, isTaxIncluded]);

  // Payment Intent 생성
  useEffect(() => {
    if (totalAmount > 0) {
      console.log("Sending request to create payment intent"); // 요청 발생 시점 확인
      fetch("http://localhost:3001/api/payment/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(totalAmount * 100),
          currency: "cad",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Client Secret:", data.clientSecret); // 클라이언트 시크릿 확인
          setClientSecret(data.clientSecret);
        })
        .catch((error) =>
          console.error("Error fetching client secret:", error)
        );
    }
  }, [totalAmount]);

  const handlePaymentSuccess = (paymentIntent) => {
    console.log("Payment Intent:", paymentIntent);
    alert("Payment was successful! Thank you for your order.");
    router.push("/checkout/success");
  };

  const handleReturn = () => {
    router.push("/checkout/checkoutPage");
  };

  return (
    <div className="container mx-auto lg:px-40 p-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <div>
        <div className="mb-4">
          <Image src="/logo.png" alt="Logo" width={165} height={52} priority />
        </div>

        <CheckoutNav />

        <h2 className="text-2xl font-bold mb-4">Shipping</h2>

        <UserInfo formData={formData} />

        <ShippingMethod
          selectedMethod={selectedShippingMethod}
          setSelectedMethod={setSelectedShippingMethod}
        />

        <Elements stripe={stripePromise}>
          {clientSecret && (
            <PaymentForm
              clientSecret={clientSecret}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}
        </Elements>

        <div className="flex justify-between mt-8">
          <ReturnButton onClick={handleReturn} label="Return to information" />
        </div>
      </div>

      <div className="border p-6 rounded-lg shadow-md bg-white sticky top-6">
        <OrderSummary
          cart={cart}
          province={"AB"}
          onTotalCalculated={setTotalAmount} // 총 금액 전달
        />
      </div>
    </div>
  );
};

export default ShippingPage;
