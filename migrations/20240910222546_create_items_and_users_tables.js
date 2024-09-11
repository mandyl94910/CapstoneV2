/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * 
 * This migration script creates the 'products' and 'customers' tables, dropping them first if they already exist.
 * 
 * 1. Drops the 'products' and 'customers' tables if they exist.
 * 2. Creates the 'products' table with the following columns:
 *    - 'product_id': Auto-incrementing primary key.
 *    - 'product_name': A string with a maximum length of 255 characters, not nullable.
 * 3. Creates the 'customers' table with the following columns:
 *    - 'customer_id': Auto-incrementing primary key.
 *    - 'customer_name': A string with a maximum length of 45 characters, not nullable.
 *    - 'password': A string with a maximum length of 225 characters, not nullable.
 *    - 'email': A string with a maximum length of 255 characters, not nullable.
 */
exports.up = function(knex) {
    // Drop 'products' and 'customers' tables if they already exist
    return knex.schema
      .dropTableIfExists('products')
      .dropTableIfExists('customers')
      .then(function() {
        // Create 'products' table
        return knex.schema.createTable('products', function(table) {
          table.increments('product_id').primary(); // Auto-incrementing primary key
          table.string('product_name', 255).notNullable(); // Name field, varchar(255), not nullable
        });
      })
      .then(function() {
        // Create 'customers' table
        return knex.schema.createTable('customers', function(table) {
          table.increments('customer_id').primary(); // Auto-incrementing primary key
          table.string('customer_name', 45).notNullable(); // Customer name field, varchar(45), not nullable
          table.string('password', 225).notNullable(); // Password field, varchar(225), not nullable
          table.string('email', 255).notNullable(); // Email field, varchar(255), not nullable
        });
      });
  };
  
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 * 
 * This rollback script drops the 'products' and 'customers' tables.
 */
exports.down = function(knex) {
    // Drop 'products' and 'customers' tables during rollback
    return knex.schema
      .dropTableIfExists('products')
      .dropTableIfExists('customers');
  };
