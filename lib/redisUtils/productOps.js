// C:\CPRG306\CapstoneV2\lib\redisUtils\productOps.js
const client = require('../redis');

// Listen for error events on the Redis client
client.on("error", (error) => {
    console.error(`Redis client error: ${error}`);
  });

 // 1. Cache product information
 // Function name: cacheProductInfo
  // Function name: cacheProductInfo. If the product information already exists, update the existing cache.
  // Parameters:
  // productId (string): the unique identifier of the product.
  //productData (object): object containing product details.
  //ttl (number, optional): cache expiration time in seconds.
async function cacheProductInfo(productId, productData, ttl = 3600) {
    await client.set(`product:${productId}`, JSON.stringify(productData), {
      EX: ttl
    });
  }
  
//2. Get the cached product information
// Function name: getCachedProductInfo
// Function name: getCachedProductInfo // Function description: Get product information from Redis. If there is no corresponding information in the cache, get it from the database, cache it again and return it.
// Parameters:
//productId (string): the unique identifier of the product.
  async function getCachedProductInfo(productId) {
    const cachedData = await client.get(`product:${productId}`);
    return cachedData ? JSON.parse(cachedData) : null;
  }
  
// 3. Update the cached product information
 // Function name: updateProductCache
 // Function name: updateProductCache Synchronizes the update of product information in the Redis cache when it is updated in the database.
 // Parameters:
 // productId (string): the unique identifier of the product.
 // newProductData (object): the updated product data.
  async function updateProductCache(productId, newProductData, ttl = 3600) {
    await client.set(`product:${productId}`, JSON.stringify(newProductData), {
      EX: ttl
    });
  }

module.exports = { cacheProductInfo, getCachedProductInfo,updateProductCache };