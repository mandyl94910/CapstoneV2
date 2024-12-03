const { Review, Customer } = require('../../../server/models');
const { 
  cacheProductReviews, 
  getCachedProductReviews,
  invalidateProductReviews 
} = require('../../../lib/redisUtils/productOps');

// Get reviews by product ID
const getReviewByProductId = async (req, res) => {
  const { productId } = req.params;
  try {
    // First try to get reviews from cache
    const cachedReviews = await getCachedProductReviews(productId);
    if (cachedReviews) {
      console.log(`Found ${cachedReviews.length} reviews in cache for product ${productId}`);
      return res.json({
        source: 'cache',
        data: cachedReviews
      });
    }

    // If not in cache, get from database
    const reviews = await Review.findAll({
      where: { 
        product_id: productId,
        visibility: true
      },
      include: [{
        model: Customer,
        attributes: ['customer_id', 'customer_name']
      }],
      raw: false
    });

    // Before caching, convert to plain object
    const reviewsData = reviews.map(review => review.toJSON());

    // Cache the reviews
    await cacheProductReviews(productId, reviewsData);
    console.log(`Cached ${reviewsData.length} reviews for product ${productId}`);

    res.json({
      source: 'database',
      data: reviewsData
    });
  } catch (error) {
    console.error('Error retrieving reviews:', error);
    res.status(500).json({ 
      error: 'An error occurred while retrieving reviews.',
      data: [] 
    });
  }
};

// Add new review
const addReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    
    // Invalidate the reviews cache for this product
    await invalidateProductReviews(req.body.product_id);
    
    // Get updated reviews and recache them
    const updatedReviews = await Review.findAll({
      where: { 
        product_id: req.body.product_id,
        visibility: true
      },
      include: [{
        model: Customer,
        attributes: ['customer_id', 'customer_name']
      }]
    });

    await cacheProductReviews(req.body.product_id, updatedReviews.map(review => review.toJSON()));

    res.status(201).json(newReview);
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Failed to add review' });
  }
};

// Check if a product has been reviewed by a customer
const checkReviewStatus = async (req, res) => {
  const { customer_id, product_id } = req.query;
  try {
    const review = await Review.findOne({
      where: { 
        customer_id: customer_id,
        product_id: product_id 
      }
    });
    res.json({ hasReviewed: !!review });
  } catch (error) {
    console.error('Error checking review status:', error);
    res.status(500).json({ error: 'Error checking review status' });
  }
};

// Cache reviews handler
const cacheReviewsHandler = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = req.body;
    
    await cacheProductReviews(productId, reviews);
    console.log(`Manually cached ${reviews.length} reviews for product ${productId}`);
    res.status(200).json({ message: 'Reviews cached successfully' });
  } catch (error) {
    console.error('Error caching reviews:', error);
    res.status(500).json({ error: 'Failed to cache reviews' });
  }
};

module.exports = { 
  getReviewByProductId, 
  addReview, 
  checkReviewStatus,
  cacheReviewsHandler
};