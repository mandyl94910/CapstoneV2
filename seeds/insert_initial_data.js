// Command: npx knex seed:run --specific=insert_initial_data.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.seed = async function(knex) {
  // Deletes ALL existing entries in product and category tables
  await knex('product').del();
  await knex('category').del();
  await knex('admin').del(); 
  await knex('review').del();

  // Insert initial data into category table
  await knex('category').insert([
    { id: 1, name: 'All Products', sub_for: 1, image: 'category/all_products.webp' },
    { id: 2, name: 'Mobile Phones & Accessories', sub_for: 1, image: 'category/mobile_phones_accessories.webp' },
    { id: 3, name: 'Computers & Accessories', sub_for: 1, image: 'category/computers_accessories.webp' },
    { id: 4, name: 'TVs & Home Entertainment', sub_for: 1, image: 'category/tvs_home_entertainment.webp' },
    { id: 5, name: 'Gaming & Accessories', sub_for: 1, image: 'category/gaming_accessories.webp' },
    { id: 6, name: 'Cameras & Photography Gear', sub_for: 1, image: 'category/cameras_photography_gear.webp' },
    { id: 7, name: 'Wearable Devices', sub_for: 1, image: 'category/wearable_devices.webp' },
    { id: 8, name: 'Office Electronics', sub_for: 1, image: 'category/office_electronics.webp' },
    { id: 9, name: 'Smartphones', sub_for: 2, image: 'category/smartphones.webp' },
    { id: 10, name: 'Phone Cases', sub_for: 2, image: 'category/phone_cases.webp' },
    { id: 11, name: 'Headphones', sub_for: 2, image: 'category/headphones.webp' },
    { id: 12, name: 'Chargers', sub_for: 2, image: 'category/chargers.webp' },
    { id: 13, name: 'Laptops', sub_for: 3, image: 'category/laptops.webp' },
    { id: 14, name: 'Desktops', sub_for: 3, image: 'category/desktops.webp' },
    { id: 15, name: 'Keyboards', sub_for: 3, image: 'category/keyboards.webp' },
    { id: 16, name: 'Mice', sub_for: 3, image: 'category/mice.webp' },
    { id: 17, name: 'Monitors', sub_for: 3, image: 'category/monitors.webp' },
    { id: 18, name: 'Televisions', sub_for: 4, image: 'category/televisions.webp' },
    { id: 19, name: 'Sound Systems', sub_for: 4, image: 'category/sound_systems.webp' },
    { id: 20, name: 'Projectors', sub_for: 4, image: 'category/projectors.webp' },
    { id: 21, name: 'Gaming Consoles', sub_for: 5, image: 'category/gaming_consoles.webp' },
    { id: 22, name: 'Controllers', sub_for: 5, image: 'category/controllers.webp' },
    { id: 23, name: 'VR Devices', sub_for: 5, image: 'category/vr_devices.webp' },
    { id: 24, name: 'Cameras', sub_for: 6, image: 'category/cameras.webp' },
    { id: 25, name: 'Lenses', sub_for: 6, image: 'category/lenses.webp' },
    { id: 26, name: 'Tripods', sub_for: 6, image: 'category/tripods.webp' },
    { id: 27, name: 'Smartwatches', sub_for: 7, image: 'category/smartwatches.webp' },
    { id: 28, name: 'Fitness Trackers', sub_for: 7, image: 'category/fitness_trackers.webp' },
    { id: 29, name: 'Printers', sub_for: 8, image: 'category/printers.webp' },
    { id: 30, name: 'Scanners', sub_for: 8, image: 'category/scanners.webp' },
    { id: 31, name: 'Fax Machines', sub_for: 8, image: 'category/fax_machines.webp' }
  ]);

  // Insert initial data into product table
  await knex('product').insert([
    { product_name: 'Smartphone X1', price: 699.99, product_description: 'A high-end smartphone with advanced features.', category_id: 9, quantity: 50, folder: 9, image: 'product/9/example.webp', visibility: true },
      { product_name: 'Smartphone Y1', price: 799.99, product_description: 'A powerful smartphone with a sleek design.', category_id: 9, quantity: 40, folder: 9, image: 'product/9/example.webp', visibility: true },
      { product_name: 'Phone Case A', price: 19.99, product_description: 'Durable and stylish phone case.', category_id: 10, quantity: 200, folder: 10, image: 'product/10/example.webp', visibility: true },
      { product_name: 'Phone Case B', price: 15.99, product_description: 'Sleek phone case with a minimalist design.', category_id: 10, quantity: 150, folder: 10, image: 'product/10/example.webp', visibility: true },
      { product_name: 'Wireless Headphones', price: 89.99, product_description: 'Noise-canceling wireless headphones.', category_id: 11, quantity: 100, folder: 11, image: 'product/11/example.webp', visibility: true },
      { product_name: 'In-Ear Headphones', price: 29.99, product_description: 'Comfortable in-ear headphones.', category_id: 11, quantity: 300, folder: 11, image: 'product/11/example.webp', visibility: true },
      { product_name: 'Laptop Pro 15', price: 1299.99, product_description: 'A powerful laptop for professionals.', category_id: 13, quantity: 30, folder: 13, image: 'product/13/example.webp', visibility: true },
      { product_name: 'Gaming Laptop Z1', price: 1599.99, product_description: 'A high-performance gaming laptop.', category_id: 13, quantity: 25, folder: 13, image: 'product/13/example.webp', visibility: true },
      { product_name: 'Mechanical Keyboard', price: 79.99, product_description: 'A mechanical keyboard with RGB lighting.', category_id: 15, quantity: 120, folder: 15, image: 'product/15/example.webp', visibility: true },
      { product_name: 'Wireless Keyboard', price: 49.99, product_description: 'A wireless keyboard with long battery life.', category_id: 15, quantity: 80, folder: 15, image: 'product/15/example.webp', visibility: true },
      { product_name: '4K Monitor', price: 299.99, product_description: 'A 27-inch 4K monitor for work and gaming.', category_id: 17, quantity: 60, folder: 17, image: 'product/17/example.webp', visibility: true },
      { product_name: 'Ultrawide Monitor', price: 399.99, product_description: 'A 34-inch ultrawide monitor.', category_id: 17, quantity: 45, folder: 17, image: 'product/17/example.webp', visibility: true },
      { product_name: 'Smart TV 55"', price: 599.99, product_description: 'A 55-inch 4K smart TV.', category_id: 18, quantity: 40, folder: 18, image: 'product/18/example.webp', visibility: true },
      { product_name: 'OLED TV 65"', price: 1299.99, product_description: 'A 65-inch OLED 4K TV.', category_id: 18, quantity: 20, folder: 18, image: 'product/18/example.webp', visibility: true },
      { product_name: 'Next-Gen Console X', price: 499.99, product_description: 'A next-generation gaming console.', category_id: 21, quantity: 100, folder: 21, image: 'product/21/example.webp', visibility: true },
      { product_name: 'Gaming Console Y', price: 399.99, product_description: 'A budget-friendly gaming console.', category_id: 21, quantity: 120, folder: 21, image: 'product/21/example.webp', visibility: true },
      { product_name: 'DSLR Camera A1', price: 899.99, product_description: 'A high-quality DSLR camera for photography.', category_id: 24, quantity: 35, folder: 24, image: 'product/24/example.webp', visibility: true },
      { product_name: 'Mirrorless Camera B1', price: 1199.99, product_description: 'A mirrorless camera with advanced features.', category_id: 24, quantity: 25, folder: 24, image: 'product/24/example.webp', visibility: true },
      { product_name: 'Smartwatch Pro', price: 199.99, product_description: 'A smartwatch with fitness tracking features.', category_id: 27, quantity: 90, folder: 27, image: 'product/27/example.webp', visibility: true },
      { product_name: 'Smartwatch Lite', price: 149.99, product_description: 'A lightweight smartwatch for everyday use.', category_id: 27, quantity: 120, folder: 27, image: 'product/27/example.webp', visibility: true }
  ]);

  // Insert a super admin account named 'Chris'
  await knex('admin').insert({
    password: 'securepassword123',
    name: 'Chris',
    pin: '1234',
    title: 'Super Admin',
    status: true,
    image: 'admin/chris.webp',
    register_date: knex.fn.now(),
    last_login: null
  });

  // Insert 10 product reviews with customer_id ranging from 1 to 10
  await knex('review').insert([
    { customer_id: 1, product_id: 9, content: 'Great product! Works as expected.', rating: 5, review_time: knex.fn.now(), visibility: true, pin_top: false },
    { customer_id: 2, product_id: 9, content: 'Good quality but overpriced.', rating: 4, review_time: knex.fn.now(), visibility: true, pin_top: false },
    { customer_id: 3, product_id: 10, content: 'The case fits perfectly and looks stylish.', rating: 5, review_time: knex.fn.now(), visibility: true, pin_top: false },
    { customer_id: 4, product_id: 11, content: 'Sound quality is decent for the price.', rating: 4, review_time: knex.fn.now(), visibility: true, pin_top: false },
    { customer_id: 5, product_id: 13, content: 'Highly recommend this laptop for productivity.', rating: 5, review_time: knex.fn.now(), visibility: true, pin_top: false },
    { customer_id: 6, product_id: 15, content: 'Excellent mechanical keyboard for gaming.', rating: 5, review_time: knex.fn.now(), visibility: true, pin_top: false },
    { customer_id: 7, product_id: 18, content: 'The TV has an amazing display quality.', rating: 5, review_time: knex.fn.now(), visibility: true, pin_top: false },
    { customer_id: 8, product_id: 5, content: 'Next-gen console delivers a smooth experience.', rating: 5, review_time: knex.fn.now(), visibility: true, pin_top: false },
    { customer_id: 9, product_id: 19, content: 'Camera is good but battery life is short.', rating: 4, review_time: knex.fn.now(), visibility: true, pin_top: false },
    { customer_id: 10, product_id: 20, content: 'Smartwatch Pro has all the features I need.', rating: 5, review_time: knex.fn.now(), visibility: true, pin_top: false }
  ]);

};
