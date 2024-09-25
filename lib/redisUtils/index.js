// C:\CPRG306\CapstoneV2\lib\redisUtils\index.js 
// import the setCache and getCache functions from cacheOps.js
const { setCache, getCache } = require('./cacheOps');

// Import session-related operations from userps.js
const { 
    saveSession, 
    getSession, 
    updateSession, 
    deleteSession, 
    incrementLoginAttempts 
} = require('./userOps');

// Import product-related operations from productOps.js
const {
    cacheProductInfo,
    getCachedProductInfo,
    updateProductCache
} = require('./productOps');

// Export all imported functions
module.exports = {
    setCache,
    getCache,
    saveSession,
    getSession,
    updateSession,
    deleteSession,
    incrementLoginAttempts,
    cacheProductInfo,
    getCachedProductInfo,
    updateProductCache
};