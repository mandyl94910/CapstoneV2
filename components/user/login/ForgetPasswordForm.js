import React, { useState } from 'react';
import axios from 'axios';

const ForgetPasswordForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [isLoading, setIsLoading] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Send a request to the backend to process the forgotten password logic
    axios.post('http://localhost:3001/api/verify-email', { email })
        .then((res) => {
            // Logic on success
            console.log('Response:', res.data);
            if (res.data.exists) {
                // If the mailbox exists, call the backend function to send a password reset email
                axios.post('http://localhost:3001/api/send-reset-password-email', { email: res.data.email })
                  .then(() => {
                    console.log('Reset password email sent.');
                  })
                  .catch((err) => {
                    console.error('Error sending reset password email:', err);
                  });
              }
        })
      .finally(() => {
        setIsLoading(false);
        // Display the same alert message whether it succeeds or fails
        setMessage('If your email exists, we will send a verification link. Please check your inbox.');
      });
  };

  return (
    <form 
      className="flex flex-col flex-1 gap-2.5 w-full" // 改用更小的 gap，使用 flex-1
      onSubmit={handleSubmit}
    >
      <div className="flex-column w-full">
        <label className="text-[#151717] font-semibold mb-1 block" htmlFor="email">
          Email Address
        </label>
        <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[45px] flex items-center px-3 focus-within:border-[#2d79f3]">
          <svg xmlns="http://www.w3.org/2000/svg" width={20} viewBox="0 0 32 32" height={20}>
            <g data-name="Layer 3" id="Layer_3">
              <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
            </g>
          </svg>
          <input
            className="ml-2 rounded-[10px] border-none w-full h-full focus:outline-none"
            id="email"
            type="email"
            placeholder="Enter your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      <button
        className="mt-3 bg-[#151717] text-white text-[15px] font-medium rounded-[10px] h-[45px] w-full cursor-pointer"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Please wait...' : 'Verify'}
      </button>

      {message && (
        <p className="text-center mt-2 text-green-500">{message}</p>
      )}

      <div className="text-center mt-4">
        <button 
          type="button" 
          className="text-[#2d79f3] text-sm hover:underline font-medium"
          onClick={onSwitchToLogin}
        >
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
