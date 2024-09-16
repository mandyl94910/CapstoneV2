// Command: npx knex seed:run --specific=create_fake_customers.js

const { faker } = require('@faker-js/faker');  // Ensure faker is properly imported

exports.seed = async function(knex) {
  // Clear all data from the customer table
  await knex('customer').del();

  // Number of fake records to generate
  const numberOfCustomers = 50000;
  const batchSize = 100;  // Insert xx records per batch

  // Insert data in batches
  for (let i = 0; i < Math.ceil(numberOfCustomers / batchSize); i++) {
    const fakeCustomers = [];

    // Use a loop to generate a batch of data
    for (let j = 0; j < batchSize; j++) {
      // Ensure customer_name meets the requirements: contains letters and has a minimum length of 2
      let customerName;
      do {
        customerName = faker.internet.userName();
      } while (!/^[A-Za-z0-9]+$/.test(customerName) || !/[A-Za-z]/.test(customerName) || customerName.length < 2);

      // Generate a 10-digit phone number containing only digits
      let phoneNumber;
      do {
        phoneNumber = faker.phone.number('##########');  // Generate a 10-digit number format phone number
        phoneNumber = phoneNumber.replace(/\D/g, '');  // Remove non-numeric characters to ensure only digits remain
      } while (!/^\d{10}$/.test(phoneNumber));  // Ensure the phone number is exactly 10 digits

      // Generate fake data using faker
      const newCustomer = {
        customer_name: customerName,
        password: faker.internet.password(),
        email: faker.internet.email(),
        phone: phoneNumber,  // Generate a 10-digit phone number
        birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        register_date: faker.date.recent(),
      };

      fakeCustomers.push(newCustomer);
    }

    // Insert the generated data into the customer table
    await knex('customer').insert(fakeCustomers);  // Use await to ensure batch insertion is executed in order
  }
};
