const Tag = require('../models/tag')

module.exports = (missingTag, articleId) => {
  let findTag = {
    tagName: missingTag
  }

  Tag
    .findOneAndUpdate(findTag, 
      { "$pull": { "ArticleId": articleId } },
      { "new": true, "upsert": true }  
    )
    .then((data) => {
      console.log(data, 'missing tag has been updated')
    })
    .catch((err) => {
      console.log(err)
    })
}