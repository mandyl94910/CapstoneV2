import React, { useState } from "react";

const Stats = () => {
  // Stats 데이터를 useState로 관리
  const [stats, setStats] = useState([
    { id: 1, icon: "icon-views", title: "Total Views", value: 154, date: "28 June 2024" },
    { id: 2, icon: "icon-products", title: "Total Products", value: 59, date: "28 June 2024" },
    { id: 3, icon: "icon-users", title: "Total Users", value: 25, date: "28 June 2024" },
    { id: 4, icon: "icon-sales", title: "Total Sales", value: "$740.25", date: "28 June 2024" },
  ]);

  return (
    <div className="grid grid-cols-4 gap-4 my-6">
      {stats.map((stat) => (
        <div key={stat.id} className="p-4 bg-indigo-100 rounded shadow-md flex flex-col items-center">
          <i className={`${stat.icon} text-3xl text-indigo-500`}></i>
          <h3 className="text-lg font-semibold mt-2">{stat.title}</h3>
          <p className="text-xl">{stat.value}</p>
          <span className="text-sm text-gray-500">Based on {stat.date}</span>
        </div>
      ))}
    </div>
  );
};

export default Stats;
