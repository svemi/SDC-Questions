const { Pool } = require('pg');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
require('dotenv').config();


const pool = new Pool({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT
});

var questionsPath = path.join(__dirname, '/../data/questions.csv');
var answersPath = path.join(__dirname, '/../data/answers.csv');
var answerPhotosPath = path.join(__dirname, '/../data/answers_photos.csv');
var testPath = path.join(__dirname, '/../data/questions_test.csv');



module.exports.pool = pool;