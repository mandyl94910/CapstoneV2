// C:\CPRG306\CapstoneV2\server\controllers\ProductsController.js
const Product = require('../../../server/models/Product');

// 获取所有产品的函数
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      where: {
        visibility: true
      }
    });
    res.json(products);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving products: " + error.message });
  }
};

// 根据类别 ID 获取产品的函数
const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const products = await Product.findAll({
      where: {
        category_id: categoryId,
        visibility: true
      }
    });
    res.json(products);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving products by category: " + error.message });
  }
};

// 根据产品 ID 获取单个产品的函数
const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;  // 从请求中获取产品 ID
    const product = await Product.findOne({
      where: {
        product_id: productId,  // 根据产品 ID 查找
        visibility: true
      }
    });
    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving product: " + error.message });
  }
};

module.exports = { getAllProducts, getProductsByCategory, getProductById };
