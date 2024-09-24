import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import ReportManagement from "../../components/admin/management/ReportManagement ";
import InfoCards from "../../components/admin/management/InfoCards";

// Example data for InfoCards
const productStats = [
  { title: "Total Products", value: "72", description: "Based on June 2024" },
  { title: "Total Categories", value: "15", description: "Based on June 2024" },
  { title: "Total Values", value: "$3.2M", description: "Based on June 2024" },
];

const Report = () => {
  return (
    <div className="flex">
      {/* Sidebar Component */}
      <Sidebar />

      <div className="flex-1 p-6 bg-gray-100">
        {/* Header Component */}
        <Header title="Sales Report" />

        {/* ReportManagement for Sales Report */}
        <ReportManagement />
      </div>
    </div>
  );
};

export default Report;
