CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(16) NOT NULL,
    password_digest VARCHAR NOT NULL
);