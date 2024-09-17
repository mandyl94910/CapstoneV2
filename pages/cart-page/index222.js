

import React, { useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Category 1', description: 'Description of first Category', price: 1922.99, quantity: 1, image: '/path-to-image1.jpg' },
    { id: 2, name: 'Category 2', description: 'Description of second Category', price: 1233.99, quantity: 1, image: '/path-to-image2.jpg' },
    { id: 3, name: 'Category 3', description: 'Description of third Category', price: 21.99, quantity: 1, image: '/path-to-image3.jpg' },
  ]);

  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      {/* 购物车项 */}
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between border-b pb-4 mb-4"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover"
          />
          <div className="flex-grow pl-4">
            <h2 className="text-lg font-bold">{item.name}</h2>
            <p className="text-gray-500">{item.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => decreaseQuantity(item.id)}
              className="bg-gray-300 p-1 rounded"
            >
              -
            </button>
            <input
              type="text"
              value={item.quantity}
              readOnly
              className="w-10 text-center border"
            />
            <button
              onClick={() => increaseQuantity(item.id)}
              className="bg-gray-300 p-1 rounded"
            >
              +
            </button>
          </div>
          <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 ml-4"
          >
            &#10006;
          </button>
        </div>
      ))}

      {/* 小计和结账按钮 */}
      <div className="text-right mb-6">
        <p className="text-2xl font-bold">
          Subtotal ({cartItems.length} items): ${getTotalPrice()}
        </p>
        <button className="bg-purple-600 text-white py-2 px-4 rounded mt-4">
          Proceed to Checkout
        </button>
      </div>

      {/* 推荐商品 */}
      <h2 className="text-2xl font-bold mb-4">Customers who shopped for similar items also shopped for:</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div className="border rounded-lg shadow-md p-4">
          <img
            src="/path-to-recommended-product1.jpg"
            alt="Recommended Product 1"
            className="w-full h-40 object-cover mb-4"
          />
          <h3 className="text-lg font-bold">Product 1</h3>
          <p className="text-gray-500">Body text for first product</p>
          <p className="text-xl font-bold">$10.99</p>
        </div>
        <div className="border rounded-lg shadow-md p-4">
          <img
            src="/path-to-recommended-product2.jpg"
            alt="Recommended Product 2"
            className="w-full h-40 object-cover mb-4"
          />
          <h3 className="text-lg font-bold">Product 2</h3>
          <p className="text-gray-500">Body text for second product</p>
          <p className="text-xl font-bold">$10.99</p>
        </div>
        <div className="border rounded-lg shadow-md p-4">
          <img
            src="/path-to-recommended-product3.jpg"
            alt="Recommended Product 3"
            className="w-full h-40 object-cover mb-4"
          />
          <h3 className="text-lg font-bold">Product 3</h3>
          <p className="text-gray-500">Body text for third product</p>
          <p className="text-xl font-bold">$10.99</p>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
