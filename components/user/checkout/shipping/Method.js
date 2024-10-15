import React from "react";

const Method = ({ selectedMethod, setSelectedMethod }) => {
  const shippingOptions = [
    { id: "UPS", label: "UPS", price: 0 },
    { id: "Canada Post", label: "Canada Post", price: 0 },
    { id: "Fedex", label: "Fedex", price: 0 },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Shipping Method</h2>
      <div>
        {shippingOptions.map((option) => (
          <div
            key={option.id}
            className={`flex justify-between items-center p-4 mb-2 border rounded-lg cursor-pointer ${
              selectedMethod === option.id ? "border-black" : "border-gray-300"
            }`}
            onClick={() => setSelectedMethod(option.id)} // 클릭 이벤트를 div에 적용
          >
            <div className="flex items-center">
              <input
                type="radio"
                id={option.id}
                name="shippingMethod"
                value={option.id}
                checked={selectedMethod === option.id}
                onChange={() => setSelectedMethod(option.id)}
                className="mr-3 cursor-pointer"
              />
              <label htmlFor={option.id} className="text-lg cursor-pointer">
                {option.label}
              </label>
            </div>
            <span className="text-lg font-semibold">
              ${option.price.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Method;
