DROP DATABASE IF EXISTS stock_portfolio;
CREATE DATABASE stock_portfolio;

\c stock_portfolio;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(30) NOT NULL,
    cash INT NOT NULL
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    ticker VARCHAR NOT NULL,
    price NUMERIC NOT NULL,
    shares INT NOT NULL,
    transact_date TIMESTAMP DEFAULT NOW()
);

CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    ticker VARCHAR NOT NULL,
    shares INT NOT NULL
);