//C:\CPRG306\CapstoneV2\pages\functions\product\search.js
const { Op } = require('sequelize');
const { Product } = require('../../../server/models'); 

const searchProductsByName = async (req, res) => {
    const { query } = req.query;
  
    try {
      // Fuzzy search by product name using Sequelize ORM
      const products = await Product.findAll({
        where: {
          product_name: {
            [Op.iLike]: `%${query}%`, // Use fuzzy search, ignoring case, to find products with matching names
          },
        },
      });
  
      // Return to the list of searched products
      //In order to return the queried product data to the front-end via an API and deliver it in a standard, easy-to-handle format.
      res.status(200).json(products);
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ error: 'An error occurred while searching for products.' });
    }
  };
  
  module.exports = searchProductsByName;