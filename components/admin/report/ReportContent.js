import React from "react";
import SalesReport from "./SalesReport";
import TopSalesByCategory from "./TopSalesByCategory";
import TopSalesByProduct from "./TopSalesByProduct";
import OrderSummary from "./OrderSummary";
/**
 * helped by chatGPT
 * prompt: 
 */
const ReportContent = ({ selectedReport, setSelectedReport }) => {
  return (
    <div className="bg-white shadow-md rounded-t-lg border border-gray-300">
      <div className="flex space-x-4 p-2">
        <div
          className={`cursor-pointer py-2 px-4 ${
            selectedReport === "sales"
              ? "bg-slate-500 text-white border-b-2 border-gray-400"
              : "bg-gray-300 text-gray-600"
          }`}
          onClick={() => setSelectedReport("sales")}
        >
          Sales Report
        </div>
        <div
          className={`cursor-pointer py-2 px-4 ${
            selectedReport === "customer"
              ? "bg-slate-500 text-white border-b-2 border-gray-400"
              : "bg-gray-300 text-gray-600"
          }`}
          onClick={() => setSelectedReport("customer")}
        >
          Customer Location Report
        </div>
      </div>

      {selectedReport === "sales" && (
        <div className="pb-4 px-4 bg-gray-50 w-full h-full">
          <div className="flex space-x-4">
            <div className="w-1/2 bg-white p-4 rounded-md shadow">
              <OrderSummary />
            </div>
            <div className="w-1/2 bg-white p-4 rounded-md shadow">
              <SalesReport />
            </div>
          </div>
          <TopSalesByCategory />
          <TopSalesByProduct />
        </div>
      )}
    </div>
  );
};

export default ReportContent;
