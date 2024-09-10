import React from 'react';

export default function ProductCard({product}){

    return (
        <div className="border rounded-lg shadow-md p-4">
        <img
            src={product.image}
            alt={product.name}
            className="w-full h-40 object-cover mb-4"
        />
        <h3 className="text-lg font-bold mb-2">{product.name}</h3>
        <p className="text-gray-700">${product.price}</p>
        </div>
    );
};
