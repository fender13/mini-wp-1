const mongoose = require('mongoose')
const ENV = require('dotenv')
ENV.config()

const dbconnect = process.env.DB_NAME
mongoose.connect(`mongodb://localhost/${dbconnect}`, { useNewUrlParser: true })

mongoose.set('useFindAndModify', false)

const schema = mongoose.Schema

const TagSchme = new schema({
  tagName: {
    type: String,
  },
  ArticleId: [{
    type: String,
    ref: 'Arcticles'
  }]
})

var Tags = mongoose.model('Tags', TagSchme)

module.exports = Tags