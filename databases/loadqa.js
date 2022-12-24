const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

var csvPath = path.join(__dirname, '/../data/questions_test.csv');
fs.createReadStream(csvPath)
.pipe(csv())
.on('data', (row) => {
  console.log(row);
});


