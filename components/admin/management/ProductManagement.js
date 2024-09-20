import React, { useState, useEffect } from "react";
import axios from 'axios'; // 确保已导入axios
import DataTable from "./DataTable";
import InfoCards from "./InfoCards";
import Switch from "../Switch";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);  // 初始化为空数组，等待从API填充数据

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3001/api/products');
        setProducts(response.data); // 使用从API获取的数据更新状态
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);


// Product status information
const productStats = [
  {
    title: "Total Products",
    value: products.length.toString(),  // 动态显示总产品数
    description: "Based on current inventory",
  },
  {
    title: "Total Categories",
    value: "15",  // 需要动态计算或更新
    description: "Categories available",
  },
  {
    title: "Total Values",
    value: "$3.2k",  // 需要动态计算或更新
    description: "Estimated total value",
  },
];



  // Toggle visibility state
    const handleToggleVisibility = (index) => {
    const updatedProducts = [...products];
    updatedProducts[index].visibility = !updatedProducts[index].visibility;
    setProducts(updatedProducts);
  };

  const handleEdit = (index) => {
    console.log("Edit product:", index);
  };

  const handleDelete = (index) => {
    console.log("Delete product:", index);
  };

  const handleAddProduct = () => {
    console.log("Add new product");
  };


  return (
    <div>
      {/* Product Data Table */}
      <div className="bg-white p-4 rounded shadow-md">
        <DataTable
          columns={[
            "Product ID",
            "Product Name",
            "Price",
            "Quantity",
            "Category",
            "Visibility",
          ]}
          data={products.map((product, index) => {
            return {
              ...product,
              visibility: (
                <Switch
                  checked={!product.visibility}
                  onChange={() => handleToggleVisibility(index)}
                />
              ),
            };
          })}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        {/* Add Product Button at the bottom-right corner */}
        <div className="flex justify-end mt-4">
          <button
            onClick={handleAddProduct}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Product
          </button>
        </div>
      </div>

      {/* Product Info Cards */}
      <InfoCards stats={productStats} />
    </div>
  );
};

export default ProductManagement;
