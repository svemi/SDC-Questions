var models = require('../models');

module.exports = {
  get: {
    questions: (req,res) => {
      let product_id = req.query.product_id;
      // console.log(typeof product_id);
      let count = req.query.count || 5;
      let page = req.query.page || 1;
      let params = [Number(product_id), count, page];
      models.qa.getQuestions(params, (err, data) => {
        if (err) {
          // console.log(err);
          res.sendStatus(400);
        } else {
          let obj = {product_id: product_id, results: data.rows}
          res.status(200).send(obj);
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
          let obj = {question: question_id, page: page, count: count, results: data.rows}
          res.status(200).send(obj);
        }
      })

    }
  },

  post: {
    questions: (req, res) => {
      let {body, name, email, product_id} = req.body;
      let date = Date.now();
      var date_ob = new Date(date);

      // year as 4 digits (YYYY)
      var year = date_ob.getFullYear();

      // month as 2 digits (MM)
      var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

      // date as 2 digits (DD)
      var dt = ("0" + date_ob.getDate()).slice(-2);

      // hours as 2 digits (hh)
      var hours = ("0" + date_ob.getHours()).slice(-2);

      // minutes as 2 digits (mm)
      var minutes = ("0" + date_ob.getMinutes()).slice(-2);

      // seconds as 2 digits (ss)
      var seconds = ("0" + date_ob.getSeconds()).slice(-2);

      date = "" + year + "-" + month + "-" + dt + " " + hours + ":" + minutes + ":" + seconds;
      let reported = false;
      let helpful = 0;
      let params = [Number(product_id), body, date, name, email, reported, helpful];
      models.qa.postQuestion(params, (err, data) => {
        if (err) {
          console.log(err);
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
      let question_id = Number(req.params.question_id);
      let date = Date.now();
      var date_ob = new Date(date);

      // year as 4 digits (YYYY)
      var year = date_ob.getFullYear();

      // month as 2 digits (MM)
      var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

      // date as 2 digits (DD)
      var dt = ("0" + date_ob.getDate()).slice(-2);

      // hours as 2 digits (hh)
      var hours = ("0" + date_ob.getHours()).slice(-2);

      // minutes as 2 digits (mm)
      var minutes = ("0" + date_ob.getMinutes()).slice(-2);

      // seconds as 2 digits (ss)
      var seconds = ("0" + date_ob.getSeconds()).slice(-2);

      date = "" + year + "-" + month + "-" + dt + " " + hours + ":" + minutes + ":" + seconds;
      let reported = false;
      let helpful = 0;
      let info = [question_id, body, date, name, email, reported, helpful, photos];
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