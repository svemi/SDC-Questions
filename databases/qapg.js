const { Pool } = require('pg');

module.exports.pool = new Pool({
  host: 'localhost',
  user: 'root',
  password: 'db',
  database: 'qadb',
  port: 5432
});