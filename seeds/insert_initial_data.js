/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries in product and category tables
  await knex('product').del();
  await knex('category').del();

  // Insert initial data into category table
  await knex('category').insert([
    { name: 'All Products', sub_for: 1 },
    { name: 'Mobile Phones & Accessories', sub_for: 1 },
    { name: 'Computers & Accessories', sub_for: 1 },
    { name: 'Smart Home Devices', sub_for: 1 },
    { name: 'TVs & Home Entertainment', sub_for: 1 },
    { name: 'Gaming & Accessories', sub_for: 1 },
    { name: 'Cameras & Photography Gear', sub_for: 1 },
    { name: 'Wearable Devices', sub_for: 1 },
    { name: 'Networking Equipment', sub_for: 1 },
    { name: 'Office Electronics', sub_for: 1 },
    { name: 'Smartphones', sub_for: 2 },
    { name: 'Phone Cases', sub_for: 2 },
    { name: 'Headphones', sub_for: 2 },
    { name: 'Chargers', sub_for: 2 },
    { name: 'Laptops', sub_for: 3 },
    { name: 'Desktops', sub_for: 3 },
    { name: 'Keyboards', sub_for: 3 },
    { name: 'Mice', sub_for: 3 },
    { name: 'Monitors', sub_for: 3 },
    { name: 'Smart Speakers', sub_for: 4 },
    { name: 'Smart Bulbs', sub_for: 4 },
    { name: 'Security Systems', sub_for: 4 },
    { name: 'Televisions', sub_for: 5 },
    { name: 'Sound Systems', sub_for: 5 },
    { name: 'Projectors', sub_for: 5 },
    { name: 'Gaming Consoles', sub_for: 6 },
    { name: 'Controllers', sub_for: 6 },
    { name: 'VR Devices', sub_for: 6 },
    { name: 'Cameras', sub_for: 7 },
    { name: 'Lenses', sub_for: 7 },
    { name: 'Tripods', sub_for: 7 },
    { name: 'Smartwatches', sub_for: 8 },
    { name: 'Fitness Trackers', sub_for: 8 },
    { name: 'Routers', sub_for: 9 },
    { name: 'Switches', sub_for: 9 },
    { name: 'WiFi Extenders', sub_for: 9 },
    { name: 'Printers', sub_for: 10 },
    { name: 'Scanners', sub_for: 10 },
    { name: 'Fax Machines', sub_for: 10 }
  ]);

  // Insert initial data into product table
  await knex('product').insert([
    { product_name: 'Smartphone X1', price: 699.99, product_description: 'A high-end smartphone with advanced features.', category_id: 11, quantity: 50, folder: 11, image: 'product/11/example.webp', visibility: true },
    { product_name: 'Smartphone Y1', price: 799.99, product_description: 'A powerful smartphone with a sleek design.', category_id: 11, quantity: 40, folder: 11, image: 'product/11/example.webp', visibility: true },
    { product_name: 'Phone Case A', price: 19.99, product_description: 'Durable and stylish phone case.', category_id: 12, quantity: 200, folder: 12, image: 'product/12/example.webp', visibility: true },
    { product_name: 'Phone Case B', price: 15.99, product_description: 'Sleek phone case with a minimalist design.', category_id: 12, quantity: 150, folder: 12, image: 'product/12/example.webp', visibility: true },
    { product_name: 'Wireless Headphones', price: 89.99, product_description: 'Noise-canceling wireless headphones.', category_id: 13, quantity: 100, folder: 13, image: 'product/13/example.webp', visibility: true },
    { product_name: 'In-Ear Headphones', price: 29.99, product_description: 'Comfortable in-ear headphones.', category_id: 13, quantity: 300, folder: 13, image: 'product/13/example.webp', visibility: true },
    { product_name: 'Laptop Pro 15', price: 1299.99, product_description: 'A powerful laptop for professionals.', category_id: 15, quantity: 30, folder: 15, image: 'product/15/example.webp', visibility: true },
    { product_name: 'Gaming Laptop Z1', price: 1599.99, product_description: 'A high-performance gaming laptop.', category_id: 15, quantity: 25, folder: 15, image: 'product/15/example.webp', visibility: true },
    { product_name: 'Mechanical Keyboard', price: 79.99, product_description: 'A mechanical keyboard with RGB lighting.', category_id: 17, quantity: 120, folder: 17, image: 'product/17/example.webp', visibility: true },
    { product_name: 'Wireless Keyboard', price: 49.99, product_description: 'A wireless keyboard with long battery life.', category_id: 17, quantity: 80, folder: 17, image: 'product/17/example.webp', visibility: true },
    { product_name: '4K Monitor', price: 299.99, product_description: 'A 27-inch 4K monitor for work and gaming.', category_id: 19, quantity: 60, folder: 19, image: 'product/19/example.webp', visibility: true },
    { product_name: 'Ultrawide Monitor', price: 399.99, product_description: 'A 34-inch ultrawide monitor.', category_id: 19, quantity: 45, folder: 19, image: 'product/19/example.webp', visibility: true },
    { product_name: 'Smart Speaker A1', price: 59.99, product_description: 'A voice-controlled smart speaker.', category_id: 20, quantity: 150, folder: 20, image: 'product/20/example.webp', visibility: true },
    { product_name: 'Smart Speaker B1', price: 89.99, product_description: 'A premium smart speaker with great sound quality.', category_id: 20, quantity: 80, folder: 20, image: 'product/20/example.webp', visibility: true },
    { product_name: 'Smart TV 55"', price: 599.99, product_description: 'A 55-inch 4K smart TV.', category_id: 23, quantity: 40, folder: 23, image: 'product/23/example.webp', visibility: true },
    { product_name: 'OLED TV 65"', price: 1299.99, product_description: 'A 65-inch OLED 4K TV.', category_id: 23, quantity: 20, folder: 23, image: 'product/23/example.webp', visibility: true },
    { product_name: 'Next-Gen Console X', price: 499.99, product_description: 'A next-generation gaming console.', category_id: 26, quantity: 100, folder: 26, image: 'product/26/example.webp', visibility: true },
    { product_name: 'Gaming Console Y', price: 399.99, product_description: 'A budget-friendly gaming console.', category_id: 26, quantity: 120, folder: 26, image: 'product/26/example.webp', visibility: true },
    { product_name: 'DSLR Camera A1', price: 899.99, product_description: 'A high-quality DSLR camera for photography.', category_id: 29, quantity: 35, folder: 29, image: 'product/29/example.webp', visibility: true },
    { product_name: 'Mirrorless Camera B1', price: 1199.99, product_description: 'A mirrorless camera with advanced features.', category_id: 29, quantity: 25, folder: 29, image: 'product/29/example.webp', visibility: true },
    { product_name: 'Smartwatch Pro', price: 199.99, product_description: 'A smartwatch with fitness tracking features.', category_id: 32, quantity: 90, folder: 32, image: 'product/32/example.webp', visibility: true },
    { product_name: 'Smartwatch Lite', price: 149.99, product_description: 'A lightweight smartwatch for everyday use.', category_id: 32, quantity: 120, folder: 32, image: 'product/32/example.webp', visibility: true }
  ]);
};
