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
    if (typeof window !== "undefined") {
      setIsClient(true);

      const initRecaptcha = () => {
        if (window.grecaptcha && window.grecaptcha.render) {
          try {
            const container = document.getElementById("login-recaptcha");
            if (container && !container.hasChildNodes()) {
              const widgetId = window.grecaptcha.render("login-recaptcha", {
                sitekey: "6LfBy0IqAAAAACglebXLEuKwhzW1B1Y_u8V713SJ",
                callback: () => {
                  setError(""); // Clear error when user completes captcha
                },
                "expired-callback": () => {
                  window.grecaptcha.reset(recaptchaWidget);
                },
              });
              setRecaptchaWidget(widgetId);
            }
          } catch (e) {
            console.error("reCAPTCHA render error:", e);
          }
        } else {
          setTimeout(initRecaptcha, 100);
        }
      };

      // Wait for grecaptcha to be ready
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(initRecaptcha);
      } else {
        setTimeout(initRecaptcha, 100);
      }

      // Cleanup function
      return () => {
        if (recaptchaWidget !== null && window.grecaptcha) {
          try {
            window.grecaptcha.reset(recaptchaWidget);
          } catch (e) {
            console.error("Error resetting reCAPTCHA:", e);
          }
        }
      };
    }
  }, []);

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
      recaptchaResponse = window.grecaptcha.getResponse(recaptchaWidget);
    } catch (e) {
      console.error("Error getting reCAPTCHA response:", e);
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
      {/* 输入框组件 - 减小高度和间距 */}
      <div className="flex-column">
        <label className="text-[#151717] font-semibold mb-1" htmlFor="identifier">
          Username
        </label>
        <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[45px] flex items-center px-3 focus-within:border-[#2d79f3]">
          <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 32 32" height={20}>
            <g data-name="Layer 3" id="Layer_3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
            </g>
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

      {/* Password field */}
      <div className="flex-column">
        <label className="text-[#151717] font-semibold mb-2" htmlFor="password">
          Password
        </label>
        <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center px-3 focus-within:border-[#2d79f3]">
          <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="-64 0 512 512" height={20}>
            <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
            <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969-16-16-16s-16 7.167969-16 16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
          </svg>
          <input
            className="ml-2 rounded-[10px] border-none w-full h-full focus:outline-none"
            id="password"
            type="password"
            placeholder="Enter your Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            disabled={isLoading}
          />
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
