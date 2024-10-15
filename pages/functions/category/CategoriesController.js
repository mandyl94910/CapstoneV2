//C:\proj309\CapstoneV2\pages\functions\category\CategoriesController.js
const db = require('../../../server/models');  // Note that the entire db object is imported here
const Category = db.Category;  // Extract the Category model from the db object
//n Sequelize, Op represents the Operators provided by Sequelize to facilitate advanced query conditions. Op is a shorthand for Sequelize.
//Op, an object containing various operators that can be used in the where clause of a query to create complex conditions.
//helped by chatgpt
const { Op } = require('sequelize');

// Function name: getCategories
// Description: Retrieves all categories from the database and sends them as a JSON response.
// Parameters:
//   req (object): The HTTP request object, which may contain parameters and query options.
//   res (object): The HTTP response object used to send back the categories or an error message.
// Functionality:
//   This function queries the database to retrieve all category records. It specifically fetches only
//   selected attributes ('id', 'name', 'sub_for') to ensure that the response contains only relevant data.
//   The fetched categories are then logged to the console and sent back to the client as a JSON array.
//   If the retrieval process encounters any errors, the function logs the error and returns a 500 server error response.
const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name', 'sub_for'],  // Ensure that only relevant fields are retrieved
    });
    // console.log("Categories:", categories);  // Log the retrieved category data
    res.json(categories);  // Send the category data as a JSON response
  } catch (error) {
    console.error('Failed to retrieve categories', error);  // Log the error if categories retrieval fails
    res.status(500).send('Server Error');  // Return a 500 status code in case of a server error
  }
};

// Define the getPrimaryCategories for Homepage
/* helped by chatGPT, 
*  prompt: can i retrieve categories that only sub_for 1 and category name is not "All Products"
*/ 
const getPrimaryCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes:['id', 'name', 'sub_for', 'image'],
      where: {
        sub_for: 1,
        name: {
          [Op.ne]: 'All Products'
        }
      }
    });
    res.json(categories);
  } catch (error) {
    console.error('Failed to retrieve parent categories', error);
    res.status(500).send('Server Error');
  }
};

// Function name: getSubCategories
// Description: Retrieves all subcategories with a specific `sub_for` value greater than 1.
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object, used to send back the subcategories data or an error message.
// Functionality:
//   This function fetches categories where `sub_for` is greater than 1, meaning it retrieves only subcategories.
//   It selects only the `id` and `name` attributes of each subcategory. If successful, it sends back the subcategories
//   in JSON format; if not, it catches any error and sends a server error response.
const getSubCategories = async (req, res) => {
  try {
    const subCategories = await Category.findAll({
      // Specifies only id and name attributes to be retrieved
      attributes: ['id', 'name'],
      where: {
        sub_for: {
          // Retrieves categories where `sub_for` is greater than 1, indicating subcategories
          [Op.gt]: 1
        }
      }
    });
    res.json(subCategories);
  } catch (error) {
    console.error('Failed to retrieve sub categories', error);
    res.status(500).send('Server Error');
  }
};

// Function name: getCategoriesTotalNumber
// Description: Retrieves the total count of categories in the Category table.
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object, used to send back the total number of categories or an error message.
// Functionality:
//   This function counts the total number of categories in the database. If the count is successful, it returns the
//   total count in JSON format. It also handles any errors that may occur during the counting process.
const getCategoriesTotalNumber = async (req, res) => {
  try {
    // Counts total records in the Category table
    const totalCategories = await Category.count();
    res.json({ totalCategories });
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

// Fetch category by ID
const getCategoryById = async (req, res) => {
  try {
      const category = await Category.findByPk(req.params.id);
      if (category) {
          res.json({ name: category.name });
      } else {
          res.status(404).send('Category not found');
      }
  } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).send('Server error');
  }
};

// Export the getCategories function
module.exports = { getCategories, getPrimaryCategories,getSubCategories,getCategoriesTotalNumber,getCategoryById };
