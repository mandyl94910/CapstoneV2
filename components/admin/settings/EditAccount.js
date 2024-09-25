import React, { useState } from "react";
import EditProfilePicture from "./EditProfilePicture";
import EditField from "./EditField";

const EditAccount = () => {
  const [adminDetails, setAdminDetails] = useState({
    name: "Admin Name",
    title: "Administrator",
    profilePicture: "https://via.placeholder.com/150",
  });

  const [newProfilePicture, setNewProfilePicture] = useState(null);

  // Handle input changes for name and email fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails({
      ...adminDetails,
      [name]: value,
    });
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProfilePicture(imageUrl);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Update profile picture if changed
    const updatedProfilePicture =
      newProfilePicture || adminDetails.profilePicture;
    setAdminDetails({
      ...adminDetails,
      profilePicture: updatedProfilePicture,
    });
    alert("Admin details updated!");
  };

  return (
    <div className="flex-1 p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Edit Account Detail</h1>
      <div className="flex flex-col items-center mt-8">
        <form
          onSubmit={handleSubmit}
          className="w-1/3 bg-white p-6 rounded shadow-md"
        >
          <EditProfilePicture
            profilePicture={newProfilePicture || adminDetails.profilePicture}
            handleProfilePictureChange={handleProfilePictureChange}
          />
          <EditField
            label="Name"
            name="name"
            value={adminDetails.name}
            handleChange={handleChange}
            placeholder="Enter your name"
          />
          <EditField
            label="Title"
            name="title"
            value={adminDetails.title}
            handleChange={handleChange}
            placeholder="Enter your title"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAccount;
