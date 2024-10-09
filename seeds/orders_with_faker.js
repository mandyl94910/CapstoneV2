const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Truncate the orders table to remove all existing data and reset the auto-increment ID
  await knex.raw('TRUNCATE TABLE orders RESTART IDENTITY CASCADE');

  const orders = [];

  const fromDate = new Date('2023-09-01');  // Starting date
  const toDate = new Date(Math.min(new Date('2024-09-30').getTime(), Date.now()));  // Ensure it doesn't exceed today or 2024-09-30

  let currentDate = fromDate;  // Initialize with the starting date

  // Generate 500 orders
  for (let i = 0; i < 500; i++) {
    // Ensure currentDate does not exceed the limited date range
    if (currentDate >= toDate) break;

    // Increase the currentDate by a random amount of hours (1 to 48 hours) to simulate order time increment
    currentDate = new Date(currentDate.getTime() + faker.number.int({ min: 1, max: 48 }) * 60 * 60 * 1000);

    const total = parseFloat(faker.finance.amount(100, 2000, 2)); // Random total between 100-2000
    const totalTax = (total + (total * 0.05)).toFixed(2); // Fixed tax rate of 5%

    let status;
    if (currentDate < new Date('2024-09-01')) {
      status = 'completed';  // Ensure all orders before 2024-09-01 are completed
    } else {
      status = faker.helpers.arrayElement(['pending', 'shipped', 'cancelled']); // Random status after Sept 2024
    }

    let shipDate = null;
    let shippingMethod = null;
    let trackingNumber = null;
    let completeDate = null;

    // Only generate ship_date, shipping_method, and tracking_number if the order is not 'pending' or 'cancelled'
    if (status === 'shipped' || status === 'completed') {
      shipDate = faker.date.between({
        from: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),  // 1 day after order date
        to: new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000) // 5 days after order date
      });

      shippingMethod = faker.helpers.arrayElement(['UPS', 'FedEx', 'DHL']);
      trackingNumber = faker.finance.routingNumber();

      // Only generate complete_date if the status is 'completed'
      if (status === 'completed') {
        completeDate = faker.date.between({
          from: new Date(shipDate.getTime() + 15 * 24 * 60 * 60 * 1000), // 15 days after ship date
          to: new Date(shipDate.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 days after ship date
        });
      }
    }

    // Push order data to the array
    orders.push({
      customer_id: faker.number.int({ min: 1, max: 50 }), // Random customer_id between 1 and 50
      address_id: faker.number.int({ min: 1, max: 50 }),  // Random address_id between 1 and 50
      total: total,
      total_tax: totalTax,
      status: status,
      order_date: currentDate,
      ship_date: shipDate,
      shipping_method: shippingMethod,
      tracking_number: trackingNumber,
      complete_date: completeDate,
    });
  }

  // Insert generated orders into the database
  await knex('orders').insert(orders);
};
