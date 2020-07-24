const dotenv = require('dotenv');

dotenv.config({ path: './config/.env' });
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
