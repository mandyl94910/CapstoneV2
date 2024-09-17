const db = require('../../../server/models');  // 注意这里导入的是整个 db 对象
const Category = db.Category;  // 从 db 对象中获取 Category 模型

// 定义 getCategories 函数
const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      attributes: ['id', 'name', 'sub_for'],  // 确保只获取相关字段
    });
    console.log("Categories:", categories);  // 打印获取到的类别数据
    res.json(categories);
  } catch (error) {
    console.error('Failed to retrieve categories', error);
    res.status(500).send('Server Error');
  }
};

// 导出 getCategories 函数
module.exports = { getCategories };
