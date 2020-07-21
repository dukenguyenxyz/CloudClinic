// Optional packages
// const colors = require('colors');
// Subimportant packages
const dotenv = require('dotenv');
// Access dotenv
dotenv.config({ path: './config/config.env' });
const app = require('./app');

// Set port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
