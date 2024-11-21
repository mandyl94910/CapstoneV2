// C:\CPRG306\CapstoneV2\pages\login.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/common/Header";
import LoginForm from "../components/user/login/LoginForm";
import ForgetPasswordForm from "../components/user/login/ForgetPasswordForm";
import axios from "axios";
import Link from "next/link";

export default function Login() {
  const [welcomeMessage, setWelcomeMessage] = useState(""); // 成功登录后的欢迎信息
  const router = useRouter();
  const [isLoginForm, setIsLoginForm] = useState(true);

  // Callback after successful login
  const handleLoginSuccess = () => {
    // Get user information and jump to home page
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:3001/api/getUser",
    })
      .then((res) => {
        setWelcomeMessage(`Welcome ${res.data.customer_name}`);
        localStorage.setItem("user", JSON.stringify(res.data));
        router.push("/");
      })
      .catch((err) => {
        console.error("errors when catch customer data:", err);
        setWelcomeMessage("");
      });
  };

  return (
    <main>
      <Header />
      <div className="flex h-[700px] mx-16 my-6 rounded-2xl border-2">
        <div className="w-2/3 h-full bg-blue-500 rounded-l-2xl">
          <img
            src="/log-bg1.png"
            alt="Login Background"
            className="w-full h-full object-cover rounded-l-2xl"
          ></img>
        </div>
        <div className="w-1/3 min-w-[500px] h-full flex flex-col justify-center items-center bg-white p-8 rounded-r-2xl">
          <img
            src="/new-logo.png"
            alt="Logo"
            className="h-[300px] my-5 cursor-pointer"
            // onClick={() => router.push("/")}
          ></img>

          {isLoginForm ? (
            <LoginForm
              onSuccess={handleLoginSuccess}
              onSwitchToForgetPassword={() => setIsLoginForm(false)} // 切换到 ForgetPasswordForm
            />
          ) : (
            <ForgetPasswordForm onSwitchToLogin={() => setIsLoginForm(true)} /> // 切换回 LoginForm
          )}
          {welcomeMessage && (
            <p className="text-center mt-2 text-green-500">{welcomeMessage}</p>
          )}
          <Link href="/register" legacyBehavior>
            <a className="text-blue-600 hover:underline mt-2">Create Account</a>
          </Link>
        </div>
      </div>
    </main>
  );
}
