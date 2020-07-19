const Joi = require('@hapi/joi'); // Validation
const moment = require('moment');

const Session = require('../../models/Session');

// Ensure date is always in the future
const schema = Joi.object({
  startTime: Joi.date().timestamp('unix').min('now').required(),
  endTime: Joi.date().timestamp('unix').required(),
});

const sessionValidation = async (req, res, session) => {
  const joiValidation = (sessionParam) => {
    return schema.validate(sessionParam);
  };

  // Validate input
  const { error } = joiValidation(session);
  if (error) {
    // throw new Error(error.details[0].message);
    return res.status(400).send(error.details[0].message);
  }

  // Validation to check whether this time is 30/60 min
  const startTime = moment.unix(session.startTime);
  const endTime = moment.unix(session.endTime);
  const timeDiff = moment.duration(endTime.diff(startTime)).asMinutes();

  if (!(timeDiff === 30 || timeDiff === 60)) {
    // throw new Error('invalid time range');
    res.status(400).send({ error: 'invalid time range' });
  }

  // Validation to check whether this time is available for this doctor
  const sessions = await Session.find({ doctor: req.user._id });
  sessions.forEach((sessionEach) => {
    if (
      startTime.isBetween(sessionEach.startTime, sessionEach.endTime) ||
      endTime.isBetween(sessionEach.startTime, sessionEach.endTime) ||
      startTime.isSame(sessionEach.startTime) ||
      endTime.isSame(sessionEach.endTime) ||
      startTime.isSame(sessionEach.endTime) ||
      endTime.isSame(sessionEach.startTime)
    ) {
      // throw new Error('this time is not available');
      res.status(400).send({ error: 'this time is not available' });
    }
  });

  // Validate inside array to make sure each date is unique and not in between others in the params

  return { startTime, endTime };
};

exports.sessionsValidationMethod1 = async (req, res, sessions) => {
  const sessionsArray = [];

  sessions.forEach((session) => {
    sessionsArray.push(sessionValidation(req, res, session));
  });

  return sessionsArray;
};

exports.sessionsValidationMethod2 = (req, res, sessions) => {
  const sessionsArray = [];

  sessions.forEach(async (session) => {
    const { startTime, endTime } = sessionValidation(req, res, session);

    const newSession = new Session({
      startTime,
      endTime,
      doctor: req.user._id,
    });

    await newSession.save();
  });

  return sessionsArray;
};

exports.sessionExists = async (req, res) => {
  const session = await Session.findById(req.params.id);

  if (!session) {
    res.status(404).send();
    // throw new Error('resource does not exist');
  }

  // // Check if the client is making the booking not the doctor
  // if (req.user.isDoctor) {
  //   throw new Error('invalid action');
  //   // res.status(400).send({ error: 'invalid action' });
  // }

  // // Check if session has no booking
  // if (session.client !== req.user) {
  //   throw new Error('invalid action');
  //   // res.status(400).send({ error: 'invalid action' });
  // }

  return session;
};

exports.lessThanOneDay = (res, sessionStartTime) => {
  const currentTime = moment(Date.now());
  const oneDayAhead = currentTime.add(moment.duration(24, 'h'));
  const lessThanOneDayVar = oneDayAhead.isAfter(sessionStartTime);

  if (!lessThanOneDayVar) {
    res
      .status(404)
      .send({ error: 'cannot change schedule if booking is within 24 hrs ' });

    // throw new Error('cannot change schedule if booking is within 24 hrs');
  }

  // return lessThanOneDayVar;
};

exports.isDoctorValidation = (req, res, isDoctor) => {
  if (isDoctor && !req.user.isDoctor) {
    // Doctor-only action
    res.status(400).send({ error: 'invalid action' });
  } else {
    // Client-only action
    res.status(400).send({ error: 'invalid action' });
  }
};

exports.sessionValidation = sessionValidation;
