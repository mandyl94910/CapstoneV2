// C:\CPRG306\CapstoneV2\components\auth\ForgetPasswordForm.js
import React, { useState } from 'react';
import axios from 'axios';

const ForgetPasswordForm = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState(''); // 用户输入的邮箱
  const [message, setMessage] = useState(''); // 显示成功或错误信息
  const [isLoading, setIsLoading] = useState(false); // 加载状态

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // 发送请求到后端处理忘记密码逻辑
    axios.post('http://localhost:3001/api/verify-email', { email })
        .then((res) => {
            // 成功时的日志输出
            console.log('Response:', res.data);
            if (res.data.exists) {
                // 如果邮箱存在，调用后端函数发送重置密码邮件
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
        // 无论成功还是失败，都显示相同的提示消息
        setMessage('If your email exists, we will send a verification link. Please check your inbox.');
      });
  };

  return (
    <form className="w-full max-w-sm" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email Address
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>
      <button
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full focus:outline-none focus:shadow-outline mt-3"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? 'Please wait...' : 'Verify'}
      </button>

      {message && (
        <p className="text-center mt-2 text-green-500">{message}</p>
      )}

      <div className="text-center mt-2">
        <button type="button" className="text-blue-600 hover:underline" onClick={onSwitchToLogin}>
          Back to Login
        </button>
      </div>
    </form>
  );
};

export default ForgetPasswordForm;
