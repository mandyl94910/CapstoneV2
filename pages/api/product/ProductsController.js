// C:\CPRG306\CapstoneV2\server\controllers\ProductsController.js
const Product = require('../../../server/models/Product');
const { Op } = require('sequelize');

// Function to get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        visibility: true  // Only retrieve products that are visible
      }
    });
    res.json(products);  // Send the products data as a JSON response
  } catch (error) {
    res.status(500).send({ message: "Error retrieving products: " + error.message });  // Return an error message if retrieval fails
  }
};

// Function to get products by category ID
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;  // Extract category ID from request parameters
    const products = await Product.findAll({
      where: {
        category_id: categoryId,  // Retrieve products that match the category ID
        visibility: true  // Only retrieve products that are visible
      }
    });
    res.json(products);  // Send the filtered products as a JSON response
  } catch (error) {
    res.status(500).send({ message: "Error retrieving products by category: " + error.message });  // Return an error message if retrieval fails
  }
};

// Function to get a single product by product ID
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;  // Extract product ID from request parameters
    const product = await Product.findOne({
      where: {
        product_id: productId,  // Find product by product ID
        visibility: true  // Only retrieve product if it is visible
      }
    });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });  // Return 404 if product is not found
    }
    res.json(product);  // Send the product data as a JSON response
  } catch (error) {
    res.status(500).send({ message: "Error retrieving product: " + error.message });  // Return an error message if retrieval fails
  }
};

// Function to get recommended products list according to the range of price-- temporary
const getRecommendedProducts = async (req, res) => {
  try {
    const { minPrice, maxPrice, limit } = req.query;

    const products = await Product.findAll({
      where: {
        price: {
          [Op.between]: [minPrice, maxPrice],
        },
        visibility: true,
      },
      limit: parseInt(limit) || 6,
    }) 

    res.json(products);
    
  } catch (error) {
    res.status(500).send({ message: "Error retrieving product: " + error.message });  // Return an error message if retrieval fails
  }
}

// Export the functions
module.exports = { getAllProducts, getProductsByCategory, getProductById, getRecommendedProducts };
