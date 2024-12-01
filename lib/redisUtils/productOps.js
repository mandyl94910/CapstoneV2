const client = require('../redis');

// Listen for error events on the Redis client
client.on("error", (error) => {
    console.error(`Redis client error: ${error}`);
});

// Cache all products (similar to saveSession)
async function cacheAllProducts(products, ttl = 7200) {
    try {
        const key = 'all_products';
        // Clear existing cache first (similar to session handling)
        await client.del(key);
        // Set new cache with expiration
        await client.set(key, JSON.stringify(products), 'EX', ttl);
        return true;
    } catch (error) {
        console.error('Error caching all products:', error);
        return false;
    }
}

// Get cached products (similar to getSession)
async function getCachedProducts() {
    try {
        const products = await client.get('all_products');
        return products ? JSON.parse(products) : null;
    } catch (error) {
        console.error('Error getting cached products:', error);
        return null;
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

module.exports = {
    cacheAllProducts,
    getCachedProducts,
    cacheProductInfo,
    getCachedProductInfo,
    updateProductCache,
    invalidateProductCache
};