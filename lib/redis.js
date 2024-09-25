//C:\CPRG306\CapstoneV2\lib\redis.js
// Import the Redis library using require instead of import
const redis = require('redis');

// Create a Redis client and configure it to connect to a local server
const client = redis.createClient({
  url: 'redis://localhost:6379',  // Specify the URL for the local Redis server
});

// Set up an error handler to log any issues with the Redis client
client.on('error', (err) => console.log('Redis Client Error', err));

// Connect to the Redis server
client.connect();

// Export the Redis client for use in other parts of the application
module.exports = client;
