import React from "react";

const Sales = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h3 className="text-lg font-semibold mb-4">Monthly Sale Report</h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-blue-500 h-20 flex items-end justify-center text-white">
          April
        </div>
        <div className="bg-blue-500 h-10 flex items-end justify-center text-white">
          May
        </div>
        <div className="bg-blue-500 h-16 flex items-end justify-center text-white">
          June
        </div>
        <div className="bg-blue-500 h-40 flex items-end justify-center text-white">
          July
        </div>
      </div>
    </div>
  );
};

export default Sales;
