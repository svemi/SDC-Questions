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

var questionsPath = path.join(__dirname, '/../data/questions.csv');
var answersPath = path.join(__dirname, '/../data/answers.csv');
var answerPhotosPath = path.join(__dirname, '/../data/answers_photos.csv');

// LOAD QUESTIONS DATA INTO QUESTIONS

fs.createReadStream(questionsPath)
.pipe(csv())
.on('data', (row) => {
  let questionInsertQuery = `INSERT INTO questions (question_id, product_id, question_body, question_date, asker_name, reported, question_helpfullness) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  pool.query(questionInsertQuery, [row.id, row.product_id, row.body, new Date(Number(row.date_written) * 1000), row.asker_name, row.reported, row.helpful], (err, res) => {if (err) {console.log(err)}});
});

// LOAD ANSWERS DATA INTO ANSWERS

fs.createReadStream(answersPath)
.pipe(csv())
.on('data', (row) => {
  let answerInsertQuery = `INSERT INTO answers (answer_id, question_id, body, date, answerer_name, reported, helpfullness) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
  pool.query(answerInsertQuery, [row.id, row.question_id, row.body, new Date(Number(row.date_written) * 1000), row.answerer_name, row.reported, row.helpful], (err, res) => {if (err) {console.log(err)}});
});

// LOAD ANSWER PHOTOS DATA INTO PHOTOS

fs.createReadStream(answerPhotosPath)
.pipe(csv())
.on('data', (row) => {
  let answerPhotosInsertQuery = `INSERT INTO photos (id, answer_id, url) VALUES ($1, $2, $3)`;
  pool.query(answerPhotosInsertQuery, [row.id, row.answer_id, row.url], (err, res) => {if (err) {console.log(err)}});
});
