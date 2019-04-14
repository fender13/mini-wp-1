const Article = require('../models/article')

module.exports = (req, res, next) => {
  const getId = { _id: req.params.id }

  Article
    .findById(getId)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          message: 'Data tidak ditemukan'
        })
      } else {
        if (req.data.id == data.author) {
          next()
        } else {
          res.status(400).json({
            message: 'DILARANG UPDATE JIKA BUKAN PEMILIK ARTICLE'
          })
        }
      }
    })
    .catch((err) => {
      res.status(400).json({
        message: 'DILARANG UPDATE JIKA BUKAN PEMILIK ARTICLE'
      })
    })
}