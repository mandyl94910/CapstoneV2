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
    getCachedSearchResults
};