const Article = require('../models/article')
const Tag = require('../models/tag')
const updateMissingTags = require('../helpers/updateMissingTags')
const saveCreateTags = require('../helpers/saveCreateTags')

class ArticleController {
  static getAllArticle(req, res) {
    Article
      .find()
      .populate('author')
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(400).json({
          message: err
        })
      })
  }

  static getUserArticle(req, res) {
    Article
      .find({
        author: req.data.id
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(400).json({
          message: err
        })
      })
  }

  static getSingleArticle(req, res) {
    Article
    .findById({
      _id: req.params.id
    })
      .populate('author')
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(400).json({
          message: err
        })
      })
  }

  static updateArticle(req, res) {
    const { title, tags, content } = req.body
    const getId = { _id: req.params.id }
    let articleData

    Article
      .findById(getId)
      .then((data) => {
        articleData = data

        return Article.findByIdAndUpdate(getId, {
          title: title,
          tags: tags,
          content: content
        })
      })
      .then((newData) => {
        let missing = []

        for (let i = 0; i <articleData.tags.length; i++) {
          let same = false
          for (let j = 0; j < tags.length; j++) {
            if (articleData.tags[i] == tags[j]) {
              same = true
              tags.splice(j, 1)
            } 
          }
          if (same == false) {
            missing.push(articleData.tags[i])
          }
        }
        
        if (missing.length > 0 || tags.length > 0) {
          if (missing.length > 0) {
            for (let i = 0; i < missing.length; i++) {
              updateMissingTags(missing[i], articleData._id)
            }
          }

          if (tags.length > 0) {
            for (let i = 0; i < tags.length; i++) {
              saveCreateTags(tags[i], articleData.id)
            }
          }
        } 

        res.status(200).json(newData)
      })
      .catch((err) => {
        res.status(400).json({
          message: err
        })
      })
  }

  static deleteArticle(req, res) {
    const getId = { _id: req.params.id }

    Article
      .findById(getId)
      .then((data) => {
        for (let i = 0; i < data.tags.length; i++) {
          updateMissingTags(data.tags[i], data._id)
        }

        return Article.findByIdAndDelete(getId)
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(400).json({
          message: err
        })
      })
  }

  static getArticlesByTag(req, res) {
    const tag = req.params.tag

    Tag
      .find({
        tagName: tag
      })
      .populate('ArticleId')
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => {
        res.status(400).json({
          message: err
        })
      })
  }
}

module.exports = ArticleController