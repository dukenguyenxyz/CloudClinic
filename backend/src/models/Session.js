const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  startTime : {type : Date, required : false},
  endTime : {type : Date, required : false},
  doctor : {type : mongoose.Schema.Types.ObjectId, required : true},
  client : {type : mongoose.Schema.Types.ObjectId, default : null},
  createDate : {
    type : Date,
    default : Date.now,
  },
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
