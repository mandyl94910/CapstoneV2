const Product = require("./Product");

module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sub_for: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0  // Assuming '0' means no parent category
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'category',
    timestamps: false
  });

  // helped by chatGPT
  // prompt: the product itself has not attribute called sub_for
  //         but it is connected to category table which has sub_for
  //         how can i use that attribute to retrieve data

  Category.associate = function(models) {
    Category.hasMany(models.Product, {
      foreignKey: 'category_id',       // Foreign key that connects the Product table to Category
      as: 'products'                   // Alias for the association
    });
  };

  return Category;
};