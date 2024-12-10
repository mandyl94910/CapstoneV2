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
  const [showSearch, setShowSearch] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

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

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowSearch(false);
      setIsClosing(false);
    }, 200); // 与动画持续时间匹配
  };

  const handleOverlayClick = (e) => {
    // 只有当点击的是背景层时才关闭
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-20">  {/* 减小整体容器的内边距 */}
        <div className="flex items-center justify-between h-full relative">
          {/* Left: Logo */}
          <div className="shrink-0 z-10 pl-2">  {/* 为logo添加左内边距 */}
            <Link href="/" className="block w-[165px]">
              <Image
                src="/new-logo.png"
                alt="Logo"
                width={170}
                height={55}
                className="object-cover"
                priority
              />
            </Link>
          </div>

          {/* Center: Navigation Links - Dynamic positioning based on auth state */}
          <nav className={`hidden lg:block absolute 
            ${user 
              ? "left-[280px] -translate-x-0" // 登录后的位置
              : "left-1/2 -translate-x-1/2"   // 未登录时居中
            } 
            top-1/2 -translate-y-1/2 transition-all duration-300`}
          >
            <div className="flex items-center space-x-6">
              <Link 
                href="/all-products?categoryId=1" 
                className="group relative py-2 text-base text-gray-900 font-lato tracking-wide
                  transition duration-300 ease-in-out"
              >
                <span>All products</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-600
                  transform scale-x-0 group-hover:scale-x-100
                  transition-transform duration-300 ease-in-out origin-center"
                />
              </Link>

              <Link 
                href="/all-products?categoryId=2" 
                className="group relative py-2 text-base text-gray-900 font-lato tracking-wide
                  transition duration-300 ease-in-out"
              >
                <span>Smartphones</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-600
                  transform scale-x-0 group-hover:scale-x-100
                  transition-transform duration-300 ease-in-out origin-center"
                />
              </Link>

              <Link 
                href="/all-products?categoryId=3" 
                className="group relative py-2 text-base text-gray-900 font-lato tracking-wide
                  transition duration-300 ease-in-out"
              >
                <span>Computers</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-600
                  transform scale-x-0 group-hover:scale-x-100
                  transition-transform duration-300 ease-in-out origin-center"
                />
              </Link>

              <Link 
                href="/all-products?categoryId=4" 
                className="group relative py-2 text-base text-gray-900 font-lato tracking-wide
                  transition duration-300 ease-in-out"
              >
                <span>TVs & home</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-600
                  transform scale-x-0 group-hover:scale-x-100
                  transition-transform duration-300 ease-in-out origin-center"
                />
              </Link>

              <Link 
                href="/all-products?categoryId=6" 
                className="group relative py-2 text-base text-gray-900 font-lato tracking-wide
                  transition duration-300 ease-in-out"
              >
                <span>Cameras</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-600
                  transform scale-x-0 group-hover:scale-x-100
                  transition-transform duration-300 ease-in-out origin-center"
                />
              </Link>
            </div>
          </nav>

          {/* Right: Search, Cart, User - Always show */}
          <div className={`flex items-center z-10 pr-2
            ${user 
              ? "space-x-4 md:space-x-6" // 登录后的间距
              : "space-x-3 md:space-x-4" // 未登录时的间距
            }`}
          >
            {/* Mini Search Icon - Add exit animation */}
            {!showSearch && (
              <button 
                onClick={() => setShowSearch(true)}
                className="flex items-center space-x-2 px-3 md:px-4 py-2 text-gray-900 
                  border-2 border-gray-200 rounded-full hover:border-gray-300
                  transition-all duration-300 ease-in-out group
                  animate-fadeIn" // 添加淡入动画
              >
                <svg
                  width="17"
                  height="16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                >
                  <path
                    d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                    stroke="currentColor"
                    strokeWidth="1.333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="hidden sm:inline text-sm text-gray-400 group-hover:text-gray-600">
                  Search...
                </span>
              </button>
            )}

            {user ? (
              <>
                {/* Logged in state with optimized layout */}
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <Link href="/user-profile" className="flex items-center gap-3 group">
                      <img
                        src="/images/user/user.webp"
                        alt="User Profile"
                        className="w-9 h-9 rounded-full object-cover
                          transition duration-300 group-hover:ring-2 ring-gray-300"
                      />
                      <span className="text-gray-700 font-lato group-hover:text-blue-600
                        transition duration-300 ease-in-out">
                        {user.customer_name}
                      </span>
                    </Link>
                  </div>

                  <button 
                    onClick={handleCartClick}
                    className="relative p-2 text-gray-900 hover:text-blue-600
                      transition duration-300 ease-in-out"
                  >
                    <FaCartShopping className="text-2xl" />
                    {cartQuantity > 0 && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 
                        flex items-center justify-center
                        bg-blue-600 text-white text-xs font-medium 
                        rounded-full border-2 border-white"
                      >
                        {cartQuantity}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={onLogout}
                    className="group relative py-2 text-base text-gray-900 font-lato tracking-wide
                      uppercase transition duration-300 ease-in-out"
                  >
                    <span>Log out</span>
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-600
                      transform scale-x-0 group-hover:scale-x-100
                      transition-transform duration-300 ease-in-out origin-center"
                    />
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Cart and Login (not logged in) - Always show */}
                <button 
                  onClick={handleCartClick}
                  className="relative p-2 text-gray-900 hover:text-blue-600
                    transition duration-300 ease-in-out"
                >
                  <FaCartShopping className="text-2xl" />
                  {cartQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 w-5 h-5 
                      flex items-center justify-center
                      bg-blue-600 text-white text-xs font-medium 
                      rounded-full border-2 border-white"
                    >
                      {cartQuantity}
                    </span>
                  )}
                </button>
                <Link 
                  href="/login"
                  className="group relative py-2 text-base text-gray-900 font-lato tracking-wide
                    uppercase transition duration-300 ease-in-out whitespace-nowrap"
                >
                  <span>Log in</span>
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-600
                    transform scale-x-0 group-hover:scale-x-100
                    transition-transform duration-300 ease-in-out origin-center"
                  />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Large Search Overlay */}
      {showSearch && (
        <>
          {/* Background overlay */}
          <div 
            className={`fixed inset-0 bg-black/50 z-50
              transition-opacity duration-300 ease-in-out
              ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
            onClick={handleOverlayClick}
          />
          
          {/* Search panel */}
          <div className={`fixed inset-x-0 top-0 z-50 transform
            ${isClosing ? 'animate-slideUp' : 'animate-slideDown'}`}
          >
            <div className="bg-white shadow-lg">
              <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className={`flex-1 ${isClosing ? 'animate-fadeOut' : 'animate-fadeInScale'}`}>
                  <SearchBar />
                </div>
                <button 
                  onClick={handleClose}
                  className="ml-4 p-2 hover:bg-gray-100 rounded-full 
                    transition duration-200"
                >
                  <svg
                    className="w-6 h-6 text-gray-900"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default Header;
