//Command: npx knex migrate:rollback
//         npx knex migrate:latest
//         npx knex seed:run


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // Drop tables if they exist with CASCADE
    .then(() => knex.schema.raw(`DROP TABLE IF EXISTS review CASCADE;`))
    .then(() => knex.schema.raw(`DROP TABLE IF EXISTS address CASCADE;`))
    .then(() => knex.schema.raw(`DROP TABLE IF EXISTS product CASCADE;`))
    .then(() => knex.schema.raw(`DROP TABLE IF EXISTS category CASCADE;`))
    .then(() => knex.schema.raw(`DROP TABLE IF EXISTS admin CASCADE;`))
    .then(() => knex.schema.raw(`DROP TABLE IF EXISTS customer CASCADE;`))
    
    // Create customer table
    .then(() => knex.schema.createTable('customer', function(table) {
      table.increments('customer_id').primary();
      table.string('customer_name', 255).notNullable();
      table.string('password', 255).notNullable();
      table.string('email', 255).unique().notNullable();
      table.string('phone', 10).notNullable();
      table.date('birthday');
      table.timestamp('register_date').defaultTo(knex.fn.now());
    }))
    
    // Create category table
    .then(() => knex.schema.createTable('category', function(table) {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.integer('sub_for').notNullable();
      table.string('image', 255);
    }))
    
    // Create product table
    .then(() => knex.schema.createTable('product', function(table) {
      table.increments('product_id').primary();
      table.string('product_name', 255).notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.text('product_description');
      table.integer('category_id').notNullable();
      table.integer('quantity').defaultTo(0).notNullable();
      table.integer('folder');
      table.string('image', 255);
      table.boolean('visibility').defaultTo(true).notNullable();
    }))
    
    // Create admin table
    .then(() => knex.schema.createTable('admin', function(table) {
      table.increments('id').primary();
      table.string('password', 255).notNullable();
      table.string('name', 255).notNullable();
      table.string('pin', 4).notNullable();
      table.string('title', 255).notNullable();
      table.boolean('status').defaultTo(true).notNullable();
      table.string('image', 255);
      table.timestamp('register_date').defaultTo(knex.fn.now());
      table.timestamp('last_login');
    }))
    
    // Create review table
    .then(() => knex.schema.createTable('review', function(table) {
      table.increments('id').primary();
      table.integer('customer_id').notNullable();
      table.integer('product_id').notNullable();
      table.text('content').notNullable();
      table.integer('rating').defaultTo(5).notNullable();
      table.timestamp('review_time').defaultTo(knex.fn.now());
      table.boolean('visibility').defaultTo(true).notNullable();
      table.boolean('pin_top').defaultTo(false).notNullable();
    }))
    
    // Create address table
    .then(() => knex.schema.createTable('address', function(table) {
      table.increments('id').primary(); // Auto-incrementing primary key
      table.integer('customer_id').notNullable(); // Foreign key references customer table
      table.string('street', 255).notNullable(); // Street column
      table.string('city', 255).notNullable(); // City column
      table.string('province', 255).notNullable(); // Province column
      table.string('postal', 255).notNullable(); // Postal code column
      table.string('country', 255).notNullable(); // Country column
      table.boolean('is_default').defaultTo(false).notNullable(); // Default flag, default is FALSE
    }))
    
    // Add foreign key constraints
    .then(() => knex.schema.alterTable('category', function(table) {
      table.foreign('sub_for').references('id').inTable('category');
    }))
    .then(() => knex.schema.alterTable('product', function(table) {
      table.foreign('category_id').references('id').inTable('category');
    }))
    .then(() => knex.schema.alterTable('review', function(table) {
      table.foreign('customer_id').references('customer.customer_id').onDelete('CASCADE');
      table.foreign('product_id').references('product.product_id').onDelete('CASCADE');
    }))
    .then(() => knex.schema.alterTable('address', function(table) {
      table.foreign('customer_id').references('customer.customer_id').onDelete('CASCADE');
    }))
    
    // Add constraints to customer table
    .then(() => knex.schema.raw(`
      ALTER TABLE customer 
      ADD CONSTRAINT customer_name_check 
      CHECK (LENGTH(customer_name) >= 2 AND customer_name ~ '^[A-Za-z0-9]+$' AND customer_name ~ '[A-Za-z]')
    `))
    .then(() => knex.schema.raw(`
      ALTER TABLE customer 
      ADD CONSTRAINT email_format_check 
      CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
    `))
    .then(() => knex.schema.raw(`
      ALTER TABLE customer 
      ADD CONSTRAINT phone_check 
      CHECK (phone ~ '^[0-9]{10}$')
    `))
    .then(() => knex.schema.raw(`
      ALTER TABLE admin
      ADD CONSTRAINT check_title
      CHECK (title IN ('Admin', 'Super Admin'))
    `))
    
    // Add CHECK constraint for review.rating to ensure it's between 1 and 5
    .then(() => knex.schema.raw(`
      ALTER TABLE review
      ADD CONSTRAINT check_review_rating 
      CHECK (rating >= 1 AND rating <= 5)
    `))
    
    // Add unique constraint to ensure only one default address per customer
    .then(() => knex.schema.raw(`
      CREATE UNIQUE INDEX unique_default_address ON address (customer_id) WHERE is_default = TRUE;
    `));
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('review')
    .dropTableIfExists('address')
    .dropTableIfExists('product')
    .dropTableIfExists('category')
    .dropTableIfExists('admin')
    .dropTableIfExists('customer');
};
