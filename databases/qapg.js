const { Pool } = require('pg');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');


const pool = new Pool({
  host: 'localhost',
  user: 'user1',
  password: 'db',
  database: 'qadb',
  port: 5432
});

var csvPath = path.join(__dirname, '/../data/questions_test.csv');
fs.createReadStream(csvPath)
.pipe(csv())
.on('data', (row) => {
  // let productInsertQuery = 'INSERT INTO product (product_id) VALUES ($1)';
  // pool.query(productInsertQuery, [row.product_id], (err, res) => {if (err) {console.log(err)}} )
  let questionInsertQuery = `INSERT INTO questions (question_id, product_id, question_body, question_date, asker_name, reported, question_helpfullness) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  pool.query(questionInsertQuery, [row.id, row.product_id, row.body, new Date(Number(row.date_written)), row.asker_name, row.reported, row.helpful], (err, res) => {if (err) {console.log(err)}});
});

// let query = `INSERT INTO questions (question_id, product_id, question_body, question_date, asker_name, reported, question_helpfullness) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
// pool.query(query, ['1', 1, 'hello world', new Date(1595884714409 * 1000), 'akser', 0, 1], (err, res) => {if (err) {console.log(err)}});

