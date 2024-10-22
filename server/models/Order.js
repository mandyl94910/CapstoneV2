module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      customer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      total: {
        type: DataTypes.NUMERIC(10, 2),
        allowNull: false
      },
      total_tax: {
        type: DataTypes.NUMERIC(10, 2),
        allowNull: false
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      order_date: {
        type: DataTypes.DATE,
        allowNull: false
      },
      ship_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      shipping_method: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      tracking_number: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      complete_date: {
        type: DataTypes.DATE,
        allowNull: true
      },
      address_data: {
        type: DataTypes.JSONB,  // 新增的字段，用于存储JSON格式的地址数据
        allowNull: true
      }
    }, {
      tableName: 'orders',
      timestamps: false
    });
  
    return Order;
  };
  