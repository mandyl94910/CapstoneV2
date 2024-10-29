import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const TopSalesByCategory = () => {
  const [sortOrder, setSortOrder] = useState("highToLow");
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const hardcodedCategoryData = [
      { category: 'Smartphones', sales: 100 },
      { category: 'Phone Cases', sales: 60 },
      { category: 'Headphones', sales: 80 },
      { category: 'Chargers', sales: 15 },
      { category: 'Laptops', sales: 90 },
      { category: 'Desktops', sales: 30 },
      { category: 'Keyboards', sales: 45 },
      { category: 'Mice', sales: 15 },
      { category: 'Monitors', sales: 50 },
      { category: 'Televisions', sales: 40 },
      { category: 'Sound Systems', sales: 10 },
      { category: 'Projectors', sales: 10 },
      { category: 'Gaming Consoles', sales: 70 },
      { category: 'Controllers', sales: 10 },
      { category: 'VR Devices', sales: 15 },
      { category: 'Cameras', sales: 60 },
      { category: 'Lenses', sales: 10 },
      { category: 'Tripods', sales: 5 },
      { category: 'Smartwatches', sales: 60 },
      { category: 'Fitness Trackers', sales: 15 },
      { category: 'Printers', sales: 10 },
      { category: 'Scanners', sales: 5 },
      { category: 'Fax Machines', sales: 5 },
    ];

    // Sort the data based on the selected sort order
    const sortedData =
      sortOrder === "highToLow"
        ? hardcodedCategoryData.sort((a, b) => b.sales - a.sales)
        : hardcodedCategoryData.sort((a, b) => a.sales - b.sales);

    setCategoryData(sortedData);
  }, [sortOrder]);

  const getCategoryChartData = () => {
    const labels = categoryData.map((item) => item.category);
    const backgroundColors = categoryData.map((_, index) =>
      index === 0 ? "rgba(255, 99, 132, 0.6)" :
      index === 1 ? "rgba(54, 162, 235, 0.6)" :
      index === 2 ? "rgba(255, 206, 86, 0.6)" :
      "rgba(75, 123, 236, 0.6)"
    );
    const data = {
      labels,
      datasets: [
        {
          label: "Top Sales by Category",
          data: categoryData.map((item) => item.sales),
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map((color) => color.replace('0.6', '1')),
          borderWidth: 1,
        },
      ],
    };
    return data;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(...categoryData.map((item) => item.sales)) * 1.2 || 10,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-md shadow mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Top Sales by Category</h2>
        <select
          className="border px-2 py-1 rounded"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="highToLow">Sales high to low</option>
          <option value="lowToHigh">Sales low to high</option>
        </select>
      </div>
      <div className="h-72 mt-4">
        <Bar data={getCategoryChartData()} options={options} />
      </div>
    </div>
  );
};

export default TopSalesByCategory;
