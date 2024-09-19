import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import ProductManagement from "../../components/admin/management/ProductManagement";

const ProductPage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-100">
        <Header title="Product Management" />
        <ProductManagement />
      </div>
    </div>
  );
};

export default ProductPage;
