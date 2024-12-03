const { Op } = require('sequelize');
const { Product } = require('../../../server/models'); 
const { getCachedProducts } = require('../../../lib/redisUtils/productOps');

const searchProductsByName = async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Search query is required' });
    }
  
    try {
        const searchTerm = query.toLowerCase();
        const cachedProducts = await getCachedProducts();
        
        if (cachedProducts) {
            const filteredProducts = cachedProducts.filter(product => 
                product.product_name.toLowerCase().includes(searchTerm) && 
                product.visibility === true
            );
            
            if (filteredProducts.length > 0) {
                return res.json({
                    source: 'cache',
                    data: filteredProducts
                });
            }
        }

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
        res.status(500).json({ error: 'An error occurred while searching for products.' });
    }
};

module.exports = searchProductsByName;