const db = require('../../../server/models');  // Note that the entire db object is imported here
const Category = db.Category;  // Extract the Category model from the db object

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
    console.log("Categories:", categories);  // Log the retrieved category data
    res.json(categories);  // Send the category data as a JSON response
  } catch (error) {
    console.error('Failed to retrieve categories', error);  // Log the error if categories retrieval fails
    res.status(500).send('Server Error');  // Return a 500 status code in case of a server error
  }
};

// Export the getCategories function
module.exports = { getCategories };
