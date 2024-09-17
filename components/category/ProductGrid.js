// Import React library and the ProductCard component
import React from 'react';
import ProductCard from './ProductCard';

// Define the ProductGrid functional component that receives a list of products as props
const ProductGrid = ({ products }) => {
  return (
    <div className="flex flex-wrap gap-6">
      {/* Map through the products array and render a ProductCard for each product */}
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />  // Use the index as the key and pass the product object to the ProductCard
      ))}
    </div>
  );
};

// Export the ProductGrid component as the default export of this module
export default ProductGrid;
