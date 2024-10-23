import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ReportManagement = () => {
  const [year, setYear] = useState("2024");
  const [month, setMonth] = useState("January");
  const [sortCategory, setSortCategory] = useState("highToLow");
  const [sortProductCategory, setSortProductCategory] = useState("Category 1");
  const [sortProductSales, setSortProductSales] = useState("highToLow");

  const [salesData, setSalesData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fakeSalesData = Array.from({ length: 7 }, (_, i) => ({
      period: `Day ${i + 1}`,
      total_sales: Math.floor(Math.random() * 1000) + 200,
    }));
    const fakeCategoryData = Array.from({ length: 5 }, (_, i) => ({
      category: `Category ${i + 1}`,
      sales: Math.floor(Math.random() * 500) + 50,
    }));
    const fakeProductData = Array.from({ length: 5 }, (_, i) => ({
      productName: `Product ${i + 1}`,
      soldNumber: Math.floor(Math.random() * 300) + 100,
      productId: `P-100${i + 1}`,
      categoryName: `Category ${Math.floor(Math.random() * 5) + 1}`,
    }));

    setSalesData(fakeSalesData);
    setCategoryData(fakeCategoryData);
    setProductData(fakeProductData);
  }, [year, month]);

  const sortedCategoryData =
    sortCategory === "highToLow"
      ? [...categoryData].sort((a, b) => b.sales - a.sales)
      : [...categoryData].sort((a, b) => a.sales - b.sales);

  const sortedProductData = [...productData]
    .filter((product) => product.categoryName === sortProductCategory)
    .sort((a, b) =>
      sortProductSales === "highToLow"
        ? b.soldNumber - a.soldNumber
        : a.soldNumber - b.soldNumber
    );

  const getChartData = () => {
    const labels = salesData.map((item) => item.period);
    const data = {
      labels,
      datasets: [
        {
          label: `Sales Data (${month} ${year})`,
          data: salesData.map((item) => item.total_sales),
          borderColor: "rgba(72, 187, 120, 1)",
          backgroundColor: "rgba(156, 163, 175, 0.5)",
          fill: true,
          tension: 0.4,
        },
      ],
    };
    return data;
  };

  const getCategoryChartData = () => {
    const labels = sortedCategoryData.map((item) => item.category);
    const data = {
      labels,
      datasets: [
        {
          label: `Top Sales by Category (${month} ${year})`,
          data: sortedCategoryData.map((item) => item.sales),
          backgroundColor: "rgba(75, 123, 236, 0.6)",
          borderColor: "rgba(75, 123, 236, 1)",
          borderWidth: 1,
        },
      ],
    };
    return data;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(...salesData.map((item) => item.total_sales)) * 1.2 || 10,
      },
    },
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: Math.max(...sortedCategoryData.map((item) => item.sales)) * 1.2 || 10,
      },
    },
  };

  return (
    <div className="p-4">
      <div className="flex space-x-4">
        <div className="bg-white p-4 rounded-md shadow w-1/2">
          <h2 className="text-lg font-semibold">ORDERS LAST 30 DAYS</h2>
          <p className="text-4xl font-bold mt-2">5,948</p>
          <div className="mt-4 border-t pt-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-700">Sales over time</span>
              <span className="text-gray-500">6,052 orders</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-700">Sales by product</span>
              <span className="text-gray-500">312 products</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow w-1/2">
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
      </div>

      <div className="bg-white p-4 rounded-md shadow mt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Top Sales by Category</h2>
          <select
            className="border px-2 py-1 rounded"
            value={sortCategory}
            onChange={(e) => setSortCategory(e.target.value)}
          >
            <option value="highToLow">Sales high to low</option>
            <option value="lowToHigh">Sales low to high</option>
          </select>
        </div>
        <div className="h-72">
          <Bar data={getCategoryChartData()} options={barOptions} />
        </div>
      </div>

      <div className="bg-white p-4 rounded-md shadow mt-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Top Sales by Product</h2>
          <div className="flex space-x-2">
            <select
              className="border px-2 py-1 rounded"
              value={sortProductCategory}
              onChange={(e) => setSortProductCategory(e.target.value)}
            >
              {["Category 1", "Category 2", "Category 3", "Category 4", "Category 5"].map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
            </select>
            <select
              className="border px-2 py-1 rounded"
              value={sortProductSales}
              onChange={(e) => setSortProductSales(e.target.value)}
            >
              <option value="highToLow">Sales high to low</option>
              <option value="lowToHigh">Sales low to high</option>
            </select>
          </div>
        </div>
        <table className="w-full mt-2">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2">Product Name</th>
              <th className="p-2">Sold Number</th>
              <th className="p-2">Product ID</th>
              <th className="p-2">Category Name</th>
            </tr>
          </thead>
          <tbody>
            {sortedProductData.map((product, index) => (
              <tr key={index} className="bg-white even:bg-gray-100">
                <td className="p-2">{product.productName}</td>
                <td className="p-2">{product.soldNumber}</td>
                <td className="p-2">{product.productId}</td>
                <td className="p-2">{product.categoryName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportManagement;
