import Link from 'next/link';


// Define the ProductCard component that takes a product object as a prop
export default function ProductCard({ product }) {
    const imagePath = product.image ? product.image.split(',')[0] : ''; // 获取第一张图片路径
    // Render the product card with an image and details
    return (
        <div className="w-56 h-auto border rounded-lg shadow-md p-4">
            {/* Link to the product detail page using product ID */}
            <Link href={`/product/${product.product_id}`}>
                <img
                    src={`/images/${imagePath}`}  // Construct the path to the image
                    alt={product.product_name}  // Use the product name as alt text for the image
                    className="w-48 h-48 object-cover mb-4"
                    onError={(e) => {
                        console.log('Image failed to load:', `/images/${product.image}`);
                        e.target.style.display = 'none';  // Hide the image if it fails to load
                    }}
                />
                <h3 className="text-lg font-bold mb-2">{product.product_name}</h3>  
                <p className="text-gray-700">${product.price}</p>  
            </Link>
        </div>
    );
};