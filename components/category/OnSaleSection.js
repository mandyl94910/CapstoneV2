import React from "react";
import onSaleProducts from "../category/onSaleProducts";
import Image from "next/image";

export default function OnSaleSection() {
  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-4">On Sale Products</h2>
      <div className="grid grid-cols-4 gap-6">
        {onSaleProducts.map((product) => (
          <div key={product.id} className="border rounded-lg p-4 shadow-sm">
            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-bold mb-1">{product.name}</h3>
            <p className="text-gray-600 line-through">
              ${product.originalPrice}
            </p>
            <p className="text-red-500 font-semibold">${product.salePrice}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
