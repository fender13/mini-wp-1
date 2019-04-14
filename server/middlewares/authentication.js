const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  if (req.headers.hasOwnProperty('token')) {
    try {
      var decoded = jwt.verify(req.headers.token, process.env.JWT_SECRET)
      req.data = decoded
      next()
    } catch(e) {
      res.status(400).json({
        message: 'INVALID TOKEN'
      })
    }
  } else {
    res.status(400).json({
      message: 'PLEASE LOGIN AND GET TOKEN'
    })
  }
}