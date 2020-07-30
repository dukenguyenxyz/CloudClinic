const router = require('express').Router();
const dotenv = require('dotenv');

// S3 image uploading
const multer = require('multer');
const AWS = require('aws-sdk');
const { uuid } = require('uuidv4');

// Access dotenv
dotenv.config({ path: '../../config/.env' });
const verifyToken = require('./verifyToken');

// Create S3 instance
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

// s3 storage
// NOT SURE where this is meant to go
const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, '');
  },
});

const upload = multer({ storage }).single('image');

router.post('/', verifyToken, upload, (req, res) => {
  try {
    const myFile = req.file.originalname.split('.');
    const fileType = myFile[myFile.length - 1];

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${uuid()}.${fileType}`,
      Body: req.file.buffer,
    };

    s3.upload(params, (err, data) => {
      if (err) {
        res.status(500).send(err);
      }

      res.status(200).send(data);
    });
    // res.send('Hello');
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
