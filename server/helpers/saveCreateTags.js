const Tag = require('../models/tag')

module.exports = (tag, articleId) => {
  Tag
    .findOne({
      tagName: tag
    })
      .then((data) => {
        if (data) {
          const getId = { _id: data._id }

          return Tag
            .findOneAndUpdate(getId, 
              { "$push": { "ArticleId": articleId } },
              { "new": true, "upsert": true }
                
            )
        } else {
          return Tag
            .create({
              tagName: tag,
              ArticleId: [articleId]
            })
        }
      })
      .then((newTagData) => {
        console.log('Tag Has Created')
      })
      .catch((err) => {
        console.log(err)
      })
}