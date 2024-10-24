const { faker } = require('@faker-js/faker');

exports.seed = async function(knex) {
  // Clear the customer table to avoid duplicates and reset the data
  await knex('customer').del();

  // Insert a fixed customer using .raw() for direct SQL insertion
  await knex.raw(`
    INSERT INTO customer (customer_name, password, email, phone, birthday, register_date, image) 
    VALUES ('test101', 'aa1111', 'fixed_email@example.com', '1234567890', '1990-01-01', CURRENT_TIMESTAMP, 'customer/fixed_customer/example.webp');
  `);

  // Define the number of customers to be generated
  const numberOfCustomers = 500; 
  const batchSize = 100; 
  const usedEmails = new Set(); 

  // Loop through the total number of customers divided by the batch size
  for (let i = 0; i < Math.ceil(numberOfCustomers / batchSize); i++) {
    const fakeCustomers = [];

    for (let j = 0; j < batchSize; j++) {
      let customerName;
      do {
        customerName = faker.internet.userName();
      } while (!/^[A-Za-z0-9]+$/.test(customerName) || !/[A-Za-z]/.test(customerName) || customerName.length < 2);

      let email;
      do {
        email = faker.internet.email();
      } while (usedEmails.has(email)); 
      usedEmails.add(email);

      let phoneNumber;
      do {
        phoneNumber = faker.phone.number('##########');
        phoneNumber = phoneNumber.replace(/\D/g, '');
      } while (!/^\d{10}$/.test(phoneNumber));

      const newCustomer = {
        customer_name: customerName,
        password: faker.internet.password(),
        email: email,
        phone: phoneNumber,
        birthday: faker.date.birthdate({ min: 18, max: 65, mode: 'age' }),
        register_date: faker.date.recent(),
        image: `customer/${customerName}/example.webp`
      };

      fakeCustomers.push(newCustomer);
    }

    // Insert the generated batch of customers using .insert() method
    await knex('customer').insert(fakeCustomers);
  }
};
