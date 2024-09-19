// index.js
const { setCache, getCache } = require('./cacheOps');
const { addToList, removeFromList } = require('./listOps');  // 假设你也有listOps.js文件

module.exports = {
    setCache,
    getCache,
    addToList,
    removeFromList
};
