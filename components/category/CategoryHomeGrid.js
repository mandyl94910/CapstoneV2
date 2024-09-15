import Link from 'next/link';
import React from 'react';

export default function CategoryHomeGrid(){

    const categories = [
        { name: 'Mobile Phones & Accessories', image: '/products/laptop.jpg' },
        { name: 'Computers & Accessories', image: '/products/laptop.jpg' },
        { name: 'Smart Home Devices', image: '/products/laptop.jpg' },
        { name: 'TVs & Home Entertainment', image: '/products/laptop.jpg' },
        { name: 'Gaming & Accessories', image: '/products/laptop.jpg' },
        { name: 'Cameras & Photography Gear', image: '/products/laptop.jpg' },
        { name: 'Wearable Devices', image: '/products/laptop.jpg' },
        { name: 'Networking Equipment', image: '/products/laptop.jpg' },
        { name: 'Office Electronics', image: '/products/laptop.jpg' },
      ];

    return(
        <div className="container mx-auto mt-8 px-10">
            {/* <h2 className="text-2xl font-bold text-center mb-6">Categories</h2> */}
            <div className="flex flex-wrap justify-center gap-6">
                {categories.map((category, index) => (
                    <Link href={`/all-products?category=${encodeURIComponent(category.name)}`} key={index}>
                        <div className="text-center cursor-pointer">
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-36 h-36 rounded-full"
                            />
                            <p className="mt-2 font-semibold max-w-36">{category.name}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}