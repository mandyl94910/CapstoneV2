import React from "react";
import Sidebar from "../../../components/admin/Sidebar";
import Header from "../../../components/admin/Header";
import Profile from "../../../components/admin/settings/Profile";
import Buttons from "../../../components/admin/settings/Buttons";

export default function Settings() {
  const adminId = 1;

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header title="Settings" />
        <div className="flex flex-col items-center mt-8">
          <Profile adminId={adminId}/>
          <Buttons />
        </div>
      </div>
    </div>
  );
}
