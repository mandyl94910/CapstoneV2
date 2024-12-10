// C:\CPRG306\CapstoneV2\components\auth\LoginForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from 'next/link';  // Add this import
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const LoginForm = ({ onSuccess, onSwitchToForgetPassword }) => {
  const [loginIdentifier, setLoginIdentifier] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [error, setError] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isThirdPartyLogin, setIsThirdPartyLogin] = useState(false);
  const [recaptchaWidget, setRecaptchaWidget] = useState(null);
  const [showPassword, setShowPassword] = useState(false);  // 添加新状态
  const router = useRouter();
  const firebaseConfig = {
    apiKey: "AIzaSyA7bDhRsQS2W_wqIH8ZqLxoAhfaKcoVQW0",
    authDomain: "capstone-b80b9.firebaseapp.com",
    projectId: "capstone-b80b9",
    storageBucket: "capstone-b80b9.appspot.com",
    messagingSenderId: "453620417840",
    appId: "1:453620417840:web:588c6621142c201662f4f5",
    measurementId: "G-NL010Z0B5K",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    let initTimeout;
    let mounted = true;

    const initRecaptcha = () => {
      if (!mounted) return;
      
      if (window.grecaptcha && window.grecaptcha.render) {
        try {
          const container = document.getElementById("login-recaptcha");
          // Check if container exists and doesn't already have a reCAPTCHA widget
          if (container && !container.firstChild && recaptchaWidget === null) {
            const widgetId = window.grecaptcha.render("login-recaptcha", {
              sitekey: "6LfBy0IqAAAAACglebXLEuKwhzW1B1Y_u8V713SJ",
              callback: () => {
                if (mounted) setError("");
              },
              "expired-callback": () => {
                if (mounted && recaptchaWidget !== null) {
                  window.grecaptcha.reset(recaptchaWidget);
                }
              },
            });
            if (mounted) setRecaptchaWidget(widgetId);
          }
        } catch (e) {
          console.error("reCAPTCHA render error:", e);
        }
      } else {
        // If grecaptcha is not ready, retry after delay
        initTimeout = setTimeout(initRecaptcha, 100);
      }
    };

    if (typeof window !== "undefined") {
      setIsClient(true);
      
      // Clear any existing reCAPTCHA
      const container = document.getElementById("login-recaptcha");
      if (container) {
        container.innerHTML = '';
      }
      
      // Reset widget state
      setRecaptchaWidget(null);

      // Initialize new reCAPTCHA
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(initRecaptcha);
      } else {
        initTimeout = setTimeout(initRecaptcha, 100);
      }
    }

    // Cleanup function
    return () => {
      mounted = false;
      if (initTimeout) {
        clearTimeout(initTimeout);
      }
      // Clear reCAPTCHA container on unmount
      const container = document.getElementById("login-recaptcha");
      if (container) {
        container.innerHTML = '';
      }
      setRecaptchaWidget(null);
    };
  }, []); // Empty dependency array since we want this to run only once on mount

  // Validation Form
  const validateLoginForm = () => {
    const emailOrUsernameRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$|^\w+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!emailOrUsernameRegex.test(loginIdentifier)) {
      setError("Username or email format is invalid.");
      return false;
    }

    if (!passwordRegex.test(loginPassword)) {
      setError(
        "Password must be at least 6 characters long and contain both letters and numbers."
      );
      return false;
    }

    setError("");
    return true;
  };

  // Handles the login logic
  const handleLogin = () => {
    // Check if the username matches admin login pattern
    const adminRegex = /^Admin[a-zA-Z]+$/;
  if (adminRegex.test(loginIdentifier)) {
    handleAdminLogin();
    return; // Exit to prevent further processing
  }

  if (!isThirdPartyLogin && !validateLoginForm()) {
    return;
  }

    if (!isThirdPartyLogin && !validateLoginForm()) {
      return;
    }

    setIsLoading(true);
    let recaptchaResponse = "";
    
    try {
      // 确保 recaptchaWidget 存在且有效
      if (recaptchaWidget === null) {
        setError("reCAPTCHA not loaded. Please refresh the page.");
        setIsLoading(false);
        return;
      }
      recaptchaResponse = window.grecaptcha.getResponse(recaptchaWidget);
    } catch (e) {
      console.error("Error getting reCAPTCHA response:", e);
      setError("reCAPTCHA error. Please refresh the page.");
      setIsLoading(false);
      return;
    }

    if (!recaptchaResponse) {
      setError("Please complete the reCAPTCHA.");
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

  const handleAdminLogin = () => {
    axios
      .post('http://localhost:3001/api/admin-login', {
        username: loginIdentifier,
        password: loginPassword,
      })
      .then((response) => {
        if (response.data.success) {
          alert(`Admin Login Successful! Welcome, ${response.data.adminName}`);
          // 跳转到管理员 Dashboard 页面
          router.push('/admin/dashboard');
        } else {
          setError(response.data.message || 'Admin login failed. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Admin Login Error:', error);
        setError(error.response?.data?.message || 'Error occurred during admin login.');
      });
  };

  // Handles Google third-party login using Firebase
  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userEmail = user.email;
        const userName = user.displayName || ""; // 获取用户名，若不存在则为空字符串

        console.log("Google Login Success:", user);

        // Verify if the email exists in the backend database
        axios
          .post("http://localhost:3001/api/verify-email", { email: userEmail })
          .then(async (response) => {
            if (response.data.exists) {
              // If the email exists, authenticate and fetch user information
              await loginWithEmail(userEmail);
            } else {
              // If email doesn't exist, initiate registration flow
              router.push({
                pathname: "/register",
                query: { email: userEmail, username: userName },
              });
            }
          })
          .catch((error) => {
            setError("Google login failed. Please try again.");
            console.error("Error verifying email:", error);
          });
      })
      .catch((error) => {
        setError("Google login failed. Please try again.");
        console.error("Google Login Error:", error);
      });
  };

  // Function to automatically log in using email
  const loginWithEmail = async (email) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/loginByEmail",
        { email },
        { withCredentials: true }
      );

      if (response.data.success) {
        onSuccess(response.data.data);
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Error response from server:", err.response?.data);
      setError(
        err.response?.data?.message || "Login failed, please try again later."
      );
    }
  };

  return (
    <form 
      className="flex flex-col flex-1 gap-2.5" // 改用更小的 gap，使用 flex-1
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      {/* Username input field */}
      <div className="flex-column">
        <label className="text-[#151717] font-semibold mb-1" htmlFor="identifier">
          Username
        </label>
        <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[45px] flex items-center px-3 focus-within:border-[#2d79f3]">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z"/>
          </svg>
          <input
            className="ml-2 rounded-[10px] border-none w-full h-full focus:outline-none"
            id="identifier"
            type="text"
            placeholder="Enter your Username"
            value={loginIdentifier}
            onChange={(e) => setLoginIdentifier(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Password input field */}
      <div className="flex-column">
        <label className="text-[#151717] font-semibold mb-2" htmlFor="password">
          Password
        </label>
        <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center px-3 focus-within:border-[#2d79f3]">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
            <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z"/>
          </svg>
          <input
            className="ml-2 rounded-[10px] border-none w-full h-full focus:outline-none"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="button"
            className="ml-2 focus:outline-none"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000">
                <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Forgot Password */}
      <div className="flex justify-end">
        <button
          type="button"
          className="text-[#2d79f3] text-sm hover:underline font-medium"
          onClick={onSwitchToForgetPassword}
        >
          Forgot Password?
        </button>
      </div>

      {/* reCAPTCHA */}
      {isClient && (
        <div className="flex justify-center w-full">
          <div id="login-recaptcha" className="g-recaptcha"></div>
        </div>
      )}

      {/* Sign In Button */}
      <button
        className="mt-2 bg-[#151717] text-white text-[15px] font-medium rounded-[10px] h-[45px] w-full cursor-pointer"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Please wait..." : "Sign In"}
      </button>

      {/* Error Message */}
      {error && <p className="text-center text-red-400">{error}</p>}

      {/* Sign Up Link - 修复嵌套 */}
      <p className="text-center text-black text-sm">
        Don't have an account?{" "}
        <Link href="/register" legacyBehavior>
          <a className="text-[#2d79f3] hover:underline font-medium">Sign Up</a>
        </Link>
      </p>

      {/* Or With Divider */}
      <p className="text-center text-black text-sm">Or With</p>

      {/* Google Login */}
      <button
        className="w-full h-[50px] rounded-[10px] flex justify-center items-center font-medium gap-2 border border-[#ededef] bg-white cursor-pointer hover:border-[#2d79f3] transition-all duration-200"
        onClick={(e) => {
          e.preventDefault();
          handleGoogleLogin();
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Google_Chrome_icon_%28February_2022%29.svg/1280px-Google_Chrome_icon_%28February_2022%29.svg.png"
          alt="Google"
          className="h-6 w-6"
        />
        <span>Sign in with Google</span>
      </button>
    </form>
  );

};

export default LoginForm;
