// C:\CPRG306\CapstoneV2\pages\login.js
import React, { useState, useEffect } from "react";
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
  const [fromRegister, setFromRegister] = useState(false);
  const [originalPath, setOriginalPath] = useState('');
  const [mouseDownTarget, setMouseDownTarget] = useState(null);

  // 在组件加载时检查来源和原始路径
  useEffect(() => {
    if (router.query.from === 'register') {
      setFromRegister(true);
      // 保存原始路径（如果有）
      if (router.query.originalPath) {
        setOriginalPath(router.query.originalPath);
      }
    }
  }, [router.query]);

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

  // 修改处理逻辑
  const handleBackgroundMouseDown = (e) => {
    setMouseDownTarget(e.target);
  };

  const handleBackgroundMouseUp = (e) => {
    if (e.target === mouseDownTarget && e.target.classList.contains('modal-backdrop')) {
      if (fromRegister && originalPath) {
        router.push(originalPath);
      } else {
        router.back();
      }
    }
    setMouseDownTarget(null);
  };

  return (
    <div className="min-h-screen">

      {/* 登录模态框覆盖层 */}
      <div 
        className="fixed inset-0 z-50 flex justify-center items-center bg-black/30 backdrop-blur-sm modal-backdrop"
        onMouseDown={handleBackgroundMouseDown}
        onMouseUp={handleBackgroundMouseUp}
      >
        {/* 内容容器 - 添加 overflow-hidden */}
        <div className="relative w-[95%] max-w-[400px] max-h-[100vh] bg-white p-4 sm:p-6 lg:p-8 rounded-2xl border-2 shadow-xl flex flex-col overflow-hidden">
          {/* Logo - 固定高度 */}
          <div className="h-[150px] shrink-0 flex items-center justify-center">
            <img
              src="/new-logo.png"
              alt="Logo"
              className="h-full w-auto object-contain"
            />
          </div>

          {/* 表单内容区域 - 添加 overflow-y-auto */}
          <div className="w-full flex-1 min-h-0 overflow-y-auto">
            {isLoginForm ? (
              <LoginForm
                onSuccess={handleLoginSuccess}
                onSwitchToForgetPassword={() => setIsLoginForm(false)}
              />
            ) : (
              <ForgetPasswordForm onSwitchToLogin={() => setIsLoginForm(true)} />
            )}
            
            {welcomeMessage && (
              <p className="text-center mt-2 text-green-500">{welcomeMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
