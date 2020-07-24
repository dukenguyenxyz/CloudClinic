/* eslint-disable default-case */

const mongoose = require('mongoose');
require('colors');

let dbServer;

switch (process.env.NODE_ENV) {
  case 'development':
    dbServer = 'mongodb://127.0.0.1:27017/cloudclinic';
    break;
  case 'production':
    dbServer = process.env.MONGO_URI;
    break;
}

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(dbServer, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Cloudclinic database connected at: ${conn.connection.host}`.magenta.bold
    );
  } catch (e) {
    console.log(`Error: ${e.message}`.red);
    process.exit(1);
  }
};

module.exports = connectDB;
