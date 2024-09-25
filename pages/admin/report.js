import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import ReportManagement from "../../components/admin/management/ReportManagement";

const Report = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header title="Sales Report" />
        <ReportManagement />
      </div>
    </div>
  );
};

export default Report;
