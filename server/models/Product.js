// C:\CPRG306\CapstoneV2\server\models\Product.js
const { Sequelize, DataTypes } = require('sequelize');
const Category = require('./Category');
const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/capstonedatabase2');

// const Product = sequelize.define('Product', {
//   product_id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   product_name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   price: {
//     type: DataTypes.NUMERIC,
//     allowNull: false
//   },
//   product_description: {
//     type: DataTypes.TEXT,
//     allowNull: true
//   },
//   category_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   quantity: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     defaultValue: 0
//   },
//   folder: {
//     type: DataTypes.INTEGER,
//     allowNull: true
//   },
//   image: {
//     type: DataTypes.STRING,
//     allowNull: true
//   },
//   visibility: {
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: true
//   }
// }, {
//   tableName: 'product',
//   timestamps: false
// });

// // helped by chatGPT
// // prompt: the product itself has not attribute called sub_for
// //         but it is connected to category table which has sub_for
// //         how can i use that attribute to retrieve data

// Product.belongsTo(Category, {
//   foreignKey: 'category_id',   // Foreign key that connects the Product table to Category
//   as: 'category'               // Alias for the association
// });

// // Product.associate = function(models) {
// //   Product.belongsTo(models.Category, {
// //     foreignKey: 'category_id',
// //     as: 'category'
// //   });
// // };

// module.exports = Product;


module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.NUMERIC,
      allowNull: false
    },
    product_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    folder: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    tableName: 'product',
    timestamps: false
  });

  
  // helped by chatGPT
  // prompt: the product itself has not attribute called sub_for
  //         but it is connected to category table which has sub_for
  //         how can i use that attribute to retrieve data
  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      foreignKey: 'category_id',   // Foreign key that connects the Product table to Category
      as: 'category'               // Alias for the association
    });
  };

  return Product;
};
