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

// Import Routes
const usersRoute = require('./src/routes/users');
const sessionsRoute = require('./src/routes/sessions');
const samplePrivateRoute = require('./src/routes/samplePrivate');

// Create instance of express
const app = express();

// Connect to MongoDB with Mongoose
require('./config/mongodb');

// Middleware
app.use(express.json());

// Route Middlewares
app.use('/api/users', usersRoute);
app.use('/api/calendar', sessionsRoute);
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

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
