const pgp = require('pg-promise')({});
const db = pgp('postgres://localhost/stock_portfolio');
module.exports = db;