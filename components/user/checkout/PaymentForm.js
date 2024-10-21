import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = ({ clientSecret, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태 추가

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // 요청할 때 오류 메시지 초기화

    if (!stripe || !elements) {
      setLoading(false); // Stripe가 로드되지 않았을 때 로딩 상태 해제
      return;
    }

    const cardElement = elements.getElement(CardElement);

    // PaymentIntent 확인 및 결제 처리
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      console.error("Payment failed:", error);
      setErrorMessage(error.message); // 오류 메시지 업데이트
    } else if (paymentIntent.status === "succeeded") {
      console.log("Payment succeeded:", paymentIntent);
      alert("Payment was successful! Thank you.");
      onPaymentSuccess(paymentIntent); // 결제 성공 시 콜백 호출
    }

    setLoading(false); // 결제 후 로딩 상태 해제
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <h1 className="text-2xl font-bold mb-6 mt-10">Payment</h1>

      <div className="flex flex-col mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#000",
              },
              invalid: {
                color: "#fa755a",
              },
            },
          }}
        />
      </div>

      {errorMessage && (
        <div className="text-red-500 mb-4">{errorMessage}</div> // 오류 메시지 표시
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
    </form>
  );
};

export default PaymentForm;
