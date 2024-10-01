// C:\CPRG306\CapstoneV2\server\controllers\ProductsController.js
const { Product,Category,Review } = require('../../../server/models');  
const { getCachedProductInfo, 
  cacheProductInfo } = require('../../../lib/redisUtils');
const { Op } = require('sequelize');
const { uploadProductImages } = require('../imageController'); 

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
      order: [['product_id', 'ASC']],  // Sort by product_id in ascending order
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

// Function to get products by categoryId and sub_for categoryId
/** helped by chatGPT
 *  prompt: the product itself doesn't have attribute called sub_for
 *          but it is connected to category table which has sub_for
 *          how can i use that attribute to retrieve data
 */
const getProductsByCategoryIncludeSubcategory = async (req, res) => {
  try {
    const { categoryId } = req.params;  // Extract category ID from request parameters

    // console.log('Category ID:',categoryId);
    const products = await Product.findAll({
      where: {
        visibility: true  // Only retrieve products that are visible
      },
      include: [{
        model: Category, // conected to category table
        //as: 'category',
        where:{
          [Op.or]: [
            { id: categoryId },
            { sub_for: categoryId }
          ]
        }
      }]
    });

    // console.log('Retrieved products:', products);
    
    if (!products || products.length === 0) {
      return res.json([]);
      // return res.status(404).send({ message: "No products found for this category" });
    }

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
    // console.log('Product ID:', productId);
    let product = await getCachedProductInfo(productId);
    // console.log('Cached Product:', product);
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
        await cacheProductInfo(productId, product); // Trying to cache product information
      } catch (cacheError) {
        console.error("Error caching product:", cacheError); // Logging cache errors
      }
    }

    res.json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).send({ message: "Error retrieving product: " + error.message });
  }
};

// Function to get recommended products list according to the range of price-- temporary       
/** helped by chatGPT
 *  prompt: how can retrieve data from products whose price is between a range
 *  and limit the number in result
 */
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
};

// Function name: changeProductVisibility
// Description: Toggle the visibility of a product based on its ID.
// Parameters:
//   req (object): The HTTP request object containing product ID and new visibility state.
//   res (object): The HTTP response object used to send back data or errors.
// Functionality:
//   This function updates the visibility of a specific product in the database.
const changeProductVisibility = async (req, res) => {
  const { productId, visibility } = req.body;
  try {
    const product = await Product.findOne({
      where: { product_id: productId }
    });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    product.visibility = visibility;
    await product.save();
    res.json({ message: "Visibility updated successfully", product });
  } catch (error) {
    res.status(500).send({ message: "Error updating product visibility: " + error.message });
  }
};


// Function name: addProduct
// Description: Add a new product to the database with detailed information and optionally handle image upload.
// Parameters:
//   req (object): The HTTP request object containing product details such as name, description, price, etc.
//   res (object): The HTTP response object used to send back data or errors.
// Functionality:
//   This function creates a new product entry in the database using details provided in the request body. 
//   It also handles image upload if an image file is included in the request.
const addProduct = async (req, res) => {
  const { product_name, product_description, price, quantity, category_id, visibility } = req.body;

  try {
      // First, create the product in the database and retrieve the product_id
      const newProduct = await Product.create({
          product_name,
          product_description,
          price,
          quantity,
          category_id,
          visibility,
          folder: category_id  // Use category_id as the folder name
      });

      req.productId = newProduct.product_id;  // Pass the product_id to req for use in multer

      // If there is an uploaded image
      if (req.file) {
          const imagePath = `product/${category_id}/${newProduct.product_id}.webp`;
          newProduct.image = imagePath;  // Set the image path
          await newProduct.save();  // Save the updated product information

      }
      res.status(200).send({ message: 'Product added successfully!' });
  } catch (error) {
      res.status(500).send({ message: 'Failed to add product.' });
  }
};

// Function name: deleteProduct
// Description: Deletes a product by its ID from the database.
// Parameters:
//   req (object): The HTTP request object containing the product ID in parameters.
//   res (object): The HTTP response object used to send back data or errors.
// Functionality:
//   This function deletes a product by its ID and responds with a success message if deletion is successful,
//   or an error message if the deletion fails or the product is not found.
const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    // Find the product to ensure it exists
    const product = await Product.findOne({ where: { product_id: productId } });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Delete all product-related reviews
    await Review.destroy({ where: { product_id: productId } });

    // Delete the product
    await Product.destroy({ where: { product_id: productId } });

    // Send success response
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: "Error deleting product: " + error.message });
  }
};

// Export the functions
module.exports = { getAllProducts,getAllProductsForDataTable, 
  getProductsByCategory, getProductById, 
  getRecommendedProducts, getProductsByCategoryIncludeSubcategory,changeProductVisibility,addProduct,deleteProduct  };
