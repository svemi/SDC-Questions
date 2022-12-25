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
var testPath = path.join(__dirname, '/../data/questions_test.csv');



module.exports.pool = pool;