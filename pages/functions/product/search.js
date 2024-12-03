const { Op } = require('sequelize');
const { Product } = require('../../../server/models'); 
const { getCachedProducts, getCachedSearchResults, cacheSearchResults } = require('../../../lib/redisUtils/productOps');

const searchProductsByName = async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }

    try {
        const searchTerm = query.toLowerCase();
        
        // Try to get cached search results first
        const cachedResults = await getCachedSearchResults(searchTerm);
        if (cachedResults) {
            return res.json({
                source: 'redis',
                data: cachedResults
            });
        }

        // Try to search in cached products
        const cachedProducts = await getCachedProducts();
        if (cachedProducts) {
            const filteredProducts = cachedProducts.filter(product => 
                product.product_name.toLowerCase().includes(searchTerm) && 
                product.visibility === true
            );
            
            if (filteredProducts.length > 0) {
                // Cache these search results
                await cacheSearchResults(searchTerm, filteredProducts);
                return res.json({
                    source: 'redis',
                    data: filteredProducts
                });
            }
        }

        // Fall back to database search if no results found in cache
        const products = await Product.findAll({
            where: {
                product_name: {
                    [Op.iLike]: `%${searchTerm}%`
                },
                visibility: true
            },
            raw: true,
            logging: false
        });

        // Cache these search results
        if (products.length > 0) {
            await cacheSearchResults(searchTerm, products);
        }

        res.json({
            source: 'database',
            data: products
        });

    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'An error occurred while searching for products.' });
    }
};

module.exports = searchProductsByName;