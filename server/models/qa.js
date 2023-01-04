const {pool} = require('./../../databases/qapg.js');
const csv = require('csv-parser');


module.exports = {
  getQuestions: (params, callback) => {
    // console.log('MODELS');
    const [product_id, count, page] = params;
    let offset = (page-1) * count;
    let getQuestionsQuery3 = "SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, json_agg(CASE WHEN a.answer_id IS NOT NULL THEN json_build_object(to_char(coalesce(a.answer_id, 0), 'FM99999999'), json_build_object('id', a.answer_id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'reported', a.reported, 'helpfulness', a.helpfulness, 'photos', (SELECT COALESCE(NULLIF(array_agg(p.url) , '{NULL}') , '{}') FROM photos p INNER JOIN answers aw ON p.answer_id = aw.answer_id WHERE aw.answer_id = a.answer_id) )) ELSE NULL END) AS answers FROM questions q LEFT JOIN answers a ON q.question_id = a.question_id WHERE q.product_id = ($1) GROUP BY q.question_id OFFSET ($2) ROWS FETCH NEXT ($3) ROWS ONLY";
    let getQuestionsQuery4 = "SELECT q.question_id, q.question_body, q.question_date, q.asker_name, q.reported, q.question_helpfulness, COALESCE(json_agg(json_build_object(to_char(coalesce(a.answer_id, 0), 'FM99999999'), json_build_object('id', a.answer_id, 'body', a.body, 'date', a.date, 'answerer_name', a.answerer_name, 'reported', a.reported, 'helpfulness', a.helpfulness, 'photos', (SELECT COALESCE(NULLIF(array_agg(p.url) , '{NULL}') , '{}') FROM photos p INNER JOIN answers aw ON p.answer_id = aw.answer_id WHERE aw.answer_id = a.answer_id) ))) FILTER (WHERE a.answer_id IS NOT NULL), '[]') AS answers FROM questions q LEFT JOIN answers a ON q.question_id = a.question_id WHERE q.product_id = ($1) AND q.reported = false GROUP BY q.question_id OFFSET ($2) ROWS FETCH NEXT ($3) ROWS ONLY";
    pool.query(getQuestionsQuery4, [product_id, offset, count], callback)
  },

  getAnswers: (params, callback) => {
    const [question_id, count, page] = params;
    let offset = (page-1) * count;
    let getAnswersQuery = "SELECT a.answer_id AS id, a.question_id, a.body, a.date, a.answerer_name, a.reported, a.helpfulness, COALESCE(NULLIF(array_agg(p.url),'{NULL}'),'{}') AS photos FROM answers a LEFT JOIN photos p ON a.answer_id = p.answer_id WHERE a.question_id = ($1) AND a.reported = false GROUP BY a.answer_id OFFSET ($2) ROWS FETCH NEXT ($3) ROWS ONLY";
    pool.query(getAnswersQuery, [question_id, offset, count], callback)

  },

  postQuestion: (params, callback) => {
    // console.log("MADE IT INTO MODELS");
    let postQuestionQuery = 'INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    pool.query(postQuestionQuery, params, callback);

  },

  postAnswer: (info, callback) => {
    let postAnswerQuery = 'INSERT INTO answers (question_id, body, date, answerer_name, answerer_email, reported, helpfulness) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    let postPhotosQuery = 'INSERT INTO photos (answer_id, url) VALUES ((SELECT answer_id FROM answers WHERE body = ($1)), $2)';
    let [question_id, body, date, name, email, reported, helpful, photos] = info;
    pool.query(postAnswerQuery, [question_id, body, date, name, email, reported, helpful], callback);
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