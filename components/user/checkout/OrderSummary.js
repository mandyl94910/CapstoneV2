// OrderSummary.js
import React from "react";
import taxRates from "./addressForm/taxRates"; // Import tax rates based on provinces

const OrderSummary = ({ cart, province }) => {
  // Function to calculate total price based on cart items
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Function to calculate taxes based on the total price and selected province
  const calculateTaxes = (totalPrice, province) => {
    const taxRate = taxRates[province] || 0.05; // Default tax rate is 5%
    return totalPrice * taxRate;
  };

  const totalPrice = calculateTotalPrice(); // Calculate total price
  const taxes = calculateTaxes(totalPrice, province); // Calculate taxes

  return (
    <div className="mt-8">
      <h2 className="text-2xl mb-2 font-bold">Order Summary</h2>
      <div className="border p-4 rounded-lg bg-gray-50">
        {cart.map((item, index) => (
          <div key={index} className="flex items-center mb-4">
            {/* Product image */}
            <img
              src={`/images/${item.image}`} // Adjust image path as needed
              alt={item.product_name}
              className="w-16 h-16 object-cover rounded-lg mr-4"
            />
            <div className="flex-grow">
              <p className="font-semibold">{item.product_name}</p>
              <p className="text-sm text-gray-500">
                {item.description ? item.description : "Product description"}
              </p>
            </div>
            <div>
              <p>Quantity: {item.quantity}</p>
              <p className="font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        ))}

        {/* Input for discount code and total calculation */}
        <div className="mt-4 flex items-center">
          <input
            type="text"
            className="border rounded-lg px-4 py-3 flex-grow focus:border-slate-500 focus:outline-none"
            placeholder="Discount code or gift card"
          />
          <button className="bg-indigo-300 text-sm px-4 py-3 ml-2 rounded-lg hover:bg-indigo-500 focus:border-blue-700 focus:outline-none">
            Apply
          </button>
        </div>

        {/* Subtotal, shipping, and estimated taxes */}
        <div className="mt-6">
          <div className="flex justify-between">
            <p className="text-gray-500">Subtotal</p>
            <p>${totalPrice.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Shipping</p>
            <p className="text-gray-500">Calculated at next step</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Estimated taxes</p>
            <p className="text-gray-500">${taxes.toFixed(2)}</p>
          </div>
        </div>

        {/* Display total (subtotal + taxes) */}
        <div className="mt-6 flex justify-between items-center text-lg font-bold">
          <p>Total</p>
          <p className="text-xl">CAD ${(totalPrice + taxes).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
