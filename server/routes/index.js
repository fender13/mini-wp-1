const router = require('express').Router()
const controller = require('../controllers/user')
const authentication = require('../middlewares/authentication')

// register a user
router.post('/register', controller.userRegister)

// login manual a user
router.post('/login', controller.userLogin)

// verify token
router.get('/verify', authentication, (req, res) => {
  res.status(200).json({
    message: 'User is verified',
    username: req.data.username
  })
})

module.exports = router