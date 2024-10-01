/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {

  await knex('orders_detail').del();
  await knex('orders').del();

  // Insert orders data
  await knex.raw(`
    INSERT INTO orders (customer_id, address_id, total, status, order_date, ship_date, shipping_method, tracking_number, complete_date)
    VALUES 
    (1, 1, 799.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '10 days', CURRENT_TIMESTAMP - INTERVAL '9 days', 'UPS', 'TRK1234561', CURRENT_TIMESTAMP - INTERVAL '5 days'),
    (2, 2, 399.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '7 days', CURRENT_TIMESTAMP - INTERVAL '5 days', 'FedEx', 'TRK1234562', NULL),
    (3, 3, 499.99, 'pending', CURRENT_TIMESTAMP - INTERVAL '3 days', NULL, NULL, NULL, NULL),
    (4, 4, 299.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '15 days', CURRENT_TIMESTAMP - INTERVAL '13 days', 'DHL', 'TRK1234563', CURRENT_TIMESTAMP - INTERVAL '10 days'),
    (5, 5, 199.99, 'cancelled', CURRENT_TIMESTAMP - INTERVAL '5 days', NULL, NULL, NULL, NULL),
    (6, 6, 599.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '6 days', CURRENT_TIMESTAMP - INTERVAL '4 days', 'UPS', 'TRK1234564', NULL),
    (7, 7, 1299.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '20 days', CURRENT_TIMESTAMP - INTERVAL '18 days', 'FedEx', 'TRK1234565', CURRENT_TIMESTAMP - INTERVAL '15 days'),
    (8, 8, 699.99, 'pending', CURRENT_TIMESTAMP - INTERVAL '1 day', NULL, NULL, NULL, NULL),
    (9, 9, 149.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '12 days', CURRENT_TIMESTAMP - INTERVAL '11 days', 'DHL', 'TRK1234566', CURRENT_TIMESTAMP - INTERVAL '8 days'),
    (10, 10, 999.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_TIMESTAMP - INTERVAL '3 days', 'UPS', 'TRK1234567', NULL),
    (11, 11, 1099.99, 'pending', CURRENT_TIMESTAMP - INTERVAL '2 days', NULL, NULL, NULL, NULL),
    (12, 12, 249.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '14 days', CURRENT_TIMESTAMP - INTERVAL '12 days', 'FedEx', 'TRK1234568', CURRENT_TIMESTAMP - INTERVAL '9 days'),
    (13, 13, 899.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '18 days', CURRENT_TIMESTAMP - INTERVAL '16 days', 'UPS', 'TRK1234569', CURRENT_TIMESTAMP - INTERVAL '13 days'),
    (14, 14, 1499.99, 'pending', CURRENT_TIMESTAMP - INTERVAL '4 days', NULL, NULL, NULL, NULL),
    (15, 15, 1999.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '8 days', CURRENT_TIMESTAMP - INTERVAL '6 days', 'DHL', 'TRK1234570', NULL),
    (16, 16, 49.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '9 days', CURRENT_TIMESTAMP - INTERVAL '8 days', 'FedEx', 'TRK1234571', CURRENT_TIMESTAMP - INTERVAL '5 days'),
    (17, 17, 299.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '3 days', CURRENT_TIMESTAMP - INTERVAL '1 day', 'UPS', 'TRK1234572', NULL),
    (18, 18, 599.99, 'completed', CURRENT_TIMESTAMP - INTERVAL '13 days', CURRENT_TIMESTAMP - INTERVAL '11 days', 'FedEx', 'TRK1234573', CURRENT_TIMESTAMP - INTERVAL '8 days'),
    (19, 19, 129.99, 'pending', CURRENT_TIMESTAMP - INTERVAL '1 day', NULL, NULL, NULL, NULL),
    (20, 20, 799.99, 'shipped', CURRENT_TIMESTAMP - INTERVAL '5 days', CURRENT_TIMESTAMP - INTERVAL '3 days', 'DHL', 'TRK1234574', NULL);
  `);

  // Insert orders_detail data
  await knex.raw(`
    INSERT INTO orders_detail (order_id, product_id, quantity)
    VALUES (1, 1, 2),
          (2, 2, 1),
          (3, 3, 1),
          (4, 4, 1),
          (5, 5, 1),
          (6, 6, 3),
          (7, 7, 1),
          (8, 8, 1),
          (9, 9, 1),
          (10, 10, 2),
          (11, 11, 2),
          (12, 12, 1),
          (13, 13, 1),
          (14, 14, 1),
          (15, 15, 1),
          (16, 16, 1),
          (17, 17, 1),
          (18, 18, 1),
          (19, 19, 1),
          (20, 20, 2);

-- Optionally, insert additional order details for some orders

    INSERT INTO orders_detail (order_id, product_id, quantity)
    VALUES (1, 2, 1),
          (2, 3, 2),
          (3, 4, 3),
          (4, 5, 1),
          (5, 6, 1),
          (6, 7, 2),
          (7, 8, 1),
          (8, 9, 1),
          (9, 10, 1),
          (10, 11, 1);
  `);
};
