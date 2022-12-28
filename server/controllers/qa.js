var models = require('../models');

module.exports = {
  get: {
    questions: (req,res) => {
      let product_id = req.query.product_id;
      // console.log(typeof product_id);
      let count = req.query.count || 5;
      let page = req.query.page || 1;
      let params = [product_id, count, page];
      models.qa.getQuestions(params, (err, data) => {
        if (err) {
          // console.log(err);
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
          res.status(200).send(data.rows);
        }
      })

    }
  },

  post: {
    questions: (req, res) => {
      const {body, name, email, product_id} = req.body;
      let date = Date.now();
      let reported = false;
      let helpful = 0;
      let params = [product_id, body, date, name, reported, helpful];
      models.qa.postQuestion(params, (err, data) => {
        if (err) {
          res.sendStatus(400);
        } else {
          res.sendStatus(201);
        }
      })


    },
    answers: (req, res) => {
      // POST answer req.body
      // {body: answerbody, name: answername, email: answeremail, photos: answerphotos}
      const {body, name, email, photos} = req.body;
      let question_id = req.params.question_id;
      let date = Date.now();
      let reported = false;
      let helpful = 0;
      let info = [question_id, body, date, name, reported, helpful, photos];
      models.qa.postAnswer(info, (err, data) => {
        if (err) {
          res.sendStatus(400);
        } else {
          res.sendStatus(201);
        }
      })

    }
  },

  put: {
    question: {
      helpful: (req, res) => {
        let question_id = req.params.question_id;
        models.qa.upvoteQuestions(question_id, (err, data) => {
          if (err) {
            res.sendStatus(400);
          } else {
            res.sendStatus(201)
          }
        })


      },
      report: (req, res) => {
        let question_id = req.params.question_id;
        models.qa.reportQuestion(question_id, (err, data) => {
          if (err) {
            res.sendStatus(400);
          } else {
            res.sendStatus(201)
          }
        })

      }
    },
    answer: {
      helpful: (req, res) => {
        let answer_id = req.params.answer_id;
        models.qa.upvoteAnswer(answer_id, (err, data) => {
          if (err) {
            res.sendStatus(400);
          } else {
            res.sendStatus(201)
          }
        })


      },
      report: (req, res) => {
        let answer_id = req.params.answer_id;
        models.qa.reportAnswer(answer_id, (err, data) => {
          if (err) {
            res.sendStatus(400);
          } else {
            res.sendStatus(201)
          }
        })

      }
    }
  }



}