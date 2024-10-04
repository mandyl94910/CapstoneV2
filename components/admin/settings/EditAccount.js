///C:\CPRG306\CapstoneV2\components\admin\settings\EditAccount.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import EditProfilePicture from "./EditProfilePicture";
import EditField from "./EditField";
import { useRouter } from "next/router";

const EditAccount = () => {
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    title: "",
    profilePicture: "",
  });

  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/profile-admin")
      .then((response) => {
        setAdminDetails({
          name: response.data.name || "",
          title: response.data.title || "",
          profilePicture:
            `/images/${response.data.image}` ||
            "https://via.placeholder.com/150",
        });
      })
      .catch((error) => console.error("Error fetching admin details:", error));
  }, []);

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
      setSelectedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setNewProfilePicture(imageUrl);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", adminDetails.name);
    formData.append("title", adminDetails.title);
    if (selectedFile) {
      formData.append("profilePicture", selectedFile);
    } else {
      console.log("No file selected.");
      alert("Please select a file to upload.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3001/api/update-admin",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Admin details updated successfully!");
      //  // We want updated avatars to show up immediately,
      //rather than showing the old avatar due to browser caching issues.
      //We add a timestamp parameter to the URL on the page jump.
      router.push(`/admin/settings/settings?time=${new Date().getTime()}`);
    } catch (error) {
      console.error("Error updating admin details:", error);
      alert("Failed to update admin details.");
    }
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
