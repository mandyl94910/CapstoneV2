const {Address, Customer} = require('../../../server/models');

// Get all addresses for customer
/**
 * 
 * @param {*} req  client request
 * @param {*} res  server response
 */
const getAddresses = async (req, res) => {
    const { customerId } = req.params;
    try {
      // fetch address by customer id
      const addresses = await Address.findAll({
        where: {
            customer_id: customerId,
        },
        include: {
            model: Customer,
            attributes:['customer_name', 'phone'],
        }
      })
      // return data in json format
      res.status(200).json(addresses);
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({ error: 'An error occurred while fetching addresses.' });
    }
  };

  module.exports = getAddresses;