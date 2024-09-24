import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function CategoryHomeGrid(){

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/categories_sub_for_1');
                console.log('Fetched Primary Categories',response.data);
                setCategories(response.data);
            } catch (error) {
                console.error('Error fetching primary categories:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center">
                <p>Loading categories...</p>
            </div>
        );
    }

    return(
        <div className="container mx-auto mt-8 px-10 h-auto">
            <div className="flex flex-wrap justify-center gap-6">
                {categories.map((category, index) => (
                    <Link href={`/all-products?category=${encodeURIComponent(category.id)}`} key={index}>
                        <div className="text-center cursor-pointer">
                            <img
                                src={`/images/${category.image}`}
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