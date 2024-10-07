//C:\CPRG306\CapstoneV2\server\models\index.js
//Sequelize is an Object-Relational Mapping (ORM) library for Node.js. 
//It provides a high-level abstraction for dealing with database transactions, data manipulation, and queries using JavaScript. 
//It supports popular SQL databases such as PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server. 

//Object–relational mapping (ORM, O/RM, and O/R mapping tool) in computer science is a programming technique for converting data
//between a relational database and the heap of an object-oriented programming language. 
//This creates, in effect, a virtual object database that can be used from within the programming language.

//https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/capstonedatabase2');

// Importing models
const Category = require('./Category')(sequelize, DataTypes);
const Product = require('./Product')(sequelize, DataTypes);  /// Initialize the Product model
const Review = require('./Review')(sequelize, DataTypes);
const Customer = require('./Customer')(sequelize, DataTypes);

// Define relationships between models (if any)
Category.hasMany(Product, { foreignKey: 'category_id' });   // The association between Category and Product
Product.belongsTo(Category, { foreignKey: 'category_id' });   // Reverse association

// Define relationship between Product and Review
Product.hasMany(Review, { foreignKey: 'product_id', onDelete: 'CASCADE' });  // A product can have many reviews
Review.belongsTo(Product, { foreignKey: 'product_id' });  // A review belongs to a product

// Customer and Review relationship
Customer.hasMany(Review, { foreignKey: 'customer_id' });   // A customer can write many reviews
Review.belongsTo(Customer, { foreignKey: 'customer_id' }); // A review belongs to a customer


const db = {
  Category,
  Product,
  Review,  
  Customer,
  sequelize,
  Sequelize
};

module.exports = db;
