import React, { useState,useEffect } from "react";
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // 从后端获取销量最高的四个产品
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/top-selling-products');
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="overflow-x-auto bg-white p-4 rounded shadow-md border border-indigo-500">
      <table className="min-w-full border-separate border-spacing-y-3">
        <thead>
          <tr className="bg-slate-500 text-white">
            <th className="py-2 px-4 text-left font-semibold">No</th>
            <th className="py-2 px-4 text-left font-semibold">Product Name</th>
            <th className="py-2 px-4 text-left font-semibold">Visibility</th>
            <th className="py-2 px-4 text-left font-semibold">Sold</th>
          </tr>
        </thead>
        <tbody>
        {products.map((product, index) => (
            <tr key={product.product_id} className={`bg-slate-300 rounded-lg ${index === 2 ? "border-indigo-500 border-2" : ""}`}>
              <td className="py-2 px-4 rounded-l-lg">{product.product_id}</td>
              <td className="py-2 px-4">{product.product_name}</td>
              <td className="py-2 px-4">{product.visibility ? "Active" : "Inactive"}</td>
              <td className="py-2 px-4">{product.sold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
