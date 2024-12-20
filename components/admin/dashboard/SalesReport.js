import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

/*
  Sales Report Line Chart using react-chartjs-2 with Chart.js.
  - Reference for integration with Chart.js: 
    ReplayBird (https://replaybird.com/blog/react-chartjs-2-graphs)
  The data is hardcoded, but this can be replaced with dynamic data fetched from Database.
*/

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesReport = () => {
  // Example data for monthly sales
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Sales ($)",
        data: [
          3000, 2500, 3200, 2900, 3600, 4000, 4500, 4200, 4700, 5000, 5500,
          6000,
        ],
        borderColor: "rgba(59, 130, 246, 1)", // Blue
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        tension: 0.4, // Curve of the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="p-4 bg-white shadow-md rounded border border-indigo-500">
      <div className="grid grid-cols-4 gap-4">
        {/* Line Chart for Monthly Sales */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default SalesReport;
