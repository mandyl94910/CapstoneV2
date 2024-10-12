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
INSERT INTO address (customer_id, first_name, last_name, phone, street, city, province, postal, country, is_default) 
VALUES
(1, 'John', 'Doe', '1234567890', '443 Roncesvalles Ave', 'London', 'NS', 'V5K 0A1', 'Canada', FALSE),
(1, 'John', 'Doe', '1234567890', '479 Bathurst St', 'Vancouver', 'SK', 'M5H 1T1', 'Canada', TRUE),
(1, 'John', 'Doe', '1234567890', '996 College St', 'Winnipeg', 'ON', 'G1A 1A1', 'Canada', FALSE),
(2, 'Jane', 'Smith', '0987654321', '527 Church St', 'Ottawa', 'AB', 'T2P 3N4', 'Canada', TRUE),
(2, 'Jane', 'Smith', '0987654321', '141 Bay St', 'Edmonton', 'MB', 'N2G 4M4', 'Canada', FALSE),
(3, 'Michael', 'Johnson', '1231231234', '255 York St', 'Toronto', 'ON', 'M5H 1T1', 'Canada', TRUE),
(4, 'Sarah', 'Williams', '3213213210', '881 Yonge St', 'Toronto', 'ON', 'M5H 1T1', 'Canada', TRUE),
(5, 'David', 'Brown', '5555555555', '212 Main St', 'Victoria', 'BC', 'V8W 1T2', 'Canada', TRUE),
(6, 'Chris', 'Davis', '6666666666', '920 Bay St', 'Halifax', 'NS', 'B3H 1W3', 'Canada', TRUE),
(7, 'Emma', 'Miller', '7777777777', '567 Dundas St', 'Hamilton', 'ON', 'L8N 1T1', 'Canada', TRUE),
(8, 'Olivia', 'Wilson', '8888888888', '333 Spadina Ave', 'Quebec City', 'QC', 'G1A 1A1', 'Canada', TRUE),
(9, 'James', 'Moore', '9999999999', '999 King St', 'Montreal', 'QC', 'H3Z 2Y7', 'Canada', TRUE),
(10, 'Sophia', 'Taylor', '1112223333', '623 Richmond St', 'Edmonton', 'AB', 'T5J 3E3', 'Canada', TRUE),
(11, 'Liam', 'Anderson', '3334445555', '141 Church St', 'Toronto', 'ON', 'M5H 1T1', 'Canada', TRUE),
(12, 'Lucas', 'Thomas', '4445556666', '789 Front St', 'Windsor', 'ON', 'N9A 3J3', 'Canada', TRUE),
(13, 'Ava', 'Jackson', '5556667777', '414 Queen St', 'Calgary', 'AB', 'T2P 3N4', 'Canada', TRUE),
(14, 'Ethan', 'White', '6667778888', '919 King St', 'Regina', 'SK', 'S4P 3Y2', 'Canada', TRUE),
(15, 'Mia', 'Harris', '7778889999', '231 York St', 'St. Johns', 'NL', 'A1C 1A1', 'Canada', TRUE),
(16, 'Isabella', 'Martin', '8889990000', '876 Queen St', 'Saskatoon', 'SK', 'S7K 0A1', 'Canada', TRUE),
(17, 'Benjamin', 'Thompson', '9990001111', '654 Bloor St', 'Ottawa', 'ON', 'K1A 0B1', 'Canada', TRUE),
(18, 'Charlotte', 'Garcia', '1113334444', '321 Adelaide St', 'Markham', 'ON', 'L3P 3J3', 'Canada', TRUE),
(19, 'Amelia', 'Martinez', '2224445555', '123 College St', 'Kitchener', 'ON', 'N2G 4M4', 'Canada', TRUE),
(20, 'Harper', 'Rodriguez', '3335556666', '456 Main St', 'Mississauga', 'ON', 'L5B 3M7', 'Canada', TRUE),
(21, 'Evelyn', 'Martinez', '4446667777', '555 King St', 'Calgary', 'AB', 'T2P 3N4', 'Canada', TRUE),
(22, 'Henry', 'Hernandez', '5557778888', '876 Queen St', 'Vancouver', 'BC', 'V5K 0A1', 'Canada', TRUE),
(23, 'Mason', 'Lopez', '6668889999', '432 Main St', 'Toronto', 'ON', 'M5H 1T1', 'Canada', TRUE),
(24, 'Olivia', 'Gonzales', '7779990000', '655 Front St', 'Ottawa', 'ON', 'K1A 0B1', 'Canada', TRUE),
(25, 'Alexander', 'Perez', '8880001111', '987 Richmond St', 'Halifax', 'NS', 'B3H 1W3', 'Canada', TRUE),
(26, 'Emma', 'Clark', '9991112222', '123 Spadina Ave', 'Hamilton', 'ON', 'L8N 1T1', 'Canada', TRUE),
(27, 'Sebastian', 'Walker', '1112223333', '456 Bloor St', 'Victoria', 'BC', 'V8W 1T2', 'Canada', TRUE),
(28, 'Avery', 'Young', '2223334444', '789 Bay St', 'London', 'ON', 'N6A 5B9', 'Canada', TRUE),
(29, 'William', 'Allen', '3334445555', '101 Dundas St', 'Montreal', 'QC', 'H3Z 2Y7', 'Canada', TRUE),
(30, 'Lucas', 'King', '4445556666', '222 York St', 'Vancouver', 'BC', 'V5K 0A1', 'Canada', TRUE),
(31, 'Michael', 'Scott', '5556667777', '303 King St', 'Toronto', 'ON', 'M5H 1T1', 'Canada', TRUE),
(32, 'Daniel', 'Lee', '6667778888', '123 Church St', 'Windsor', 'ON', 'N9A 3J3', 'Canada', TRUE),
(33, 'Isabella', 'Baker', '7778889999', '879 Queen St', 'Calgary', 'AB', 'T2P 3N4', 'Canada', TRUE),
(34, 'Emily', 'Davis', '8889990000', '654 College St', 'Victoria', 'BC', 'V8W 1T2', 'Canada', TRUE),
(35, 'Victoria', 'Jones', '9990001111', '876 Bay St', 'Halifax', 'NS', 'B3H 1W3', 'Canada', TRUE),
(36, 'Sophia', 'Brown', '1113334444', '919 Front St', 'Markham', 'ON', 'L3P 3J3', 'Canada', TRUE),
(37, 'Leah', 'Taylor', '2224445555', '324 Yonge St', 'Toronto', 'ON', 'M5H 1T1', 'Canada', TRUE),
(38, 'Lily', 'Harris', '3335556666', '123 Queen St', 'Montreal', 'QC', 'H3Z 2Y7', 'Canada', TRUE),
(39, 'Ella', 'Johnson', '4446667777', '567 Spadina Ave', 'Vancouver', 'BC', 'V5K 0A1', 'Canada', TRUE),
(40, 'Nora', 'Martinez', '5557778888', '234 Main St', 'London', 'ON', 'N6A 5B9', 'Canada', TRUE),
(41, 'Aiden', 'Anderson', '6668889999', '789 Church St', 'Regina', 'SK', 'S4P 3Y2', 'Canada', TRUE),
(42, 'Madison', 'Wilson', '7779990000', '456 Richmond St', 'Edmonton', 'AB', 'T5J 3E3', 'Canada', TRUE),
(43, 'Jack', 'Thompson', '8880001111', '987 Bay St', 'Ottawa', 'ON', 'K1A 0B1', 'Canada', TRUE),
(44, 'Luke', 'Hernandez', '9991112222', '321 Spadina Ave', 'Windsor', 'ON', 'N9A 3J3', 'Canada', TRUE),
(45, 'Chloe', 'Rodriguez', '1112223333', '654 Queen St', 'Toronto', 'ON', 'M5H 1T1', 'Canada', TRUE),
(46, 'Eleanor', 'Clark', '2223334444', '101 Front St', 'Vancouver', 'BC', 'V5K 0A1', 'Canada', TRUE),
(47, 'Isaac', 'Lopez', '3334445555', '222 Yonge St', 'Montreal', 'QC', 'H3Z 2Y7', 'Canada', TRUE),
(48, 'Zoe', 'Perez', '4445556666', '128 College St', 'Montreal', 'QC', 'S4P 3Y2', 'Canada', TRUE),
(48, 'Riley', 'Gonzalez', '5556667777', '295 King St', 'Hamilton', 'SK', 'A1C 1A1', 'Canada', FALSE),
(49, 'Scarlett', 'Walker', '6667778888', '557 Richmond St', 'Calgary', 'ON', 'N9A 3J3', 'Canada', TRUE),
(50, 'Landon', 'Scott', '7778889999', '717 Main St', 'Windsor', 'QC', 'L6Y 1N2', 'Canada', FALSE),
(50, 'Caleb', 'Taylor', '8889990000', '394 St. Clair Ave', 'London', 'NS', 'T2P 3N4', 'Canada', TRUE);


-----------------------------------------------------------------------------------

-- -- Insert 20 order records with customer_id and address_id ranging from 1 to 20, and status being 'pending', 'shipped', 'completed' or 'cancelled'

INSERT INTO orders (customer_id, address_id, total, total_tax, status, order_date, ship_date, shipping_method, tracking_number, complete_date) 
VALUES (5, 10, 1054.73, 1107.47, 'completed', '2023-09-03 08:22:12', '2023-09-05 11:22:12', 'UPS', '123456789', '2023-09-20 14:30:00'),
(20, 15, 576.89, 605.73, 'completed', '2023-09-05 14:45:55', '2023-09-07 10:25:20', 'FedEx', '234567891', '2023-09-22 13:15:10'),
(8, 23, 1300.40, 1365.42, 'shipped', '2023-09-07 12:10:15', '2023-09-09 16:12:50', 'DHL', '345678912', NULL),
(12, 6, 1845.32, 1937.59, 'completed', '2023-09-10 09:23:55', '2023-09-13 11:18:45', 'UPS', '456789123', '2023-09-29 15:45:00'),
(9, 18, 450.50, 472.03, 'pending', '2023-09-12 16:05:42', NULL, NULL, NULL, NULL),
(11, 30, 975.21, 1023.97, 'completed', '2023-09-15 18:25:33', '2023-09-18 13:15:22', 'FedEx', '567891234', '2023-10-03 10:00:00'),
(16, 40, 1500.75, 1575.79, 'completed', '2023-09-18 15:12:21', '2023-09-21 09:14:12', 'DHL', '678912345', '2023-10-05 12:45:15'),
(13, 5, 620.88, 651.92, 'shipped', '2023-09-20 10:35:11', '2023-09-23 08:22:33', 'UPS', '789123456', NULL),
(6, 25, 2300.65, 2415.68, 'completed', '2023-09-22 09:47:03', '2023-09-25 10:17:49', 'FedEx', '891234567', '2023-10-15 11:30:00'),
(18, 9, 1120.14, 1176.15, 'pending', '2023-09-25 13:20:45', NULL, NULL, NULL, NULL),
(21, 31, 750.36, 787.88, 'completed', '2023-09-28 08:32:22', '2023-09-30 14:50:10', 'DHL', '123459876', '2023-10-18 09:20:00'),
(15, 12, 900.49, 945.51, 'shipped', '2023-09-30 16:10:35', '2023-10-02 12:22:19', 'UPS', '234567894', NULL),
(3, 19, 1350.22, 1417.73, 'completed', '2023-10-03 10:22:14', '2023-10-06 08:45:12', 'FedEx', '345679123', '2023-10-25 14:45:00'),
(22, 8, 525.67, 551.95, 'shipped', '2023-10-06 09:50:01', '2023-10-08 12:20:23', 'DHL', '456798123', NULL),
(14, 11, 1875.38, 1968.15, 'completed', '2023-10-09 17:12:55', '2023-10-12 11:15:10', 'UPS', '567894321', '2023-10-28 11:30:00'),
(17, 13, 650.25, 682.76, 'completed', '2023-10-12 12:35:40', '2023-10-15 09:20:15', 'FedEx', '678912398', '2023-11-01 10:45:15'),
(25, 27, 1180.44, 1239.46, 'completed', '2023-10-14 11:10:25', '2023-10-17 10:25:30', 'DHL', '789123489', '2023-11-05 12:15:10'),
(24, 36, 975.11, 1023.87, 'shipped', '2023-10-17 16:45:09', '2023-10-19 14:22:55', 'UPS', '891234970', NULL),
(4, 21, 1345.75, 1412.03, 'completed', '2023-10-20 14:05:17', '2023-10-23 10:35:00', 'FedEx', '123478912', '2023-11-12 11:15:00'),
(28, 7, 890.88, 935.42, 'pending', '2023-10-22 10:55:31', NULL, NULL, NULL, NULL),
(30, 16, 2100.99, 2206.04, 'completed', '2023-10-25 18:23:10', '2023-10-28 12:50:50', 'DHL', '234578912', '2023-11-15 12:45:20'),
(19, 24, 600.15, 630.16, 'shipped', '2023-10-28 11:35:18', '2023-10-30 14:12:40', 'UPS', '345678912', NULL),
(7, 14, 1150.67, 1208.21, 'completed', '2023-10-30 09:05:14', '2023-11-02 10:55:12', 'FedEx', '456789123', '2023-11-18 13:15:10'),
(26, 20, 730.44, 766.96, 'completed', '2023-11-01 12:47:22', '2023-11-04 15:32:40', 'DHL', '567891234', '2023-11-21 10:45:00'),
(1, 28, 1870.25, 1963.76, 'shipped', '2023-11-03 10:23:44', '2023-11-06 14:10:33', 'UPS', '678912345', NULL),
(23, 17, 490.80, 515.34, 'completed', '2023-11-05 15:11:55', '2023-11-08 11:45:18', 'FedEx', '789123456', '2023-11-30 12:45:25'),
(2, 4, 870.36, 913.88, 'pending', '2023-11-08 09:22:33', NULL, NULL, NULL, NULL),
(10, 35, 1410.45, 1480.97, 'completed', '2023-11-10 12:45:00', '2023-11-13 10:30:22', 'DHL', '891234567', '2023-12-03 14:45:10');


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

