/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries in product and category tables and other related tables
  
  await knex('address').del();
  await knex('review').del();
  await knex('product').del();
  await knex('category').del();
  await knex('admin').del(); 
  
  // Insert categories
  await knex.raw(`
    -- Insert 'All Products' as the main parent category
    INSERT INTO category (id, name, sub_for, image) VALUES (1, 'All Products', 1, 'category/all_products.webp');
    
    -- Insert subcategories under 'All Products'
    INSERT INTO category (id, name, sub_for, image) VALUES (2, 'Mobile Phones & Accessories', 1, 'category/mobile_phones_accessories.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (3, 'Computers & Accessories', 1, 'category/computers_accessories.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (4, 'TVs & Home Entertainment', 1, 'category/tvs_home_entertainment.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (5, 'Gaming & Accessories', 1, 'category/gaming_accessories.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (6, 'Cameras & Photography Gear', 1, 'category/cameras_photography_gear.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (7, 'Wearable Devices', 1, 'category/wearable_devices.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (8, 'Office Electronics', 1, 'category/office_electronics.webp');

    -- Insert third-level categories for 'Mobile Phones & Accessories'
    INSERT INTO category (id, name, sub_for, image) VALUES (9, 'Smartphones', 2, 'category/smartphones.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (10, 'Phone Cases', 2, 'category/phone_cases.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (11, 'Headphones', 2, 'category/headphones.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (12, 'Chargers', 2, 'category/chargers.webp');

    -- Insert third-level categories for 'Computers & Accessories'
    INSERT INTO category (id, name, sub_for, image) VALUES (13, 'Laptops', 3, 'category/laptops.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (14, 'Desktops', 3, 'category/desktops.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (15, 'Keyboards', 3, 'category/keyboards.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (16, 'Mice', 3, 'category/mice.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (17, 'Monitors', 3, 'category/monitors.webp');

    -- Insert third-level categories for 'TVs & Home Entertainment'
    INSERT INTO category (id, name, sub_for, image) VALUES (18, 'Televisions', 4, 'category/televisions.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (19, 'Sound Systems', 4, 'category/sound_systems.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (20, 'Projectors', 4, 'category/projectors.webp');

    -- Insert third-level categories for 'Gaming & Accessories'
    INSERT INTO category (id, name, sub_for, image) VALUES (21, 'Gaming Consoles', 5, 'category/gaming_consoles.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (22, 'Controllers', 5, 'category/controllers.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (23, 'VR Devices', 5, 'category/vr_devices.webp');

    -- Insert third-level categories for 'Cameras & Photography Gear'
    INSERT INTO category (id, name, sub_for, image) VALUES (24, 'Cameras', 6, 'category/cameras.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (25, 'Lenses', 6, 'category/lenses.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (26, 'Tripods', 6, 'category/tripods.webp');

    -- Insert third-level categories for 'Wearable Devices'
    INSERT INTO category (id, name, sub_for, image) VALUES (27, 'Smartwatches', 7, 'category/smartwatches.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (28, 'Fitness Trackers', 7, 'category/fitness_trackers.webp');

    -- Insert third-level categories for 'Office Electronics'
    INSERT INTO category (id, name, sub_for, image) VALUES (29, 'Printers', 8, 'category/printers.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (30, 'Scanners', 8, 'category/scanners.webp');
    INSERT INTO category (id, name, sub_for, image) VALUES (31, 'Fax Machines', 8, 'category/fax_machines.webp');
  `);

  // Insert product data
  await knex.raw(`
    -- Insert product data into the 'product' table
    INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility)
    VALUES 
    ('Smartphone X1', 699.99, 'A high-end smartphone with advanced features.', 9, 50, 9, 'product/9/example.webp', TRUE),
    ('Smartphone Y1', 799.99, 'A powerful smartphone with a sleek design.', 9, 40, 9, 'product/9/example.webp', TRUE),
    ('Phone Case A', 19.99, 'Durable and stylish phone case.', 10, 200, 10, 'product/10/example.webp', TRUE),
    ('Phone Case B', 15.99, 'Sleek phone case with a minimalist design.', 10, 150, 10, 'product/10/example.webp', TRUE),
    ('Wireless Headphones', 89.99, 'Noise-canceling wireless headphones.', 11, 100, 11, 'product/11/example.webp', TRUE),
    ('In-Ear Headphones', 29.99, 'Comfortable in-ear headphones.', 11, 300, 11, 'product/11/example.webp', TRUE),
    ('Laptop Pro 15', 1299.99, 'A powerful laptop for professionals.', 13, 30, 13, 'product/13/example.webp', TRUE),
    ('Gaming Laptop Z1', 1599.99, 'A high-performance gaming laptop.', 13, 25, 13, 'product/13/example.webp', TRUE),
    ('Mechanical Keyboard', 79.99, 'A mechanical keyboard with RGB lighting.', 15, 120, 15, 'product/15/example.webp', TRUE),
    ('Wireless Keyboard', 49.99, 'A wireless keyboard with long battery life.', 15, 80, 15, 'product/15/example.webp', TRUE),
    ('4K Monitor', 299.99, 'A 27-inch 4K monitor for work and gaming.', 17, 60, 17, 'product/17/example.webp', TRUE),
    ('Ultrawide Monitor', 399.99, 'A 34-inch ultrawide monitor.', 17, 45, 17, 'product/17/example.webp', TRUE),
    ('Smart TV 55"', 599.99, 'A 55-inch 4K smart TV.', 18, 40, 18, 'product/18/example.webp', TRUE),
    ('OLED TV 65"', 1299.99, 'A 65-inch OLED 4K TV.', 18, 20, 18, 'product/18/example.webp', TRUE),
    ('Next-Gen Console X', 499.99, 'A next-generation gaming console.', 21, 100, 21, 'product/21/example.webp', TRUE),
    ('Gaming Console Y', 399.99, 'A budget-friendly gaming console.', 21, 120, 21, 'product/21/example.webp', TRUE),
    ('DSLR Camera A1', 899.99, 'A high-quality DSLR camera for photography.', 24, 35, 24, 'product/24/example.webp', TRUE),
    ('Mirrorless Camera B1', 1199.99, 'A mirrorless camera with advanced features.', 24, 25, 24, 'product/24/example.webp', TRUE),
    ('Smartwatch Pro', 199.99, 'A smartwatch with fitness tracking features.', 27, 90, 27, 'product/27/example.webp', TRUE),
    ('Smartwatch Lite', 149.99, 'A lightweight smartwatch for everyday use.', 27, 120, 27, 'product/27/example.webp', TRUE);
  `);

  // Insert a super admin account
  await knex.raw(`
    INSERT INTO admin (password, name, pin, title, status, image, register_date, last_login)
    VALUES ('securepassword123', 'Chris', '1234', 'Super Admin', TRUE, 'admin/chris.webp', CURRENT_TIMESTAMP, NULL);
  `);

  // Insert product reviews
  await knex.raw(`
    INSERT INTO review (customer_id, product_id, content, rating, review_time, visibility, pin_top)
    VALUES 
    (1, 9, 'Great product! Works as expected.', 5, CURRENT_TIMESTAMP, TRUE, FALSE),
    (2, 9, 'Good quality but overpriced.', 4, CURRENT_TIMESTAMP, TRUE, FALSE),
    (3, 10, 'The case fits perfectly and looks stylish.', 5, CURRENT_TIMESTAMP, TRUE, FALSE),
    (4, 11, 'Sound quality is decent for the price.', 4, CURRENT_TIMESTAMP, TRUE, FALSE),
    (5, 13, 'Highly recommend this laptop for productivity.', 5, CURRENT_TIMESTAMP, TRUE, FALSE),
    (6, 15, 'Excellent mechanical keyboard for gaming.', 5, CURRENT_TIMESTAMP, TRUE, FALSE),
    (7, 18, 'The TV has an amazing display quality.', 5, CURRENT_TIMESTAMP, TRUE, FALSE),
    (8, 17, 'Next-gen console delivers a smooth experience.', 5, CURRENT_TIMESTAMP, TRUE, FALSE),
    (9, 19, 'Camera is good but battery life is short.', 4, CURRENT_TIMESTAMP, TRUE, FALSE),
    (10, 20, 'Smartwatch Pro has all the features I need.', 5, CURRENT_TIMESTAMP, TRUE, FALSE);
  `);

  // Insert address data for customers
  await knex.raw(`
    INSERT INTO address (customer_id, street, city, province, postal, country, is_default) 
    VALUES
    (1, '443 Roncesvalles Ave', 'London', 'NS', 'V5K 0A1', 'Canada', FALSE),
    (1, '479 Bathurst St', 'Vancouver', 'SK', 'M5H 1T1', 'Canada', TRUE),
    (1, '996 College St', 'Winnipeg', 'ON', 'G1A 1A1', 'Canada', FALSE),
    (2, '527 Church St', 'Ottawa', 'AB', 'T2P 3N4', 'Canada', TRUE),
    (2, '141 Bay St', 'Edmonton', 'MB', 'N2G 4M4', 'Canada', FALSE),
    (3, '255 York St', 'Toronto', 'ON', 'M5H 1T1', 'Canada', TRUE),
    (4, '881 Yonge St', 'Toronto', 'ON', 'M5H 1T1', 'Canada', TRUE),
    (5, '212 Main St', 'Victoria', 'BC', 'V8W 1T2', 'Canada', TRUE),
    (6, '920 Bay St', 'Halifax', 'NS', 'B3H 1W3', 'Canada', TRUE),
    (7, '567 Dundas St', 'Hamilton', 'ON', 'L8N 1T1', 'Canada', TRUE),
    (8, '333 Spadina Ave', 'Quebec City', 'QC', 'G1A 1A1', 'Canada', TRUE),
    (9, '999 King St', 'Montreal', 'QC', 'H3Z 2Y7', 'Canada', TRUE),
    (10, '623 Richmond St', 'Edmonton', 'AB', 'T5J 3E3', 'Canada', TRUE),
    (11, '141 Church St', 'Toronto', 'ON', 'M5H 1T1', 'Canada', TRUE),
    (12, '789 Front St', 'Windsor', 'ON', 'N9A 3J3', 'Canada', TRUE),
    (13, '414 Queen St', 'Calgary', 'AB', 'T2P 3N4', 'Canada', TRUE),
    (14, '919 King St', 'Regina', 'SK', 'S4P 3Y2', 'Canada', TRUE),
    (15, '231 York St', 'St. Johns', 'NL', 'A1C 1A1', 'Canada', TRUE),
    (16, '876 Queen St', 'Saskatoon', 'SK', 'S7K 0A1', 'Canada', TRUE),
    (17, '654 Bloor St', 'Ottawa', 'ON', 'K1A 0B1', 'CanadW', TRUE),
    (18, '321 Adelaide St', 'Markham', 'ON', 'L3P 3J3', 'Canada', TRUE),
    (19, '123 College St', 'Kitchener', 'ON', 'N2G 4M4', 'Canada', TRUE),
    (20, '456 Main St', 'Mississauga', 'ON', 'L5B 3M7', 'Canada', TRUE),
    (21, '555 King St', 'Calgary', 'AB', 'T2P 3N4', 'Canada', TRUE),
    (22, '876 Queen St', 'Vancouver', 'BC', 'V5K 0A1', 'Canada', TRUE),
    (23, '432 Main St', 'Toronto', 'ON', 'M5H 1T1', 'Canada', TRUE),
    (24, '655 Front St', 'Ottawa', 'ON', 'K1A 0B1', 'Canada', TRUE),
    (25, '987 Richmond St', 'Halifax', 'NS', 'B3H 1W3', 'Canada', TRUE),
    (26, '123 Spadina Ave', 'Hamilton', 'ON', 'L8N 1T1', 'Canada', TRUE),
    (27, '456 Bloor St', 'Victoria', 'BC', 'V8W 1T2', 'Canada', TRUE),
    (28, '789 Bay St', 'London', 'ON', 'N6A 5B9', 'Canada', TRUE),
    (29, '101 Dundas St', 'Montreal', 'QC', 'H3Z 2Y7', 'Canada', TRUE),
    (30, '222 York St', 'Vancouver', 'BC', 'V5K 0A1', 'Canada', TRUE),
    (31, '303 King St', 'Toronto', 'ON', 'M5H 1T1', 'Canada', TRUE),
    (32, '123 Church St', 'Windsor', 'ON', 'N9A 3J3', 'Canada', TRUE),
    (33, '879 Queen St', 'Calgary', 'AB', 'T2P 3N4', 'Canada', TRUE),
    (34, '654 College St', 'Victoria', 'BC', 'V8W 1T2', 'Canada', TRUE),
    (35, '876 Bay St', 'Halifax', 'NS', 'B3H 1W3', 'Canada', TRUE),
    (36, '919 Front St', 'Markham', 'ON', 'L3P 3J3', 'Canada', TRUE),
    (37, '324 Yonge St', 'Toronto', 'ON', 'M5H 1T1', 'Canada', TRUE),
    (38, '123 Queen St', 'Montreal', 'QC', 'H3Z 2Y7', 'Canada', TRUE),
    (39, '567 Spadina Ave', 'Vancouver', 'BC', 'V5K 0A1', 'Canada', TRUE),
    (40, '234 Main St', 'London', 'ON', 'N6A 5B9', 'Canada', TRUE),
    (41, '789 Church St', 'Regina', 'SK', 'S4P 3Y2', 'Canada', TRUE),
    (42, '456 Richmond St', 'Edmonton', 'AB', 'T5J 3E3', 'Canada', TRUE),
    (43, '987 Bay St', 'Ottawa', 'ON', 'K1A 0B1', 'Canada', TRUE),
    (44, '321 Spadina Ave', 'Windsor', 'ON', 'N9A 3J3', 'Canada', TRUE),
    (45, '654 Queen St', 'Toronto', 'ON', 'M5H 1T1', 'Canada', TRUE),
    (46, '101 Front St', 'Vancouver', 'BC', 'V5K 0A1', 'Canada', TRUE),
    (47, '222 Yonge St', 'Montreal', 'QC', 'H3Z 2Y7', 'Canada', TRUE),
    (48, '128 College St', 'Montreal', 'QC', 'S4P 3Y2', 'Canada', TRUE),
    (48, '295 King St', 'Hamilton', 'SK', 'A1C 1A1', 'Canada', FALSE),
    (49, '557 Richmond St', 'Calgary', 'ON', 'N9A 3J3', 'Canada', TRUE),
    (50, '717 Main St', 'Windsor', 'QC', 'L6Y 1N2', 'Canada', FALSE),
    (50, '394 St. Clair Ave', 'London', 'NS', 'T2P 3N4', 'Canada', TRUE);
  `);
};
