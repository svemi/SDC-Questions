const cluster = require('cluster');
const {cpus} = require('os');

require('dotenv').config();
const express = require('express');
const path = require('path');
const morgan = require('morgan');

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} running`);

  const systemCPUs = cpus().length;
  for (let i = 0; i < 2; i += 1) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {

  const router = require('./router.js');
  const app = express();

  app.use(express.json());
  // app.use(morgan('dev'));
  app.use(express.urlencoded({ extended: true }));
  app.use('/', router)
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('/loaderio-53e4c4b5efd55b6fe2871cb0260cefb1', (req, res) => res.send('loaderio-53e4c4b5efd55b6fe2871cb0260cefb1'));


  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} listening at http://localhost:${PORT}`);
  });
}

