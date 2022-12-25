var models = require('../models');

module.exports = {
  get: {
    questions: (req,res) => {
      let product_id = req.query.product_id;
      let count = req.query.count || 5;
      let page = req.query.page || 1;
      let params = [product_id, count, page];
      models.qa.getQuestions(params, (err, data) => {
        if (err) {
          res.sendStatus(400);
        } else {
          res.status(200).send(data.rows);
        }
      })


    },
    answers: (req, res) => {
      let question_id = req.params.question_id;
      let count = req.query.count || 5;
      let page = req.query.page || 1;
      let params = [question_id, count, page];
      models.qa.getAnswers(params, (err, data) => {
        if (err) {
          res.sendStatus(400);
        } else {
          res.status(200).send(data);
        }
      })

    }
  },

  post: {
    questions: (req, res) => {

    },
    answers: (req, res) => {

    }
  },

  put: {
    question: {
      helpful: (req, res) => {

      },
      report: (req, res) => {

      }
    },
    answer: {
      helpful: (req, res) => {

      },
      report: (req, res) => {

      }
    }
  }



}