const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const {pool} = require('./qapg.js');

var questionsPath = path.join(__dirname, '/../data/questions.csv');
var answersPath = path.join(__dirname, '/../data/answers.csv');
var answerPhotosPath = path.join(__dirname, '/../data/answers_photos.csv');
var testPath = path.join(__dirname, '/../data/questions_test.csv');

// // // TEST LOAD
// let questionInsertQuery = `INSERT INTO questions (question_id, product_id, question_body, question_date, asker_name, reported, question_helpfullness) VALUES ($1, $2, $3, $4, $5, $6, $7)`;

// fs.createReadStream(testPath)
// .pipe(csv())
// .on('data', (chunk) => {
//   console.log(chunk);
//   console.log('CHUNK');
//   // pool.query(questionInsertQuery, [row.id, row.product_id, row.body, new Date(Number(row.date_written)), row.asker_name, row.reported, row.helpful], (err, res) => {if (err) {console.log(err)}});
// });


// LOAD QUESTIONS DATA INTO QUESTIONS
let questionInsertQuery = `INSERT INTO questions (question_id, product_id, question_body, question_date, asker_name, reported, question_helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7)`;

let questionCount = 0;
var questionTotal;
fs.createReadStream(questionsPath)
.pipe(csv())
.on('open', () => {
  // console.log(`Total size of questions file: ${stream.totalBytes} bytes`);
  // questionTotal = stream.totalBytes;
})
.on('data', (row) => {
  pool.query(questionInsertQuery, [row.id, Number(row.product_id), row.body, new Date(Number(row.date_written)), row.asker_name, row.reported, row.helpful], (err, res) => {if (err) {console.log(err)}});
  // questionCount++;
  // if (questionCount%1000 === 0) {
  //   console.log(`QUESTIONS - Read ${stream.bytesRead} / ${questionTotal} bytes so far`);
  // }
}).on('end', () => {console.log('finished reading questions csv file');});

// LOAD ANSWERS DATA INTO ANSWERS
let answerInsertQuery = `INSERT INTO answers (answer_id, question_id, body, date, answerer_name, reported, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
var answerTotal;
let answerCount = 0;
fs.createReadStream(answersPath)
.pipe(csv())
.on('open', () => {
  // console.log(`Total size of answers file: ${stream1.totalBytes} bytes`);
  // answerTotal = stream1.totalBytes;
}).on('data', (row) => {
  pool.query(answerInsertQuery, [row.id, row.question_id, row.body, new Date(Number(row.date_written)), row.answerer_name, row.reported, row.helpful], (err, res) => {if (err) {console.log(err)}});
  // answerCount++;
  // if (answerCount%1000 === 0) {
  //   console.log(`ANSWERS - Read ${stream1.bytesRead} / ${answerTotal} bytes so far`);
  // }
})
.on('end', () => {console.log('finished reading answers csv file');});

// LOAD ANSWER PHOTOS DATA INTO PHOTOS
let answerPhotosInsertQuery = `INSERT INTO photos (id, answer_id, url) VALUES ($1, $2, $3)`;

let photoCount = 0;
var photoTotal;
fs.createReadStream(answerPhotosPath)
.pipe(csv())
.on('open', () => {
  // console.log(`Total size of photos file: ${stream2.totalBytes} bytes`);
  // photoTotal = stream2.totalBytes;
})
.on('data', (row) => {
  pool.query(answerPhotosInsertQuery, [row.id, row.answer_id, row.url], (err, res) => {if (err) {console.log(err)}});
  // photoCount++;
  // if (photoCount%1000 === 0) {
  //   console.log(`PHOTOS - Read ${stream2.bytesRead} / ${photoTotal} bytes so far`);
  // }
})
.on('end', () => {console.log('finished reading photos csv file');});