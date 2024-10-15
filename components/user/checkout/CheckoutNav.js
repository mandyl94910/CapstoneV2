import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const CheckoutNav = () => {
  const router = useRouter(); // useRouter hook to check the current page path

  // Function to apply styles based on the path
  const getLinkClass = (path) => {
    return router.pathname === path
      ? "text-indigo-600 font-semibold underline" // Highlight the current page
      : "hover:underline"; // Default style for other pages
  };

  return (
    <div className="text-sm mb-4">
      <nav className="flex items-center space-x-2">
        <Link href="/cart" className={getLinkClass("/cart")}>
          Cart
        </Link>
        <span>&gt;</span>
        <Link
          href="/checkout/checkoutPage"
          className={getLinkClass("/checkout/checkoutPage")}
        >
          Info
        </Link>
        <span>&gt;</span>
        <Link
          href="/checkout/shippingPage"
          className={getLinkClass("/checkout/shippingPage")}
        >
          Shipping
        </Link>
        <span>&gt;</span>
        <Link
          href="/checkout/payment"
          className={getLinkClass("/checkout/payment")}
        >
          Payment
        </Link>
      </nav>
    </div>
  );
};

export default CheckoutNav;
