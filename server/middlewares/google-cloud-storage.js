const { Storage } = require('@google-cloud/storage')
const gcsHelpers = require('../helpers/google-cloud-storage')

const ENV = require('dotenv')
ENV.config()

const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID // Replace with your project ID
const GOOGLE_CLOUD_KEYFILE = '../server/portofolio-mini-wp-72490f72fe90.json' // Replace with the path to the downloaded private key
  
const storage = new Storage({
  projectId: GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: GOOGLE_CLOUD_KEYFILE,
})

exports.sendUploadToGCS = (req, res, next) => {
  if (!req.file) {
    return next()
  }

  const bucketName = process.env.BUCKET || DEFAULT_BUCKET_NAME
  const bucket = storage.bucket(bucketName)
  const gcsFileName = `${Date.now()}-${req.file.originalname}`
  const file = bucket.file(gcsFileName)

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  })

  stream.on('error', (err) => {
    req.file.cloudStorageError = err
    console.log(req.file.cloudStorageError)
    next(err)
  })

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsFileName
    return file.makePublic()
      .then(() => {
        req.file.gcsUrl = gcsHelpers.getPublicUrl(bucketName, gcsFileName)
        next()
      })
  })
  stream.end(req.file.buffer)
}