const { Op } = require('sequelize');
const { Product } = require('../../../server/models'); 
const { getCachedProducts } = require('../../../lib/redisUtils/productOps');

const searchProductsByName = async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }
  
    try {
        // 确保 query 是小写的以保持一致性
        const searchTerm = query.toLowerCase();
        
        // 首先尝试从 Redis 缓存获取所有产品
        const cachedProducts = await getCachedProducts();
        
        if (cachedProducts) {
            console.log('Searching in Redis cache...');
            // 在缓存数据中进行搜索
            const filteredProducts = cachedProducts.filter(product => 
                product.product_name.toLowerCase().includes(searchTerm) && 
                product.visibility === true
            );
            
            if (filteredProducts.length > 0) {
                console.log(`Found ${filteredProducts.length} products in cache`);
                return res.json({
                    source: 'cache',
                    data: filteredProducts
                });
            }
        }

        // 如果缓存中没有找到结果，则从数据库搜索
        console.log('Searching in database...');
        const products = await Product.findAll({
            where: {
                product_name: {
                    [Op.iLike]: `%${searchTerm}%`
                },
                visibility: true
            },
            raw: true
        });

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