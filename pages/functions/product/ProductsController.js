// C:\CPRG306\CapstoneV2\server\controllers\ProductsController.js
const { Product,Category,Review,OrderDetail,Order} = require('../../../server/models');  
const { getCachedProductInfo, 
  cacheProductInfo } = require('../../../lib/redisUtils');
const { Sequelize, Op } = require('sequelize');
const path = require('path');

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
    // console.log('Retrieved products:', products); || is Logical OR Operator
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
    //params are the path parameters (or dynamic parameters) in the request path
    const { productId } = req.params;
    // console.log('Product ID:', productId);
    // let product = await getCachedProductInfo(productId);
    // console.log('Cached Product:', product);
    // if (!product) {
      //await is used to wait for an asynchronous operation to complete before continuing to execute the code behind it. 
      //It pauses function execution until an asynchronous operation, such as fetching product information from a database or cache, complete.
      const dbProduct = await Product.findOne({
        where: {
          product_id: productId,
        }
      });
      if (!dbProduct) {
        return res.status(404).send({ message: "Product not found" });
      }
      console.log('product information from backend is :',dbProduct)
      product = dbProduct.toJSON();
      try {
        await cacheProductInfo(productId, product); // Trying to cache product information
      } catch (cacheError) {
        console.error("Error caching product:", cacheError); // Logging cache errors
      }
    // }
    
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
    const { minPrice, maxPrice, limit } = req.query; // get query parameters from URL
    const products = await Product.findAll({
      where: {
        price: {
          [Op.between]: [minPrice, maxPrice], // filter by price
        },
        visibility: true,
      },
      //limit = int limit or = 6
      limit: parseInt(limit) || 6, // limit the number of returned products,|| is Logical OR Operator
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
//uncompleted because the images need to be four
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
      res.status(201).json({ product_id: newProduct.product_id });
  } catch (error) {
    res.status(500).send({ message: 'Failed to create product.', error: error.message });
  }
};

// Function name: nameProductImages
// Description: Stores the file paths of uploaded product images in the database after renaming them according to category and product ID.
// Parameters:
//   req (object): The HTTP request object containing product ID in parameters and category ID in the request body.
//   res (object): The HTTP response object used to send success or error responses.
// Functionality:
//   This function first checks if images were received in the request. If not, it responds with a 400 status code and a message.
//   If images are present, it renames each image file by combining the category ID, product ID, and an index number, then constructs the file path.
//   The function joins the image paths into a single comma-separated string and updates the product's `image` field in the database with this string.
//   It sends a success response if the paths are stored successfully, or an error response if an issue occurs.
async function nameProductImages(req, res) {
  const { productId } = req.params;
  const { category_id: categoryId } = req.body;
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: 'No images received.' });
    }
    // Constructing the image path
    const imagePaths = req.files.map((file, index) => {
      const fileIndex = index + 1; 
      const filename = `${fileIndex}.webp`;
      return `product/${categoryId}/${productId}/${filename}`;
    });

    // Converts an array of paths into a string, separated by commas
    const imagePathsString = imagePaths.join(',');

    // Update the image field in the database
    await Product.update(
      { image: imagePathsString },
      { where: { product_id: productId } }
    );
    res.status(200).send({ message: 'Images uploaded successfully.' });
  } catch (error) {
      res.status(500).send({ message: 'Failed to upload images.', error: error.message });
  }
}

const updateProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const updates = req.body;

    delete updates.image;

    await Product.update(updates, {
      where: { product_id: productId }
    });

    res.status(200).send({ message: 'Product updated successfully', updatedFields: updates });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send({ message: 'Error updating product' });
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
//uncompleted
const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const { action } = req.query; 
  try {
    // Find the product to ensure it exists
    const product = await Product.findOne({ where: { product_id: productId } });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    // Find all order details associated with the product
    const orderDetails = await OrderDetail.findAll({
      where: { product_id: productId },
      include: [{
        model: Order,
        attributes: ['status']
      }]
    });

     //every() is used to check if every order status is completed.
    const allCompleted = orderDetails.every(detail => detail.Order.status === 'completed');
    //|| is Logical OR Operator
    if (allCompleted || action === 'delete') {
    // Delete all product-related reviews
      await Review.destroy({ where: { product_id: productId } });

      // Delete the product
      await Product.destroy({ where: { product_id: productId } });

      // Send success response
      res.json({ success: true, message: "Product deleted successfully" });
    } else if (action === 'hide') {
      await Product.update({ visibility: false }, { where: { product_id: productId } });
      res.json({ success: true, message: "Product visibility set to false" });
    } else {
      // If not all orders are complete, prompt the user
      // This part would typically involve some client-side interaction
      // For demonstration, we assume an API endpoint where the user's choice can be sent
      res.json({ 
        prompt: true, 
        message: "This product has orders in progress. Would you like to set the product visibility to false instead of deleting it?" 
      });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({ message: "Error deleting product: " + error.message });
  }
};

// Function name: getProductTotalNumber
// Description: Retrieves the total number of products from the Product table.
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object used to send back the total product count or an error message.
// Functionality:
//   This function counts the total number of products in the Product table. It returns the count in JSON format if successful 
//   and handles any errors that may occur during the count query.
const getProductTotalNumber = async (req, res) => {
  try {
    // Counts total number of records in Product table
    const totalProducts = await Product.count();
    res.json({ totalProducts });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Function name: getTopSellingProducts
// Description: Retrieves the top-selling products based on the total quantity sold, limited to the top four.
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object used to return the top-selling products or an error message.
// Functionality:
//   This function fetches products along with associated order details. It calculates the total quantity sold for each product,
//   sorts the products in descending order based on sales quantity, and returns the top four. It handles any errors that occur.
//helped by gpt
const getTopSellingProducts = async (req, res) => {
  try {
    //Get product details and its associated order details from the database
    const products = await Product.findAll({
      include: [{
        model: OrderDetail,
        // Fetches only the quantity from OrderDetail
        attributes: ['quantity']
      }],
      // Product attributes to retrieve
      attributes: ['product_id', 'product_name', 'price', 'visibility']
    });

    // Calculates the total quantity sold for each product
    const result = products.map(product => {
      // Extract the quantity from each associated order of the product into an array
      //In JavaScript, map is an array method that executes a given function once for each element of an array 
      //and returns a new array containing the result of the processing of each element of the original array by that function.
      const orderQuantities = product.OrderDetails.map(orderDetail => orderDetail.quantity);
      // Accumulate all the quantity values in the array to get the total sales of the product
      //reduce(): accumulate the orderQuantities array.
      const totalSold = orderQuantities.reduce((sum, quantity) => sum + quantity, 0); 
      return {
        // Convert the product object to JSON format and retain all specified fields.
        ...product.toJSON(),
        // Contains the quantity of each order
        order_quantities: orderQuantities, 
        // Total sales of products
        sold: totalSold 
      };
    });
     // Sort products in descending order based on total sales and select the top four products
     //ascendingProducts = result.sort((a, b) => a.sold - b.sold);
    const topSellingProducts = result
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 4);
    // Return the list of top-selling products as a JSON response.
    res.json(topSellingProducts);
  } catch (error) {
    console.error('Error fetching top selling products:', error);
    res.status(500).send('Server Error');
  }
};

// Function name: getTotalValue
// Description: Calculates the total inventory value by multiplying each product's price by its quantity in stock.
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object used to send back the total inventory value or an error message.
// Functionality:
//   This function fetches the price and quantity for each product in the Product table, calculates the total value by summing 
//   each product's value (price * quantity), and returns this value in JSON format. It also handles errors that may occur.
const getTotalValue = async (req, res) => {
  try {
    const products = await Product.findAll({
      // Fetches price and quantity of each product
      attributes: ['price', 'quantity'],
    });
    // Calculates total inventory value
    const totalValue = products.reduce((acc, product) => {
      return acc + product.price * product.quantity;
    }, 0);
    res.json({ totalValue });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Export the functions
module.exports = { getAllProducts, getAllProductsForDataTable, 
  getProductsByCategory, getProductById, 
  getRecommendedProducts, getProductsByCategoryIncludeSubcategory,changeProductVisibility,
  addProduct,deleteProduct,getProductTotalNumber,getTopSellingProducts,getTotalValue,nameProductImages,updateProductById  };
