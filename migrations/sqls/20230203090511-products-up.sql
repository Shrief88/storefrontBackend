/* Replace with your SQL commands */
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price FLOAT(10) NOT NULL,
    category VARCHAR(100)
);