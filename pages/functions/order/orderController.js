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
          include: [
            {
              model: Product,
              // Retrieves product ID for each product in the order
              attributes: ['product_id']  
            }
          ]
        }
      ],
       // Retrieves order ID, total price, date, and status
      attributes: ['id', 'total', 'order_date', 'status'],  
      raw: false
    });

    // Format the returned data to concatenate product IDs into a single string for each order
    //The role of map here is to iterate through the orders array, converting each order object to the 
    //desired format for front-end display without changing the original array of orders.
    const formattedOrders = orders.map(order => {
      //The map function iterates through each detail in the OrderDetails array and returns a new array with each element being detail.Product.product_id.
        const productIDs = order.OrderDetails.map(detail => detail.Product.product_id).join(', ');
        return {
          order_id: order.id,
          // If the order contains multiple products, splice into a string
          product_id: productIDs,  
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

// Export the functions
module.exports = {
  getAllOrders,
  getTotalSales,
  getOrderTotalNumber
};