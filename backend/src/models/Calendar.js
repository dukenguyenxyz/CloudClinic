const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
  availSessions: [{ startTime: Date, endTime: Date }],
  unavailSessions: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
      },
      startTime: Date,
      endTime: Date,
      client: mongoose.Schema.Types.ObjectId,
    },
  ],
});

module.exports = calendarSchema;
// module.exports = mongoose.model('Calendar', calendarSchema);
