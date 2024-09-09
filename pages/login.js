//C:\CPRG306\CapstoneV2\pages\login.js
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Login() {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [welcomeMessage, setWelcomeMessage] = useState('');
  const [error, setError] = useState('');

  const login = () => {
    axios({
      method: "post",
      data: {
        username: loginUsername,
        password: loginPassword,
        email: loginEmail
      },
      withCredentials: true,
      url: "http://localhost:3001/login",
    })
    .then((res) => {
      if (res.data === 'User logged in') {
        getUser();  // 登录成功后获取用户信息
      } else {
        setError(res.data);  // 显示服务器返回的错误信息
        setWelcomeMessage('');  // 清空欢迎信息
      }
    })
    .catch((err) => {
      setError(err.response?.data?.message || err.message);  // 捕获错误并显示
      setWelcomeMessage('');  // 清空欢迎信息
    });
  };

  const getUser = () => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:3001/getUser',
    })
    .then((res) => {
      setWelcomeMessage(`Welcome user ${res.data.username}`);  // 显示用户名
      setError('');  // 登录成功后清空错误信息
    })
    .catch((err) => {
      setError(err.response?.data?.message || err.message);  // 捕获错误并显示
      setWelcomeMessage('');  // 清空欢迎信息
    });
  };

  return (
    <div className="flex h-screen">
      <div className="w-2/3 h-full bg-blue-500">
        <img src="/login-bg.png" alt="Login Background" className="w-full h-full object-cover"></img>
      </div>
      <div className="w-1/3 h-full flex flex-col justify-center items-center bg-white p-8">
        <img src="/login-logo.png" alt="Logo" className="h-20 mb-8 cursor-pointer"></img>
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Welcome back!</h1>
        <form className="w-full max-w-sm" onSubmit={(e) => { e.preventDefault(); login(); }}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={loginUsername}
              onChange={(e) => setLoginUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>

          {/* 合并错误和欢迎信息的显示 */}
          {(error || welcomeMessage) && (
            <p className={`text-center mt-4 ${error ? 'text-red-500' : 'text-green-500'}`}>
              {error || welcomeMessage}
            </p>
          )}

          <div className="text-center mt-4">
            <Link href="/register" legacyBehavior>
              <a className="text-blue-600 hover:underline">Create Account</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
