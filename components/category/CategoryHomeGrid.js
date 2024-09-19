import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function CategoryHomeGrid(){

    // const categories = [
    //     { name: 'Mobile Phones & Accessories', image: '/products/laptop.jpg' },
    //     { name: 'Computers & Accessories', image: '/products/laptop.jpg' },
    //     { name: 'Smart Home Devices', image: '/products/laptop.jpg' },
    //     { name: 'TVs & Home Entertainment', image: '/products/laptop.jpg' },
    //     { name: 'Gaming & Accessories', image: '/products/laptop.jpg' },
    //     { name: 'Cameras & Photography Gear', image: '/products/laptop.jpg' },
    //     { name: 'Wearable Devices', image: '/products/laptop.jpg' },
    //     { name: 'Networking Equipment', image: '/products/laptop.jpg' },
    //     { name: 'Office Electronics', image: '/products/laptop.jpg' },
    //   ];

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/categories');
                console.log('Fetched categories',response.data);
                const filteredCategories = response.data.filter(cat => categories.sub_for === 1);
                setCategories(filteredCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    return(
        <div className="container mx-auto mt-8 px-10">
            <div className="flex flex-wrap justify-center gap-6">
                
                {/* test block */}
                <div>
                    <p>Test line: if images do not show up because there is not image column for category.</p>
                    <p>After update the image for categories, they would show up.</p>
                </div>
                
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