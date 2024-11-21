import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../hooks/useAuth";
import SearchBar from "../common/SearchBar";
import { useRouter } from "next/router";
import { FaCartShopping } from "react-icons/fa6";

const buttonStyles = `
  inline-block rounded-lg border-transparent px-4 py-2 text-center border border-blue-100 
  hover:bg-blue-500 hover:border-black hover:ring-1 hover:ring-black
`;

function Header() {
  const { user, onLogout } = useAuth();
  const router = useRouter();
  const [cartQuantity, setCartQuantity] = useState(0);

  // Fetch cart data from localStorage when header is mounted
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cartItems.reduce((sum, item) => sum + 1, 0);
    setCartQuantity(totalQuantity);
  }, []);

  const handleCartClick = () => {
    if (router.pathname === "/cart") {
      window.location.reload();
    } else {
      router.push("/cart");
    }
  };

  return (
    <header className="bg-white py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-6 pl-4">
        <Link href="/">
          <div
            className="relative cursor-pointer flex items-center"
            style={{ height: "52px", width: "165px" }}
          >
            <Image
              src="/new-logo.png"
              alt="Logo"
              width={170}
              height={55}
              style={{ objectFit: "cover" }}
              priority
            />
          </div>
        </Link>
        <nav className="flex space-x-6">
          <Link href="/all-products?categoryId=1" className={buttonStyles}>
            All Products
          </Link>
        </nav>
      </div>
      <div className="flex items-center space-x-8 pr-4">
        <SearchBar />
        <div className="relative" style={{ marginLeft: "-50px" }}>
          <FaCartShopping
            className="text-2xl cursor-pointer hover:text-blue-600 text-gray-700"
            onClick={handleCartClick}
          />
          {cartQuantity > 0 && (
            <span className="absolute -top-2 -right-2 bg-blue-600 border-white border-2 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartQuantity}
            </span>
          )}
        </div>
        {user ? (
          <div className="flex items-center space-x-4">
            <Link href="/user-profile">
              <div className="hover:underline hover:text-blue-600 text-blue-600">
                Welcome, {user.customer_name}
              </div>
            </Link>
            <Link href="/user-profile">
              <img
                className="min-w-10 h-10 rounded-full hover:opacity-80 transition-opacity duration-300"
                src="/images/user/user.webp"
                alt="User Profile"
              />
            </Link>
            <button
              className="bg-blue-10 px-4 py-2 border border-black rounded-lg text-sm w-24 hover:text-orange-400 hover:bg-orange-200 hover:bg-transparent hover:ring-1 hover:ring-black"
              onClick={onLogout}
            >
              Log out
            </button>
          </div>
        ) : (
          <Link href="/login">
            <button className={buttonStyles}>LOG IN</button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
