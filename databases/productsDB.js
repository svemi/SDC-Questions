
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'productsDB',
  password: '',
  port: 3000,
})

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'productsDB',
  password: '',
  port: 3000,
})
client.connect()

client.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  client.end()
})

const pg = require('pg');
module.exports = pg.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'productsDB'
});

// const {PG} = require('pg');
// const pg = new PG ({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'productsDB',
// });

// pg.connect();
