// components/user/checkout/UserInfo.js
import React from "react";

const UserInfo = ({ formData = {} }) => {
  const {
    first_name = "",
    last_name = "",
    phone = "",
    street = "",
    city = "",
    province = "",
    postal = "",
    country = "Canada",
  } = formData;

  return (
    <div className="border border-slate-400 p-4 rounded-lg mb-4">
      {/* Name */}
      <div className="flex justify-between items-center">
        <p className="text-slate-500">Name</p>
        <p className="font-semibold">
          {first_name} {last_name}
        </p>
      </div>
      <hr className="my-2" />

      {/* Contact */}
      <div className="flex justify-between items-center">
        <p className="text-slate-500">Contact</p>
        <p className="font-semibold">{phone}</p>
      </div>
      <hr className="my-2" />

      {/* Shipping Address */}
      <div className="flex justify-between items-center">
        <p className="text-slate-500">Ship to</p>
        <p className="font-semibold">
          {street}, {city}, {province} {postal}, {country}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
