// C:\CPRG306\CapstoneV2\pages\register.js
import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState(''); // Second password input
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [error, setError] = useState('');

  const register = () => {
    // Front-end validation
    if (!registerEmail || !registerPassword || !registerUsername || !registerPhone || !registerPasswordConfirm) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(registerEmail)) {
      setError("The e-mail is not formatted correctly.");
      return;
    }
    if (!/^\d{10}$/.test(registerPhone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }
    if (registerPassword !== registerPasswordConfirm) {
      setError("Passwords do not match.");
      return;
    }

    // Register by inserting username, password, email, and phone_number into customer table
    axios({
      method: "post",
      data: {
        username: registerUsername,
        password: registerPassword,
        email: registerEmail,
        phone_number: registerPhone
      },
      withCredentials: true,
      url: "http://localhost:3001/register",
    })
      .then((res) => {
        if (res.data.message) {
          setError(res.data.message);
        } else {
          setError('');
          // Logic after successful registration, such as redirecting to login page
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Registration failed, please try again later.");
      });
  };

  return (
    <div className="flex h-screen slide-in">
      <div className="w-full h-full flex flex-col justify-center items-center bg-white p-8">
        <img src="/login-logo.png" alt="Logo" className="h-20 mb-8 cursor-pointer" />
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Create Account</h1>
        <form className="w-full max-w-sm" onSubmit={(e) => { e.preventDefault(); register(); }}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="passwordConfirm"
              type="password"
              placeholder="Confirm Password"
              value={registerPasswordConfirm}
              onChange={(e) => setRegisterPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
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
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phone"
              type="text"
              placeholder="Phone Number"
              value={registerPhone}
              onChange={(e) => setRegisterPhone(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
          >
            Register
          </button>
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