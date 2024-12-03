const client = require('../redis');

// Main product list caching
const PRODUCT_LIST_KEY = 'products';
const PRODUCT_DETAILS_PREFIX = 'product:';
const CATEGORY_PRODUCTS_PREFIX = 'category:';
const SEARCH_PREFIX = 'search:';
const DEFAULT_TTL = 7200; // 2 hours

// Core caching functions
async function cacheAllProducts(products, ttl = DEFAULT_TTL) {
    try {
        await client.set(PRODUCT_LIST_KEY, JSON.stringify(products), 'EX', ttl);
        return true;
    } catch (error) {
        console.error('Error caching products:', error);
        return false;
    }
}

async function getCachedProducts() {
    try {
        const data = await client.get(PRODUCT_LIST_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting cached products:', error);
        return null;
    }
}

// Product details caching
async function cacheProductDetails(productId, productData, ttl = DEFAULT_TTL) {
    try {
        const key = `${PRODUCT_DETAILS_PREFIX}${productId}`;
        await client.set(key, JSON.stringify(productData), 'EX', ttl);
        return true;
    } catch (error) {
        console.error('Error caching product details:', error);
        return false;
    }
}

async function getCachedProductDetails(productId) {
    try {
        const key = `${PRODUCT_DETAILS_PREFIX}${productId}`;
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting cached product details:', error);
        return null;
    }
}

// Category products caching
async function cacheCategoryProducts(categoryId, products, ttl = DEFAULT_TTL) {
    try {
        const key = `${CATEGORY_PRODUCTS_PREFIX}${categoryId}`;
        await client.set(key, JSON.stringify(products), 'EX', ttl);
        return true;
    } catch (error) {
        console.error('Error caching category products:', error);
        return false;
    }
}

async function getCachedCategoryProducts(categoryId) {
    try {
        const key = `${CATEGORY_PRODUCTS_PREFIX}${categoryId}`;
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting cached category products:', error);
        return null;
    }
}

// Search results caching
async function cacheSearchResults(query, results, ttl = 3600) {
    try {
        const key = `${SEARCH_PREFIX}${query.toLowerCase()}`;
        await client.set(key, JSON.stringify(results), 'EX', ttl);
        return true;
    } catch (error) {
        console.error('Error caching search results:', error);
        return false;
    }
}

async function getCachedSearchResults(query) {
    try {
        const key = `${SEARCH_PREFIX}${query.toLowerCase()}`;
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting cached search results:', error);
        return null;
    }
}

// Cache invalidation
async function invalidateCache(pattern) {
    try {
        const keys = await client.keys(pattern);
        if (keys.length > 0) {
            await client.del(keys);
        }
        return true;
    } catch (error) {
        console.error('Error invalidating cache:', error);
        return false;
    }
}

module.exports = {
    cacheAllProducts,
    getCachedProducts,
    cacheProductDetails,
    getCachedProductDetails,
    cacheCategoryProducts,
    getCachedCategoryProducts,
    cacheSearchResults,
    getCachedSearchResults,
    invalidateCache
};