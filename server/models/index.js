//server/models/index.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/capstonedatabase2');

// Importing models
const Category = require('./Category')(sequelize, DataTypes);
// const User = require('./User')(sequelize, DataTypes);

// Define relationships between models (if any)
// examples：Category.hasMany(Product); Product.belongsTo(Category);

const db = {
  Category,
  // User,
  sequelize,
  Sequelize
};

module.exports = db;
