const knex = require('knex');

const { DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_HOST } = process.env;

const client = knex({
  client: 'pg',
  connection: {
    host: DATABASE_HOST || 'localhost',
    port: DATABASE_PORT || 5432,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME
  },
  debug: process.env.NODE_ENV === 'development'
});

module.exports = client;