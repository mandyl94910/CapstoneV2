import React from "react";

const EditProfilePicture = ({ profilePicture, handleProfilePictureChange }) => {
  return (
    <div className="mb-6 flex flex-col items-center">
      <img
        src={profilePicture}
        alt="Profile"
        className="w-32 h-32 rounded-full mb-4"
      />
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor="profilePicture"
      >
        Change Profile Picture
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleProfilePictureChange}
        className="border rounded p-2"
      />
    </div>
  );
};

export default EditProfilePicture;
