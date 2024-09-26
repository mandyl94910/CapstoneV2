//C:\CPRG306\CapstoneV2\pages\login.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Header from '../components/common/Header';

export default function Login() {
  const [loginIdentifier, setLoginIdentifier] = useState(''); // State for user identifier (email or username)
  const [loginPassword, setLoginPassword] = useState(''); // State for password input
  const [welcomeMessage, setWelcomeMessage] = useState(''); // State to store welcome message after successful login
  const [error, setError] = useState(''); // State to store error messages from login attempts
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State to indicate if a login request is in progress
  const router = useRouter(); // use Next.js router ///////////

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
    url: "http://localhost:3001/api/login",
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
        url: 'http://localhost:3001/api/getUser',
    })
    .then((res) => {
        console.log("Received user info:", res.data);
        console.log("Username:", res.data.customer_name);   // 特别检查username字段是否存在
        setWelcomeMessage(`Welcome user ${res.data.customer_name}`); // Set welcome message with username
        setError('');

        // helped by chatGPT
        // prompt: how can I display user info on the header
        // Note: we can store user info in local storage when login
        // and read user info from local storage when open homepage
        if (typeof window !== 'undefined') {
          //store user info in local storage
          localStorage.setItem('user', JSON.stringify(res.data));
        } 
        router.push('/'); // go to the home page if get user
    })
    .catch((err) => {
        console.error("Error fetching user info:", err);
        setError(err.response?.data?.message || "Error retrieving user session");
        setWelcomeMessage('');
    });
};


  return (
    <main>
      <Header/>
      <div className="flex h-[550px] mx-16 my-6 rounded-2xl border-2">
        
        <div className="w-2/3 h-full bg-blue-500 rounded-l-2xl">
          <img src="/login-bg.png" alt="Login Background" className="w-full h-full object-cover rounded-l-2xl"></img>
        </div>
        <div className="w-1/3 min-w-[410px] h-full flex flex-col justify-center items-center bg-white p-8 rounded-r-2xl">
          <img src="/logo.png" alt="Logo" className="h-[55px] my-5 cursor-pointer" onClick={()=> router.push('/')}></img>
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
              <div id="login-recaptcha-container" className="g-recaptcha ml-6"></div>
            )}
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-3"
              type="submit"
              disabled={isLoading} // Disable button during loading
            >
              {isLoading ? 'Please wait...' : 'Login'}
            </button>

            {(error || welcomeMessage) && (
              <p className={`text-center mt-2 ${error ? 'text-red-500' : 'text-green-500'}`}>
                {error || welcomeMessage}
              </p>
            )}

            <div className="text-center mt-2">
              <Link href="/register" legacyBehavior>
                <a className="text-blue-600 hover:underline">Create Account</a>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
