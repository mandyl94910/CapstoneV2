// useState is a React hook that allows functional components to have and manage state 
// by returning a state variable and a function to update it. 
// useEffect is another hook that lets you handle side effects like data fetching, 
// subscriptions, or manually updating the DOM after a component renders. 
// The useEffect hook can be triggered conditionally based on dependencies, 
// ensuring effects only run when specific state values change. Together, 
// these hooks enable dynamic, stateful, and side-effect-driven behavior 
// in functional components without needing to convert them into class components.
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
// Axios is a popular JavaScript library used to make HTTP requests from the browser or 
// Node.js. It is often used in React and other frontend frameworks to interact with APIs 
// by sending requests (like GET, POST, PUT, DELETE) and handling responses.
import axios from "axios";

// Chart as ChartJS:
// Chart is the core class of the chart.js library, responsible for creating and managing chart instances.
// The as keyword renames Chart to ChartJS in this context to avoid potential naming conflicts with other Chart variables or classes in the project.
// 2. CategoryScale:
// CategoryScale is a component used for categorical axes in chart.js, typically for the X-axis. It handles categorical data (such as months, years, or product names) instead of numerical data.
// For example, if your X-axis shows categories like "January", "February", etc., CategoryScale is used.
// 3. LinearScale:
// LinearScale is a component used for creating linear scales, typically for the Y-axis. It is used to represent continuous data, such as sales, temperature, or scores.
// For example, if your Y-axis shows sales amounts or product quantities, LinearScale generates a linear scale from the minimum to maximum values.
// 4. PointElement:
// PointElement defines the appearance of data points in line or scatter charts. It controls the shape, size, and color of the points displayed on the chart.
// For example, the circular data points in a line chart are managed by PointElement.
// 5. LineElement:
// LineElement is responsible for drawing the lines in a line chart. It controls the appearance of the lines connecting data points, such as their color, width, and smoothness.
// 6. Title:
// Title is used to add a title to the chart. It allows you to display a heading or description at the top of the chart.
// 7. Tooltip:
// Tooltip is the component that manages the tooltips that appear when hovering over data points on the chart. It provides additional information about a data point when a user hovers over it.
// 8. Legend:
// Legend is responsible for displaying the legend on the chart, which helps users understand the different datasets by labeling them with corresponding colors or markers.

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
ChartJS.register( // The ChartJS.register method is used to register the components from the chart.js library that you want to use in your application.    
  CategoryScale,  // By registering only the required components, you reduce the size of the final bundle and optimize performance, as chart.js follows a modular design.
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
    // Maps each element of the salesData array (a sales record) to a chart X-axis label
    const labels = salesData.map((item) => {
      const periodDate = new Date(item.period);
      //conditional judgment, if the period is yearly, only show the year
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
            const datasetLabel = tooltipItem.dataset.label || '';//falsy values are replaced with empty string
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
