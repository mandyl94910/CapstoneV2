/**
 * SQL Equivalent:
 * DROP TABLE IF EXISTS CUSTOMER;
 * CREATE TABLE CUSTOMER (
 *    customer_id SERIAL PRIMARY KEY,                    -- Auto-incrementing primary key
 *    customer_name VARCHAR(255) NOT NULL CHECK (LENGTH(customer_name) >= 2 AND customer_name ~ '^[A-Za-z0-9]+$'), -- Customer login name, must be 2 or more characters and contain only letters and numbers
 *    password VARCHAR(255) NOT NULL CHECK (LENGTH(password) >= 6 AND password ~ '^(?=.*[A-Za-z])(?=.*[0-9]).+$'), -- Password must be at least 6 characters long and contain both letters and numbers
 *    email VARCHAR(255) UNIQUE NOT NULL CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'), -- Email must follow standard format: %@%.%
 *    phone VARCHAR(10) NOT NULL CHECK (phone ~ '^[0-9]{10}$'),  -- Phone must be exactly 10 digits, no other characters allowed
 *    birthday DATE,                                     -- Birthday, optional, can be NULL
 *    register_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP -- Register date, auto-records the current timestamp
 * );
 */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .dropTableIfExists('customer') // First, drop the table if it exists
      .then(function() {
        return knex.schema.createTable('customer', function(table) {
          table.increments('customer_id').primary(); // Auto-incrementing primary key
          table.string('customer_name', 255).notNullable()
               .checkLength('>=', 2)
               .checkRegex('^[A-Za-z0-9]+$'); // Customer login name, must be 2 or more characters and contain only letters and numbers
          table.string('password', 255).notNullable()
          table.string('email', 255).notNullable().unique()
               .checkRegex('^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'); // Email must follow standard format: %@%.%
          table.string('phone', 10).notNullable()
               .checkRegex('^[0-9]{10}$'); // Phone must be exactly 10 digits, no other characters allowed
          table.date('birthday'); // Birthday, optional, can be NULL
          table.timestamp('register_date').defaultTo(knex.fn.now()); // Register date, auto-records the current timestamp
        });
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function(knex) {
    return knex.schema.dropTable('CUSTOMER');
  };
  