// Command: npx knex seed:run --specific=create_fake_customers.js

const { faker } = require('@faker-js/faker');

exports.seed = async function(knex) {
  // Clear the customer table to avoid duplicates and reset the data
  await knex('customer').del();

  // Define the number of customers to be generated
  const numberOfCustomers = 500; 
  // Define the batch size for inserting data into the database in chunks
  const batchSize = 100; 
  // Create a Set to store used email addresses to ensure uniqueness
  const usedEmails = new Set(); 

  // Loop through the total number of customers divided by the batch size
  for (let i = 0; i < Math.ceil(numberOfCustomers / batchSize); i++) {
    // Create an array to store the generated customer data for the current batch
    const fakeCustomers = [];

    // Inner loop to generate each customer in the current batch
    for (let j = 0; j < batchSize; j++) {
      // Generate a valid customer name that contains at least one letter and has a length of at least 2 characters
      let customerName;
      do {
        customerName = faker.internet.userName();
      } while (!/^[A-Za-z0-9]+$/.test(customerName) || !/[A-Za-z]/.test(customerName) || customerName.length < 2);

      // Generate a unique email address, ensuring no duplicates
      let email;
      do {
        email = faker.internet.email(); // Generate an email using faker
      } while (usedEmails.has(email)); // Check if the email has been used
      usedEmails.add(email); // Add the unique email to the set to track usage

      // Generate a 10-digit phone number, removing any non-digit characters
      let phoneNumber;
      do {
        phoneNumber = faker.phone.number('##########'); // Generate 10 digits
        phoneNumber = phoneNumber.replace(/\D/g, ''); // Remove non-digit characters if any
      } while (!/^\d{10}$/.test(phoneNumber)); // Ensure it's exactly 10 digits

      // Generate the new customer object with required fields
      const newCustomer = {
        customer_name: customerName,
        password: faker.internet.password(), // Generate a random password
        email: email, // Use the unique email generated earlier
        phone: phoneNumber, // Assign the valid 10-digit phone number
        birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }), // Generate a birthdate for customers between 18 and 65 years old
        register_date: faker.date.recent(), // Set the register date to a recent date
      };

      // Add the generated customer data to the current batch array
      fakeCustomers.push(newCustomer);
    }

    // Insert the generated batch of customers into the 'customer' table
    await knex('customer').insert(fakeCustomers);
  }
};
