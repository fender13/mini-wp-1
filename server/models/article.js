const mongoose = require('mongoose')
const ENV = require('dotenv')
ENV.config()

const dbconnect = process.env.DB_NAME
mongoose.connect(`mongodb://localhost/${dbconnect}`, { useNewUrlParser: true })

mongoose.set('useFindAndModify', false)

const schema = mongoose.Schema

const ArticleSchme = new schema({
  title: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    ref: 'Tags'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  author: {
    type: schema.Types.ObjectId,
    ref: 'Users'
  },
  featured_image: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  votes: [{
    type: schema.Types.ObjectId,
    ref: 'Users'
  }]
})

var Articles = mongoose.model('Arcticles', ArticleSchme)

module.exports = Articles 