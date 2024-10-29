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

----------------------------------------------------------------------------
-- Smartphones (folder 9)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Smartphone X1', 699.99, 'A high-end smartphone with advanced features.', 9, 50, 9, 'product/9/1/1.webp,product/9/1/2.webp,product/9/1/3.webp,product/9/1/4.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Smartphone Y1', 799.99, 'A powerful smartphone with a sleek design.', 9, 40, 9, 'product/9/2/1.webp,product/9/2/2.webp,product/9/2/3.webp,product/9/2/4.webp', TRUE);

-- Phone Cases (folder 10)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Phone Case A', 19.99, 'Durable and stylish phone case.', 10, 200, 10, 'product/10/3/1.webp,product/10/3/2.webp,product/10/3/3.webp,product/10/3/4.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Phone Case B', 15.99, 'Sleek phone case with a minimalist design.', 10, 150, 10, 'product/10/4/1.webp,product/10/4/2.webp,product/10/4/3.webp,product/10/4/4.webp', TRUE);

-- Headphones (folder 11)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Wireless Headphones', 89.99, 'Noise-canceling wireless headphones.', 11, 100, 11, 'product/11/5/1.webp,product/11/5/2.webp,product/11/5/3.webp,product/11/5/4.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('In-Ear Headphones', 29.99, 'Comfortable in-ear headphones.', 11, 300, 11, 'product/11/6/1.webp,product/11/6/2.webp,product/11/6/3.webp,product/11/6/4.webp', TRUE);

-- Laptops (folder 13)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Laptop Pro 15', 1299.99, 'A powerful laptop for professionals.', 13, 30, 13, 'product/13/7/1.webp,product/13/7/2.webp,product/13/7/3.webp,product/13/7/4.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Gaming Laptop Z1', 1599.99, 'A high-performance gaming laptop.', 13, 25, 13, 'product/13/8/1.webp,product/13/8/2.webp,product/13/8/3.webp,product/13/8/4.webp', TRUE);

-- Keyboards (folder 15)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Mechanical Keyboard', 79.99, 'A mechanical keyboard with RGB lighting.', 15, 120, 15, 'product/15/9/1.webp,product/15/9/2.webp,product/15/9/3.webp,product/15/9/4.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Wireless Keyboard', 49.99, 'A wireless keyboard with long battery life.', 15, 80, 15, 'product/15/10/1.webp,product/15/10/2.webp,product/15/10/3.webp,product/15/10/4.webp', TRUE);

-- Monitors (folder 17)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('4K Monitor', 299.99, 'A 27-inch 4K monitor for work and gaming.', 17, 60, 17, 'product/17/11/1.webp,product/17/11/2.webp,product/17/11/3.webp,product/17/11/4.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Ultrawide Monitor', 399.99, 'A 34-inch ultrawide monitor.', 17, 45, 17, 'product/17/12/1.webp,product/17/12/2.webp,product/17/12/3.webp,product/17/12/4.webp', TRUE);

-- Televisions (folder 18)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Smart TV 55"', 599.99, 'A 55-inch 4K smart TV.', 18, 40, 18, 'product/18/13/1.webp,product/18/13/2.webp,product/18/13/3.webp,product/18/13/4.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('OLED TV 65"', 1299.99, 'A 65-inch OLED 4K TV.', 18, 20, 18, 'product/18/14/1.webp,product/18/14/2.webp,product/18/14/3.webp,product/18/14/4.webp', TRUE);

-- Gaming Consoles (folder 21)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Next-Gen Console X', 499.99, 'A next-generation gaming console.', 21, 100, 21, 'product/21/15/1.webp,product/21/15/2.webp,product/21/15/3.webp,product/21/15/4.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Gaming Console Y', 399.99, 'A budget-friendly gaming console.', 21, 120, 21, 'product/21/16/1.webp,product/21/16/2.webp,product/21/16/3.webp,product/21/16/4.webp', TRUE);

-- Cameras (folder 24)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('DSLR Camera A1', 899.99, 'A high-quality DSLR camera for photography.', 24, 35, 24, 'product/24/17/1.webp,product/24/17/2.webp,product/24/17/3.webp,product/24/17/4.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Mirrorless Camera B1', 1199.99, 'A mirrorless camera with advanced features.', 24, 25, 24, 'product/24/18/1.webp,product/24/18/2.webp,product/24/18/3.webp,product/24/18/4.webp', TRUE);

-- Smartwatches (folder 27)
INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Smartwatch Pro', 199.99, 'A smartwatch with fitness tracking features.', 27, 90, 27, 'product/27/19/1.webp,product/27/19/2.webp,product/27/19/3.webp,product/27/19/4.webp', TRUE);

INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
VALUES ('Smartwatch Lite', 149.99, 'A lightweight smartwatch for everyday use.', 27, 120, 27, 'product/27/20/1.webp,product/27/20/2.webp,product/27/20/3.webp,product/27/20/4.webp', TRUE);


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

-- Insert order records without address_data
INSERT INTO orders (customer_id, address_id, total, total_tax, status, order_date, ship_date, shipping_method, tracking_number, complete_date)
VALUES
(1, 10, 1719.97, 1805.97, 'completed', '2024-10-23 08:22:12', '2023-09-05 11:22:12', 'UPS', '123456789', '2023-09-20 14:30:00'),
(1, 15, 1379.98, 1448.98, 'completed', '2024-10-01 14:45:55', '2023-09-07 10:25:20', 'FedEx', '234567891', '2023-09-22 13:15:10'),
(1, 23, 1300.40, 1365.42, 'shipped', '2024-10-15 12:10:15', '2023-09-09 16:12:50', 'DHL', '345678912', NULL),
(12, 6, 1845.32, 1937.59, 'completed', '2023-09-10 09:23:55', '2023-09-13 11:18:45', 'UPS', '456789123', '2023-09-29 15:45:00'),
(9, 18, 1799.98, 1889.98, 'pending', '2023-09-12 16:05:42', NULL, NULL, NULL, NULL),
(11, 30, 239.97, 251.97, 'completed', '2023-09-15 18:25:33', '2023-09-18 13:15:22', 'FedEx', '567891234', '2023-10-03 10:00:00'),
(16, 40, 1500.75, 1575.79, 'completed', '2023-09-18 15:12:21', '2023-09-21 09:14:12', 'DHL', '678912345', '2023-10-05 12:45:15'),
(13, 5, 620.88, 651.92, 'shipped', '2023-09-20 10:35:11', '2023-09-23 08:22:33', 'UPS', '789123456', NULL),
(6, 25, 2300.65, 2415.68, 'completed', '2023-09-22 09:47:03', '2023-09-25 10:17:49', 'FedEx', '891234567', '2023-10-15 11:30:00'),
(18, 9, 1299.99, 1364.99, 'pending', '2023-09-25 13:20:45', NULL, NULL, NULL, NULL),
(21, 31, 99.98, 104.98, 'completed', '2023-09-28 08:32:22', '2023-09-30 14:50:10', 'DHL', '123459876', '2023-10-18 09:20:00'),
(15, 12, 399.99, 419.99, 'shipped', '2023-09-30 16:10:35', '2023-10-02 12:22:19', 'UPS', '234567894', NULL),
(3, 19, 1350.22, 1417.73, 'completed', '2023-10-03 10:22:14', '2023-10-06 08:45:12', 'FedEx', '345679123', '2023-10-25 14:45:00'),
(22, 8, 399.99, 419.99, 'shipped', '2023-10-06 09:50:01', '2023-10-08 12:20:23', 'DHL', '456798123', NULL),
(14, 11, 799.98, 839.98, 'completed', '2023-10-09 17:12:55', '2023-10-12 11:15:10', 'UPS', '567894321', '2023-10-28 11:30:00'),
(17, 13, 99.99, 104.99, 'completed', '2023-10-12 12:35:40', '2023-10-15 09:20:15', 'FedEx', '678912398', '2023-11-01 10:45:15'),
(25, 27, 149.99, 157.49, 'completed', '2023-10-14 11:10:25', '2023-10-17 10:25:30', 'DHL', '789123489', '2023-11-05 12:15:10'),
(24, 36, 149.99, 157.49, 'shipped', '2023-10-17 16:45:09', '2023-10-19 14:22:55', 'UPS', '891234970', NULL),
(4, 21, 1345.75, 1412.03, 'completed', '2023-10-20 14:05:17', '2023-10-23 10:35:00', 'FedEx', '123478912', '2023-11-12 11:15:00'),
(28, 7, 199.99, 209.99, 'pending', '2023-10-22 10:55:31', NULL, NULL, NULL, NULL);


-- Randomly Update address_id in orders Table Based on customer_id
UPDATE orders
SET address_id = (
    -- Select a random address ID for the corresponding customer
    SELECT a.id
    FROM address a
    WHERE a.customer_id = orders.customer_id
    ORDER BY RANDOM()  -- Randomly order the matching addresses
    LIMIT 1            -- Pick one random address
)
WHERE EXISTS (
    -- Ensure that there are addresses for the given customer in the address table
    SELECT 1
    FROM address a
    WHERE a.customer_id = orders.customer_id
);

-- Update orders table to populate address_data based on address table
UPDATE orders
SET address_data = (
    SELECT json_build_object(
        'first_name', a.first_name,
        'last_name', a.last_name,
        'phone', a.phone,
        'street', a.street,
        'city', a.city,
        'province', a.province,
        'postal', a.postal,
        'country', a.country
    )
    FROM address a
    WHERE a.id = orders.address_id
    AND a.is_default = TRUE
);

-- Corrected orders_detail data with order_id values not exceeding 28
INSERT INTO orders_detail (order_id, product_id, name, price, quantity)
VALUES
(1, 1, 'Smartphone X1', 699.99, 2),
(1, 3, 'Phone Case A', 19.99, 1),
(2, 5, 'Laptop Pro 15', 1299.99, 1),
(2, 7, 'Mechanical Keyboard', 79.99, 1),
(3, 11, 'Smart TV 55"', 599.99, 1),
(4, 13, 'DSLR Camera A1', 899.99, 1),
(5, 9, '4K Monitor', 299.99, 1),
(5, 5, 'Laptop Pro 15', 1299.99, 1),
(6, 17, 'Next-Gen Console X', 499.99, 1),
(7, 10, 'Ultrawide Monitor', 399.99, 1),
(8, 18, 'VR Devices', 499.99, 1),
(9, 13, 'DSLR Camera A1', 899.99, 2),
(10, 4, 'Phone Case B', 15.99, 3),
(11, 7, 'Mechanical Keyboard', 79.99, 2),
(12, 6, 'Gaming Laptop Z1', 1599.99, 1),
(13, 2, 'Smartphone Y1', 799.99, 1),
(14, 16, 'Gaming Console Y', 399.99, 2),
(15, 19, 'Printers', 199.99, 1),
(16, 8, 'Wireless Headphones', 89.99, 1),
(17, 20, 'Scanners', 99.99, 1),
(18, 5, 'Laptop Pro 15', 1299.99, 1),
(19, 14, 'Smartwatch Pro', 199.99, 2),
(20, 15, 'Lenses', 299.99, 1);

-- Update the orders_detail table with the correct name and price based on the product_id from the product table
UPDATE orders_detail
SET 
    name = product.product_name,
    price = product.price
FROM product
WHERE orders_detail.product_id = product.product_id;

-- Update orders with total based on orders_detail
UPDATE orders
SET total = (
    SELECT SUM(price * quantity)
    FROM orders_detail
    WHERE orders_detail.order_id = orders.id
)
WHERE EXISTS (
    SELECT 1
    FROM orders_detail
    WHERE orders_detail.order_id = orders.id
);

-- Update orders with total_tax based on province
UPDATE orders
SET total_tax = total * (
    CASE 
        WHEN (address_data->>'province') = 'AB' THEN 0.05  -- Alberta
        WHEN (address_data->>'province') = 'ON' THEN 0.13  -- Ontario
        WHEN (address_data->>'province') = 'BC' THEN 0.12  -- British Columbia
        WHEN (address_data->>'province') = 'QC' THEN 0.15  -- Quebec
        WHEN (address_data->>'province') = 'NS' THEN 0.15  -- Nova Scotia
        ELSE 0.05  -- Default 5% tax for other provinces
    END
)
WHERE total IS NOT NULL;

-- Insert payment records based on the orders table data
INSERT INTO payment (order_id, customer_id, amount, payment_method, status, payment_date, transaction_id, card_number_last4, refunded, refund_amount, notes)
VALUES
(1, 5, 1805.97, 'credit card', 'completed', '2023-09-03 09:30:00', 'TXN12345', '1234', FALSE, 0.00, 'Payment completed successfully'),
(2, 20, 1448.98, 'PayPal', 'completed', '2023-09-05 15:15:00', 'TXN12346', 'N/A', FALSE, 0.00, 'PayPal payment verified'),
(3, 8, 1365.42, 'credit card', 'completed', '2023-09-07 12:30:00', 'TXN12347', '5678', FALSE, 0.00, 'Payment confirmed'),
(4, 12, 1937.59, 'credit card', 'completed', '2023-09-10 09:50:00', 'TXN12348', '9876', FALSE, 0.00, 'Successfully processed'),
(5, 9, 1889.98, 'PayPal', 'pending', '2023-09-12 16:30:00', 'TXN12349', 'N/A', FALSE, 0.00, 'Awaiting confirmation'),
(6, 11, 251.97, 'credit card', 'completed', '2023-09-15 18:30:00', 'TXN12350', '4321', FALSE, 0.00, 'Payment cleared'),
(7, 16, 1575.79, 'PayPal', 'completed', '2023-09-18 15:30:00', 'TXN12351', 'N/A', FALSE, 0.00, 'Payment completed'),
(8, 13, 651.92, 'credit card', 'completed', '2023-09-20 11:00:00', 'TXN12352', '1111', FALSE, 0.00, 'Processed successfully'),
(9, 6, 2415.68, 'credit card', 'completed', '2023-09-22 10:00:00', 'TXN12353', '2222', FALSE, 0.00, 'Verified and processed'),
(10, 18, 1364.99, 'PayPal', 'pending', '2023-09-25 13:45:00', 'TXN12354', 'N/A', FALSE, 0.00, 'Awaiting payment'),
(11, 21, 104.98, 'credit card', 'completed', '2023-09-28 09:00:00', 'TXN12355', '3333', FALSE, 0.00, 'Payment successful'),
(12, 15, 419.99, 'PayPal', 'completed', '2023-09-30 16:30:00', 'TXN12356', 'N/A', FALSE, 0.00, 'Paid via PayPal'),
(13, 3, 1417.73, 'credit card', 'completed', '2023-10-03 10:30:00', 'TXN12357', '4444', FALSE, 0.00, 'Confirmed and cleared'),
(14, 22, 419.99, 'credit card', 'completed', '2023-10-06 10:00:00', 'TXN12358', '5555', FALSE, 0.00, 'Payment received'),
(15, 14, 839.98, 'PayPal', 'completed', '2023-10-09 17:30:00', 'TXN12359', 'N/A', FALSE, 0.00, 'Processed via PayPal'),
(16, 17, 104.99, 'credit card', 'completed', '2023-10-12 13:00:00', 'TXN12360', '6666', FALSE, 0.00, 'Payment successful'),
(17, 25, 157.49, 'PayPal', 'completed', '2023-10-14 11:30:00', 'TXN12361', 'N/A', FALSE, 0.00, 'Successfully paid'),
(18, 24, 157.49, 'credit card', 'completed', '2023-10-17 17:00:00', 'TXN12362', '7777', FALSE, 0.00, 'Payment confirmed'),
(19, 4, 1412.03, 'credit card', 'completed', '2023-10-20 15:00:00', 'TXN12363', '8888', FALSE, 0.00, 'Verified successfully'),
(20, 28, 209.99, 'PayPal', 'pending', '2023-10-22 11:15:00', 'TXN12364', 'N/A', FALSE, 0.00, 'Pending verification');

-- Create a function to update payment table based on corresponding orders data
CREATE OR REPLACE FUNCTION update_payment_info()
RETURNS VOID AS $$
BEGIN
    UPDATE payment p
    SET 
        customer_id = o.customer_id,  -- Update customer_id from orders
        amount = o.total + COALESCE(o.total_tax, 0),  -- Update amount using total and total_tax from orders
        payment_date = o.order_date  -- Update payment_date to match order_date from orders
    FROM orders o
    WHERE p.order_id = o.id;  -- Ensure the update corresponds to the correct order_id
END;
$$ LANGUAGE plpgsql;

-- Execute the function to perform the update
SELECT update_payment_info();

INSERT INTO message (first_name, last_name, email, message, is_read, sent_time)
VALUES
('John', 'Doe', 'johndoe@example.com', 'I am interested in the new smartphone model.', TRUE, '2023-10-01 10:15:00'),
('Jane', 'Smith', 'janesmith@example.com', 'I would like to return a product.', TRUE, '2023-10-02 11:30:00'),
('Michael', 'Brown', 'michaelbrown@example.com', 'Can I get a discount on bulk orders?', TRUE, '2023-10-03 12:45:00'),
('Emily', 'Johnson', 'emilyjohnson@example.com', 'The delivery was delayed, any updates?', TRUE, '2023-10-04 14:00:00'),
('David', 'Lee', 'davidlee@example.com', 'Can I change my shipping address?', TRUE, '2023-10-05 15:15:00'),
('Sarah', 'Davis', 'sarahdavis@example.com', 'How can I track my order?', TRUE, '2023-10-06 16:30:00'),
('Robert', 'Wilson', 'robertwilson@example.com', 'Is there a warranty on this product?', TRUE, '2023-10-07 17:45:00'),
('Laura', 'Martinez', 'lauramartinez@example.com', 'I forgot my account password. Can you help?', TRUE, '2023-10-08 09:00:00'),
('James', 'Anderson', 'jamesanderson@example.com', 'Do you ship internationally?', TRUE, '2023-10-09 10:30:00'),
('Anna', 'Taylor', 'annataylor@example.com', 'I received a defective product, what should I do?', FALSE, '2023-10-10 11:45:00');

