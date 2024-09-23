// C:\CPRG306\CapstoneV2\server\controllers\ProductsController.js
const { Category, Product } = require('../../../server/models');
//const Product = require('../../../server/models/Product');
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

// Function to get products by categoryId and sub_for categoryId
// helped by chatGPT
// prompt: the product itself has not attribute called sub_for
//         but it is connected to category table which has sub_for
//         how can i use that attribute to retrieve data
const getProductsByCategoryIncludeSubcategory = async (req, res) => {
  try {
    const { categoryId } = req.params;  // Extract category ID from request parameters

    console.log('Category ID:',categoryId);
    const products = await Product.findAll({
      where: {
        visibility: true  // Only retrieve products that are visible
      },
      include: [{
        model: Category, // conected to category table
        as: 'category',
        where:{
          [Op.or]: [
            { id: categoryId },
            { sub_for: categoryId }
          ]
        }
      }]
    });

    console.log('Retrieved products:', products);
    
    if (!products || products.length === 0) {
      return res.json([]);
      //return res.status(404).send({ message: "No products found for this category" });
    }

    res.json(products);  // Send the filtered products as a JSON response
  } catch (error) {
    res.status(500).send({ message: "Error retrieving products by category: " + error.message });  // Return an error message if retrieval fails
  }
};

///////////////////////////////// test code ////////////////////
const testAssociation = async (req, res) => {
  try {
    const product = await Product.findOne({
      include: [{
        model: Category,
        as: 'category'
      }]
    });

    console.log('Product with category:', product);  // Check if the association is working
    res.json(product);
  } catch (error) {
    res.status(500).send({ message: "Error testing association: " + error.message });
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
    const { minPrice, maxPrice, limit } = req.query; // get query parameters

    const products = await Product.findAll({
      where: {
        price: {
          [Op.between]: [minPrice, maxPrice], // filter by price
        },
        visibility: true,
      },
      limit: parseInt(limit) || 6, // limit the number of returned products
    }); 
    //console.log('Recommended products:',products);
    res.json(products); // return products
    
  } catch (error) {
    res.status(500).send({ message: "Error retrieving recommended product: " + error.message });  // Return an error message if retrieval fails
  }
}

// Export the functions
module.exports = { getAllProducts, getProductsByCategory, getProductById, getRecommendedProducts, getProductsByCategoryIncludeSubcategory, testAssociation };
