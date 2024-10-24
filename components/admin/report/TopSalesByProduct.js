import React, { useState, useEffect } from "react";

const TopSalesByProduct = () => {
  const [sortCategory, setSortCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("highToLow");
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const hardcodedProductData = [
        { productName: "Smartphone X1", soldNumber: 60, productId: "1", categoryName: "Smartphones" },
        { productName: "Smartphone Y1", soldNumber: 40, productId: "2", categoryName: "Smartphones" },
        { productName: "Phone Case A", soldNumber: 35, productId: "3", categoryName: "Phone Cases" },
        { productName: "Phone Case B", soldNumber: 25, productId: "4", categoryName: "Phone Cases" },
        { productName: "Wireless Headphones", soldNumber: 45, productId: "5", categoryName: "Headphones" },
        { productName: "In-Ear Headphones", soldNumber: 35, productId: "6", categoryName: "Headphones" },
        { productName: "Laptop Pro 15", soldNumber: 50, productId: "7", categoryName: "Laptops" },
        { productName: "Gaming Laptop Z1", soldNumber: 40, productId: "8", categoryName: "Laptops" },
        { productName: "Mechanical Keyboard", soldNumber: 25, productId: "9", categoryName: "Keyboards" },
        { productName: "Wireless Keyboard", soldNumber: 20, productId: "10", categoryName: "Keyboards" },
        { productName: "4K Monitor", soldNumber: 30, productId: "11", categoryName: "Monitors" },
        { productName: "Ultrawide Monitor", soldNumber: 20, productId: "12", categoryName: "Monitors" },
        { productName: "Smart TV 55\"", soldNumber: 25, productId: "13", categoryName: "Televisions" },
        { productName: "OLED TV 65\"", soldNumber: 15, productId: "14", categoryName: "Televisions" },
        { productName: "Next-Gen Console X", soldNumber: 50, productId: "15", categoryName: "Gaming Consoles" },
        { productName: "Gaming Console Y", soldNumber: 40, productId: "16", categoryName: "Gaming Consoles" },
        { productName: "DSLR Camera A1", soldNumber: 40, productId: "17", categoryName: "Cameras" },
        { productName: "Mirrorless Camera B1", soldNumber: 20, productId: "18", categoryName: "Cameras" },
        { productName: "Smartwatch Pro", soldNumber: 35, productId: "19", categoryName: "Smartwatches" },
        { productName: "Smartwatch Lite", soldNumber: 25, productId: "20", categoryName: "Smartwatches" },
      ];
      

    let filteredData = hardcodedProductData;
    if (sortCategory !== "all") {
      filteredData = hardcodedProductData.filter(
        (item) => item.categoryName === sortCategory
      );
    }

    const sortedData =
      sortOrder === "highToLow"
        ? filteredData.sort((a, b) => b.soldNumber - a.soldNumber)
        : filteredData.sort((a, b) => a.soldNumber - b.soldNumber);

    setProductData(sortedData);
  }, [sortCategory, sortOrder]);

  return (
    <div className="bg-white p-4 rounded-md shadow mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Top Sales by Product</h2>
        <div className="flex space-x-2">
          <select
            className="border px-2 py-1 rounded"
            value={sortCategory}
            onChange={(e) => setSortCategory(e.target.value)}
          >
            <option value="all">All Products</option>
            {[
              "Smartphones",
              "Phone Cases",
              "Headphones",
              "Laptops",
              "Keyboards",
              "Monitors",
              "Televisions",
              "Gaming Consoles",
              "Cameras",
              "Wearable Devices"
            ].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            className="border px-2 py-1 rounded"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="highToLow">Sales high to low</option>
            <option value="lowToHigh">Sales low to high</option>
          </select>
        </div>
      </div>
      <div className="mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="text-left p-2 border-b">Product Name</th>
              <th className="text-left p-2 border-b">Sold Number</th>
              <th className="text-left p-2 border-b">Product ID</th>
              <th className="text-left p-2 border-b">Category Name</th>
            </tr>
          </thead>
          <tbody>
            {productData.map((item, index) => (
              <tr key={index} className="even:bg-gray-100">
                <td className="p-2 border-b">{item.productName}</td>
                <td className="p-2 border-b">{item.soldNumber}</td>
                <td className="p-2 border-b">{item.productId}</td>
                <td className="p-2 border-b">{item.categoryName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TopSalesByProduct;
