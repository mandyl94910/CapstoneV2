const { Order } = require('../../../server/models');
// Sequelize provides a wide range of operators for query conditions, like:

// Op.eq: Equal (=)
// Op.ne: Not equal (!=)
// Op.gte: Greater than or equal (>=)
// Op.lte: Less than or equal (<=)
// Op.in: Check if a value is in a list
// Op.or: Logical OR condition
// Op.and: Logical AND condition
const { Sequelize, Op } = require('sequelize'); // Add Op = operators for conditions

//asynchronous function
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

    // SELECT DATE_TRUNC('month', order_date) AS period, SUM(total) AS total_sales
    // FROM orders
    // GROUP BY period
    // ORDER BY period;


    //     -- Assuming the period is 'weekly'
    // SELECT
    //     DATE_TRUNC('week', order_date) AS period,         -- Truncate the order date to the start of the week
    //     SUM(total) AS total_sales,                        -- Sum up the total sales for each week
    //     COUNT(id) AS order_count                          -- Count the number of orders for each week
    // FROM
    //     orders                                            -- Assuming the table name is 'orders'
    // WHERE
    //     order_date >= '2023-09-01'                        -- Filter orders starting from one month ago
    // GROUP BY
    //     DATE_TRUNC('week', order_date)                    -- Group by the truncated week
    // ORDER BY
    //     period ASC;                                       -- Order the results in ascending order by period

    
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
