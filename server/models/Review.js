//C:\proj309\CapstoneV2\server\models\Review.js
module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      review_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      visibility: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      pin_top: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      timestamps: false, 
      tableName: 'review', // Ensure Sequelize uses the correct table name
    });
  
    return Review;
  };
  