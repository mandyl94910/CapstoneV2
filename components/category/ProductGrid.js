import ProductCard from './ProductCard';

// Define the ProductGrid functional component that receives a list of products as props
const ProductGrid = ({ products }) => {

  return (
    <div className="flex flex-wrap gap-6">
      {/* Map through the products array and render a ProductCard for each product */}
      {products.map((product, index) => (
        <ProductCard key={index} product={product} /> 
      ))}
    </div>
  );
};


export default ProductGrid;
