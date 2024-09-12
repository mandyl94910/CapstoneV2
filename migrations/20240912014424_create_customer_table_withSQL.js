exports.up = async function(knex) {
    await knex.schema.dropTableIfExists('customer');
  
    await knex.schema.createTable('customer', function(table) {
      table.increments('customer_id').primary(); // Auto-incrementing primary key
      table.string('customer_name', 255).notNullable(); // Customer login name
      table.string('password', 255).notNullable(); // Password (only NOT NULL, no other constraint)
      table.string('email', 255).unique().notNullable(); // Email
      table.string('phone', 10).notNullable(); // Phone (exactly 10 digits)
      table.date('birthday'); // Birthday, optional
      table.timestamp('register_date').defaultTo(knex.fn.now()); // Register date
    });
  
    // Add CHECK constraints again
    await knex.raw(`
      ALTER TABLE customer 
      ADD CONSTRAINT customer_name_check 
      CHECK (LENGTH(customer_name) >= 2 AND customer_name ~ '^[A-Za-z0-9]+$');
    `);
  
    await knex.raw(`
      ALTER TABLE customer 
      ADD CONSTRAINT email_format_check 
      CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');
    `);
  
    await knex.raw(`
      ALTER TABLE customer 
      ADD CONSTRAINT phone_check 
      CHECK (phone ~ '^[0-9]{10}$');
    `);
  };
  
  exports.down = function(knex){
    return knex.schema.dropTable('customer');
  };