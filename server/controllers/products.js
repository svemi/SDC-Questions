const models = require('./../models/products.js')

const info = (req, res) => {
  models.getInfo(req.params.product_id, (err, response) => {
    if (err) {
      console.log('err', err);
      res.status(404).send()
    } else {
      console.log('req.body:', req.body, 'req.params:', req.params, 'req.params.product_id:', req.params.product_id);
      res.status(201).send(response.rows)
    }
  })
}

const styles = (req, res) => {
  models.getStyles(req.params.product_id, (err, response) => {
    if (err) {
      console.log('err', err);
      res.status(404).send()
    } else {
      console.log('req.body:', req.body, 'req.params:', req.params, 'req.params.product_id:', req.params.product_id);
      res.status(201).send(response.rows)
    }
  })
}

const related = (req, res) => {
  models.getRelated(req.params.product_id, (err, response) => {
    if (err) {
      console.log('err', err);
      res.status(404).send()
    } else {
      console.log('req.body:', req.body, 'req.params:', req.params, 'req.params.product_id:', req.params.product_id);
      res.status(201).send(response.rows)
    }
  })
}

module.exports.info = info
module.exports.styles = styles
module.exports.related = related