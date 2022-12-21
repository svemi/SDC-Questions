const pg = require('pg');
// module.exports = pg.connect({
module.exports = createConnection({
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
