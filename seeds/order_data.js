// /**
//  * @param { import("knex").Knex } knex
//  * @returns { Promise<void> } 
//  */
// exports.seed = async function(knex) {

//   await knex('orders_detail').del();
//   await knex('orders').del();

//   // Insert orders data
//   await knex.raw(`
//     INSERT INTO orders (customer_id, address_id, total, total_tax, status, order_date, ship_date, shipping_method, tracking_number, complete_date)
// VALUES 
// (1, 1, 799.99, 839.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_TIMESTAMP - INTERVAL '9 days', 'UPS', 'TRK1234561', CURRENT_TIMESTAMP - INTERVAL '5 days'), -- AB: GST 5%
// (2, 2, 399.99, 443.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '7 days', CURRENT_TIMESTAMP - INTERVAL '5 days', 'FedEx', 'TRK1234562', NULL), -- SK: GST 5% + PST 6% = 11%
// (3, 3, 499.99, 559.99, 'pending', CURRENT_TIMESTAMP - INTERVAL '3 days', NULL, NULL, NULL, NULL), -- BC: GST 5% + PST 7% = 12%
// (4, 4, 299.99, 338.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '15 days', CURRENT_TIMESTAMP - INTERVAL '13 days', 'DHL', 'TRK1234563', CURRENT_TIMESTAMP - INTERVAL '10 days'), -- MB: GST 5% + PST 7% = 12%
// (5, 5, 199.99, 225.99, 'cancelled', CURRENT_TIMESTAMP - INTERVAL '5 days', NULL, NULL, NULL, NULL), -- ON: HST 13%
// (6, 6, 599.99, 689.93, 'shipped', CURRENT_TIMESTAMP - INTERVAL '6 days', CURRENT_TIMESTAMP - INTERVAL '4 days', 'UPS', 'TRK1234564', NULL), -- QC: GST 5% + QST 9.975% = 14.975%
// (7, 7, 1299.99, 1494.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '20 days', CURRENT_TIMESTAMP - INTERVAL '18 days', 'FedEx', 'TRK1234565', CURRENT_TIMESTAMP - INTERVAL '15 days'), -- NB: HST 15%
// (8, 8, 699.99, 804.99, 'pending', CURRENT_TIMESTAMP - INTERVAL '1 day', NULL, NULL, NULL, NULL), -- NS: HST 15%
// (9, 9, 149.99, 172.49, 'completed', CURRENT_TIMESTAMP - INTERVAL '12 days', CURRENT_TIMESTAMP - INTERVAL '11 days', 'DHL', 'TRK1234566', CURRENT_TIMESTAMP - INTERVAL '8 days'), -- PE: HST 15%
// (10, 10, 999.99, 1149.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_TIMESTAMP - INTERVAL '3 days', 'UPS', 'TRK1234567', NULL), -- NL: HST 15%
// (11, 11, 1099.99, 1154.99, 'pending', CURRENT_TIMESTAMP - INTERVAL '2 days', NULL, NULL, NULL, NULL), -- NT: GST 5%
// (12, 12, 249.99, 287.49, 'completed', CURRENT_TIMESTAMP - INTERVAL '14 days', CURRENT_TIMESTAMP - INTERVAL '12 days', 'FedEx', 'TRK1234568', CURRENT_TIMESTAMP - INTERVAL '9 days'), -- YT: GST 5%
// (13, 13, 899.99, 944.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '18 days', CURRENT_TIMESTAMP - INTERVAL '16 days', 'UPS', 'TRK1234569', CURRENT_TIMESTAMP - INTERVAL '13 days'), -- NU: GST 5%
// (14, 14, 1499.99, 1699.99, 'pending', CURRENT_TIMESTAMP - INTERVAL '4 days', NULL, NULL, NULL, NULL), -- NL: HST 15%
// (15, 15, 1999.99, 2299.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '8 days', CURRENT_TIMESTAMP - INTERVAL '6 days', 'DHL', 'TRK1234570', NULL), -- NB: HST 15%
// (16, 16, 49.99, 57.49, 'completed', CURRENT_TIMESTAMP - INTERVAL '9 days', CURRENT_TIMESTAMP - INTERVAL '8 days', 'FedEx', 'TRK1234571', CURRENT_TIMESTAMP - INTERVAL '5 days'), -- NS: HST 15%
// (17, 17, 299.99, 329.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '3 days', CURRENT_TIMESTAMP - INTERVAL '1 day', 'UPS', 'TRK1234572', NULL), -- PE: HST 15%
// (18, 18, 599.99, 689.93, 'completed', CURRENT_TIMESTAMP - INTERVAL '13 days', CURRENT_TIMESTAMP - INTERVAL '11 days', 'FedEx', 'TRK1234573', CURRENT_TIMESTAMP - INTERVAL '8 days'), -- QC: GST 5% + QST 9.975% = 14.975%
// (19, 19, 129.99, 136.49, 'pending', CURRENT_TIMESTAMP - INTERVAL '1 day', NULL, NULL, NULL, NULL), -- NT: GST 5%
// (20, 20, 799.99, 919.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_TIMESTAMP - INTERVAL '3 days', 'DHL', 'TRK1234574', NULL); -- NB: HST 15%

//   `);

//   // Insert orders_detail data
//   await knex.raw(`
//     INSERT INTO orders_detail (order_id, product_id, quantity)
//     VALUES (1, 1, 2),
//           (2, 2, 1),
//           (3, 3, 1),
//           (4, 4, 1),
//           (5, 5, 1),
//           (6, 6, 3),
//           (7, 7, 1),
//           (8, 8, 1),
//           (9, 9, 1),
//           (10, 10, 2),
//           (11, 11, 2),
//           (12, 12, 1),
//           (13, 13, 1),
//           (14, 14, 1),
//           (15, 15, 1),
//           (16, 16, 1),
//           (17, 17, 1),
//           (18, 18, 1),
//           (19, 19, 1),
//           (20, 20, 2);

// -- Optionally, insert additional order details for some orders

//     INSERT INTO orders_detail (order_id, product_id, quantity)
//     VALUES (1, 2, 1),
//           (2, 3, 2),
//           (3, 4, 3),
//           (4, 5, 1),
//           (5, 6, 1),
//           (6, 7, 2),
//           (7, 8, 1),
//           (8, 9, 1),
//           (9, 10, 1),
//           (10, 11, 1);
//   `);
// };
