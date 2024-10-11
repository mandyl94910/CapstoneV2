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
        // include: {
        //     model: Customer,
        //     attributes:['customer_name', 'phone'],
        // }
      })
      // return data in json format
      res.status(200).json(addresses);
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({ error: 'An error occurred while fetching addresses.' });
    }
  };

  // Delete an address based on address Id
  const deleteAddress = async (req, res) => {
    const { addressId } = req.params;
    console.log('Type of addressId:', typeof addressId); 
    console.log('Received request to delete address with ID:', addressId);

    try {
      const address = await Address.findOne({
        where: {
          id: addressId,
        },
      });

      if (!address) {
        console.log(`Address with ID ${addressId} not found`);
        return res.status(404).json({ success: false, message: 'Address not found' });
      }

      await address.destroy();

      res.json({ success: true, message: "Address deleted successfully" });
    } catch (error) {
      console.error("Error deleting address:", error);
      res.status(500).send({ message: "Error deleting address: " + error.message });

    }
  }

  // Add a new address
  /**
   * 
   */
  const addAddress = async (req, res) => {
    const { street, city, province, postal, country, is_default, customer_id } = req.body;

    // check if all fields are filled
    if (!street || !city || !postal || !country || !customer_id) {
        return res.status(400).send({ message: 'Missing required fields' });
    }

    try {
        // using Sequelize create a new row and insert into database
        const newAddress = await Address.create({
            street,
            city,
            province,
            postal,
            country,
            is_default,
            customer_id
        });

        // return the new address after inserting into database successfully
        return res.status(201).json({
            message: 'Address added successfully',
            data: newAddress
        });

    } catch (error) {
        console.error('Error adding address to database:', error);
        return res.status(500).send({ message: 'Failed to add address.', error: error.message });
    }
  };





  module.exports = {getAddresses, deleteAddress, addAddress};