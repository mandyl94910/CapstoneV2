import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../hooks/useAuth";
import SearchBar from "../common/SearchBar";
import { useRouter } from "next/router";
import { FaCartShopping } from "react-icons/fa6";

function Header() {
  const { user, onLogout } = useAuth();
  const router = useRouter();
  const [cartQuantity, setCartQuantity] = useState(0);

  /**
   * helped by chatGPT
   * prompt: how can I display the number of item in shopping cart to a badge of the cart icon on header
   */
  // Fetch cart data from localStorage when header is mounted
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    // Calculate the total quantity of products in the cart
    const totalQuantity = cartItems.reduce((sum, item) => sum + 1, 0);
    setCartQuantity(totalQuantity);
  }, []);

  const handleCartClick = () => {
    // if already on the cart page, refresh the page
    if (router.pathname === "/cart") {
      window.location.reload();
    } else {
      // otherwise, navigate to the cart page
      router.push("/cart");
    }
  };

  return (
    <header className="bg-white py-4 flex justify-between items-center shadow-md">
      <nav className="flex space-x-6 pl-16 ">
        {" "}
        {/* Increase space between the links */}
        <Link href="/admin-dashboard" className="hover:text-blue-600">
          admin dashboard
        </Link>
        <Link
          href="/all-products?categoryId=1"
          /**
           * helped by chatGPT
           * prompt: how can i keep the "All Products" show selected state when choosen
           */
          className={`${
            router.pathname === "/all-products"
              ? "text-blue-600"
              : "hover:text-blue-600"
          }`}
        >
          All Products
        </Link>
        <Link href="#">Tap</Link>
        <Link href="#">Tap</Link>
      </nav>
      <Link href="/">
        <div
          className=" relative mx-8 cursor-pointer"
          // set the container size
          style={{ height: "52px", width: "165px" }}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            // image size
            width={165}
            height={52}
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </Link>
      <div className="flex items-center space-x-8">
        {" "}
        {/* Increase space between elements */}
        <div className="relative">
          <SearchBar />
        </div>
        <div className="relative">
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
          <div className="flex items-center space-x-4 pr-16">
            <Link href="/user-profile">
              <div className="hover:underline hover:text-blue-600 text-blue-600">
                Welcome, {user.customer_name}
              </div>
            </Link>

            {/* User Profile */}
            <Link href="/user-profile">
              <img
                className="min-w-10 h-10 rounded-full hover:opacity-80 transition-opacity duration-300"
                src="/images/user/user.webp" //hardcode path for testing
                // src={`/images/${user.image}`}      //retrieve from database
                alt="User Profile"
              />
            </Link>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-red-600 text-sm w-24"
              onClick={onLogout}
            >
              Log Out
            </button>
          </div>
        ) : (
          <Link href="/login" className="pr-16">
            <button className="bg-blue-600 text-white rounded-lg px-4 py-2 font-medium hover:bg-blue-700  w-24">
              LOG IN
            </button>
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
