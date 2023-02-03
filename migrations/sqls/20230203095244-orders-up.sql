/* Replace with your SQL commands */
CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    status VARCHAR(100) NOT NULL,
    user_id bigint REFERENCES users(id)
);