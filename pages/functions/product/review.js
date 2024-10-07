const { Review, Customer } = require('../../../server/models'); 


const getReviewByProductId = async (req, res) => {
    const { productId } = req.params;
    try {
      // fetch reviews by product id using Sequelize ORM
      const reviews = await Review.findAll({
        where: {
          product_id: productId,
        },
        include: {
            model: Customer,
            attributes:['customer_name'],
        }
      });
  
      // Return to the list of reviews
      // In order to return the queried review data to the front-end via an API and deliver it in a standard, easy-to-handle format.
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'An error occurred while fetching reviews.' });
    }
  };

  module.exports = getReviewByProductId;