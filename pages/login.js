//C:\CPRG306\CapstoneV2\pages\login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Login() {
  const [loginIdentifier, setLoginIdentifier] = useState(''); // State for user identifier (email or username)
  const [loginPassword, setLoginPassword] = useState(''); // State for password input
  const [welcomeMessage, setWelcomeMessage] = useState(''); // State to store welcome message after successful login
  const [error, setError] = useState(''); // State to store error messages from login attempts
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to indicate if a login request is in progress

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);

      // Function to render the reCAPTCHA widget
      const renderRecaptcha = () => {
        if (window.grecaptcha && document.getElementById('login-recaptcha-container')) {
          window.grecaptcha.render('login-recaptcha-container', {
            sitekey: '6LfBy0IqAAAAACglebXLEuKwhzW1B1Y_u8V713SJ', // Your sitekey here
          });
        }
      };

      // Delay to ensure the reCAPTCHA library is loaded
      setTimeout(renderRecaptcha, 100);
    }
  }, []);

  // Function to validate the login form
  const validateLoginForm = () => {
    const emailOrUsernameRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$|^\w+$/; // Regex to check for valid email or username format
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Regex to check for valid password format
  
    if (!emailOrUsernameRegex.test(loginIdentifier)) {
      setError('Username or email format is invalid.');
      return false;
    }
  
    if (!passwordRegex.test(loginPassword)) {
      setError('Password must be at least 6 characters long and contain both letters and numbers.');
      return false;
    }
  
    setError('');
    return true;
  };

  // Function to handle login
const login = () => {
  if (!validateLoginForm()) {
    return;
  }

  setIsLoading(true);
  const recaptchaResponse = window.grecaptcha.getResponse(); // Get the reCAPTCHA token

  if (!recaptchaResponse) {
    setError('Please complete the reCAPTCHA.');
    setIsLoading(false);
    return;
  }

  axios({
    method: "post",
    data: {
      loginIdentifier: loginIdentifier,  
      password: loginPassword,
      recaptchaToken: recaptchaResponse,
    },
    withCredentials: true,
    url: "http://localhost:3001/login",
  })
  .then((res) => {
    setIsLoading(false);
    if (res.data.success) {
      getUser();
    } else {
      setError(res.data.message);
      setWelcomeMessage(''); 
    }
  })
  .catch((err) => {
    setIsLoading(false);
    setError(err.response?.data?.message || err.message);
    setWelcomeMessage('');
  });
};
  

  // Function to fetch user details post-login
  const getUser = () => {
    axios({
        method: 'get',
        withCredentials: true,
        url: 'http://localhost:3001/getUser',
    })
    .then((res) => {
        console.log("Received user info:", res.data);
        setWelcomeMessage(`Welcome user ${res.data.username}`); // Set welcome message with username
        setError('');
    })
    .catch((err) => {
        console.error("Error fetching user info:", err);
        setError(err.response?.data?.message || "Error retrieving user session");
        setWelcomeMessage('');
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
              disabled={isLoading} // Disable input during loading
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
              disabled={isLoading} // Disable input during loading
            />
          </div>
          {isClient && (
            <div id="login-recaptcha-container" className="g-recaptcha ml-12"></div>
          )}
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-3"
            type="submit"
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? 'Please wait...' : 'Login'}
          </button>

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
