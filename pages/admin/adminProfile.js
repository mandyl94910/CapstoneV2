import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import InfoBox from "../../components/admin/settings/InfoBox";
import axios from "axios";

export default function adminProfile() {
  // State to store admin details
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    email: "",
    pin: "", // Store PIN number
    password: "", // Store password
  });

  // States to control PIN and Password visibility
  const [showPin, setShowPin] = useState(false); // State to show/hide PIN
  const [showPassword, setShowPassword] = useState(false); // State to show/hide Password

  // Fetch admin details from API on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/profile-admin") // Replace with your actual API endpoint
      .then((response) => {
        setAdminDetails({
          name: response.data.name || "Admin", // Set name or fallback to "Admin"
          email: response.data.email || "admin@example.com", // Set email or fallback to placeholder
          pin: response.data.pin || "1234", // Fallback PIN for demonstration (replace with real data)
          password: response.data.password || "password123", // Fallback Password for demonstration
        });
      })
      .catch((error) => {
        console.error("Error fetching admin details:", error);
        alert("Failed to load admin profile. Please try again later.");
      });
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-100">
        {/* Header Component */}
        <Header title="Profile Details" />

        {/* Profile Information Section */}
        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
          {/* Grid layout to separate details into individual boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Using InfoBox component to display each profile detail */}
            <InfoBox title="Name">{adminDetails.name}</InfoBox>
            <InfoBox title="Email">{adminDetails.email}</InfoBox>

            {/* PIN Number Box */}
            <InfoBox title="PIN Number">
              {/* Toggle button to show/hide PIN number */}
              {showPin ? adminDetails.pin : "****"}
              <button
                className="ml-4 text-slate-500 hover:text-indigo-500"
                onClick={() => setShowPin(!showPin)} // Toggle PIN visibility
              >
                {showPin ? "Hide" : "Show"}
              </button>
            </InfoBox>

            {/* Password Box */}
            <InfoBox title="Password">
              {/* Toggle button to show/hide password */}
              {showPassword ? adminDetails.password : "********"}
              <button
                className="ml-4 text-slate-500 hover:text-indigo-500"
                onClick={() => setShowPassword(!showPassword)} // Toggle Password visibility
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </InfoBox>

            {/* Additional Information using the same InfoBox component */}
            <InfoBox title="Additional Information">
              <ul className="list-disc pl-5 text-gray-600">
                <li>Account created: January 1, 2022</li>
                <li>Last login: October 10, 2023</li>
              </ul>
            </InfoBox>
          </div>
        </div>
      </div>
    </div>
  );
}
