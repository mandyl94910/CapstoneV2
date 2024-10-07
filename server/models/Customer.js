//CapstoneV2\server\models\Customer.js

module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define('Customer', {
        customer_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          customer_name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              isEmail: true,  
            }
          },
          phone: {
            type: DataTypes.STRING,
            allowNull: false,  
          },
          birthday: {
            type: DataTypes.DATEONLY,  // only date not specific time
            allowNull: true,
          },
          register_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,  
          },
    }, {
        timestamps: false,
        tableName: 'customer',  
    });
    
    return Customer;
};