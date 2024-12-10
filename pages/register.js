import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from "../components/common/Header";  // Add this line

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [isEmailFixed, setIsEmailFixed] = useState(false);
  const [isUsernameFixed, setIsUsernameFixed] = useState(false);
  const [recaptchaWidget, setRecaptchaWidget] = useState(null);  // 添加这行
  const [mouseDownTarget, setMouseDownTarget] = useState(null);

  useEffect(() => {
    if (router.isReady) {
      const { email, username } = router.query;
      if (email) {
        setRegisterEmail(email);
        setIsEmailFixed(true);
      }
      if (username) {
        setRegisterUsername(username);
        setIsUsernameFixed(true);
      }
    }

    if (typeof window !== 'undefined') {
      setIsClient(true);

      const initRecaptcha = () => {
        if (window.grecaptcha && document.getElementById('register-recaptcha')) {
          try {
            const recaptchaElement = document.getElementById('register-recaptcha');
            if (recaptchaElement && !recaptchaElement.hasChildNodes()) {
              // 重置现有的 widget
              if (recaptchaWidget !== null) {
                window.grecaptcha.reset(recaptchaWidget);
              }
              
              // 渲染新的 widget
              const widgetId = window.grecaptcha.render('register-recaptcha', {
                sitekey: '6LfBy0IqAAAAACglebXLEuKwhzW1B1Y_u8V713SJ'
              });
              setRecaptchaWidget(widgetId);
            }
          } catch (e) {
            console.error("Register reCAPTCHA render error:", e);
          }
        } else {
          setTimeout(initRecaptcha, 500);
        }
      };

      // 等待 grecaptcha API 加载完成
      if (window.grecaptcha?.ready) {
        window.grecaptcha.ready(initRecaptcha);
      } else {
        const checkRecaptcha = setInterval(() => {
          if (window.grecaptcha?.ready) {
            window.grecaptcha.ready(initRecaptcha);
            clearInterval(checkRecaptcha);
          }
        }, 100);
        
        // 5秒后清除检查
        setTimeout(() => clearInterval(checkRecaptcha), 5000);
      }

      return () => {
        if (recaptchaWidget !== null && window.grecaptcha) {
          try {
            window.grecaptcha.reset(recaptchaWidget);
          } catch (e) {
            console.error("Error resetting reCAPTCHA:", e);
          }
        }
      };
    }
  }, [router.isReady, router.query]);

  const validateForm = () => {
    if (!registerEmail || !registerPassword || !registerUsername || !registerPhone || !registerPasswordConfirm) {
      setError('Please fill in all fields.');
      return false;
    }
    if (registerPassword !== registerPasswordConfirm) {
      setError('Passwords do not match.');
      return false;
    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*[0-9]).{6,}$/;
    if (!passwordRegex.test(registerPassword)) {
      setError('Password must be at least 6 characters long and contain both letters and numbers.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(registerEmail)) {
      setError('The e-mail is not formatted correctly.');
      return false;
    }
    if (!/^\d{10}$/.test(registerPhone)) {
      setError('Phone number must be exactly 10 digits.');
      return false;
    }

    return true;
  };

  const register = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 首先验证表单
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }

    // 然后检查 reCAPTCHA
    let recaptchaResponse = "";
    try {
      recaptchaResponse = window.grecaptcha.getResponse(recaptchaWidget);
    } catch (e) {
      console.error("Error getting reCAPTCHA response:", e);
    }

    if (!recaptchaResponse) {
      setError('Please complete the reCAPTCHA.');
      setIsLoading(false);
      return;
    }

    // 最后提交表单
    try {
      const response = await axios({
        method: 'post',
        data: {
          username: registerUsername,
          password: registerPassword,
          email: registerEmail,
          phone: registerPhone,
          recaptchaToken: recaptchaResponse,
        },
        withCredentials: true,
        url: 'http://localhost:3001/api/register',
      });

      setIsLoading(false);
      if (response.data.message) {
        setError('');
        router.push('/login');
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.response?.data?.message || 'Registration failed, please try again later.');
      if (window.grecaptcha && recaptchaWidget) {
        window.grecaptcha.reset(recaptchaWidget);
      }
    }
  };

  // 修改返回登录页面的逻辑
  const handleBackToLogin = () => {
    const originalPath = router.query.returnTo || '/'; // 获取原始路径，默认为首页
    router.push({
      pathname: '/login',
      query: { 
        from: 'register',
        originalPath: originalPath 
      }
    });
  };

  const handleBackgroundMouseDown = (e) => {
    setMouseDownTarget(e.target);
  };

  const handleBackgroundMouseUp = (e) => {
    if (e.target === mouseDownTarget && e.target.classList.contains('modal-backdrop')) {
      handleBackToLogin();
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
        <div className="relative w-[95%] max-w-[400px] max-h-[95vh] bg-white p-4 sm:p-6 lg:p-8 rounded-2xl border-2 shadow-xl flex flex-col overflow-hidden">
          {/* 返回按钮 - 固定在左上角 */}
          <button 
            onClick={handleBackToLogin}
            className="absolute left-4 top-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Back to login"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2} 
              stroke="currentColor" 
              className="w-6 h-6 text-gray-900"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" 
              />
            </svg>
          </button>

          {/* 表单内容区域 */}
          <div className="w-full flex-1 min-h-0 overflow-y-auto">
            <h1 className="text-xl font-bold mb-2 text-center text-gray-800">Create Account</h1>
            
            {(isEmailFixed || isUsernameFixed) && (
              <p className="text-gray-600 text-xs mb-2 text-center">
                This email address hasn't been registered yet. Please complete the registration to continue.
              </p>
            )}

            <form className="flex flex-col gap-2 flex-1" onSubmit={register}>
              <div className="flex-column">
                <label className="text-[#151717] font-semibold mb-1 block text-sm" htmlFor="username">
                  Username
                </label>
                <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[40px] flex items-center px-3 focus-within:border-[#2d79f3]">
                  <input
                    className="ml-2 rounded-[10px] border-none w-full h-full focus:outline-none text-sm"
                    type="text"
                    id="username"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    disabled={isUsernameFixed}
                  />
                </div>
              </div>

              <div className="flex-column">
                <label className="text-[#151717] font-semibold mb-1 block text-sm" htmlFor="password">
                  Password
                </label>
                <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[40px] flex items-center px-3 focus-within:border-[#2d79f3]">
                  <input
                    className="ml-2 rounded-[10px] border-none w-full h-full focus:outline-none text-sm"
                    type="password"
                    id="password"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-column">
                <label className="text-[#151717] font-semibold mb-1 block text-sm" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[40px] flex items-center px-3 focus-within:border-[#2d79f3]">
                  <input
                    className="ml-2 rounded-[10px] border-none w-full h-full focus:outline-none text-sm"
                    type="password"
                    id="confirmPassword"
                    value={registerPasswordConfirm}
                    onChange={(e) => setRegisterPasswordConfirm(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-column">
                <label className="text-[#151717] font-semibold mb-1 block text-sm" htmlFor="email">
                  Email
                </label>
                <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[40px] flex items-center px-3 focus-within:border-[#2d79f3]">
                  <input
                    className={`ml-2 rounded-[10px] border-none w-full h-full focus:outline-none text-sm ${
                      isEmailFixed ? 'bg-gray-100' : ''
                    }`}
                    type="email"
                    id="email"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    disabled={isEmailFixed}
                  />
                </div>
              </div>

              <div className="flex-column">
                <label className="text-[#151717] font-semibold mb-1 block text-sm" htmlFor="phone">
                  Phone Number
                </label>
                <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[40px] flex items-center px-3 focus-within:border-[#2d79f3]">
                  <input
                    className="ml-2 rounded-[10px] border-none w-full h-full focus:outline-none text-sm"
                    type="text"
                    id="phone"
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                  />
                </div>
              </div>

              {isClient && (
                <div className="flex justify-center w-full mb-2">
                  <div id="register-recaptcha" className="g-recaptcha"></div>
                </div>
              )}

              <button
                className="mt-2 bg-[#151717] text-white text-[15px] font-medium rounded-[10px] h-[40px] w-full cursor-pointer disabled:opacity-50"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Please wait...' : 'Register'}
              </button>

              {error && <p className="text-center text-red-500 text-xs mt-1">{error}</p>}

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}