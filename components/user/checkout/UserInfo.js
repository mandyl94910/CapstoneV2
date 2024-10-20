// components/user/checkout/ShippingInfo.js
import React from "react";

const UserInfo = ({ formData }) => {
  return (
    <div className="border border-slate-400 p-4 rounded-lg mb-4">
      {/* Name */}
      <div className="flex justify-between items-center">
        <p className="text-slate-500">Name</p>
        <p className="font-semibold">
          {formData.first_name} {formData.last_name}
        </p>
      </div>
      <hr className="my-2" />

      {/* Contact */}
      <div className="flex justify-between items-center">
        <p className="text-slate-500">Contact</p>
        <p className="font-semibold">{formData.phone}</p>
      </div>
      <hr className="my-2" />

      {/* Shipping Address */}
      <div className="flex justify-between items-center">
        <p className="text-slate-500">Ship to</p>
        <p className="font-semibold">
          {formData.street}, {formData.city}, {formData.province}{" "}
          {formData.postal}, {formData.country}
        </p>
      </div>
    </div>
  );
};

export default UserInfo;
