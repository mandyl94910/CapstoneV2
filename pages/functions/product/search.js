//C:\CPRG306\CapstoneV2\pages\functions\product\search.js
const { Op } = require('sequelize');
const { Product } = require('../../../server/models'); // 根据项目结构调整导入路径

const searchProductsByName = async (req, res) => {
    const { query } = req.query;
  
    try {
      // 使用 Sequelize ORM 根据产品名称进行模糊搜索
      const products = await Product.findAll({
        where: {
          product_name: {
            [Op.iLike]: `%${query}%`, // 使用模糊搜索，查找匹配名称的产品
          },
        },
      });
  
      // 返回搜索到的产品列表
      res.status(200).json(products);
    } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ error: 'An error occurred while searching for products.' });
    }
  };
  
  module.exports = searchProductsByName;