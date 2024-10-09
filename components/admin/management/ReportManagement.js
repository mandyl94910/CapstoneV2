import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
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
  knoldus https://blog.knoldus.com/how-to-render-charts-in-react-using-react-chartjs-2-and-chart-js/ 
  ReplayBird (https://replaybird.com/blog /react-chartjs-2-graphs)
  ** this blog was main reference to make the code but unfortunately the post was deleted 
  ** The data is now fetched dynamically from the backend using axios.
*/

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ReportManagement = () => {
  const [period, setPeriod] = useState("monthly"); // State to handle selected period
  const [salesData, setSalesData] = useState([]); // State to store fetched sales data

  // useEffect to fetch data from the backend when the period changes
  useEffect(() => {
    async function fetchSalesData() {
      try {
        // Backend API request to fetch sales data for the selected period
        const response = await axios.get(
          `http://localhost:3001/api/sales-report?period=${period}`
        );
        setSalesData(response.data); // Store the fetched data into state
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    }
    fetchSalesData(); // Fetch sales data when component mounts or period changes
  }, [period]);

  // Function to format the chart data based on the fetched sales data
  const getChartData = () => {
    // Map the sales data to chart labels (periods) and values (total sales)
    const labels = salesData.map((item) => {
      const periodDate = new Date(item.period);
      return period === "yearly"
        ? periodDate.getFullYear()  // If yearly, just show the year
        : periodDate.toLocaleDateString();  // Otherwise, show full date
    });
    const data = {
      labels,
      datasets: [
        {
          label: `Sales Data (${period.charAt(0).toUpperCase() + period.slice(1)})`, // Chart label
          data: salesData.map((item) => item.total_sales), // Sales values
          borderColor: "rgba(72, 187, 120, 1)", // Green
          backgroundColor: "rgba(156, 163, 175, 0.5)", // Gray background
          fill: true,
          tension: 0.4, // Smoothing of the line
        },
      ],
    };
    return data;
  };

  // Chart options to configure responsiveness and aspect ratio
  const options = {
    responsive: true,
    maintainAspectRatio: false, // Disable the default aspect ratio
    plugins: {
      legend: {
        position: "top", // Position the legend at the top of the chart
      },
      tooltip: {
        callbacks: {
          // Custom callback for tooltip to show both sales data and order count
          label: function (tooltipItem) {
            const datasetLabel = tooltipItem.dataset.label || '';
            const value = tooltipItem.raw;
            return `${datasetLabel}: ${value}`;
          },
          afterLabel: function (tooltipItem) {
            const orderCount = salesData[tooltipItem.dataIndex].order_count; // Fetch the corresponding order count
            return `Order Count: ${orderCount}`;
          }
        }
      }
    },
  };

  return (
    <div className="p-4 bg-white shadow-md rounded border-t-2 border-b-2">
      {/* Buttons for selecting Weekly, Monthly, Yearly */}
      <div className="mb-4 space-x-4">
        <button
          className={`py-2 px-4 rounded ${
            period === "weekly" ? "bg-indigo-400 text-white" : "bg-gray-300"
          }`}
          onClick={() => setPeriod("weekly")}
        >
          Weekly
        </button>
        <button
          className={`py-2 px-4 rounded ${
            period === "monthly" ? "bg-indigo-400 text-white" : "bg-gray-300"
          }`}
          onClick={() => setPeriod("monthly")}
        >
          Monthly
        </button>
        <button
          className={`py-2 px-4 rounded ${
            period === "yearly" ? "bg-indigo-400 text-white" : "bg-gray-300"
          }`}
          onClick={() => setPeriod("yearly")}
        >
          Yearly
        </button>
      </div>

      {/* Chart rendering */}
      <div className="h-80">
        {" "}
        {/* Adjust height as needed */}
        <Line data={getChartData()} options={options} />
      </div>
    </div>
  );
};

export default ReportManagement;
