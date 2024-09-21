// C:\CPRG306\CapstoneV2\server\controllers\ProductsController.js
const { Product,Category } = require('../../../server/models');  // 直接从 index.js 中导入 Product 模型
const { getCachedProductInfo, 
  cacheProductInfo } = require('../../../lib/redisUtils');


// Function name: getAllProducts
// Description: Retrieves all products that are marked as visible in the database.
// Parameters: 
//   req (object): The HTTP request object.
//   res (object): The HTTP response object used to send back data or errors.
// Functionality:
//   This function queries all visible products from the 'Product' model.
//   It responds with a JSON array of products or an error message if the retrieval fails.
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

// Function name: getAllProductsForDataTable
// Description: Retrieves all products with specific attributes for administrative purposes.
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object for sending back data or errors.
// Functionality:
//   This function fetches all visible products with selected attributes and associated categories.
//   It uses Sequelize's 'include' to fetch related category names.
//   It responds with a JSON array of products or logs an error if the retrieval fails.
const getAllProductsForDataTable = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: ['product_id', 'product_name', 'price', 'quantity', 'visibility'],
      include: [{
        model: Category,
        attributes: ['name'],   // Include only the name of the category
      }],
      where: {
        visibility: true  // Retrieve only visible products
      }
    });
    res.json(products);  // Send product data in JSON response
  } catch (error) {
    console.error("An error occurred while retrieving the product:", error);
    res.status(500).send({ message: "Error retrieving product: " + error.message });  // Return an error message if the retrieval fails
  }
};

// Function name: getProductsByCategory
// Description: Retrieves all products under a specific category that are visible.
// Parameters:
//   req (object): The HTTP request object, containing the category ID in parameters.
//   res (object): The HTTP response object for sending back data or errors.
// Functionality:
//   This function fetches products that match a specific category ID and are visible.
//   It responds with a JSON array of filtered products or an error message if retrieval fails.
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

// Function name: getProductById
// Description: Retrieves a single product by its ID from the cache or the database if not in cache.
// Parameters:
//   req (object): The HTTP request object, containing the product ID in parameters.
//   res (object): The HTTP response object for sending back data or errors.
// Functionality:
//   This function first attempts to retrieve product information from Redis cache.
//   If the product is not found in the cache, it queries the database.
//   If the product is found in the database, it caches the result and returns the product data.
//   It responds with the product data as a JSON response or an error message if retrieval fails.
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    console.log('Product ID:', productId);
    let product = await getCachedProductInfo(productId);
    console.log('Cached Product:', product);
    if (!product) {
      const dbProduct = await Product.findOne({
        where: {
          product_id: productId,
          visibility: true
        }
      });
      if (!dbProduct) {
        return res.status(404).send({ message: "Product not found" });
      }
      product = dbProduct.toJSON();
      try {
        await cacheProductInfo(productId, product); // 尝试缓存产品信息
      } catch (cacheError) {
        console.error("Error caching product:", cacheError); // 记录缓存错误
      }
    }

    res.json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).send({ message: "Error retrieving product: " + error.message });
  }
};

// Export the functions
module.exports = { getAllProducts,getAllProductsForDataTable, getProductsByCategory, getProductById };
