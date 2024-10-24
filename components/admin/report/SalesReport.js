import React, { useState, useEffect } from "react";
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
  Filler,
} from "chart.js";
import axios from "axios";

// Register necessary components for Chart.js, including the Filler plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SalesReport = () => {
  const [year, setYear] = useState("2024");
  const [month, setMonth] = useState("January");
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    async function fetchSalesData() {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/sales-report?year=${year}&month=${month}`
        );
        setSalesData(response.data);
        console.log("Fetched sales data:", response.data); // Log the fetched sales data
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    }

    fetchSalesData();
  }, [year, month]);

  const daysInMonth = new Date(
    year,
    new Date(`${month} 1, ${year}`).getMonth() + 1,
    0
  ).getDate();

  const getChartData = () => {
    const labels = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, new Date(`${month} 1, ${year}`).getMonth(), i + 1);
      return date.toISOString().split('T')[0];
    });
  
    const data = {
      labels,
      datasets: [
        {
          label: `Sales Data (${month} ${year})`,
          data: labels.map((formattedDate) => {
            const dayData = salesData.find((item) => item.period === formattedDate);
            return dayData ? dayData.total_sales : 0;
          }),
          borderColor: "rgba(72, 187, 120, 1)",
          backgroundColor: "rgba(156, 163, 175, 0.5)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
    console.log("Chart data:", data); // Log the chart data
    return data;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const datasetLabel = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw;
            return `${datasetLabel}: ${value}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax:
          Math.max(...salesData.map((item) => item.total_sales)) * 1.2 || 10,
      },
    },
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Sales Data</h2>
        <div className="flex space-x-2">
          <select
            className="border px-2 py-1 rounded"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            {Array.from({ length: 11 }, (_, i) => (2020 + i).toString()).map(
              (year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              )
            )}
          </select>
          <select
            className="border px-2 py-1 rounded"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {[
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ].map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="h-64">
        <Line data={getChartData()} options={options} />
      </div>
    </div>
  );
};

export default SalesReport;
