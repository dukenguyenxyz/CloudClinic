const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
  availableSessions: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
      startTime: Date,
      endTime: Date,
      createDate: {
        type: Date,
        default: Date.now,
      },
      modifiedDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  unavailableSessions: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
      client: mongoose.Schema.Types.ObjectId,
      startTime: Date,
      endTime: Date,
      createDate: {
        type: Date,
        default: Date.now,
      },
      modifiedDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = calendarSchema;
// module.exports = mongoose.model('Calendar', calendarSchema);
