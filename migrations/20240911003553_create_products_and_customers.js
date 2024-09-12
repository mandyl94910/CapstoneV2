/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.dropTableIfExists('products') // Drop the 'products' table if it exists 
    .dropTableIfExists('customers') // Drop the 'customers' table if it exists 
    .then(function() { return knex.schema.createTable('products', function(table) { 
        table.increments('product_id').primary(); // Primary key, auto-incrementing 
        table.string('product_name', 255).notNullable(); // Product name field, varchar(255), not nullable 
        }); }) 
    .then(function() { return knex.schema.createTable('customers', function(table) { 
        table.increments('customer_id').primary(); // Primary key, auto-incrementing 
        table.string('customer_name', 45).notNullable(); // Customer name field, varchar(45), not nullable
        table.string('password', 225).notNullable(); // Password field, varchar(225), not nullable 
        table.string('email', 255).notNullable(); // Email field, varchar(255), not nullable 
        }); });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products') // Drop the 'products' table on rollback 
    .dropTableIfExists('customers'); // Drop the 'customers' table on rollback
};
