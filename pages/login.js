// C:\CPRG306\CapstoneV2\pages\login.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '../components/common/Header';
import LoginForm from '../components/user/login/LoginForm';
import ForgetPasswordForm from '../components/user/login/ForgetPasswordForm';
import axios from 'axios';
import Link from 'next/link';

export default function Login() {
  const [welcomeMessage, setWelcomeMessage] = useState(''); // 成功登录后的欢迎信息
  const router = useRouter();
  const [isLoginForm, setIsLoginForm] = useState(true);

  // 成功登录后的回调
  const handleLoginSuccess = () => {
    // 获取用户信息并跳转到首页
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:3001/api/getUser',
    })
    .then((res) => {
      setWelcomeMessage(`Welcome ${res.data.customer_name}`);
      localStorage.setItem('user', JSON.stringify(res.data));
      router.push('/');
    })
    .catch((err) => {
      console.error("errors when catch customer data:", err);
      setWelcomeMessage('');
    });
  };

  return (
    <main>
      <Header />
      <div className="flex h-[550px] mx-16 my-6 rounded-2xl border-2">
        <div className="w-2/3 h-full bg-blue-500 rounded-l-2xl">
          <img src="/login-bg.png" alt="Login Background" className="w-full h-full object-cover rounded-l-2xl"></img>
        </div>
        <div className="w-1/3 min-w-[410px] h-full flex flex-col justify-center items-center bg-white p-8 rounded-r-2xl">
          <img src="/logo.png" alt="Logo" className="h-[55px] my-5 cursor-pointer" onClick={()=> router.push('/')}></img>
          <h1 className="text-3xl font-bold mb-6 text-blue-600">
            {isLoginForm ? 'Welcome Back!' : 'Forget Password?'}
          </h1>

          {isLoginForm ? (
            <LoginForm 
              onSuccess={handleLoginSuccess} 
              onSwitchToForgetPassword={() => setIsLoginForm(false)} // 切换到 ForgetPasswordForm
            />
          ) : (
            <ForgetPasswordForm onSwitchToLogin={() => setIsLoginForm(true)} /> // 切换回 LoginForm
          )}
          {welcomeMessage && (
            <p className="text-center mt-2 text-green-500">
              {welcomeMessage}
            </p>
          )}
          <Link href="/register" legacyBehavior>
            <a className="text-blue-600 hover:underline mt-2">Create Account</a>
          </Link>

          {/* 添加按钮，跳转到重置密码页面 */}
          {/* <button
            className="text-blue-600 hover:underline mt-4"
            onClick={() => router.push('/resetpassword')}
          >
            Reset Password
          </button> */}
        </div>
      </div>
    </main>
  );
}
