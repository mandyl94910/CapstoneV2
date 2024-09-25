import React, { useState } from "react";
import { FaEye, FaBox, FaUsers, FaDollarSign } from "react-icons/fa";

const Stats = () => {
  const [statsData, setStatsData] = useState([
    {
      id: 1,
      icon: <FaEye />,
      title: "Total Views",
      value: 154,
      date: "28 June 2024",
    },
    {
      id: 2,
      icon: <FaBox />,
      title: "Total Products",
      value: 59,
      date: "28 June 2024",
    },
    {
      id: 3,
      icon: <FaUsers />,
      title: "Total Users",
      value: 25,
      date: "28 June 2024",
    },
    {
      id: 4,
      icon: <FaDollarSign />,
      title: "Total Sales",
      value: "$740.25",
      date: "28 June 2024",
    },
  ]);

  return (
    <div className="grid grid-cols-4 gap-4 my-6 ">
      {statsData.map((statsData) => (
        <div
          key={statsData.id}
          className="p-4 flex flex-col items-left rounded shadow-md border border-indigo-500"
        >
          <div className="text-3xl text-indigo-500 ">{statsData.icon}</div>
          <p className="text-md font-semibold mt-2">{statsData.title}</p>
          <p className="text-3xl pb-4">{statsData.value}</p>
          <span className="text-sm text-gray-500 border-t-2 border-gray-400 pt-2">
            Based on {statsData.date}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stats;
