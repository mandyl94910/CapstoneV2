import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = ({ onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js가 로드되지 않은 경우 처리
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      alert(error.message); // 오류 메시지 사용자에게 표시
    } else {
      console.log("Payment Method Created:", paymentMethod);
      onPaymentSuccess(paymentMethod); // 결제가 성공적으로 처리된 경우 호출
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      {/* Payment Heading */}
      <h1 className="text-2xl font-bold mb-6 mt-10">Payment</h1>

      <div className="flex flex-col mb-4">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#000",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              },
              invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
              },
            },
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        Pay
      </button>
    </form>
  );
};

export default PaymentForm;
