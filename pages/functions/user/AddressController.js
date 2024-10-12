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
  /**
   * Helped by chatGPT
   * prompt: How can I delete an address from database with a specific addressId
   * @param {*} req   client request
   * @param {*} res   server response
   * @returns 
   */
  const deleteAddress = async (req, res) => {
    // This variable name comes from the placeholder in api path
    const { addressId } = req.params;

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
   * Helped by chatGPT
   * prompt: How can I add an address and restore it to database
   * @param {*} req   client request
   * @param {*} res   server response
   * @returns  the address being added
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
            newAddress
        });

    } catch (error) {
        console.error('Error adding address to database:', error);
        return res.status(500).send({ message: 'Failed to add address.', error: error.message });
    }
  };

  // Update address by address ID
  /**
   * Helped by chatGPT
   * prompt: How can I edit an address according to its id
   * @param {*} req   client request
   * @param {*} res   server response
   * @returns  the address being added
   */
  const updateAddress = async (req, res) => {
    const { addressId } = req.params;
    const { street, city, province, postal, country, is_default } = req.body;
  
    try {
      const address = await Address.findOne({
        where: {
          id: addressId,
        },
      });

      if (!address){
        return res.status(404).json({ success: false, 
          message: 'Address not found' });
      }

      // update address with new data
      await address.update({
        street,
        city,
        province,
        postal,
        country,
        is_default,
      });

      res.status(200).json({ success: true, 
        message: 'Address updated successfully', 
        address });
    } catch (error) {
      console.error('Error updating address:', error);
      res.status(500).send({ message: 'Failed to update address.', 
        error: error.message });
    }
  
  }


  module.exports = {getAddresses, deleteAddress, addAddress, updateAddress};