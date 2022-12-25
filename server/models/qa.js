const {pool} = require('./../../databases/qapg.js');
const csv = require('csv-parser');


module.exports = {
  getQuestions: (params, callback) => {
    console.log('MODELS');
    const [product_id, count, page] = params;
    let offset = (page-1) * count;
    let getQuestionsQuery = 'SELECT * FROM questions WHERE product_id = ($1) OFFSET ($2) ROWS FETCH NEXT ($3) ROWS ONLY';
    pool.query(getQuestionsQuery, [product_id, offset, count], callback)


  },

  getAnswers: (callback) => {

  },

  postQuestion: (callback) => {

  },

  postAnswer: (callback) => {

  },

  upvoteQuestions: (callback) => {

  },

  reportQuestion: (callback) => {

  },

  upvoteAnswer: (callback) => {

  },

  reportAnswer: (callback) => {

  }
}