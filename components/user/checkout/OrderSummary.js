import React from "react";

const OrderSummary = ({ cart }) => {
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl mb-2 font-bold">Order Summary</h2>
      <div className="border p-4 rounded bg-gray-50">
        {cart.map((item, index) => (
          <div key={index} className="flex items-center mb-4">
            {/* 상품 이미지 */}
            <img
              src={`/images/${item.image}`} // 이미지 경로는 실제 파일 경로로 수정
              alt={item.product_name}
              className="w-16 h-16 object-cover rounded mr-4"
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

        {/* 할인 코드 입력 및 총합 계산 */}
        <div className="mt-4 flex items-center">
          <input
            type="text"
            className="border px-2 py-1 rounded flex-grow"
            placeholder="Discount code or gift card"
          />
          <button className="bg-indigo-300 text-sm px-4 py-2 ml-2 rounded hover:bg-indigo-500">
            Apply
          </button>
        </div>

        <div className="mt-6">
          <div className="flex justify-between">
            <p className="text-gray-500">Subtotal</p>
            <p>${calculateTotalPrice().toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Shipping</p>
            <p className="text-gray-500">Calculated at next step</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Estimated taxes</p>
            <p className="text-gray-500">$12.50</p>
          </div>
        </div>

        <div className="mt-6 flex justify-between items-center text-lg font-bold">
          <p>Total</p>
          <p className="text-xl">
            CAD ${(calculateTotalPrice() + 12.5).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
