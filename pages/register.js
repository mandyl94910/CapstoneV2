import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Register() {
   // State hooks to store input values and control states
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPasswordConfirm, setRegisterPasswordConfirm] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

//6LfBy0IqAAAAACglebXLEuKwhzW1B1Y_u8V713SJ
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
  
      // Ensures reCAPTCHA is loaded and container element is in the DOM
      window.grecaptcha.ready(() => {
        const intervalId = setInterval(() => {
          const recaptchaElement = document.getElementById('recaptcha-container');
          if (recaptchaElement) {
            window.grecaptcha.render('recaptcha-container', {
              sitekey: '6LfBy0IqAAAAACglebXLEuKwhzW1B1Y_u8V713SJ',
            });
            clearInterval(intervalId);// Clear the interval once reCAPTCHA is rendered
          }
        }, 100);   // Check every 100ms if the element is available
      });
    }
  }, []);

  const validateForm = () => {
    // Form validation for empty fields, password match, and formats
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

  const register = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 获取 reCAPTCHA token
  const recaptchaResponse = window.grecaptcha.getResponse();
  if (!recaptchaResponse) {
    setError('Please complete the reCAPTCHA.');
    setIsLoading(false);
    return;
  }
  
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
  
    axios({
      method: 'post',
      data: {
        username: registerUsername,
        password: registerPassword,
        email: registerEmail,
        phone: registerPhone,
        recaptchaToken: recaptchaResponse,  // 提交 reCAPTCHA token
      },
      withCredentials: true,
      url: 'http://localhost:3001/api/register',
    })
    .then((res) => {
      setIsLoading(false);
      if (res.data.message) {
        setError(res.data.message);
      } else {
        setError('');
      }
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err.response?.data?.message || 'Registration failed, please try again later.');
    });
  };
  

  return (
    <div className="flex h-screen slide-in">
      <div className="w-full h-full flex flex-col justify-center items-center bg-white p-8">
        <Link href="/">
          <img src="/logo.png" alt="Logo" className="h-16 my-3 cursor-pointer" />
        </Link>
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Create Account</h1>
        <form className="w-full max-w-sm" onSubmit={register}>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="username">
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
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="password">
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
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="passwordConfirm">
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
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="email">
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
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="phone">
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

          {isClient && (
            <div id="recaptcha-container" className="g-recaptcha ml-10"></div>
          )}

          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-3 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : 'Register'}
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