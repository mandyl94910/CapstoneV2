module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      first_name: { 
        type: DataTypes.STRING(255),
        allowNull: false
      },
      last_name: { 
        type: DataTypes.STRING(255),
        allowNull: false
      },
      phone: {  
        type: DataTypes.STRING(15), 
        allowNull: false 
      },
      street: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      city: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      province: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      postal: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      country: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      is_default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    }, {
      tableName: 'address',
      timestamps: false
    });
  
    return Address;
  };
  