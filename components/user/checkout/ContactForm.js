import React from "react";

const ContactForm = ({ handleLogin }) => {
  return (
    <div className="mb-6 relative">
      <label className="block mb-2 text-xl font-semibold">Contact</label>
      <input
        type="email"
        className="w-full border rounded-lg px-4 py-3 focus:border-blue-800 focus:outline-none"
        placeholder="Enter your email"
      />
      <label className="flex items-center mt-3">
        <input type="checkbox" className="form-checkbox" />
        <span className="ml-2">Email me with news and offers</span>
      </label>
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
