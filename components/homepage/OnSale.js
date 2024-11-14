import React from "react";
import Image from "next/image";
import Link from "next/link";
import onSaleProducts from "../category/onSaleProducts";

export default function OnSale() {
  return (
    <div className="mt-16 px-16">
      <hr className="text-gray-300 mb-4" />
      <h2 className="text-3xl text-red-500 font-bold text-center mb-4 mt-10 text-gray py-2">
        On Sale
      </h2>

      <div className="h-[730px]">
        <div className="grid grid-cols-2 gap-x-6">
          {/* First column - Large image */}
          <div className="relative h-[605px]">
            <Link
              href={{
                pathname: "/all-products",
                query: { categoryId: "sale" },
              }}
            >
              <div className="relative h-[605px] w-full">
                <Image
                  src={onSaleProducts[0].image}
                  alt={onSaleProducts[0].name}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                />
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                  <span className="text-gray-300 line-through font-bold text-3xl">
                    ${onSaleProducts[0].originalPrice}
                  </span>
                  <span className="text-2xl font-bold text-gray-300">→</span>
                  <span className="font-bold text-3xl text-red-500">
                    ${onSaleProducts[0].salePrice}
                  </span>
                </div>
              </div>
            </Link>
            <div className="pt-4 text-center">
              <h4 className="font-bold text-lg">{onSaleProducts[0].name}</h4>
              <p className="text-gray-500 mb-2">
                Discount valid until Nov 30, 2024
              </p>
            </div>
          </div>

          {/* Second column - Two smaller images with links */}
          <div className="grid h-[750px]">
            {onSaleProducts.slice(1).map((product) => (
              <div key={product.id} className="relative h-[230px] mb-8">
                <Link
                  href={{
                    pathname: "/all-products",
                    query: { categoryId: "sale" },
                  }}
                >
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
                      <span className="text-2xl font-bold text-gray-300">
                        →
                      </span>
                      <span className="font-bold text-2xl text-red-500">
                        ${product.salePrice}
                      </span>
                    </div>
                  </div>
                </Link>
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
