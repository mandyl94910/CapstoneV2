// C:\CPRG306\CapstoneV2\pages\register.js
import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState(''); // State for username input
  const [registerPassword, setRegisterPassword] = useState(''); // State for password input
  const [registerEmail, setRegisterEmail] = useState(''); // State for email input
  const [error, setError] = useState('');  // State for displaying error messages

  const register = () => {
    // Front-end validation
    if (!registerEmail || !registerPassword || !registerUsername) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(registerEmail)) {
      setError("The e-mail is not formatted correctly.");
      return;
    }

    axios({
      method: "post",
      data: {
        username: registerUsername,
        password: registerPassword,
        email: registerEmail
      },
      withCredentials: true,
      url: "http://localhost:3001/register",
    })
    .then((res) => {
      // Check for server-side error messages
      if (res.data.message) {
        setError(res.data.message);  // Set error message
      } else {
        setError('');  // Clear error message on successful registration, option to redirect
        // Post-registration logic, e.g., redirect to login page
      }
    })
    .catch((err) => {
      // Capture and display network or server errors
      setError(err.response?.data?.message || "Registration failed, please try again later.");
    });
  };

  return (
    <div className="flex h-screen slide-in">
      <div className="w-full h-full flex flex-col justify-center items-center bg-white p-8">
        {/* Logo display */}
        <img src="/login-logo.png" alt="Logo" className="h-20 mb-8 cursor-pointer" />
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Create Account</h1>
        <form className="w-full max-w-sm" onSubmit={(e) => { e.preventDefault(); register(); }}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={registerUsername}
              onChange={(e) => setRegisterUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" for="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
          </div>

          {/* Register button */}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Register
          </button>

          {/* Display error messages */}
          {error && (
            <p className="text-red-500 text-center mt-4">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
