// Please run command: TRUNCATE TABLE TRUNCATE TABLE , in PGadmin before
// running the migration command: npx knex migrate:latest


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    // Drop tables if they exist
    .dropTableIfExists('customer')
    .dropTableIfExists('product')
    .dropTableIfExists('category')
    
    // Create customer table
    .createTable('customer', function(table) {
      table.increments('customer_id').primary();
      table.string('customer_name', 255).notNullable();
      table.string('password', 255).notNullable();
      table.string('email', 255).unique().notNullable();
      table.string('phone', 10).notNullable();
      table.date('birthday');
      table.timestamp('register_date').defaultTo(knex.fn.now());
    })

    // Create category table
    .createTable('category', function(table) {
      table.increments('id').primary();
      table.string('name', 255).notNullable();
      table.integer('sub_for').notNullable();
    })

    // Create product table
    .createTable('product', function(table) {
      table.increments('product_id').primary();
      table.string('product_name', 255).notNullable();
      table.decimal('price', 10, 2).notNullable();
      table.text('product_description');
      table.integer('category_id').notNullable();
      table.integer('quantity').defaultTo(0).notNullable();
      table.integer('folder');
      table.string('image', 255);
      table.boolean('visibility').defaultTo(true).notNullable();
    })

    // Add foreign key constraints
    .then(() => {
      return knex.schema.alterTable('category', function(table) {
        table.foreign('sub_for').references('id').inTable('category');
      });
    })
    .then(() => {
      return knex.schema.alterTable('product', function(table) {
        table.foreign('category_id').references('id').inTable('category');
      });
    })

    // Add constraints to customer table
    .then(() => {
      return knex.schema.raw(`
        ALTER TABLE customer 
        ADD CONSTRAINT customer_name_check 
        CHECK (LENGTH(customer_name) >= 2 AND customer_name ~ '^[A-Za-z0-9]+$')
      `);
    })
    .then(() => {
      return knex.schema.raw(`
        ALTER TABLE customer 
        ADD CONSTRAINT email_format_check 
        CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$')
      `);
    })
    .then(() => {
      return knex.schema.raw(`
        ALTER TABLE customer 
        ADD CONSTRAINT phone_check 
        CHECK (phone ~ '^[0-9]{10}$')
      `);
    })

    // Insert initial data into category table
    .then(() => {
      return knex('category').insert([
        { name: 'All Products', sub_for: 1 },
        { name: 'Mobile Phones & Accessories', sub_for: 1 },
        { name: 'Computers & Accessories', sub_for: 1 },
        { name: 'Smart Home Devices', sub_for: 1 },
        { name: 'TVs & Home Entertainment', sub_for: 1 },
        { name: 'Gaming & Accessories', sub_for: 1 },
        { name: 'Cameras & Photography Gear', sub_for: 1 },
        { name: 'Wearable Devices', sub_for: 1 },
        { name: 'Networking Equipment', sub_for: 1 },
        { name: 'Office Electronics', sub_for: 1 },
        { name: 'Smartphones', sub_for: 2 },
        { name: 'Phone Cases', sub_for: 2 },
        { name: 'Headphones', sub_for: 2 },
        { name: 'Chargers', sub_for: 2 },
        { name: 'Laptops', sub_for: 3 },
        { name: 'Desktops', sub_for: 3 },
        { name: 'Keyboards', sub_for: 3 },
        { name: 'Mice', sub_for: 3 },
        { name: 'Monitors', sub_for: 3 },
        { name: 'Smart Speakers', sub_for: 4 },
        { name: 'Smart Bulbs', sub_for: 4 },
        { name: 'Security Systems', sub_for: 4 },
        { name: 'Televisions', sub_for: 5 },
        { name: 'Sound Systems', sub_for: 5 },
        { name: 'Projectors', sub_for: 5 },
        { name: 'Gaming Consoles', sub_for: 6 },
        { name: 'Controllers', sub_for: 6 },
        { name: 'VR Devices', sub_for: 6 },
        { name: 'Cameras', sub_for: 7 },
        { name: 'Lenses', sub_for: 7 },
        { name: 'Tripods', sub_for: 7 },
        { name: 'Smartwatches', sub_for: 8 },
        { name: 'Fitness Trackers', sub_for: 8 },
        { name: 'Routers', sub_for: 9 },
        { name: 'Switches', sub_for: 9 },
        { name: 'WiFi Extenders', sub_for: 9 },
        { name: 'Printers', sub_for: 10 },
        { name: 'Scanners', sub_for: 10 },
        { name: 'Fax Machines', sub_for: 10 }
      ]);
    })

    // Insert product data
    .then(() => {
      return knex('product').insert([
        { product_name: 'Smartphone X1', price: 699.99, product_description: 'A high-end smartphone with advanced features.', category_id: 11, quantity: 50, folder: 11, image: 'CapstoneV2/image/product/11/example.webp', visibility: true },
        { product_name: 'Smartphone Y1', price: 799.99, product_description: 'A powerful smartphone with a sleek design.', category_id: 11, quantity: 40, folder: 11, image: 'CapstoneV2/image/product/11/example.webp', visibility: true },
        { product_name: 'Phone Case A', price: 19.99, product_description: 'Durable and stylish phone case.', category_id: 12, quantity: 200, folder: 12, image: 'CapstoneV2/image/product/12/example.webp', visibility: true },
        { product_name: 'Phone Case B', price: 15.99, product_description: 'Sleek phone case with a minimalist design.', category_id: 12, quantity: 150, folder: 12, image: 'CapstoneV2/image/product/12/example.webp', visibility: true },
        { product_name: 'Wireless Headphones', price: 89.99, product_description: 'Noise-canceling wireless headphones.', category_id: 13, quantity: 100, folder: 13, image: 'CapstoneV2/image/product/13/example.webp', visibility: true },
        { product_name: 'In-Ear Headphones', price: 29.99, product_description: 'Comfortable in-ear headphones.', category_id: 13, quantity: 300, folder: 13, image: 'CapstoneV2/image/product/13/example.webp', visibility: true },
        { product_name: 'Laptop Pro 15', price: 1299.99, product_description: 'A powerful laptop for professionals.', category_id: 15, quantity: 30, folder: 15, image: 'CapstoneV2/image/product/15/example.webp', visibility: true },
        { product_name: 'Gaming Laptop Z1', price: 1599.99, product_description: 'A high-performance gaming laptop.', category_id: 15, quantity: 25, folder: 15, image: 'CapstoneV2/image/product/15/example.webp', visibility: true },
        { product_name: 'Mechanical Keyboard', price: 79.99, product_description: 'A mechanical keyboard with RGB lighting.', category_id: 17, quantity: 120, folder: 17, image: 'CapstoneV2/image/product/17/example.webp', visibility: true },
        { product_name: 'Wireless Keyboard', price: 49.99, product_description: 'A wireless keyboard with long battery life.', category_id: 17, quantity: 80, folder: 17, image: 'CapstoneV2/image/product/17/example.webp', visibility: true },
        { product_name: '4K Monitor', price: 299.99, product_description: 'A 27-inch 4K monitor for work and gaming.', category_id: 19, quantity: 60, folder: 19, image: 'CapstoneV2/image/product/19/example.webp', visibility: true },
        { product_name: 'Ultrawide Monitor', price: 399.99, product_description: 'A 34-inch ultrawide monitor.', category_id: 19, quantity: 45, folder: 19, image: 'CapstoneV2/image/product/19/example.webp', visibility: true },
        { product_name: 'Smart Speaker A1', price: 59.99, product_description: 'A voice-controlled smart speaker.', category_id: 20, quantity: 150, folder: 20, image: 'CapstoneV2/image/product/20/example.webp', visibility: true },
        { product_name: 'Smart Speaker B1', price: 89.99, product_description: 'A premium smart speaker with great sound quality.', category_id: 20, quantity: 80, folder: 20, image: 'CapstoneV2/image/product/20/example.webp', visibility: true },
        { product_name: 'Smart TV 55"', price: 599.99, product_description: 'A 55-inch 4K smart TV.', category_id: 23, quantity: 40, folder: 23, image: 'CapstoneV2/image/product/23/example.webp', visibility: true },
        { product_name: 'OLED TV 65"', price: 1299.99, product_description: 'A 65-inch OLED 4K TV.', category_id: 23, quantity: 20, folder: 23, image: 'CapstoneV2/image/product/23/example.webp', visibility: true },
        { product_name: 'Next-Gen Console X', price: 499.99, product_description: 'A next-generation gaming console.', category_id: 26, quantity: 100, folder: 26, image: 'CapstoneV2/image/product/26/example.webp', visibility: true },
        { product_name: 'Gaming Console Y', price: 399.99, product_description: 'A budget-friendly gaming console.', category_id: 26, quantity: 120, folder: 26, image: 'CapstoneV2/image/product/26/example.webp', visibility: true },
        { product_name: 'DSLR Camera A1', price: 899.99, product_description: 'A high-quality DSLR camera for photography.', category_id: 29, quantity: 35, folder: 29, image: 'CapstoneV2/image/product/29/example.webp', visibility: true },
        { product_name: 'Mirrorless Camera B1', price: 1199.99, product_description: 'A mirrorless camera with advanced features.', category_id: 29, quantity: 25, folder: 29, image: 'CapstoneV2/image/product/29/example.webp', visibility: true },
        { product_name: 'Smartwatch Pro', price: 199.99, product_description: 'A smartwatch with fitness tracking features.', category_id: 32, quantity: 90, folder: 32, image: 'CapstoneV2/image/product/32/example.webp', visibility: true },
        { product_name: 'Smartwatch Lite', price: 149.99, product_description: 'A lightweight smartwatch for everyday use.', category_id: 32, quantity: 120, folder: 32, image: 'CapstoneV2/image/product/32/example.webp', visibility: true }
      ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('product')
    .dropTableIfExists('category')
    .dropTableIfExists('customer');
};

// SQL version of the migration file:

//   -- Drop tables if they exist
// DROP TABLE IF EXISTS customer;
// DROP TABLE IF EXISTS product;
// DROP TABLE IF EXISTS category;

// -- Create customer table
// CREATE TABLE customer (
//     customer_id SERIAL PRIMARY KEY,  
//     customer_name VARCHAR(255) NOT NULL,  
//     password VARCHAR(255) NOT NULL,  
//     email VARCHAR(255) UNIQUE NOT NULL,  
//     phone VARCHAR(10) NOT NULL,  
//     birthday DATE,  
//     register_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP  
// );

// -- Create category table
// CREATE TABLE category (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(255) NOT NULL,
//     sub_for INT NOT NULL
// );

// -- Create product table
// CREATE TABLE product (
//     product_id SERIAL PRIMARY KEY, 
//     product_name VARCHAR(255) NOT NULL, 
//     price DECIMAL(10, 2) NOT NULL, 
//     product_description TEXT, 
//     category_id INT NOT NULL,  -- Foreign key to category table
//     quantity INT DEFAULT 0 NOT NULL,  -- Quantity with default value 0
//     folder INT,  -- Folder will be the category_id, used to organize product images in the 'image' folder
//     image VARCHAR(255),  -- Image file path or URL inside the respective category folder
//     visibility BOOLEAN DEFAULT TRUE NOT NULL  -- Visibility, default set to TRUE
// );

// -- Add foreign key constraints
// -- Add self-referencing foreign key to category table
// ALTER TABLE category
// ADD CONSTRAINT fk_subcategory FOREIGN KEY (sub_for) REFERENCES category (id);

// -- Add foreign key to product table referencing category
// ALTER TABLE product
// ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category (id);

// -- Add constraints to customer table
// ALTER TABLE customer 
// ADD CONSTRAINT customer_name_check 
// CHECK (LENGTH(customer_name) >= 2 AND customer_name ~ '^[A-Za-z0-9]+$');

// ALTER TABLE customer 
// ADD CONSTRAINT email_format_check 
// CHECK (email ~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$');

// ALTER TABLE customer 
// ADD CONSTRAINT phone_check 
// CHECK (phone ~ '^[0-9]{10}$');

// --------------------------------------------------------------------------------

// -- Insert 'All Products' as the main parent category
// INSERT INTO category (name, sub_for) VALUES ('All Products', 1);

// -- Insert subcategories under 'All Products'
// INSERT INTO category (name, sub_for) VALUES ('Mobile Phones & Accessories', 1);
// INSERT INTO category (name, sub_for) VALUES ('Computers & Accessories', 1);
// INSERT INTO category (name, sub_for) VALUES ('Smart Home Devices', 1);
// INSERT INTO category (name, sub_for) VALUES ('TVs & Home Entertainment', 1);
// INSERT INTO category (name, sub_for) VALUES ('Gaming & Accessories', 1);
// INSERT INTO category (name, sub_for) VALUES ('Cameras & Photography Gear', 1);
// INSERT INTO category (name, sub_for) VALUES ('Wearable Devices', 1);
// INSERT INTO category (name, sub_for) VALUES ('Networking Equipment', 1);
// INSERT INTO category (name, sub_for) VALUES ('Office Electronics', 1);

// -- Insert third-level categories for 'Mobile Phones & Accessories'
// INSERT INTO category (name, sub_for) VALUES ('Smartphones', 2);
// INSERT INTO category (name, sub_for) VALUES ('Phone Cases', 2);
// INSERT INTO category (name, sub_for) VALUES ('Headphones', 2);
// INSERT INTO category (name, sub_for) VALUES ('Chargers', 2);

// -- Insert third-level categories for 'Computers & Accessories'
// INSERT INTO category (name, sub_for) VALUES ('Laptops', 3);
// INSERT INTO category (name, sub_for) VALUES ('Desktops', 3);
// INSERT INTO category (name, sub_for) VALUES ('Keyboards', 3);
// INSERT INTO category (name, sub_for) VALUES ('Mice', 3);
// INSERT INTO category (name, sub_for) VALUES ('Monitors', 3);

// -- Insert third-level categories for 'Smart Home Devices'
// INSERT INTO category (name, sub_for) VALUES ('Smart Speakers', 4);
// INSERT INTO category (name, sub_for) VALUES ('Smart Bulbs', 4);
// INSERT INTO category (name, sub_for) VALUES ('Security Systems', 4);

// -- Insert third-level categories for 'TVs & Home Entertainment'
// INSERT INTO category (name, sub_for) VALUES ('Televisions', 5);
// INSERT INTO category (name, sub_for) VALUES ('Sound Systems', 5);
// INSERT INTO category (name, sub_for) VALUES ('Projectors', 5);

// -- Insert third-level categories for 'Gaming & Accessories'
// INSERT INTO category (name, sub_for) VALUES ('Gaming Consoles', 6);
// INSERT INTO category (name, sub_for) VALUES ('Controllers', 6);
// INSERT INTO category (name, sub_for) VALUES ('VR Devices', 6);

// -- Insert third-level categories for 'Cameras & Photography Gear'
// INSERT INTO category (name, sub_for) VALUES ('Cameras', 7);
// INSERT INTO category (name, sub_for) VALUES ('Lenses', 7);
// INSERT INTO category (name, sub_for) VALUES ('Tripods', 7);

// -- Insert third-level categories for 'Wearable Devices'
// INSERT INTO category (name, sub_for) VALUES ('Smartwatches', 8);
// INSERT INTO category (name, sub_for) VALUES ('Fitness Trackers', 8);

// -- Insert third-level categories for 'Networking Equipment'
// INSERT INTO category (name, sub_for) VALUES ('Routers', 9);
// INSERT INTO category (name, sub_for) VALUES ('Switches', 9);
// INSERT INTO category (name, sub_for) VALUES ('WiFi Extenders', 9);

// -- Insert third-level categories for 'Office Electronics'
// INSERT INTO category (name, sub_for) VALUES ('Printers', 10);
// INSERT INTO category (name, sub_for) VALUES ('Scanners', 10);
// INSERT INTO category (name, sub_for) VALUES ('Fax Machines', 10);


// --------------------------------------------------------------------------------

// -- Insert product data

// -- Smartphones (folder 11)
// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Smartphone X1', 699.99, 'A high-end smartphone with advanced features.', 11, 50, 11, 'CapstoneV2/image/product/11/example.webp', TRUE);

// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Smartphone Y1', 799.99, 'A powerful smartphone with a sleek design.', 11, 40, 11, 'CapstoneV2/image/product/11/example.webp', TRUE);

// -- Phone Cases (folder 12)
// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Phone Case A', 19.99, 'Durable and stylish phone case.', 12, 200, 12, 'CapstoneV2/image/product/12/example.webp', TRUE);

// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Phone Case B', 15.99, 'Sleek phone case with a minimalist design.', 12, 150, 12, 'CapstoneV2/image/product/12/example.webp', TRUE);

// -- Headphones (folder 13)
// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Wireless Headphones', 89.99, 'Noise-canceling wireless headphones.', 13, 100, 13, 'CapstoneV2/image/product/13/example.webp', TRUE);

// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('In-Ear Headphones', 29.99, 'Comfortable in-ear headphones.', 13, 300, 13, 'CapstoneV2/image/product/13/example.webp', TRUE);

// -- Laptops (folder 15)
// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Laptop Pro 15', 1299.99, 'A powerful laptop for professionals.', 15, 30, 15, 'CapstoneV2/image/product/15/example.webp', TRUE);

// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Gaming Laptop Z1', 1599.99, 'A high-performance gaming laptop.', 15, 25, 15, 'CapstoneV2/image/product/15/example.webp', TRUE);

// -- Keyboards (folder 17)
// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Mechanical Keyboard', 79.99, 'A mechanical keyboard with RGB lighting.', 17, 120, 17, 'CapstoneV2/image/product/17/example.webp', TRUE);

// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Wireless Keyboard', 49.99, 'A wireless keyboard with long battery life.', 17, 80, 17, 'CapstoneV2/image/product/17/example.webp', TRUE);

// -- Monitors (folder 19)
// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('4K Monitor', 299.99, 'A 27-inch 4K monitor for work and gaming.', 19, 60, 19, 'CapstoneV2/image/product/19/example.webp', TRUE);

// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Ultrawide Monitor', 399.99, 'A 34-inch ultrawide monitor.', 19, 45, 19, 'CapstoneV2/image/product/19/example.webp', TRUE);

// -- Smart Speakers (folder 20)
// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Smart Speaker A1', 59.99, 'A voice-controlled smart speaker.', 20, 150, 20, 'CapstoneV2/image/product/20/example.webp', TRUE);

// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Smart Speaker B1', 89.99, 'A premium smart speaker with great sound quality.', 20, 80, 20, 'CapstoneV2/image/product/20/example.webp', TRUE);

// -- Televisions (folder 23)
// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Smart TV 55"', 599.99, 'A 55-inch 4K smart TV.', 23, 40, 23, 'CapstoneV2/image/product/23/example.webp', TRUE);

// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('OLED TV 65"', 1299.99, 'A 65-inch OLED 4K TV.', 23, 20, 23, 'CapstoneV2/image/product/23/example.webp', TRUE);

// -- Gaming Consoles (folder 26)
// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Next-Gen Console X', 499.99, 'A next-generation gaming console.', 26, 100, 26, 'CapstoneV2/image/product/26/example.webp', TRUE);

// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Gaming Console Y', 399.99, 'A budget-friendly gaming console.', 26, 120, 26, 'CapstoneV2/image/product/26/example.webp', TRUE);

// -- Cameras (folder 29)
// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('DSLR Camera A1', 899.99, 'A high-quality DSLR camera for photography.', 29, 35, 29, 'CapstoneV2/image/product/29/example.webp', TRUE);

// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Mirrorless Camera B1', 1199.99, 'A mirrorless camera with advanced features.', 29, 25, 29, 'CapstoneV2/image/product/29/example.webp', TRUE);

// -- Smartwatches (folder 32)
// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Smartwatch Pro', 199.99, 'A smartwatch with fitness tracking features.', 32, 90, 32, 'CapstoneV2/image/product/32/example.webp', TRUE);

// INSERT INTO product (product_name, price, product_description, category_id, quantity, folder, image, visibility) 
// VALUES ('Smartwatch Lite', 149.99, 'A lightweight smartwatch for everyday use.', 32, 120, 32, 'CapstoneV2/image/product/32/example.webp', TRUE);