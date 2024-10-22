const { Order,Customer,OrderDetail,Product } = require('../../../server/models'); 

// Function name: getAllOrders
// Description: Retrieves all orders with related customer names and product IDs in each order.
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object used to return the orders or an error message.
// Functionality:
//   This function retrieves order details, including each order's ID, total price, order date, and status, 
//   along with the associated customer's name and product IDs within each order. It formats the product IDs 
//   into a single string if there are multiple products in an order. The data is returned in JSON format.
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          // Retrieves customer name for each order
          model: Customer,
          attributes: ['customer_name'],  
        },
        {
          model: OrderDetail,
          attributes: ['product_id'], 
        }
      ],
       // Retrieves order ID, total price, date, and status
      attributes: ['id', 'total', 'order_date', 'status'],  
      //raw = false means return an sequalize object an allowing you to call the functions like .save() .update()
      //raw=true meanse return a normal javascript object.more suitble only for requirements of data
      raw: false
    });
    const products = await Product.findAll({
      attributes: ['product_id', 'product_name']
    });
    
    const productMap = products.reduce((map, product) => {
      map[product.product_id] = product.product_name;
      return map;
    }, {});

    // Format the returned data to concatenate product IDs into a single string for each order
    //The role of map here is to iterate through the orders array, converting each order object to the 
    //desired format for front-end display without changing the original array of orders.
    const formattedOrders = orders.map(order => {
      //The map function iterates through each detail in the OrderDetails array and returns a new array with each element being detail.Product.product_id.
      const productNames = order.OrderDetails.map(detail => productMap[detail.product_id]).join(', ');
        return {
          order_id: order.id,
          // If the order contains multiple products, splice into a string
          product_name: productNames,  
          // Joins multiple product IDs into a comma-separated string if necessary
          total: order.total,
          customer_name: order.Customer.customer_name,
          order_date: order.order_date,
          status: order.status,
        };
      });
    res.json(formattedOrders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).send('Error fetching orders');
  }
};

// Function name: getAllOrdersByCustomerId
// Description: Retrieves all orders with related customer id.
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object used to return the orders or an error message.
// Functionality:
//   This function retrieves order details, including all products information included in each order, 
//   The data is returned in JSON format.
const getAllOrdersByCustomerId = async (req, res) => {
  const {customerId} = req.params;
  try {
    const orders = await Order.findAll({
      where:{
        customer_id: customerId,
      },
      include: [
        {
          model: OrderDetail,
          attributes: ['product_id', 'quantity', 'name', 'price'], 
          include: [
            {
              model: Product,
              attributes: ['image'],
              visiblity: true
            }
          ]
        }
      ],
    });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error.message);
    res.status(500).send('Error fetching orders');
  }
};


// Function name: getTotalSales
// Description: Calculates the total sales amount by summing the 'total' field in the Order table.
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object used to send back the total sales amount or an error message.
// Functionality:
//   This function calculates the total sales amount across all orders by summing the 'total' field in 
//   the Order table. If no orders exist, it returns 0 as the total sales amount.
const getTotalSales = async (req, res) => {
    try {
      // Sums up the 'total' values in Order table
      const result = await Order.sum('total');
      // Returns 0 if there are no orders，|| is Logical OR Operator
      const totalSales = result || 0; 
      res.json({ totalSales });
    } catch (error) {
      res.status(500).send('Server Error');
    }
  };

  // Function name: getOrderTotalNumber
// Description: Retrieves the total number of orders in the database.
// Parameters:
//   req (object): The HTTP request object.
//   res (object): The HTTP response object used to return the total order count or an error message.
// Functionality:
//   This function counts the total number of orders in the Order table. The result is returned in JSON format.
//   If an error occurs, it returns a 500 server error status.
const getOrderTotalNumber = async (req, res) => {
try {
  // Counts total number of orders in the Order table
    const totalOrders = await Order.count();
    res.json({ totalOrders });
} catch (error) {
    res.status(500).send('Server Error');
}
};

// 获取订单信息的控制器函数
const getOrderById = async (req, res) => {
  const { orderId } = req.params;

  try {
    // 查询订单，并包括相关的客户和订单详情
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }


    // 返回格式化后的订单数据
    const formattedOrder = {
      order_id: order.id,
      customer_id: order.customer_id,
      total: order.total,
      total_tax: order.total_tax,
      order_date: order.order_date,
      ship_date: order.ship_date,
      shipping_method: order.shipping_method,
      tracking_number: order.tracking_number,
      complete_date: order.complete_date,
      status: order.status,
      address_data: order.address_data,
    };

    res.json(formattedOrder); // 返回格式化后的订单信息
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ message: 'Error fetching order details' });
  }
};

const updateOrderById  = async (req, res) => {
  const { orderId } = req.params;
  const { address_data, total, total_tax, status, ship_date, shipping_method, tracking_number, complete_date } = req.body;
  console.log("Updating order with ID:", orderId);
  try {
    // 查找指定的订单
    const order = await Order.findByPk(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // 更新订单的各个字段，包括地址数据
    await order.update({
      address_data,  // 地址数据作为 JSONB 更新
      total,
      total_tax,
      status,
      ship_date,
      shipping_method,
      tracking_number,
      complete_date
    });

    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: 'Error updating order' });
  }
};

const getOrderProducts = async (req, res) => {
  const { orderId } = req.params;

  try {
    // 查询订单的产品详情
    const orderDetails = await OrderDetail.findAll({
      where: { order_id: orderId },
    });

    // 格式化返回的数据
    const products = orderDetails.map(detail => ({
      id: detail.product_id,
      name: detail.name,
      price: detail.price,
      quantity: detail.quantity
    }));
    console.log('product of this order is :',products)

    res.json(products);
  } catch (error) {
    console.error('Error fetching order products:', error);
    res.status(500).json({ message: 'Error fetching order products' });
  }
};

// Export the functions
module.exports = {
  getAllOrders,
  getAllOrdersByCustomerId,
  getTotalSales,
  getOrderTotalNumber,
  getOrderById,
  updateOrderById,
  getOrderProducts
};