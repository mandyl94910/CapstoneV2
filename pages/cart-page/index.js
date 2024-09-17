import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const CartPage = () => {
  const { cartItems } = useContext(CartContext);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <main>
      <Header />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4 mb-4">
                <img src={`/products/${item.image}`} alt={item.name} className="w-24 h-24 object-cover" />
                <div className="flex-grow pl-4">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p>{item.description}</p>
                </div>
                <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="text-right">
              <h2 className="text-2xl font-bold">Total: ${getTotalPrice()}</h2>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default CartPage;
