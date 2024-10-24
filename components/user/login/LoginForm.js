// C:\CPRG306\CapstoneV2\components\auth\LoginForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const LoginForm = ({ onSuccess,onSwitchToForgetPassword  }) => {
  const [loginIdentifier, setLoginIdentifier] = useState(''); 
  const [loginPassword, setLoginPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const [isThirdPartyLogin, setIsThirdPartyLogin] = useState(false);
  const router = useRouter();
  const firebaseConfig = {
    apiKey: "AIzaSyA7bDhRsQS2W_wqIH8ZqLxoAhfaKcoVQW0",
    authDomain: "capstone-b80b9.firebaseapp.com",
    projectId: "capstone-b80b9",
    storageBucket: "capstone-b80b9.appspot.com",
    messagingSenderId: "453620417840",
    appId: "1:453620417840:web:588c6621142c201662f4f5",
    measurementId: "G-NL010Z0B5K"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);

      const renderRecaptcha = () => {
        if (window.grecaptcha && document.getElementById('login-recaptcha-container')) {
          window.grecaptcha.render('login-recaptcha-container', {
            sitekey: '6LfBy0IqAAAAACglebXLEuKwhzW1B1Y_u8V713SJ',
          });
        }
      };

      setTimeout(renderRecaptcha, 100);
    }
  }, []);

  // Validation Form
  const validateLoginForm = () => {
    const emailOrUsernameRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$|^\w+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

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

   // Handles the login logic
  const handleLogin = () => {
    if (!isThirdPartyLogin && !validateLoginForm()) {
      return;
    }


    setIsLoading(true);
    const recaptchaResponse = window.grecaptcha.getResponse();

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
        onSuccess(); 
      } else {
        setError(res.data.message);
        window.grecaptcha.reset();
      }
    })
    .catch((err) => {
      setIsLoading(false);
      setError(err.response?.data?.message || err.message);
      window.grecaptcha.reset();
    });
  };

  // Handles Google third-party login using Firebase
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;

        // 用户信息
        const userEmail = user.email;
        const userName = user.displayName;

        console.log('Google Login Success:', user);

        // 可以在这里调用后端 API，将 Firebase 获取到的用户信息存储到你的数据库中

        onSuccess(); // 登录成功后调用 onSuccess 进行后续处理
      })
      .catch((error) => {
        setError('Google login failed. Please try again.');
        console.error('Google Login Error:', error);
      });
  };

  return (
    <form className="w-full max-w-sm" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
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
          disabled={isLoading}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
        Password
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="password"
          // type="password"
          placeholder="Password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>
      {isClient && (
        <div id="login-recaptcha-container" className="g-recaptcha ml-6"></div>
      )}
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-3"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Please wait...' : 'Login'}
      </button>

      {error && (
        <p className="text-center mt-2 text-red-500">{error}</p>
      )}

        <div className="text-center mt-4">
          {/* Google Login Button */}
          <button
            className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
            onClick={handleGoogleLogin}
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1280px-Google_Chrome_icon_%28February_2022%29.svg.png" alt="Google" className="h-6 w-6 mr-3" />
            <span>Sign up with Google</span>
          </button>
        </div>

        <div className="text-center mt-2">
        <button
          type="button"
          className="text-blue-600 hover:underline"
          onClick={onSwitchToForgetPassword}
        >
          Forgot Password?
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
