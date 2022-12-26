const {pool} = require('./../../databases/qapg.js');
const csv = require('csv-parser');


module.exports = {
  getQuestions: (params, callback) => {
    // console.log('MODELS');
    const [product_id, count, page] = params;
    let offset = (page-1) * count;
    let getQuestionsQuery = 'SELECT * FROM questions WHERE product_id = ($1) OFFSET ($2) ROWS FETCH NEXT ($3) ROWS ONLY';
    pool.query(getQuestionsQuery, [product_id, offset, count], callback)
  },

  getAnswers: (params, callback) => {
    const [question_id, count, page] = params;
    let offset = (page-1) * count;
    let getAnswersQuery = 'SELECT * FROM answers where question_id = ($1) OFFSET ($2) ROWS FETCH NEXT ($3) ROWS ONLY';
    pool.query(getAnswersQuery, [question_id, offset, count], callback)

  },

  postQuestion: (params, callback) => {
    let postQuestionQuery = 'INSERT INTO questions (product_id, question_body, question_date, asker_name, reported, question_helpfulness) VALUES ($1, $2, $3, $4, $5, $6)';
    pool.query(postQuestionQuery, params, callback);

  },

  postAnswer: (info, callback) => {
    let postAnswerQuery = 'INSERT INTO answers (question_id, body, date, answerer_name, reported, helpfulness) VALUES ($1, $2, $3, $4, $5, $6)';
    let postPhotosQuery = 'INSERT INTO photos (answer_id, url) VALUES ((SELECT answer_id FROM answers WHERE body = ($1)), $2)';
    let [question_id, body, date, name, reported, helpful, photos] = info;
    pool.query(postAnswerQuery, [question_id, body, date, name, reported, helpful], callback);
    if (photos.length > 0) {
      photos.forEach((url) => {
        pool.query(postPhotosQuery, [body, url], callback);
      })
    }


  },

  upvoteQuestions: (id,callback) => {
    let upvoteQuestionQuery = 'UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ($1)';
    pool.query(upvoteQuestionQuery, [id], callback);

  },

  reportQuestion: (id, callback) => {
    let reportQuestionQuery = 'UPDATE questions SET reported = true WHERE question_id = ($1)';
    pool.query(upvoteQuestionQuery, [id], callback);


  },

  upvoteAnswer: (id, callback) => {
    let upvoteAnswerQuery = 'UPDATE answers SET helpfulness = helpfulness + 1 WHERE answer_id = ($1)';
    pool.query(upvoteAnswerQuery, [id], callback);


  },

  reportAnswer: (id, callback) => {
    let reportAnswerQuery = 'UPDATE answers SET reported = true WHERE answer_id = ($1)';
    pool.query(reportAnswerQuery, [id], callback);



  }
}