// C:\CPRG306\CapstoneV2\pages\product\[id].js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { FaMinus, FaPlus } from 'react-icons/fa';


const ProductPage = () => {
  const [product, setProduct] = useState(null);  // Store product data
  const [quantity, setQuantity] = useState(1);  // Store the selected quantity
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();
  const { id } = router.query;  // Get product ID from the URL

  useEffect(() => {
    async function fetchProductById(id){
      // Fetch product data dynamically based on product ID when the page loads
      try {
        const response = await axios.get(`http://localhost:3001/api/products/${id}`);
        console.log('Fetched product by id: ', response.data);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product by id:', error); 
      }
    }
    if (id){
      fetchProductById(id);
    }
  }, [id]);  // Re-run the effect whenever the id changes

  // when product updated, set image path of the product
  useEffect(() => {
    if (product && product.image) {
      setSelectedImage(product.image);
    }
  }, [product]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  }

  const generateImagePaths = (image) => {
    // remove .webp at the end of the original path
    const basePath = image.replace('.webp', '');

    // generate new image array
    const imagePaths = [1, 2, 3].map((number) =>`${basePath}${number}.webp`);
    const paths = [image, ...imagePaths];
    return paths;
  } 

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productExists = cart.find((item) => item.id === product.id);

    if (productExists) {
      productExists.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart)); // 将购物车更新到localStorage
    alert('Product added to cart!');
    router.push('/cart');
  };



  // Display loading message while product data is being fetched
  if (!product) {
    return (
      <main>
        <Header />
        <div className="flex justify-center mt-20">
            <p>Loading product...</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Header/>
      <div className="container mx-auto p-6">
        {/* productInfo - images and product data */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          
          <div className="border p-4 min-w-10 max-w-lg">
            {/* main image */}
            <img src={`/images/${selectedImage}`} 
                alt={product.product_name} 
                className="w-full object-cover rounded-lg" />
            <div className="flex mt-4 space-x-4">
              {/* small images */}
              {generateImagePaths(product.image).map((image,index) =>  
                <img 
                  key={index}  
                  src={`/images/${image}`}
                  // src={`/images/${image}`} 
                  alt={`Small view ${index + 1}`}
                  className={`w-16 h-16 object-cover border-2 rounded cursor-pointer ${selectedImage === image ? 'border-blue-500' : ''}`}
                  onClick={ () => handleImageClick(image)}
                />
              )}
            </div>
          </div>

          {/* productData */}
          <div className="p-4">
            <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
            <p className="text-gray-600">{product.product_description}</p>
            <p className="text-2xl font-bold my-4">${product.price}</p>
            <p className="text-gray-600 mb-6"> Detail description here providing more information about the product
               such as style and size or more other features...
            </p>

            {/* Set quantity */}
            <div className="flex items-center mb-4">
              <button
                className={`h-12 w-20 ${quantity<= 1 ? ("text-gray-300"):("text-gray-800")} px-6 rounded-l-lg border-2 border-gray-300`}
                onClick={ () => {setQuantity(quantity - 1)}}
                disabled={quantity <= 1}  // Disable decrease button if quantity is 1
              >
                <FaMinus/>
              </button>
              <input
                type="text"
                value={quantity}
                className="w-full h-12 text-center border-y-2 border-gray-300"
              />
              <button
                className="h-12 w-20 text-gray-800 px-6 rounded-r-lg border-2 border-gray-300"
                onClick={ () => setQuantity(quantity + 1)}
              >
                <FaPlus/>
              </button>
            </div>

            {/* Add to cart button */}
            <button 
            onClick={ () => addToCart(product)}
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
              Add to cart
            </button>
          </div>
        </div>

        {/* ratings and reviews */}
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
      <Footer />
    </main>
  );
};

export default ProductPage;
