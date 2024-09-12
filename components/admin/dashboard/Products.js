import React, { useState } from "react";

const Products = () => {
  // 제품 데이터를 useState로 관리
  const [products, setProducts] = useState([
    { id: 1, name: "Product 1", status: "Active", sold: 2, view: 25 },
    { id: 2, name: "Product 2", status: "Active", sold: 2, view: 125 },
    { id: 3, name: "Product 3", status: "Active", sold: 2, view: 51 },
    { id: 4, name: "Product 4", status: "Inactive", sold: 2, view: 7 },
  ]);

  return (
    <div className="overflow-x-auto bg-white p-4 rounded shadow-md border border-indigo-500">
      <table className="min-w-full bg-gray-100 border-separate border-spacing-y-3">
        <thead>
          <tr>
            <th className="py-2 px-4 text-left font-semibold">No</th>
            <th className="py-2 px-4 text-left font-semibold">Product Name</th>
            <th className="py-2 px-4 text-left font-semibold">Status</th>
            <th className="py-2 px-4 text-left font-semibold">Sold</th>
            <th className="py-2 px-4 text-left font-semibold">View</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.id}
              className={`bg-gray-400 rounded-lg ${index === 2 ? "border-blue-500 border-2" : ""}`}
            >
              <td className="py-2 px-4 rounded-l-lg">{product.id}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.status}</td>
              <td className="py-2 px-4">{product.sold}</td>
              <td className="py-2 px-4 rounded-r-lg">{product.view}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
