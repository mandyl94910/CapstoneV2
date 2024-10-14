import React from "react";

const ContactForm = ({ handleLogin }) => {
  return (
    <div className="mb-6 relative">
      <label className="block mb-2 text-md">Contact</label>
      <input
        type="email"
        className="w-full border rounded px-3 py-2"
        placeholder="Enter your email"
      />
      <label className="flex items-center mt-3">
        <input type="checkbox" className="form-checkbox" />
        <span className="ml-2">Email me with news and offers</span>
      </label>
      {/* 로그인 버튼을 input 위에 절대 위치로 배치 */}
      <button
        className="absolute right-0 top-5 text-sm underline"
        style={{ transform: "translateY(-50%)" }}
        onClick={handleLogin}
      >
        Log in
      </button>
    </div>
  );
};

export default ContactForm;
