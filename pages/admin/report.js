import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import ReportContent from "../../components/admin/report/ReportContent";
/**
 * helped by chatGPT
 * prompt: 
 */
const Report = () => {
  const [selectedReport, setSelectedReport] = useState("sales");

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header title="Reports" />
        <ReportContent
          selectedReport={selectedReport}
          setSelectedReport={setSelectedReport}
        />
      </div>
    </div>
  );
};

export default Report;
