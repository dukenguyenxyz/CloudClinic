// Essential packages
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Subimportant packages
const dotenv = require('dotenv');
const path = require('path');
// S3 image uploading
const multer = require('multer');
const AWS = require('aws-sdk');
const { uuid } = require('uuidv4');
const connectDB = require('./config/mongodb');

// Access dotenv
dotenv.config({ path: './config/.env' });

// Import Routes
const usersRoute = require('./src/routes/users');
const sessionsRoute = require('./src/routes/sessions');
const samplePrivateRoute = require('./src/routes/samplePrivate');

// Create instance of express
const app = express();

// Create S3 instance
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

// Connect to MongoDB with Mongoose
connectDB();

// Middleware
// app.use(express.json());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE');
    return res.status(200).json({});
  }
  next();
});

// Add a single baseUrl Route ('/api') here for DRY

// Route Middlewares
app.use('/api/users', usersRoute);
app.use('/api/sessions', sessionsRoute);
app.use('/api/sample-private', samplePrivateRoute);

// Default Route
app.get('/api', (req, res) => res.send('Hello world!'));

// Concurrent Mode in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
}

// s3 storage
// NOT SURE where this is meant to go
const storage = multer.memoryStorage({
  destination: (req, file, callback) => {
    callback(null, '');
  },
});

const upload = multer({ storage }).single('image');

app.post('/api/upload', upload, (req, res) => {
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
});

module.exports = app;
