import React, { useState, useEffect } from "react";
import { FaTruck, FaBox, FaUsers, FaDollarSign } from "react-icons/fa";
import axios from "axios";

const Stats = () => {
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all([
          axios.get("http://localhost:3001/api/total-products"),
          axios.get("http://localhost:3001/api/total-users"),
          axios.get("http://localhost:3001/api/total-sales"),
          axios.get("http://localhost:3001/api/total-orders"),
        ]);

        const data = [
          {
            id: 1,
            icon: <FaTruck className="text-slate-500" />,
            title: "Total Orders",
            value: responses[3].data.totalOrders,
            date: new Date().toLocaleDateString("en-CA"),
          },
          {
            id: 2,
            icon: <FaBox className="text-green-500" />,
            title: "Total Products",
            value: responses[0].data.totalProducts,
            date: new Date().toLocaleDateString("en-CA"),
          },
          {
            id: 3,
            icon: <FaUsers className="text-indigo-500" />,
            title: "Total Users",
            value: responses[1].data.totalUsers,
            date: "the Data from 2023-05-06",
          },
          {
            id: 4,
            icon: <FaDollarSign className="text-red-500" />,
            title: "Total Sales",
            value: `$${responses[2].data.totalSales.toFixed(2)}`,
            date: new Date().toLocaleDateString("en-CA"),
          },
        ];

        setStatsData(data);
      } catch (error) {
        console.error("Error fetching stats data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 my-6 ">
      {statsData.map((statsData) => (
        <div
          key={statsData.id}
          className="p-4 flex flex-col items-left rounded shadow-md border border-indigo-500"
        >
          <div className="text-3xl">{statsData.icon}</div>
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
