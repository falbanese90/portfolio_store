CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    description VARCHAR NOT NULL,
    image VARCHAR NOT NULL,
    price FLOAT NOT NULL
);