import Link from 'next/link';
import React from 'react';

export default function ProductCard({product}){

    return (
        <div className="w-56 h-auto border rounded-lg shadow-md p-4">
            <Link href={`/product/${product.id}`}>
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-48 h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-bold mb-2">{product.name}</h3>
                <p className="text-gray-700">${product.price}</p>
            </Link>
        </div>
    );
};
