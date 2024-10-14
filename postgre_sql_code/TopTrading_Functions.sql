
------------------------------------------------------------------------------------------

-- Randomly Update address_id in orders Table Based on customer_id
UPDATE orders
SET address_id = (
    -- Select a random address ID for the corresponding customer
    SELECT a.id
    FROM address a
    WHERE a.customer_id = orders.customer_id
    ORDER BY RANDOM()  -- Randomly order the matching addresses
    LIMIT 1            -- Pick one random address
)
WHERE EXISTS (
    -- Ensure that there are addresses for the given customer in the address table
    SELECT 1
    FROM address a
    WHERE a.customer_id = orders.customer_id
);

------------------------------------------------------------------------------------------

-- Update orders table to populate address_data based on address table
UPDATE orders
SET address_data = (
    SELECT json_build_object(
        'first_name', a.first_name,
        'last_name', a.last_name,
        'phone', a.phone,
        'street', a.street,
        'city', a.city,
        'province', a.province,
        'postal', a.postal,
        'country', a.country
    )
    FROM address a
    WHERE a.id = orders.address_id
    AND a.is_default = TRUE
);

------------------------------------------------------------------------------------------

-- Update the orders_detail table with the correct name and price based on the product_id from the product table
UPDATE orders_detail
SET 
    name = product.product_name,
    price = product.price
FROM product
WHERE orders_detail.product_id = product.product_id;

------------------------------------------------------------------------------------------

-- Update orders with total based on orders_detail
UPDATE orders
SET total = (
    SELECT SUM(price * quantity)
    FROM orders_detail
    WHERE orders_detail.order_id = orders.id
)
WHERE EXISTS (
    SELECT 1
    FROM orders_detail
    WHERE orders_detail.order_id = orders.id
);

------------------------------------------------------------------------------------------

-- Update orders with total_tax based on province
UPDATE orders
SET total_tax = total * (
    CASE 
        WHEN (address_data->>'province') = 'AB' THEN 0.05  -- Alberta
        WHEN (address_data->>'province') = 'ON' THEN 0.13  -- Ontario
        WHEN (address_data->>'province') = 'BC' THEN 0.12  -- British Columbia
        WHEN (address_data->>'province') = 'QC' THEN 0.15  -- Quebec
        WHEN (address_data->>'province') = 'NS' THEN 0.15  -- Nova Scotia
        ELSE 0.05  -- Default 5% tax for other provinces
    END
)
WHERE total IS NOT NULL;
