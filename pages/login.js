// C:\CPRG306\CapstoneV2\pages\login.js
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Login() {
  const [loginIdentifier, setLoginIdentifier] = useState(''); // State for user identifier (email or username)
  const [loginPassword, setLoginPassword] = useState(''); // State for password input
  const [welcomeMessage, setWelcomeMessage] = useState(''); // State to store welcome message
  const [error, setError] = useState(''); // State to store error messages

  // Function to handle login
  const login = () => {
    axios({
      method: "post",
      data: {
        identifier: loginIdentifier, // Pass email or username
        password: loginPassword
      },
      withCredentials: true,
      url: "http://localhost:3001/login",
    })
    .then((res) => {
      if (res.data === 'User logged in') {
        getUser(); // Fetch user info after successful login
      } else {
        setError(res.data); // Display error message returned from server
        setWelcomeMessage(''); // Clear welcome message
      }
    })
    .catch((err) => {
      setError(err.response?.data?.message || err.message); // Capture and display any errors
      setWelcomeMessage(''); // Clear welcome message
    });
  };

  // Function to fetch user information
  const getUser = () => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:3001/getUser',
    })
    .then((res) => {
      setWelcomeMessage(`Welcome user ${res.data.username}`); // Display username in welcome message
      setError(''); // Clear error message after successful login
    })
    .catch((err) => {
      setError(err.response?.data?.message || err.message); // Capture and display any errors
      setWelcomeMessage(''); // Clear welcome message
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="identifier">
              Email or Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="identifier"
              type="text"
              placeholder="Email or Username"
              value={loginIdentifier}
              onChange={(e) => setLoginIdentifier(e.target.value)}
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
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>

          {/* Display error and welcome messages */}
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
