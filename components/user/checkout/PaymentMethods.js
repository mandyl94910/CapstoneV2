import React from "react";

const PaymentMethods = () => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl mb-2">Express Checkout</h2>
      <div className="flex space-x-3">
        <button className="bg-purple-600 text-white px-4 py-2 rounded">
          Stripe
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">
          PayPal
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;
