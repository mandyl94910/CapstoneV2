const db = require('../../../server/models');  // Note that the entire db object is imported here
const Category = db.Category;  // Extract the Category model from the db object

// Define the getCategories function
const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name', 'sub_for'],  // Ensure that only relevant fields are retrieved
    });
    console.log("Categories:", categories);  // Log the retrieved category data
    res.json(categories);  // Send the category data as a JSON response
  } catch (error) {
    console.error('Failed to retrieve categories', error);  // Log the error if categories retrieval fails
    res.status(500).send('Server Error');  // Return a 500 status code in case of a server error
  }
};

// Export the getCategories function
module.exports = { getCategories };
