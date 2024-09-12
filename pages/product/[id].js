

import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '../Header';

const ProductPage = () => {
    const [quantity, setQuantity] = useState(1);
    const router = useRouter();
    const { id } = router.query;

    const handleIncrease = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };
    
    const handleDecrease = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        // check input only number
        if (/^\d+$/.test(value)) {
          setQuantity(Number(value));
        } else if (value === "") {
          // leave it when the quantity is just deleted
          setQuantity("");
        }
    };
    
      // once pointer leave the input, check if the input is bigger than 1
      // if not, set it to 1 
      const handleBlur = () => {
        if (quantity === "" || quantity < 1) {
          setQuantity(1); 
        }
    };

    // productData
    const productData = {
        1: { name: 'Product 1', description: 'Description of Product 1', price: '$100' },
        2: { name: 'Product 2', description: 'Description of Product 2', price: '$150' },
        3: { name: 'Product 3', description: 'Description of Product 3', price: '$200' },
    };

    const product = productData[id];

    if (!product) {
        return <p>Loading...</p>;
    }

    return (
        <main>
            <Header />
            <div className="container mx-auto p-6">
                {/* productInfo - images and data */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {/* main image */}
                    <div className="border p-4 min-w-10 max-w-lg">
                    <img src="/products/computer-accessories/computers/01/01.jpg" alt="Creative Zen Hybrid" className="w-full object-cover rounded-lg" />
                    <div className="flex mt-4 space-x-4">
                        {/* small images */}
                        <img src="/products/computer-accessories/computers/01/02.jpg" alt="Small view 1" className="w-16 h-16 object-cover border rounded" />
                        <img src="/products/computer-accessories/computers/01/02.jpg" alt="Small view 2" className="w-16 h-16 object-cover border rounded" />
                        <img src="/products/computer-accessories/computers/01/02.jpg" alt="Small view 3" className="w-16 h-16 object-cover border rounded" />
                    </div>
                    </div>

                    {/* productData */}
                    <div className="p-4">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="text-2xl font-bold my-4">{product.price}</p>
                    <p className="text-gray-700 mb-6">
                        This pair of over-ear headphones is the perfect combination of versatility and performance...
                    </p>

                        {/* set quantity */}
                        <div className="flex items-center mb-4">
                            <button
                                onClick={handleDecrease}
                                className="bg-gray-300 text-gray-800 px-6 rounded-l text-xl"
                                disabled={quantity <= 1} // disable the minus button if the quantity is equal or less than 1
                            >
                                -
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className="w-full text-center border-2 border-gray-300"
                            />
                            <button
                                onClick={handleIncrease}
                                className="bg-gray-300 text-gray-800 px-6 rounded-r text-xl"
                            >
                                +
                            </button>
                        </div>

                        {/* Add to cart */}
                        <button className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
                            Add to cart
                        </button>
                    </div>
                </div>

                {/* ratings and reviews*/}
                <div className="mt-8">
                    {/* ratings */}
                    <h2 className="text-xl font-bold mb-4">Reviews and ratings</h2>
                    <div className="flex items-center mb-4">
                        <div className="text-4xl font-bold">4.0</div>
                        <div className="ml-4">
                            <p className="text-gray-600">based on 46 ratings</p>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="text-yellow-500">★★★★★</span>
                            </div>
                        </div>
                    </div>

                    {/* reviews */}
                    <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                        <div key={review} className="border p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <span className="font-bold mr-2">User Name</span>
                                <span className="text-yellow-500">★★★★★</span>
                            </div>
                            <p className="text-gray-600">
                                Lorem ipsum dolor sit amet consectetur. Sapien massa cras tristique tortor 
                                misit amet consectetur. Sapien massa cras tristique lorem ipsum dolor sit amet consectetur.
                            </p>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
