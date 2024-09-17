//C:\CPRG306\CapstoneV2\lib\redis.js
// Import the pre-configured Redis client from another module
const client = require('./redis');  

// Define an asynchronous function to set a cache value with an optional time-to-live (TTL)
async function setCache(key, data, ttl = 3600) {
  // Convert the data to a JSON string and store it in Redis with an expiration time
  await client.set(key, JSON.stringify(data), 'EX', ttl);
}

// Define an asynchronous function to retrieve a cache value using its key
async function getCache(key) {
  // Get the data from Redis using the key
  const data = await client.get(key);
  // If data exists, parse it from JSON string to object, otherwise return null
  return data ? JSON.parse(data) : null;
}

// Export the caching functions to make them available for use in other parts of the application
module.exports = {
  setCache,
  getCache
};
