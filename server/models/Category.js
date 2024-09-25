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
    }
  }, {
    tableName: 'category',
    timestamps: false
  });

  return Category;
};