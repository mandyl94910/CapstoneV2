const { Review, Customer } = require('../../../server/models'); 

// Code in this page helped with chatGPT
// Function name: getReviewByProductId
// Description: Retrieves reviews with product id.
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object used to return the reviews or an error message.
// Functionality:
//   This function retrieves reviews from database and return data in JSON format.
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


// Function name: addReview
// Description: Add a new review to database
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object used to return the review or an error message.
// Functionality:
//   This function adds a review to database and return data in JSON format.
const addReview = async (req, res) => {
    const review = req.body;

    try {
        const newReview = await Review.create({
            customer_id: review.customer_id,
            product_id: review.product_id,
            content: review.content,
            rating: review.rating,
            review_time: new Date(),
            visibility: true,
            pin_top: false
        });
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error submitting review:', error);
        res.status(500).json({ error: 'An error occurred while submitting review.' });
    }
};

// Function name: checkReviewStatus
// Description: Check if the product in an order has been reviewed or not
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object used to return the review status or an error message.
const checkReviewStatus = async (req, res) => {
    //const {customerId, productId} = req.query;
    const customerId = parseInt(req.query.customerId, 10);
    const productId = parseInt(req.query.productId, 10); 

    if (isNaN(customerId) || isNaN(productId)) {
        console.error('Invalid customerId or productId');
        return res.status(400).json({ error: 'Invalid parameters.' });
    }
    try {
        const review = await Review.findOne({
            where: {
              customer_id: customerId,
              product_id: productId
            }
        });
        // if review exists
        if (review) {
            return res.status(200).json({ reviewed: true });
        }
        // if review does not exist
        res.status(200).json({ reviewed: false });
    
    } catch (error) {
        console.error('Error checking review:', error);
        res.status(500).json({ error: 'An error occurred while checking review.' });
    }
};



module.exports = { 
    getReviewByProductId, 
    addReview,
    checkReviewStatus
};