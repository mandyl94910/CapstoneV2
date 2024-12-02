const client = require('../redis');

// Modify the validation logic for cacheAllProducts function
async function cacheAllProducts(products, ttl = 7200) {
    const key = 'all_products';
    try {
        console.log('Starting to cache all products...');
        
        // Clear existing cache first
        await client.del(key);
        
        // More lenient validation
        if (!products) {
            console.log('No products to cache');
            return false;
        }

        // Ensure products is an array
        const productsArray = Array.isArray(products) ? products : [products];

        // Set new cache with expiration
        await client.set(key, JSON.stringify(productsArray), 'EX', ttl);
        
        console.log(`Successfully cached ${productsArray.length} products`);
        return true;
    } catch (error) {
        console.error('Error in cacheAllProducts:', error);
        throw error;
    }
}

// Get cached products with improved error handling
async function getCachedProducts() {
    try {
        console.log('Attempting to retrieve products from cache...');
        const products = await client.get('all_products');
        
        if (!products) {
            console.log('No products found in cache');
            return null;
        }

        const parsedProducts = JSON.parse(products);
        console.log(`Retrieved ${parsedProducts.length} products from cache`);
        return parsedProducts;
    } catch (error) {
        console.error('Error in getCachedProducts:', error);
        // Re-throw the error to be handled by the caller
        throw error;
    }
}

// Cache individual product (similar to how individual user sessions are handled)
async function cacheProductInfo(productId, productData, ttl = 7200) {
    try {
        const key = `product:${productId}`;
        // Clear existing cache first
        await client.del(key);
        await client.set(key, JSON.stringify(productData), 'EX', ttl);
        return true;
    } catch (error) {
        console.error('Error caching product:', error);
        return false;
    }
}

// Get cached product (similar to getSession)
async function getCachedProductInfo(productId) {
    try {
        const key = `product:${productId}`;
        const cachedData = await client.get(key);
        return cachedData ? JSON.parse(cachedData) : null;
    } catch (error) {
        console.error('Error getting cached product:', error);
        return null;
    }
}

// Update product cache (similar to updateSession)
async function updateProductCache(productId, newProductData, ttl = 7200) {
    try {
        const key = `product:${productId}`;
        await client.set(key, JSON.stringify(newProductData), 'EX', ttl);
        return true;
    } catch (error) {
        console.error('Error updating product cache:', error);
        return false;
    }
}

// Invalidate product cache (similar to deleteSession)
async function invalidateProductCache(productId) {
    try {
        const key = `product:${productId}`;
        await client.del(key);
        return true;
    } catch (error) {
        console.error('Error invalidating product cache:', error);
        return false;
    }
}

// Cache category products
async function cacheCategoryProducts(categoryId, products, ttl = 7200) {
    try {
        const key = `category:${categoryId}:products`;
        await client.del(key);
        await client.set(key, JSON.stringify(products), 'EX', ttl);
        console.log(`Cached ${products.length} products for category ${categoryId}`);
        return true;
    } catch (error) {
        console.error('Error caching category products:', error);
        return false;
    }
}

// Get cached category products
async function getCachedCategoryProducts(categoryId) {
    try {
        const key = `category:${categoryId}:products`;
        const products = await client.get(key);
        if (!products) {
            console.log(`No cached products for category ${categoryId}`);
            return null;
        }
        const parsedProducts = JSON.parse(products);
        console.log(`Retrieved ${parsedProducts.length} products for category ${categoryId} from cache`);
        return parsedProducts;
    } catch (error) {
        console.error('Error getting cached category products:', error);
        return null;
    }
}

// Cache search results
async function cacheSearchResults(query, results, ttl = 3600) {
    try {
        const key = `search:${query.toLowerCase()}`;
        await client.set(key, JSON.stringify(results), 'EX', ttl);
        return true;
    } catch (error) {
        console.error('Error caching search results:', error);
        return false;
    }
}

// Get cached search results
async function getCachedSearchResults(query) {
    try {
        const key = `search:${query.toLowerCase()}`;
        const results = await client.get(key);
        return results ? JSON.parse(results) : null;
    } catch (error) {
        console.error('Error getting cached search results:', error);
        return null;
    }
}

// Cache product details
async function cacheProductDetails(productId, productData, ttl = 7200) {
    try {
        const key = `product_details:${productId}`;
        // Clear any existing cache
        await client.del(key);
        await client.set(key, JSON.stringify(productData), 'EX', ttl);
        console.log(`Cached details for product ${productId}`);
        return true;
    } catch (error) {
        console.error('Error caching product details:', error);
        return false;
    }
}

// Get cached product details
async function getCachedProductDetails(productId) {
    try {
        const key = `product_details:${productId}`;
        const cachedData = await client.get(key);
        if (!cachedData) {
            console.log(`No cached details for product ${productId}`);
            return null;
        }
        console.log(`Retrieved cached details for product ${productId}`);
        return JSON.parse(cachedData);
    } catch (error) {
        console.error('Error getting cached product details:', error);
        return null;
    }
}

// Cache reviews for a product
async function cacheProductReviews(productId, reviews, ttl = 3600) {
    try {
        const key = `product:${productId}:reviews`;
        // Clear existing cache first
        await client.del(key);
        await client.set(key, JSON.stringify(reviews), 'EX', ttl);
        console.log(`Cached ${reviews.length} reviews for product ${productId}`);
        return true;
    } catch (error) {
        console.error('Error caching product reviews:', error);
        return false;
    }
}

// Get cached reviews for a product
async function getCachedProductReviews(productId) {
    try {
        const key = `product:${productId}:reviews`;
        const reviews = await client.get(key);
        if (!reviews) {
            console.log(`No cached reviews for product ${productId}`);
            return null;
        }
        const parsedReviews = JSON.parse(reviews);
        console.log(`Retrieved ${parsedReviews.length} reviews for product ${productId} from cache`);
        return parsedReviews;
    } catch (error) {
        console.error('Error getting cached product reviews:', error);
        return null;
    }
}

// Invalidate reviews cache for a product
async function invalidateProductReviews(productId) {
    try {
        const key = `product:${productId}:reviews`;
        await client.del(key);
        console.log(`Invalidated reviews cache for product ${productId}`);
        return true;
    } catch (error) {
        console.error('Error invalidating product reviews cache:', error);
        return false;
    }
}

module.exports = {
    cacheAllProducts,
    getCachedProducts,      // Ensure this function is exported
    cacheProductInfo,
    getCachedProductInfo,
    updateProductCache,
    invalidateProductCache,
    cacheCategoryProducts,
    getCachedCategoryProducts,
    cacheSearchResults,
    getCachedSearchResults,
    cacheProductDetails,
    getCachedProductDetails,
    cacheProductReviews,
    getCachedProductReviews,
    invalidateProductReviews
};