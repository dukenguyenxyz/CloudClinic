const mongoose = require('mongoose');
const colors = require('colors');

mongoose.connect(
  'mongodb://127.0.0.1:27017/cloudclinic',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  },
  () => console.log(`Cloudclinic database connected`.magenta.bold)
);
