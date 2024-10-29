-- Drop tables if they exist, cascade foreign key dependencies
DROP TABLE IF EXISTS message CASCADE;
Drop TABLE IF EXISTS payment CASCADE;
DROP TABLE IF EXISTS orders_detail CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS review CASCADE;
DROP TABLE IF EXISTS address CASCADE;
DROP TABLE IF EXISTS product CASCADE;
DROP TABLE IF EXISTS category CASCADE;
DROP TABLE IF EXISTS admin CASCADE;
DROP TABLE IF EXISTS customer CASCADE;

-- Create customer table
CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,  
    customer_name VARCHAR(255) NOT NULL,  
    password VARCHAR(255) NOT NULL,  
    email VARCHAR(255) NOT NULL,  
    phone VARCHAR(10) NOT NULL,  
    birthday DATE,  
    register_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    image VARCHAR(255)
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
    first_name VARCHAR(255) NOT NULL,  -- First name column
    last_name VARCHAR(255) NOT NULL,  -- Last name column
    phone VARCHAR(15) NOT NULL,  -- Phone number column
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
    address_id INT,   -- Foreign key to address table
    total NUMERIC(10, 2) NOT NULL,  -- Total order amount
    total_tax NUMERIC(10, 2),  -- Total tax amount
    status VARCHAR(255) NOT NULL,  -- Order status
    order_date TIMESTAMPTZ NOT NULL,  -- Order creation date
    ship_date TIMESTAMPTZ,  -- Shipping date
    shipping_method VARCHAR(255),  -- Shipping method
    tracking_number VARCHAR(255),  -- Shipping tracking number
    complete_date TIMESTAMPTZ,  -- Order completion date
    address_data JSONB  -- JSONB column to store the full address as JSON
);

-- Create orders_detail table
CREATE TABLE orders_detail (
    id SERIAL PRIMARY KEY,            
    order_id INT NOT NULL,            
    product_id INT NOT NULL,          
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL DEFAULT 1
);

-- Create payment table
CREATE TABLE payment (
    id SERIAL PRIMARY KEY,  -- Auto-incrementing primary key
    order_id INT NOT NULL,  -- Foreign key to orders table
    customer_id INT NOT NULL,  -- Foreign key to customer table
    amount DECIMAL(10, 2) NOT NULL,  -- Payment amount
    payment_method VARCHAR(255) NOT NULL,  -- Payment method (e.g., credit card, PayPal, bank transfer)
    status VARCHAR(255) NOT NULL,  -- Payment status (e.g., pending, completed, failed, canceled)
    payment_date TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  -- Payment date, default is the current timestamp
    transaction_id VARCHAR(255),  -- Transaction ID for tracking payments
    card_number_last4 VARCHAR(255),  -- Last 4 digits of the card number (for credit card payments)
    refunded BOOLEAN DEFAULT FALSE,  -- Indicates if the payment has been refunded
    refund_amount DECIMAL(10, 2) DEFAULT 0.00,  -- Amount refunded, default is 0.00
    notes TEXT  -- Additional notes related to the payment
);

CREATE TABLE message (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    sent_time TIMESTAMPTZ
);


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

-- Add CHECK constraint for order status to limit to specific values
ALTER TABLE orders
ADD CONSTRAINT check_order_status CHECK (status IN ('pending', 'shipped', 'completed', 'cancelled', 'refunded'));

-- Add foreign key constraints to orders_detail table
ALTER TABLE orders_detail
ADD CONSTRAINT fk_orders_detail_order FOREIGN KEY (order_id) REFERENCES orders (id);

-- Add unique constraint to ensure only one default address per customer
CREATE UNIQUE INDEX unique_default_address ON address (customer_id) WHERE is_default = TRUE;

-- Add foreign key constraints
ALTER TABLE payment
ADD CONSTRAINT fk_payment_order FOREIGN KEY (order_id) REFERENCES orders (id);

ALTER TABLE payment
ADD CONSTRAINT fk_payment_customer FOREIGN KEY (customer_id) REFERENCES customer (customer_id);

-- Add CHECK constraint for payment_method to limit to specific values
ALTER TABLE payment
ADD CONSTRAINT check_payment_method CHECK (payment_method IN ('credit card', 'PayPal'));

-- Add CHECK constraint for status to limit to specific values
ALTER TABLE payment
ADD CONSTRAINT check_payment_status CHECK (status IN ('pending', 'completed', 'failed', 'canceled'));