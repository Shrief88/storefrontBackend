/* Replace with your SQL commands */
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE,
    first_Name VARCHAR(100) NOT NULL,
    last_Name VARCHAR(100) NOT NULL,
    password text NOT NULL
);