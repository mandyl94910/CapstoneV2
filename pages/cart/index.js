import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import CategoryHomeGrid from '../../components/homepage/CategoryHomeGrid';
import { FaTrash } from 'react-icons/fa';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import Link from 'next/link';

/**
 * helped by chatGPT
 * prompt: How can I use to restore items that I want to put to shopping cart and display them in the page
 * 
 */
export default function CartPage() {
  const [cart, setCart] = useState([]);

  // read cart data from localStorage
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
  }, []);

  // update cart items and localStorage
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  

  // when user click minus or plus for an item
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; 
    const updatedCart = cart.map((item) =>
      item.product_id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart); // update localStorage
  };

  // remove item from cart
  const handleRemoveProduct = (id) => {
    const updatedCart = cart.filter((item) => item.product_id !== id);
    updateCart(updatedCart); // update cart and localStorage
  };

  // calculate the total price of items in shopping cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto my-8 px-16">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="bg-white p-6 border shadow-md rounded-lg">
          {cart.length === 0 ? (
            <div className='py-12 text-center'>
              <p className='text-xl font-bold mb-12'>Your cart is empty. Explore now.</p>
              <CategoryHomeGrid />
            </div>
          ) : (
            <>
              {cart.map((item, index) => (
                <>
                  <div key={index} className="flex items-center justify-between mb-6">
                    <div className='flex items-center'>
                      <Link  href={`/product/${item.product_id}`}>
                        <img src={`/images/${item.image}`} alt={item.product_name} className="w-24 h-24 rounded" />
                      </Link>
                      <div className="flex flex-col px-4">
                        <h2 className="font-semibold">{item.product_name}</h2>
                        <p className='text-gray-500 mb-2'>{item.product_description}</p>
                      </div>
                    </div>

                    
                    <div className='flex justify-between items-center w-64'>
                      {/* set quantity */}
                      <div className="flex items-center">
                        <button
                          onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                          className={`h-8 px-2 ${item.quantity <= 1? ("text-gray-300"):("text-gray-800")} border-2 border-gray-300 rounded-l-lg`}
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus/>
                        </button>
                        <input
                          type="text"
                          value={item.quantity}
                          readOnly
                          className="w-8 h-8 text-center border-y-2 border-gray-300"
                        />
                        <button
                          onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                          className="h-8 px-2 border-2 border-gray-300 text-gray-800 rounded-r-lg"
                        >
                          <FaPlus/>
                        </button>
                      </div>
                      {/* remove button */}
                      <button
                        onClick={() => handleRemoveProduct(item.product_id)}
                        className="text-gray-500 hover:text-red-600"
                      ><FaTrash />
                      </button>
                      {/* total price for one item */}
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                  <hr className='mb-4'/>
                </>

                
              ))}

              {/* total price for the cart and checkout */}
              <div className="flex justify-end mt-4  space-x-2">
                <p className="font-bold">Total:</p>
                <p className="font-bold">${calculateTotalPrice().toFixed(2)}</p>
              </div>

              <div className='flex justify-end'>
                <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg">
                  Proceed to Checkout
                </button>
              </div>
                
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
