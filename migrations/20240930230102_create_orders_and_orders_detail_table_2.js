/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
      .raw(`
        -- Drop tables if they exist, cascade foreign key dependencies
        DROP TABLE IF EXISTS orders_detail CASCADE;
        DROP TABLE IF EXISTS review CASCADE;
        DROP TABLE IF EXISTS address CASCADE;
        DROP TABLE IF EXISTS orders CASCADE;
        DROP TABLE IF EXISTS product CASCADE;
        DROP TABLE IF EXISTS category CASCADE;
        DROP TABLE IF EXISTS admin CASCADE;
        DROP TABLE IF EXISTS customer CASCADE;

        -- Create customer table
        CREATE TABLE customer (
            customer_id SERIAL PRIMARY KEY,  
            customer_name VARCHAR(255) NOT NULL,  
            password VARCHAR(255) NOT NULL,  
            email VARCHAR(255) UNIQUE NOT NULL,  
            phone VARCHAR(10) NOT NULL,  
            birthday DATE,  
            register_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP  
        );

        -- Create category table
        CREATE TABLE category (
            id INT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            sub_for INT NOT NULL,
            image VARCHAR(255)
        );

        -- Create product table
        CREATE TABLE product (
            product_id SERIAL PRIMARY KEY, 
            product_name VARCHAR(255) NOT NULL, 
            price DECIMAL(10, 2) NOT NULL, 
            product_description TEXT, 
            category_id INT NOT NULL,  -- Foreign key to category table
            quantity INT DEFAULT 0 NOT NULL,  -- Quantity with default value 0
            folder INT,  -- Folder will be the category_id, used to organize product images in the 'image' folder
            image VARCHAR(255),  -- Image file path or URL inside the respective category folder
            visibility BOOLEAN DEFAULT TRUE NOT NULL  -- Visibility, default set to TRUE
        );

        -- Create admin table
        CREATE TABLE admin (
            id SERIAL PRIMARY KEY,                
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            pin VARCHAR(4) NOT NULL,
            title VARCHAR(255) NOT NULL,
            status BOOLEAN NOT NULL DEFAULT TRUE,
            image VARCHAR(255),        
            register_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            last_login TIMESTAMPTZ
        );

        -- Create review table
        CREATE TABLE review (
            id SERIAL PRIMARY KEY,            
            customer_id INT NOT NULL,       
            product_id INT NOT NULL,
            content TEXT NOT NULL,
            rating INT DEFAULT 5 NOT NULL,
            review_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
            visibility BOOLEAN DEFAULT TRUE NOT NULL,
            pin_top BOOLEAN DEFAULT FALSE NOT NULL
        );

        -- Create address table
        CREATE TABLE address (
            id SERIAL PRIMARY KEY,  -- Auto-incrementing primary key
            customer_id INT NOT NULL,  -- Foreign key references customer table
            street VARCHAR(255) NOT NULL,  -- Street column
            city VARCHAR(255) NOT NULL,  -- City column
            province VARCHAR(255) NOT NULL,  -- Province column
            postal VARCHAR(255) NOT NULL,  -- Postal code column
            country VARCHAR(255) NOT NULL,  -- Country column
            is_default BOOLEAN NOT NULL DEFAULT FALSE  -- Default flag, default is FALSE
        );

        -- Create orders table
        CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            customer_id INT NOT NULL,  -- Foreign key to customer table
            address_id INT NOT NULL,   -- Foreign key to address table
            total NUMERIC(10, 2) NOT NULL,  -- Total order amount
            total_tax NUMERIC(10, 2),  -- Total tax amount
            status VARCHAR(255) NOT NULL,  -- Order status
            order_date TIMESTAMPTZ NOT NULL,  -- Order creation date
            ship_date TIMESTAMPTZ,  -- Shipping date
            shipping_method VARCHAR(255),  -- Shipping method
            tracking_number VARCHAR(255),  -- Shipping tracking number
            complete_date TIMESTAMPTZ  -- Order completion date
        );

        -- Create orders_detail table
        CREATE TABLE orders_detail (
            id SERIAL PRIMARY KEY,            
            order_id INT NOT NULL,            
            product_id INT NOT NULL,          
            quantity INT NOT NULL DEFAULT 1  
        );

        ---------------------------------------------------------------------------------------------------

        -- -- Create trigger function
        -- CREATE OR REPLACE FUNCTION calculate_tax_based_on_province() 
        -- RETURNS TRIGGER AS $$
        -- DECLARE
        --     province_code VARCHAR(2);
        --     tax_rate NUMERIC(5, 3);
        -- BEGIN
        --     -- Get the province code from the address table
        --     SELECT province INTO province_code FROM address WHERE id = NEW.address_id;
            
        --     -- Set the tax rate based on the province code
        --     CASE province_code
        --         WHEN 'AB' THEN tax_rate := 0.05;
        --         WHEN 'SK' THEN tax_rate := 0.11;
        --         WHEN 'BC' THEN tax_rate := 0.12;
        --         WHEN 'MB' THEN tax_rate := 0.12;
        --         WHEN 'ON' THEN tax_rate := 0.13;
        --         WHEN 'QC' THEN tax_rate := 0.14975;
        --         WHEN 'NB' THEN tax_rate := 0.15;
        --         WHEN 'NS' THEN tax_rate := 0.15;
        --         WHEN 'PE' THEN tax_rate := 0.15;
        --         WHEN 'NL' THEN tax_rate := 0.15;
        --         WHEN 'NT' THEN tax_rate := 0.05;
        --         WHEN 'YT' THEN tax_rate := 0.05;
        --         WHEN 'NU' THEN tax_rate := 0.05;
        --         ELSE tax_rate := 0.05;  -- Default tax rate if province not found
        --     END CASE;
            
        --     -- Calculate total_tax based on total and tax_rate
        --     NEW.total_tax := NEW.total + (NEW.total * tax_rate);
            
        --     RETURN NEW;
        -- END;
        -- $$ LANGUAGE plpgsql;

        -- -- Create trigger to automatically calculate total_tax when inserting or updating orders
        -- CREATE TRIGGER set_total_tax_based_on_province
        -- BEFORE INSERT OR UPDATE ON orders
        -- FOR EACH ROW
        -- EXECUTE FUNCTION calculate_tax_based_on_province();


        ---------------------------------------------------------------------------------------------------

        -- Add foreign key constraints
        -- Add self-referencing foreign key to category table
        ALTER TABLE category
        ADD CONSTRAINT fk_subcategory FOREIGN KEY (sub_for) REFERENCES category (id);

        -- Add foreign key to product table referencing category
        ALTER TABLE product
        ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category (id);

        ALTER TABLE admin 
        ADD CONSTRAINT check_title CHECK (title IN ('Admin', 'Super Admin'));

        -- Add foreign key constraints to review table
        ALTER TABLE review
        ADD CONSTRAINT fk_review_customer FOREIGN KEY (customer_id) REFERENCES customer (customer_id);

        ALTER TABLE review
        ADD CONSTRAINT fk_review_product FOREIGN KEY (product_id) REFERENCES product (product_id);

        -- Add CHECK constraint for review.rating to ensure it's between 1 and 5
        ALTER TABLE review
        ADD CONSTRAINT check_review_rating CHECK (rating >= 1 AND rating <= 5);

        -- Add foreign key constraint to address table
        ALTER TABLE address
        ADD CONSTRAINT fk_customer_address FOREIGN KEY (customer_id) REFERENCES customer (customer_id);

        -- Add foreign key constraints to orders table
        ALTER TABLE orders
        ADD CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES customer (customer_id);

        ALTER TABLE orders
        ADD CONSTRAINT fk_orders_address FOREIGN KEY (address_id) REFERENCES address (id);

        -- Add foreign key constraints to orders_detail table
        ALTER TABLE orders_detail
        ADD CONSTRAINT fk_orders_detail_order FOREIGN KEY (order_id) REFERENCES orders (id);

        -- Add unique constraint to ensure only one default address per customer
        CREATE UNIQUE INDEX unique_default_address ON address (customer_id) WHERE is_default = TRUE;


      `);
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
      .raw(`
        DROP TRIGGER IF EXISTS set_total_tax_based_on_province ON orders;
        DROP FUNCTION IF EXISTS calculate_tax_based_on_province;
  
        DROP TABLE IF EXISTS orders_detail CASCADE;
        DROP TABLE IF EXISTS review CASCADE;
        DROP TABLE IF EXISTS address CASCADE;
        DROP TABLE IF EXISTS orders CASCADE;
        DROP TABLE IF EXISTS product CASCADE;
        DROP TABLE IF EXISTS category CASCADE;
        DROP TABLE IF EXISTS admin CASCADE;
        DROP TABLE IF EXISTS customer CASCADE;
  
        DROP INDEX IF EXISTS unique_default_address;
      `);
  };
