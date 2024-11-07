import React from "react";
import Image from "next/image";

export default function OnSale() {
  const products = [
    {
      id: 1,
      name: "Headphone 1",
      image: "/images/onsale/headphones1.jpg",
      originalPrice: 425,
      salePrice: 369,
    },
    {
      id: 2,
      name: "Jabra Brand",
      image: "/images/onsale/headphones.jpg",
      originalPrice: 200,
      salePrice: 149,
    },
    {
      id: 3,
      name: "Smartwatch 2",
      image: "/images/onsale/smartwatch.jpg",
      originalPrice: 150,
      salePrice: 120,
    },
  ];

  return (
    <div className="mt-16 px-16">
      <hr className="text-gray-300 mb-4" />
      <h2 className="text-3xl text-red-500 font-bold text-center mb-4 mt-10 text-gray py-2">
        On Sale
      </h2>

      <div className="h-[730px]">
        <div className="grid grid-cols-2 gap-x-6">
          {/* first column - Large pic */}
          <div className="relative h-[605px]">
            <div className="relative h-[605px] w-full">
              {/* Image component with overlay text for prices */}
              <Image
                src={products[0].image}
                alt={products[0].name}
                fill
                style={{ objectFit: "cover" }}
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <span className="text-gray-300 line-through font-bold text-3xl">
                  ${products[0].originalPrice}
                </span>
                <span className="text-2xl font-bold text-gray-300">→</span>
                <span className="font-bold text-3xl text-red-500">
                  ${products[0].salePrice}
                </span>
              </div>
            </div>
            <div className="pt-4 text-center">
              <h4 className="font-bold text-lg">{products[0].name}</h4>
              <p className="text-gray-500 mb-2">
                Discount valid until Nov 30, 2024"
              </p>
            </div>
          </div>

          {/* second column - 2 smaller images with overlay text for prices */}
          <div className="grid h-[750px]">
            {products.slice(1).map((product) => (
              <div key={product.id} className="relative h-[230px] mb-8">
                <div className="relative h-[230px] w-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                  />
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                    <span className="text-gray-300 line-through font-bold text-2xl">
                      ${product.originalPrice}
                    </span>
                    <span className="text-2xl font-bold text-gray-300">→</span>
                    <span className="font-bold text-2xl text-red-500">
                      ${product.salePrice}
                    </span>
                  </div>
                </div>
                <div className="pt-4 text-center">
                  <h4 className="font-bold text-lg">{product.name}</h4>
                  <p className="text-gray-500 mb-2">
                    Limited time offer until Jan 15, 2025
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
