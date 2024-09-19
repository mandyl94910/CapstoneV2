import React from "react";
import {
  FaUsers,
  FaUserPlus,
  FaUserMinus,
  FaBox,
  FaDollarSign,
  FaTruck,
  FaTags,
} from "react-icons/fa";

const InfoCards = ({ stats }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="flex flex-col justify-center items-center p-6 bg-white rounded shadow-md h-full"
        >
          <div className="mb-4">
            {stat.title === "Total Users" && (
              <FaUsers className="text-4xl text-indigo-500" />
            )}
            {stat.title === "New Users" && (
              <FaUserPlus className="text-4xl text-green-500" />
            )}
            {stat.title === "Withdrawal Users" && (
              <FaUserMinus className="text-4xl text-red-500" />
            )}
            {stat.title === "Total Products" && (
              <FaBox className="text-4xl text-green-500" />
            )}
            {stat.title === "Total Sales" && (
              <FaDollarSign className="text-4xl text-red-500" />
            )}
            {stat.title === "Total Orders" && (
              <FaTruck className="text-4xl text-indigo-500" />
            )}
            {stat.title === "Total Categories" && (
              <FaTags className="text-4xl text-indigo-500" />
            )}
            {stat.title === "Total Values" && (
              <FaDollarSign className="text-4xl text-red-500" />
            )}
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold">{stat.title}</h3>
            <p className="text-3xl font-bold pb-2">{stat.value}</p>
            <span className="text-sm text-gray-500 border-t-2 border-gray-400 pt-2">
              {stat.description}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InfoCards;
