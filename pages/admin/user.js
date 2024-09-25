import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import UserManagement from "../../components/admin/management/UserManagement";

const UserPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header title="User Management" />
        <UserManagement />
      </div>
    </div>
  );
};

export default UserPage;
