//server/models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/capstonedatabase2');

// 导入模型
const Category = require('./Category')(sequelize, DataTypes);
// const User = require('./User')(sequelize, DataTypes);

// 定义模型之间的关系（如果有的话）
// 例如：Category.hasMany(Product); Product.belongsTo(Category);

const db = {
  Category,
  // User,
  sequelize,
  Sequelize
};

module.exports = db;
