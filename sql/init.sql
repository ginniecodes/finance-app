CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(50) NOT NULL,
  password TEXT NOT NULL,
  salt VARCHAR(16) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE client_information (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  birthdate DATE NOT NULL,
  profile_picture TEXT DEFAULT '/img/default_profile_picture.jpg',
  user_id INTEGER NOT NULL REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE currencies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  symbol VARCHAR(5) NOT NULL
);

CREATE TYPE category_type AS ENUM ('default', 'personal');

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  type category_type NOT NULL DEFAULT 'personal',
  client_id INTEGER REFERENCES client_information(id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX ON categories(type);

CREATE TYPE transaction_type AS ENUM ('income', 'outcome');

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  category INTEGER NOT NULL REFERENCES categories(id),
  type transaction_type NOT NULL,
  currency INTEGER NOT NULL REFERENCES currencies(id),
  amount NUMERIC(17, 2) NOT NULL,
  date TIMESTAMP NOT NULL,
  client_id INTEGER REFERENCES client_information(id) ON UPDATE CASCADE
);

CREATE INDEX ON transactions(type);

INSERT INTO categories (type, name) VALUES ('default', 'General');
INSERT INTO currencies (name, symbol) VALUES ('Dólar', '$');