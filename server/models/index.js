//C:\CPRG306\CapstoneV2\server\models\index.js
//Sequelize is an Object-Relational Mapping (ORM) library for Node.js. 
//It provides a high-level abstraction for dealing with database transactions, data manipulation, and queries using JavaScript. 
//It supports popular SQL databases such as PostgreSQL, MySQL, MariaDB, SQLite, and Microsoft SQL Server. 

//Object–relational mapping (ORM, O/RM, and O/R mapping tool) in computer science is a programming technique for converting data
//between a relational database and the heap of an object-oriented programming language. 
//This creates, in effect, a virtual object database that can be used from within the programming language.
//https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping

//why we use sequelize and instantiat the model:
//The main role of the instantiation model is to map tables in the database to objects in the code, 
//allowing manipulation of the data as if it were a normal object.
//It makes code more maintainable, portable, and reduce the complexity of using SQL directly.

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/capstonedatabase2');

// Instantiating a model is the same as generating an object that can be used directly to manipulate tables in the database
//DataTypes is a kind of abstract class in sequelize tool.It used to define data type in the model
const Category = require('./Category')(sequelize, DataTypes);
const Product = require('./Product')(sequelize, DataTypes);  
const Review = require('./Review')(sequelize, DataTypes);

const Order = require('./Order')(sequelize, DataTypes);  
const Address = require('./Address')(sequelize, DataTypes); 
const Customer = require('./Customer')(sequelize, DataTypes);  
const OrderDetail = require('./Orders_detail')(sequelize, DataTypes);  


// Define relationships between models (if any)
Category.hasMany(Product, { foreignKey: 'category_id' });   // The association between Category and Product
Product.belongsTo(Category, { foreignKey: 'category_id' });   // Reverse association

// Define relationship between Product and Review
Product.hasMany(Review, { foreignKey: 'product_id', onDelete: 'CASCADE' });  // A product can have many reviews
Review.belongsTo(Product, { foreignKey: 'product_id' });  // A review belongs to a product


// Customer and Review relationship
Customer.hasMany(Review, { foreignKey: 'customer_id' });   // A customer can write many reviews
Review.belongsTo(Customer, { foreignKey: 'customer_id' }); // A review belongs to a customer

// Define relationships for Order (if any)
Order.belongsTo(Customer, { foreignKey: 'customer_id' });  // An order belongs to a customer (assuming you have a Customer model)
Order.belongsTo(Address, { foreignKey: 'address_id' });  // An order belongs to an address (assuming you have an Address model)

// Relate Address to Customer (assuming you have a Customer model)
Customer.hasMany(Address, { foreignKey: 'customer_id' });
Address.belongsTo(Customer, { foreignKey: 'customer_id' });

// Add Customer model to the relationship
Customer.hasMany(Order, { foreignKey: 'customer_id' });  // A customer can have many orders
Order.belongsTo(Customer, { foreignKey: 'customer_id' });  // Reverse association

// Define relationship between Order and OrderDetail
Order.hasMany(OrderDetail, { foreignKey: 'order_id', onDelete: 'CASCADE' });  // Multiple order details for one order
OrderDetail.belongsTo(Order, { foreignKey: 'order_id' });  // Order details belong to one order

Product.hasMany(OrderDetail, { foreignKey: 'product_id', onDelete: 'CASCADE'});  //  Product Related Order Details
OrderDetail.belongsTo(Product, { foreignKey: 'product_id' });  // Order details associated with a product


const db = {
  Category,
  Product,
  Review,  
  Order,
  OrderDetail,
  Address,  
  Customer,
  sequelize,
  Sequelize
};

module.exports = db;
