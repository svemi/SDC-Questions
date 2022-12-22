const db = require('./databases/productsDB.js')
module.exports = {
  getInfo: (data, CB) => {
    db.query(
      'SELECT * from product',
      (err, response) => {
        if (err) {
          CB(err)
        } else {
          CB(null, response)
        }
      }
    )
  },
  getStyles: (data, CB) => {
    db.query(
      'SELECT * from styles',
      (err, response) => {
        if (err) {
          CB(err)
        } else {
          CB(null, response)
        }
      }
    )
  },
  getRelated: (data, CB) => {
    db.query(
      'SELECT * from related',
      (err, response) => {
        if (err) {
          CB(err)
        } else {
          CB(null, response)
        }
      }
    )
  }
}
