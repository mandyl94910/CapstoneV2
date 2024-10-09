const { Order } = require('../../../server/models');
const { Sequelize, Op } = require('sequelize'); // Add Op for conditions

const getSalesReportData = async (req, res) => {
    const { period } = req.query; // Period can be 'weekly', 'monthly', 'yearly'
    const now = new Date(); // Current date

    // Define date filter based on period
    let dateFilter;
    if (period === 'weekly') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1); // One month ago from current date
        dateFilter = {
            order_date: {
                [Op.gte]: oneMonthAgo, // Orders from one month ago till now
            }
        };
    } else if (period === 'monthly') {
        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(now.getFullYear() - 1); // One year ago from current date
        dateFilter = {
            order_date: {
                [Op.gte]: oneYearAgo, // Orders from one year ago till now
            }
        };
    } else if (period === 'yearly') {
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(now.getFullYear() - 5); // 5 years ago from current date
        dateFilter = {
            order_date: {
                [Op.gte]: fiveYearsAgo, // Orders from 5 years ago till now
            }
        };
    }

    try {
        let groupByFormat;
        if (period === 'weekly') {
            groupByFormat = Sequelize.fn('DATE_TRUNC', 'week', Sequelize.col('order_date'));
        } else if (period === 'monthly') {
            groupByFormat = Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('order_date'));
        } else if (period === 'yearly') {
            groupByFormat = Sequelize.fn('DATE_TRUNC', 'year', Sequelize.col('order_date'));
        } else {
            return res.status(400).json({ message: 'Invalid period parameter' });
        }

        const salesData = await Order.findAll({
            where: dateFilter, // Apply the date filter based on period
            attributes: [
                [groupByFormat, 'period'], // Group by the specified period
                [Sequelize.fn('SUM', Sequelize.col('total')), 'total_sales'], // Sum of sales for the period
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'order_count']  // Count of orders for the period
            ],
            group: ['period'], // Group by the calculated period
            order: [[Sequelize.literal('period'), 'ASC']] // Sort by the period in ascending order
        });

        res.json(salesData);
    } catch (error) {
        console.error('Error fetching sales report data:', error.message);
        res.status(500).send('Error fetching sales report data');
    }
};

module.exports = {
    getSalesReportData
};
