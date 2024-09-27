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
  await knex('address').del();

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

  await knex('address').insert([
    { customer_id: 1, street: '443 Roncesvalles Ave', city: 'London', province: 'NS', postal: 'V5K 0A1', country: 'Canada', is_default: false },
    { customer_id: 1, street: '479 Bathurst St', city: 'Vancouver', province: 'SK', postal: 'M5H 1T1', country: 'Canada', is_default: true },
    { customer_id: 1, street: '996 College St', city: 'Winnipeg', province: 'ON', postal: 'G1A 1A1', country: 'Canada', is_default: false },
    { customer_id: 2, street: '527 Church St', city: 'Ottawa', province: 'AB', postal: 'T2P 3N4', country: 'Canada', is_default: true },
    { customer_id: 2, street: '141 Bay St', city: 'Edmonton', province: 'MB', postal: 'N2G 4M4', country: 'Canada', is_default: false },
    { customer_id: 3, street: '255 York St', city: 'Toronto', province: 'ON', postal: 'M5H 1T1', country: 'Canada', is_default: true },
    { customer_id: 4, street: '881 Yonge St', city: 'Toronto', province: 'ON', postal: 'M5H 1T1', country: 'Canada', is_default: true },
    { customer_id: 5, street: '212 Main St', city: 'Victoria', province: 'BC', postal: 'V8W 1T2', country: 'Canada', is_default: true },
    { customer_id: 6, street: '920 Bay St', city: 'Halifax', province: 'NS', postal: 'B3H 1W3', country: 'Canada', is_default: true },
    { customer_id: 7, street: '567 Dundas St', city: 'Hamilton', province: 'ON', postal: 'L8N 1T1', country: 'Canada', is_default: true },
    { customer_id: 8, street: '333 Spadina Ave', city: 'Quebec City', province: 'QC', postal: 'G1A 1A1', country: 'Canada', is_default: true },
    { customer_id: 9, street: '999 King St', city: 'Montreal', province: 'QC', postal: 'H3Z 2Y7', country: 'Canada', is_default: true },
    { customer_id: 10, street: '623 Richmond St', city: 'Edmonton', province: 'AB', postal: 'T5J 3E3', country: 'Canada', is_default: true },
    { customer_id: 11, street: '141 Church St', city: 'Toronto', province: 'ON', postal: 'M5H 1T1', country: 'Canada', is_default: true },
    { customer_id: 12, street: '789 Front St', city: 'Windsor', province: 'ON', postal: 'N9A 3J3', country: 'Canada', is_default: true },
    { customer_id: 13, street: '414 Queen St', city: 'Calgary', province: 'AB', postal: 'T2P 3N4', country: 'Canada', is_default: true },
    { customer_id: 14, street: '919 King St', city: 'Regina', province: 'SK', postal: 'S4P 3Y2', country: 'Canada', is_default: true },
    { customer_id: 15, street: '231 York St', city: "St. John's", province: 'NL', postal: 'A1C 1A1', country: 'Canada', is_default: true },
    { customer_id: 16, street: '876 Queen St', city: 'Saskatoon', province: 'SK', postal: 'S7K 0A1', country: 'Canada', is_default: true },
    { customer_id: 17, street: '654 Bloor St', city: 'Ottawa', province: 'ON', postal: 'K1A 0B1', country: 'Canada', is_default: true },
    { customer_id: 18, street: '321 Adelaide St', city: 'Markham', province: 'ON', postal: 'L3P 3J3', country: 'Canada', is_default: true },
    { customer_id: 19, street: '123 College St', city: 'Kitchener', province: 'ON', postal: 'N2G 4M4', country: 'Canada', is_default: true },
    { customer_id: 20, street: '456 Main St', city: 'Mississauga', province: 'ON', postal: 'L5B 3M7', country: 'Canada', is_default: true },
    { customer_id: 21, street: '555 King St', city: 'Calgary', province: 'AB', postal: 'T2P 3N4', country: 'Canada', is_default: true },
    { customer_id: 22, street: '876 Queen St', city: 'Vancouver', province: 'BC', postal: 'V5K 0A1', country: 'Canada', is_default: true },
    { customer_id: 23, street: '432 Main St', city: 'Toronto', province: 'ON', postal: 'M5H 1T1', country: 'Canada', is_default: true },
    { customer_id: 24, street: '655 Front St', city: 'Ottawa', province: 'ON', postal: 'K1A 0B1', country: 'Canada', is_default: true },
    { customer_id: 25, street: '987 Richmond St', city: 'Halifax', province: 'NS', postal: 'B3H 1W3', country: 'Canada', is_default: true },
    { customer_id: 26, street: '123 Spadina Ave', city: 'Hamilton', province: 'ON', postal: 'L8N 1T1', country: 'Canada', is_default: true },
    { customer_id: 27, street: '456 Bloor St', city: 'Victoria', province: 'BC', postal: 'V8W 1T2', country: 'Canada', is_default: true },
    { customer_id: 28, street: '789 Bay St', city: 'London', province: 'ON', postal: 'N6A 5B9', country: 'Canada', is_default: true },
    { customer_id: 29, street: '101 Dundas St', city: 'Montreal', province: 'QC', postal: 'H3Z 2Y7', country: 'Canada', is_default: true },
    { customer_id: 30, street: '222 York St', city: 'Vancouver', province: 'BC', postal: 'V5K 0A1', country: 'Canada', is_default: true },
    { customer_id: 31, street: '303 King St', city: 'Toronto', province: 'ON', postal: 'M5H 1T1', country: 'Canada', is_default: true },
    { customer_id: 32, street: '123 Church St', city: 'Windsor', province: 'ON', postal: 'N9A 3J3', country: 'Canada', is_default: true },
    { customer_id: 33, street: '879 Queen St', city: 'Calgary', province: 'AB', postal: 'T2P 3N4', country: 'Canada', is_default: true },
    { customer_id: 34, street: '654 College St', city: 'Victoria', province: 'BC', postal: 'V8W 1T2', country: 'Canada', is_default: true },
    { customer_id: 35, street: '876 Bay St', city: 'Halifax', province: 'NS', postal: 'B3H 1W3', country: 'Canada', is_default: true },
    { customer_id: 36, street: '919 Front St', city: 'Markham', province: 'ON', postal: 'L3P 3J3', country: 'Canada', is_default: true },
    { customer_id: 37, street: '324 Yonge St', city: 'Toronto', province: 'ON', postal: 'M5H 1T1', country: 'Canada', is_default: true },
    { customer_id: 38, street: '123 Queen St', city: 'Montreal', province: 'QC', postal: 'H3Z 2Y7', country: 'Canada', is_default: true },
    { customer_id: 39, street: '567 Spadina Ave', city: 'Vancouver', province: 'BC', postal: 'V5K 0A1', country: 'Canada', is_default: true },
    { customer_id: 40, street: '234 Main St', city: 'London', province: 'ON', postal: 'N6A 5B9', country: 'Canada', is_default: true },
    { customer_id: 41, street: '789 Church St', city: 'Regina', province: 'SK', postal: 'S4P 3Y2', country: 'Canada', is_default: true },
    { customer_id: 42, street: '456 Richmond St', city: 'Edmonton', province: 'AB', postal: 'T5J 3E3', country: 'Canada', is_default: true },
    { customer_id: 43, street: '987 Bay St', city: 'Ottawa', province: 'ON', postal: 'K1A 0B1', country: 'Canada', is_default: true },
    { customer_id: 44, street: '321 Spadina Ave', city: 'Windsor', province: 'ON', postal: 'N9A 3J3', country: 'Canada', is_default: true },
    { customer_id: 45, street: '654 Queen St', city: 'Toronto', province: 'ON', postal: 'M5H 1T1', country: 'Canada', is_default: true },
    { customer_id: 46, street: '101 Front St', city: 'Vancouver', province: 'BC', postal: 'V5K 0A1', country: 'Canada', is_default: true },
    { customer_id: 47, street: '222 Yonge St', city: 'Montreal', province: 'QC', postal: 'H3Z 2Y7', country: 'Canada', is_default: true },
    { customer_id: 48, street: '128 College St', city: 'Montreal', province: 'QC', postal: 'S4P 3Y2', country: 'Canada', is_default: true },
    { customer_id: 48, street: '295 King St', city: 'Hamilton', province: 'SK', postal: 'A1C 1A1', country: 'Canada', is_default: false },
    { customer_id: 49, street: '557 Richmond St', city: 'Calgary', province: 'ON', postal: 'N9A 3J3', country: 'Canada', is_default: true },
    { customer_id: 50, street: '717 Main St', city: 'Windsor', province: 'QC', postal: 'L6Y 1N2', country: 'Canada', is_default: false },
    { customer_id: 50, street: '394 St. Clair Ave', city: 'London', province: 'NS', postal: 'T2P 3N4', country: 'Canada', is_default: true }
  ]);

};
