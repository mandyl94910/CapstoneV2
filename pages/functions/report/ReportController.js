const { Order } = require('../../../server/models');
/**
 * helped by chatGPT
 * prompt: ORM, Object-Relational Mapping, a programming technique for converting data between incompatible type systems
 */
const { Sequelize, Op } = require('sequelize');
/**
 * helped by chatGPT
 * prompt: Request Object, containing data sent from the client
 * Response Object, used to send data back to the client
 */
const getSalesReportData = async (req, res) => {
  const { year, month } = req.query;

  try {
    if (!year || !month) {
      return res.status(400).json({ message: 'Year and month are required.' });
    }
      /**
       * helped by chatGPT
       * prompt: 
       * Date is the constructor function in JavaScript for creating date and time objects, 
       * which provides methods for handling dates.
       * Instantiate of the start and end date of the month,pares the month and year from the query parameters,
       * and then creates a new Date object for the first and last day of the month.
       * Object Constructor, used to create a new Date object
       */
    const startDate = new Date(year, new Date(`${month} 1, ${year}`).getMonth(), 1);
    const endDate = new Date(year, new Date(`${month} 1, ${year}`).getMonth() + 1, 0);

    /**
     * helped by chatGPT
     * prompt: Member Access Operator,
     * . is an operator used to access an object's properties or methods
     * Square brackets []: This syntax allows computed property names in JavaScript, 
     * enabling Op.gte and Op.lte to be used as dynamic keys. 
     * Without brackets, they would indeed be treated as normal strings, not symbols, 
     * and wouldn’t work as Sequelize expects.
     */
    const salesData = await Order.findAll({
      where: {
        order_date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      /**
       * helped by chatGPT
       * prompt: SQL Function calls, call bulid-in sql function from sequelize
       * attributes: 
       * This specifies which columns (or fields) should be included in the result. 
       * In this case, attributes defines custom fields to be returned, 
       * using SQL functions with aliases.
       */
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('order_date')), 'period'],
        [Sequelize.fn('SUM', Sequelize.col('total')), 'total_sales'],
      ],
      group: ['period'],
      order: [[Sequelize.literal('period'), 'ASC']],
    });

    /**
     * helped by chatGPT
     * prompt: Logical OR Operator,used to provide a default value of 0 
     * if total_sales is not a number
     */
    // Convert dataValues to plain objects and ensure total_sales is a number
    const plainSalesData = salesData.map(item => {
      return {
        period: item.get('period'),
        total_sales: parseFloat(item.get('total_sales')) || 0,
      };
    });

    /**
     * helped by chatGPT
     * prompt: The first parameter represents the value 
     * of the current element in the array, placeholder
     * 
     * ISO 8601, "YYYY-MM-DDTHH:MM:SS.sssZ", split is a method that splits a string into an array of substrings
     * 
     * strictly equivalent, generous equivalent
     * 
     * f no match is found: find will return undefined
     */
    // Convert dataValues to plain objects and ensure total_sales is a number
    const daysInMonth = new Date(year, new Date(`${month} 1, ${year}`).getMonth() + 1, 0).getDate();
    const formattedData = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, new Date(`${month} 1, ${year}`).getMonth(), i + 1);
      const formattedDate = date.toISOString().split('T')[0];
      const dayData = plainSalesData.find((item) => item.period === formattedDate);

      /**
       * helped by chatGPT
       * prompt: Ternary Operator, used to check if dayData exists
       */
      return {
        period: formattedDate,
        total_sales: dayData ? dayData.total_sales : 0,
      };
    });

    /**
     * helped by chatGPT
     * prompt: JSON is a data format, 
     * but here json is actually a method of the res (response) object.
     */
    res.json(formattedData);
    /**
     * helped by chatGPT
     * prompt: Sets the HTTP status code to 500, indicating a server error, 
     * Sends the error message back to the client 
     */
  } catch (error) {
    console.error('Error fetching sales report data:', error.message);
    res.status(500).send('Error fetching sales report data');
  }
};


const getOrdersSummary = async (req, res) => {
    try {
      const today = new Date();
      const past30Days = new Date();
      past30Days.setDate(today.getDate() - 30);
  
      const summaryData = await Order.findAll({
        where: {
          order_date: {
            [Op.gte]: past30Days,
            [Op.lte]: today,
          },
        },
        attributes: [
          [Sequelize.fn('COUNT', Sequelize.col('id')), 'order_count'],
          [Sequelize.fn('SUM', Sequelize.col('total')), 'total_sales'],
        ],
      });
  
      const result = summaryData[0].get();
      result.total_sales = parseFloat(result.total_sales) || 0;
      result.sales_by_product = result.order_count * 1.2;
  
      console.log('Orders Summary Data:', result);
      res.json(result);
    } catch (error) {
      console.error('Error fetching orders summary data:', error.message);
      res.status(500).send('Error fetching orders summary data');
    }
  };

module.exports = {
  getSalesReportData,
  getOrdersSummary,
};
