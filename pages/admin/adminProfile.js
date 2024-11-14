import React, { useEffect, useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import InfoBox from "../../components/admin/settings/InfoBox";
import axios from "axios";
import ProtectionPage from "./protection";

export default function adminProfile() {
  const [adminDetails, setAdminDetails] = useState({
    name: "",
    email: "",
    pin: "",
    password: "",
  });
  const [showPin, setShowPin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [requirePin, setRequirePin] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/profile-admin")
      .then((response) => {
        setAdminDetails({
          name: response.data.name || "Admin",
          email: response.data.email || "admin@example.com",
          pin: response.data.pin || "1234",
          password: response.data.password || "password123",
        });
      })
      .catch((error) => {
        console.error("Error fetching admin details:", error);
        alert("Failed to load admin profile. Please try again later.");
      });
  }, []);

  const handleSave = () => {
    axios
      .put("http://localhost:3001/api/profile-admin", adminDetails)
      .then((response) => {
        alert("Profile updated successfully!");
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      });
  };

  // 조건부로 ProtectionPage 렌더링
  if (requirePin) {
    return (
      <ProtectionPage
        correctPin={adminDetails.pin}
        onSuccess={() => {
          setRequirePin(false); // PIN 인증 성공 시 인증 모드 종료
          setIsEditing(true); // 인증 성공 시 수정 모드로 전환
        }}
        onFailure={() => {
          alert("Incorrect PIN. Please try again.");
        }}
      />
    );
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header title="Profile Details" />

        <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoBox title="Name">{adminDetails.name}</InfoBox>
            <InfoBox title="Email">{adminDetails.email}</InfoBox>

            <InfoBox title="PIN Number">
              {isEditing ? (
                <input
                  type="text"
                  value={adminDetails.pin}
                  onChange={(e) =>
                    setAdminDetails({ ...adminDetails, pin: e.target.value })
                  }
                  className="border rounded p-1"
                />
              ) : (
                <>
                  {showPin ? adminDetails.pin : "****"}
                  <button
                    className="ml-4 text-slate-500 hover:text-indigo-500"
                    onClick={() => setShowPin(!showPin)}
                  >
                    {showPin ? "Hide" : "Show"}
                  </button>
                </>
              )}
            </InfoBox>

            <InfoBox title="Password">
              {isEditing ? (
                <input
                  type="password"
                  value={adminDetails.password}
                  onChange={(e) =>
                    setAdminDetails({
                      ...adminDetails,
                      password: e.target.value,
                    })
                  }
                  className="border rounded p-1"
                />
              ) : (
                <>
                  {showPassword ? adminDetails.password : "********"}
                  <button
                    className="ml-4 text-slate-500 hover:text-indigo-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </>
              )}
            </InfoBox>

            <InfoBox title="Additional Information">
              <ul className="list-disc pl-5 text-gray-600">
                <li>Account created: January 1, 2022</li>
                <li>Last login: October 10, 2023</li>
              </ul>
            </InfoBox>
          </div>

          <div className="flex justify-end mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded mr-4"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-indigo-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <button
                onClick={() => setRequirePin(true)}
                className="bg-indigo-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
