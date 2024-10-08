module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customer_name: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      phone: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      register_date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      tableName: 'customer',
      timestamps: false
    });
  
    return Customer;
  };
  