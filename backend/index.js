// Essential packages
const express = require('express');
const mongoose = require('mongoose');

// Subimportant packages
const dotenv = require('dotenv');
const path = require('path');

// Optional packages
const colors = require('colors');

// Access dotenv
dotenv.config({ path: './config/config.env' });

// Create instance of express
const app = express();

// Setup Mongoose & MongoDB
mongoose.connect(
  'mongodb://127.0.0.1:27017/cloudclinic',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => console.log(`Cloudclinic database connected`.magenta.bold)
);

// Import Routes
const authRoute = require('./src/routes/auth');

// Route Middlewares
app.use('/api/user', authRoute);

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

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
