const { Order } = require('../../../server/models');
const { Sequelize, Op } = require('sequelize');

const getSalesReportData = async (req, res) => {
  const { year, month } = req.query;

  try {
    if (!year || !month) {
      return res.status(400).json({ message: 'Year and month are required.' });
    }

    const startDate = new Date(year, new Date(`${month} 1, ${year}`).getMonth(), 1);
    const endDate = new Date(year, new Date(`${month} 1, ${year}`).getMonth() + 1, 0);

    const salesData = await Order.findAll({
      where: {
        order_date: {
          [Op.gte]: startDate,
          [Op.lte]: endDate,
        },
      },
      attributes: [
        [Sequelize.fn('DATE', Sequelize.col('order_date')), 'period'],
        [Sequelize.fn('SUM', Sequelize.col('total')), 'total_sales'],
      ],
      group: ['period'],
      order: [[Sequelize.literal('period'), 'ASC']],
    });


    // Convert dataValues to plain objects and ensure total_sales is a number
    const plainSalesData = salesData.map(item => {
      return {
        period: item.get('period'),
        total_sales: parseFloat(item.get('total_sales')) || 0,
      };
    });

    const daysInMonth = new Date(year, new Date(`${month} 1, ${year}`).getMonth() + 1, 0).getDate();
    const formattedData = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, new Date(`${month} 1, ${year}`).getMonth(), i + 1);
      const formattedDate = date.toISOString().split('T')[0];
      const dayData = plainSalesData.find((item) => item.period === formattedDate);

      return {
        period: formattedDate,
        total_sales: dayData ? dayData.total_sales : 0,
      };
    });

    res.json(formattedData);
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
