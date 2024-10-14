import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const CheckoutNav = () => {
  const router = useRouter(); // 현재 페이지 경로를 확인하기 위한 useRouter 훅

  // 경로에 따라 스타일을 적용하는 함수
  const getLinkClass = (path) => {
    return router.pathname === path
      ? "text-gray-400 hover:underline" // 현재 페이지인 경우 회색
      : "hover:underline"; // 다른 페이지는 기본 스타일
  };

  return (
    <div className="text-sm mb-4">
      <nav className="flex items-center space-x-2">
        <Link href="/cart" className={getLinkClass("/cart")}>
          Cart
        </Link>
        <span>&gt;</span>
        <Link href="/info" className={getLinkClass("/info")}>
          Info
        </Link>
        <span>&gt;</span>
        <Link href="/shipping" className={getLinkClass("/shipping")}>
          Shipping
        </Link>
        <span>&gt;</span>
        <Link href="/payment" className={getLinkClass("/payment")}>
          Payment
        </Link>
      </nav>
    </div>
  );
};

export default CheckoutNav;
