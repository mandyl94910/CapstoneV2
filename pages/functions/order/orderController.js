const { Order,Customer,OrderDetail,Product,sequelize } = require('../../../server/models'); 

// 获取所有订单信息的函数
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Customer,
          attributes: ['customer_name'],  // 获取客户名称
        },
        {
          model: OrderDetail,
          include: [
            {
              model: Product,
              attributes: ['product_id']  // 获取产品ID
            }
          ]
        }
      ],
      attributes: ['id', 'total', 'order_date', 'status'],  // 获取订单ID、总价、订单日期、状态
      raw: false
    });

    // 格式化返回的数据，将 product_id 拼接成一个字符串
    const formattedOrders = orders.map(order => {
        const productIDs = order.OrderDetails.map(detail => detail.Product.product_id).join(', ');
        return {
          order_id: order.id,
          product_id: productIDs,  // 如果订单包含多个产品，拼接成字符串
          total: order.total,
          customer_name: order.Customer.customer_name,
          order_date: order.order_date,
          status: order.status,
        };
      });
    
    console.log('Formatted orders:', formattedOrders);
    res.json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error.message); // 打印错误信息
    res.status(500).send('Error fetching orders');
  }
};

module.exports = {
  getAllOrders,
};