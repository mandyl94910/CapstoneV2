-- Insert 'All Products' as the main parent category
INSERT INTO category (id, name, sub_for, image) VALUES (1, 'All Products', 1, 'category/all_products.webp');

-- Insert subcategories under 'All Products'
INSERT INTO category (id, name, sub_for, image) VALUES (2, 'Mobile Phones & Accessories', 1, 'category/mobile_phones_accessories.webp');
INSERT INTO category (id, name, sub_for, image) VALUES (3, 'Computers & Accessories', 1, 'category/computers_accessories.webp');
-- Smart Home Devices removed
INSERT INTO category (id, name, sub_for, image) VALUES (4, 'TVs & Home Entertainment', 1, 'category/tvs_home_entertainment.webp');
INSERT INTO category (id, name, sub_for, image) VALUES (5, 'Gaming & Accessories', 1, 'category/gaming_accessories.webp');
INSERT INTO category (id, name, sub_for, image) VALUES (6, 'Cameras & Photography Gear', 1, 'category/cameras_photography_gear.webp');
INSERT INTO category (id, name, sub_for, image) VALUES (7, 'Wearable Devices', 1, 'category/wearable_devices.webp');
-- Networking Equipment removed
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

-- Smart Home Devices removed, so no Smart Speakers, Smart Bulbs, Security Systems

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

-- Networking Equipment removed, so no Routers, Switches, WiFi Extenders

-- Insert third-level categories for 'Office Electronics'
INSERT INTO category (id, name, sub_for, image) VALUES (29, 'Printers', 8, 'category/printers.webp');
INSERT INTO category (id, name, sub_for, image) VALUES (30, 'Scanners', 8, 'category/scanners.webp');
INSERT INTO category (id, name, sub_for, image) VALUES (31, 'Fax Machines', 8, 'category/fax_machines.webp');

--------------------------------------------------------------------------------

-- Insert product data

-- Smartphones (folder 9)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Smartphone X1', 699.99, 'A high-end smartphone with advanced features.', 9, 50, 9, 'product/9/example.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Smartphone Y1', 799.99, 'A powerful smartphone with a sleek design.', 9, 40, 9, 'product/9/example.webp', TRUE);

-- Phone Cases (folder 10)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Phone Case A', 19.99, 'Durable and stylish phone case.', 10, 200, 10, 'product/10/example.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Phone Case B', 15.99, 'Sleek phone case with a minimalist design.', 10, 150, 10, 'product/10/example.webp', TRUE);

-- Headphones (folder 11)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Wireless Headphones', 89.99, 'Noise-canceling wireless headphones.', 11, 100, 11, 'product/11/example.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('In-Ear Headphones', 29.99, 'Comfortable in-ear headphones.', 11, 300, 11, 'product/11/example.webp', TRUE);

-- Laptops (folder 13)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Laptop Pro 15', 1299.99, 'A powerful laptop for professionals.', 13, 30, 13, 'product/13/example.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Gaming Laptop Z1', 1599.99, 'A high-performance gaming laptop.', 13, 25, 13, 'product/13/example.webp', TRUE);

-- Keyboards (folder 15)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Mechanical Keyboard', 79.99, 'A mechanical keyboard with RGB lighting.', 15, 120, 15, 'product/15/example.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Wireless Keyboard', 49.99, 'A wireless keyboard with long battery life.', 15, 80, 15, 'product/15/example.webp', TRUE);

-- Monitors (folder 17)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('4K Monitor', 299.99, 'A 27-inch 4K monitor for work and gaming.', 17, 60, 17, 'product/17/example.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Ultrawide Monitor', 399.99, 'A 34-inch ultrawide monitor.', 17, 45, 17, 'product/17/example.webp', TRUE);

-- Televisions (folder 18)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Smart TV 55"', 599.99, 'A 55-inch 4K smart TV.', 18, 40, 18, 'product/18/example.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('OLED TV 65"', 1299.99, 'A 65-inch OLED 4K TV.', 18, 20, 18, 'product/18/example.webp', TRUE);

-- Gaming Consoles (folder 21)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Next-Gen Console X', 499.99, 'A next-generation gaming console.', 21, 100, 21, 'product/21/example.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Gaming Console Y', 399.99, 'A budget-friendly gaming console.', 21, 120, 21, 'product/21/example.webp', TRUE);

-- Cameras (folder 24)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('DSLR Camera A1', 899.99, 'A high-quality DSLR camera for photography.', 24, 35, 24, 'product/24/example.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Mirrorless Camera B1', 1199.99, 'A mirrorless camera with advanced features.', 24, 25, 24, 'product/24/example.webp', TRUE);

-- Smartwatches (folder 27)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Smartwatch Pro', 199.99, 'A smartwatch with fitness tracking features.', 27, 90, 27, 'product/27/example.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Smartwatch Lite', 149.99, 'A lightweight smartwatch for everyday use.', 27, 120, 27, 'product/27/example.webp', TRUE);

----------------------------------------------------------------------------------

-- Insert a super admin account named 'Chris'
INSERT INTO admin (password, name, pin, title, status, image, register_date, last_login) 
VALUES ('securepassword123', 'Chris', '1234', 'Super Admin', TRUE, 'admin/chris.webp', CURRENT_TIMESTAMP, NULL);

-- Insert 10 product reviews with customer_id ranging from 1 to 10
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


-----------------------------------------------------------------------------------

-- Insert address data for customers 1 to 50
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
(17, '654 Bloor St', 'Ottawa', 'ON', 'K1A 0B1', 'Canada', TRUE),
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


-----------------------------------------------------------------------------------

-- -- Insert 20 order records with customer_id and address_id ranging from 1 to 20, and status being 'pending', 'shipped', 'completed' or 'cancelled'

-- INSERT INTO orders (customer_id, address_id, total, status, order_date, ship_date, shipping_method, tracking_number, complete_date)
-- VALUES 
-- (1, 1, 799.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_TIMESTAMP - INTERVAL '9 days', 'UPS', 'TRK1234561', CURRENT_TIMESTAMP - INTERVAL '5 days'),
-- (2, 2, 399.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '7 days', CURRENT_TIMESTAMP - INTERVAL '5 days', 'FedEx', 'TRK1234562', NULL),
-- (3, 3, 499.99, 'pending', CURRENT_TIMESTAMP - INTERVAL '3 days', NULL, NULL, NULL, NULL),
-- (4, 4, 299.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '15 days', CURRENT_TIMESTAMP - INTERVAL '13 days', 'DHL', 'TRK1234563', CURRENT_TIMESTAMP - INTERVAL '10 days'),
-- (5, 5, 199.99, 'cancelled', CURRENT_TIMESTAMP - INTERVAL '5 days', NULL, NULL, NULL, NULL),
-- (6, 6, 599.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '6 days', CURRENT_TIMESTAMP - INTERVAL '4 days', 'UPS', 'TRK1234564', NULL),
-- (7, 7, 1299.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '20 days', CURRENT_TIMESTAMP - INTERVAL '18 days', 'FedEx', 'TRK1234565', CURRENT_TIMESTAMP - INTERVAL '15 days'),
-- (8, 8, 699.99, 'pending', CURRENT_TIMESTAMP - INTERVAL '1 day', NULL, NULL, NULL, NULL),
-- (9, 9, 149.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '12 days', CURRENT_TIMESTAMP - INTERVAL '11 days', 'DHL', 'TRK1234566', CURRENT_TIMESTAMP - INTERVAL '8 days'),
-- (10, 10, 999.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_TIMESTAMP - INTERVAL '3 days', 'UPS', 'TRK1234567', NULL),
-- (11, 11, 1099.99, 'pending', CURRENT_TIMESTAMP - INTERVAL '2 days', NULL, NULL, NULL, NULL),
-- (12, 12, 249.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '14 days', CURRENT_TIMESTAMP - INTERVAL '12 days', 'FedEx', 'TRK1234568', CURRENT_TIMESTAMP - INTERVAL '9 days'),
-- (13, 13, 899.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '18 days', CURRENT_TIMESTAMP - INTERVAL '16 days', 'UPS', 'TRK1234569', CURRENT_TIMESTAMP - INTERVAL '13 days'),
-- (14, 14, 1499.99, 'pending', CURRENT_TIMESTAMP - INTERVAL '4 days', NULL, NULL, NULL, NULL),
-- (15, 15, 1999.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '8 days', CURRENT_TIMESTAMP - INTERVAL '6 days', 'DHL', 'TRK1234570', NULL),
-- (16, 16, 49.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '9 days', CURRENT_TIMESTAMP - INTERVAL '8 days', 'FedEx', 'TRK1234571', CURRENT_TIMESTAMP - INTERVAL '5 days'),
-- (17, 17, 299.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '3 days', CURRENT_TIMESTAMP - INTERVAL '1 day', 'UPS', 'TRK1234572', NULL),
-- (18, 18, 599.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '13 days', CURRENT_TIMESTAMP - INTERVAL '11 days', 'FedEx', 'TRK1234573', CURRENT_TIMESTAMP - INTERVAL '8 days'),
-- (19, 19, 129.99, 'pending', CURRENT_TIMESTAMP - INTERVAL '1 day', NULL, NULL, NULL, NULL),
-- (20, 20, 799.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_TIMESTAMP - INTERVAL '3 days', 'DHL', 'TRK1234574', NULL);

-- -- Insert order details for each of the orders, product_id is limited to 1-20

-- INSERT INTO orders_detail (order_id, product_id, quantity)
-- VALUES (1, 1, 2),
--        (2, 2, 1),
--        (3, 3, 1),
--        (4, 4, 1),
--        (5, 5, 1),
--        (6, 6, 3),
--        (7, 7, 1),
--        (8, 8, 1),
--        (9, 9, 1),
--        (10, 10, 2),
--        (11, 11, 2),
--        (12, 12, 1),
--        (13, 13, 1),
--        (14, 14, 1),
--        (15, 15, 1),
--        (16, 16, 1),
--        (17, 17, 1),
--        (18, 18, 1),
--        (19, 19, 1),
--        (20, 20, 2),
--        (1, 2, 1),
--        (2, 3, 2),
--        (3, 4, 3),
--        (4, 5, 1),
--        (5, 6, 1),
--        (6, 7, 2),
--        (7, 8, 1),
--        (8, 9, 1),
--        (9, 10, 1),
--        (10, 11, 1);

