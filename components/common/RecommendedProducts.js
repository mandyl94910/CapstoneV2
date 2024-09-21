// components/commen/RecommendedProducts.js
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/category/ProductCard";


export default function RecommendedProducts() {

    const [recommendedProducts, setRecommendedProducts] = useState([]);
    
    // fetch product info
    useEffect(() => {
    const fetchRecommendedProducts = async () => {
        // hardcode
        // const products = [
        // { product_id: 1, product_name: 'product 1', price: '10.99', image: 'product/1/example.webp' },
        // { product_id: 2, product_name: 'product 2', price: '20.99', image: '/product/1/example.webp' },
        // ];
        const response = await axios.get('http://localhost:3001/api/products/recommended_products?minPrice=500&maxPrice=800&limit=6');
        setRecommendedProducts(response.data);
    };

    fetchRecommendedProducts();
    }, []);

    return(
        <div>
            <h3 className="font-bold mt-8 mb-4">Recommend for you</h3>
            <div className="flex flex-wrap gap-6">
                {recommendedProducts.map((product, index) => (
                <ProductCard key={index} product={product} />
                ))}
            </div>
        </div>
    );
}