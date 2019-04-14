const router = require('express').Router()
const controller = require('../controllers/article')
const authentication = require('../middlewares/authentication')
const updateAuthorization = require('../middlewares/updateAuthorization')

const Article = require('../models/article')

const saveCreateTags = require('../helpers/saveCreateTags')

const gcsMiddlewares = require('../middlewares/google-cloud-storage')
const Multer = require('multer')

const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size is 10MB
  }
})

// add new post
router.post('/upload', authentication, multer.single('image'), gcsMiddlewares.sendUploadToGCS, (req, res, next) => {
  const { title, tags, content } = req.body
  const decode = req.data

  const split = tags.split(',')

  let url = ''
  if (req.file && req.file.gcsUrl) {
    url = req.file.gcsUrl
  } else {
    throw new Error('Unable to upload');
  }

  Article.create({
    title: title,
    tags: split,
    createdAt: new Date(),
    author: decode.id,
    featured_image: url,
    content: content
  })
    .then((data) => {
      if (data.tags.length > 0) {
        data.tags.forEach((tag) => {
          saveCreateTags(tag, data._id)
        })
      }

      res.status(201).json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err
      })
    })
})

// get all article
router.get('/', controller.getAllArticle)

// get user article
router.get('/user', authentication, controller.getUserArticle)

// get single article
router.get('/:id', controller.getSingleArticle)

// update single article title, content, tags
router.put('/:id', authentication, updateAuthorization, controller.updateArticle)

// update single article main image
router.put('/image/:id', authentication, updateAuthorization, multer.single('image'), gcsMiddlewares.sendUploadToGCS, (req, res, next) => {
  const getId = { _id: req.params.id }

  let url = ''
  if (req.file && req.file.gcsUrl) {
    url = req.file.gcsUrl
  } else {
    throw new Error('Unable to upload');
  }

  Article
    .findByIdAndUpdate(getId, {
      featured_image: url
    })
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: err
      })
    })
})

// delete an article
router.delete('/:id', authentication, updateAuthorization, controller.deleteArticle)

// get articles by tag 
router.get('/set-tag/:tag', controller.getArticlesByTag)

module.exports = router