module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define('Address', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
        model: 'customer', 
        key: 'customer_id'
        },
        onDelete: 'CASCADE' // Optional: Deletes addresses if the associated customer is deleted
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false
      },
      province: {
        type: DataTypes.STRING,
        allowNull: false
      },
      postal: {
        type: DataTypes.STRING,
        allowNull: false
      },
      country: {
        type: DataTypes.STRING,
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
  