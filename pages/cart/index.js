// CartPage.js
// import React, { useState, useEffect } from 'react';
// import Header from '../../components/common/Header';
// import Footer from '../../components/common/Footer';
// import { FaTrash } from 'react-icons/fa';

// export default function CartPage() {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
//     setCart(cartItems); // 从localStorage中获取购物车数据
//   }, []);

//   // Increase product quantity
//   const handleIncrease = () => {
//     setQuantity(prevQuantity => prevQuantity + 1);
//   };

//   // Decrease product quantity
//   const handleDecrease = () => {
//     if (quantity > 1) {
//       setQuantity(prevQuantity => prevQuantity - 1);
//     }
//   };

//   const handleRemoveProduct = (id) => {
//     const updatedCart = cart.filter((item) => item.id !== id);
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart)); // 更新localStorage中的购物车数据
//   };

//   const calculateTotalPrice = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <div>
//       <Header/>

//       <div className="container mx-auto mt-8 px-6">
//         <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
//         <div className="bg-white p-4 shadow rounded-lg">
//           {cart.length === 0 ? (
//             <p>Your cart is empty</p>
//           ) : (
//             <>
//               {cart.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between mb-4">
//                   <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
//                   <div className="flex-1 px-4">
//                     <h2 className="font-semibold">{item.name}</h2>
//                     <p>{item.description}</p>
//                     {/* <div className="flex items-center">
//                       <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
//                       <p className="mx-2">{item.quantity}</p>
//                       <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
//                     </div> */}
//                     <div className="flex items-center mb-4">
//                       <button
//                         onClick={handleDecrease}
//                         className="h-12 bg-gray-300 text-gray-800 px-6 rounded-l-lg text-3xl"
//                         disabled={quantity <= 1}  // Disable decrease button if quantity is 1
//                       >
//                         -
//                       </button>
//                       <input
//                         type="text"
//                         value={quantity}
//                         onChange={handleInputChange}
//                         onBlur={handleBlur}
//                         className="w-full h-12 text-center border-2 border-gray-300"
//                       />
//                       <button
//                         onClick={handleIncrease}
//                         className="h-12 bg-gray-300 text-gray-800 px-6 rounded-r-lg text-3xl"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
//                   <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
//                   <button onClick={() => handleRemoveProduct(item.id)} 
//                   className="text-red-500 hover:text-red-600 px-6">
//                     <FaTrash />
//                   </button>
//                 </div>
//               ))}

//               <div className="flex justify-between mt-4">
//                 <p className="font-bold">Total:</p>
//                 <p className="font-bold">${calculateTotalPrice().toFixed(2)}</p>
//               </div>

//               <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded-lg">Proceed to Checkout</button>
//             </>
//           )}
//         </div>
//       </div>

//       <Footer/>
//     </div>

//   );
// }


import React, { useState, useEffect } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { FaTrash } from 'react-icons/fa';

export default function CartPage() {
  const [cart, setCart] = useState([]);

  // 从localStorage中获取购物车数据
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);
  }, []);

  // 更新购物车数据到localStorage
  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // 修改产品数量
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return; // 防止数量小于1
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    updateCart(updatedCart); // 更新购物车和localStorage
  };

  // 移除产品
  const handleRemoveProduct = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateCart(updatedCart); // 更新购物车和localStorage
  };

  // 计算总价格
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div>
      <Header />

      <div className="container mx-auto mt-8 px-6">
        <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
        <div className="bg-white p-4 shadow rounded-lg">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div key={index} className="flex items-center justify-between mb-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
                  <div className="flex-1 px-4">
                    <h2 className="font-semibold">{item.name}</h2>
                    <p>{item.description}</p>

                    {/* 数量操作 */}
                    <div className="flex items-center mb-4">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-12 h-12 border-2 border-gray-300 text-gray-800 rounded-l-lg text-3xl"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="w-12 h-12 text-center border-2 border-gray-300"
                      />
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-12 h-12 border-2 border-gray-300 text-gray-800 rounded-r-lg text-3xl"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {/* 移除按钮 */}
                  <button
                    onClick={() => handleRemoveProduct(item.id)}
                    className="text-gray-500 hover:text-red-600 px-16"
                  ><FaTrash />
                  </button>
                  {/* 显示总价 */}
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}

              {/* 总价格和结账按钮 */}
              <div className="flex justify-between mt-4">
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