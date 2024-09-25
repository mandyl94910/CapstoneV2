import React from "react";

const Profile = ({adminId}) => {

  const imgSrc = `/images/admin/${adminId}.webp`;
  console.log(imgSrc)

  return (
    <div className="flex flex-col items-center">
      <img
        src={imgSrc}
        alt="Admin Profile"
        className="w-64 h-64 rounded-full border-2 border-black"
      />
      <h1 className="text-2xl font-bold mt-4">
        Hello! <span className="text-black">Admin</span>
      </h1>
    </div>
  );
};

export default Profile;
