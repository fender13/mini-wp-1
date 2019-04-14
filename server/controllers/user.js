const User = require('../models/user')
const jwt = require('jsonwebtoken')

const comparePassword = require('../helpers/comparePassword')

class UserController {
  static userRegister(req, res) {
    const { firstName, lastName, email, username, password } = req.body

    User.create({
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      password: password
    })
    .then((data) => {
      res.status(201).json(data)
    })
    .catch((err) => {
      let errors = {}

      if (err.errors.firstName != undefined || err.errors.lastName != undefined || err.errors.email != undefined || err.errors.username != undefined || err.errors.password != undefined) {
        errors.firstName = err.errors.firstName
        errors.lastName = err.errors.lastName
        errors.email = err.errors.email
        errors.username = err.errors.username
        errors.password = err.errors.password
        
        res.status(400).json(errors)
      } else {
        res.status(500).json({
          message: `Terjadi kesalahan pada server..Cobalah beberapa saat lagi!!!`
        })
      }
    })
  }

  static userLogin(req, res) {
    const { username, password } = req. body
    let dataUser

    User.findOne({
        username: username
    })
      .then((user) => {
        dataUser = user
        if (!user) {
          throw  'EMAIL ATAU PASSWORD ANDA SALAH'
        } else {
          return comparePassword(password, dataUser.password)
        }
      })
      .then((result) => {
        if (!result) {
          throw  'EMAIL ATAU PASSWORD ANDA SALAH'
        } else {
          const payload = {
            id: dataUser._id,
            username: dataUser.username
          }
          const token = jwt.sign(payload, process.env.JWT_SECRET)
          res.status(200).json({
            token: token,
            id: dataUser._id,
            username: dataUser.username
          })
        }
      })
      .catch((err) => {
        res.status(400).json({
          message: err
        })
      })
  }
}

module.exports = UserController