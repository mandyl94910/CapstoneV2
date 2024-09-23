//server/models/index.js
// const { Sequelize, DataTypes } = require('sequelize');
const Sequelize = require('sequelize');

// initialize Sequelize
const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/capstonedatabase2');

// Importing models
// const Category = require('./Category')(sequelize, DataTypes);

const CategoryModel = require('./Category');
const ProductModel = require('./Product');

// define models
const Category = CategoryModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);

// associate models
Category.associate({ Product });
Product.associate({ Category });

// Define relationships between models (if any)
// examples：Category.hasMany(Product); Product.belongsTo(Category);


const db = {
  Category,
  Product,
  sequelize,
  Sequelize
};

module.exports = db;
