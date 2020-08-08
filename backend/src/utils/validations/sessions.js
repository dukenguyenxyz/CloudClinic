/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/*  eslint-disable-next-line no-restricted-syntax */

// IMPORTANT: Replace all res.send with throw new Error due to the following:
// // Cannot set headers after they are sent to the clientError [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

const Joi = require('@hapi/joi'); // Validation
const moment = require('moment');

const Session = require('../../models/Session');

// Ensure date is always in the future
const schema = Joi.object({
  startTime: Joi.date().min('now').required(),
  endTime: Joi.date().min('now').required(),
});

const sessionValidation = async (req, session) => {
  const joiValidation = (sessionParam) => {
    return schema.validate(sessionParam);
  };

  // Validate input
  const { error } = joiValidation(session);
  if (error) {
    throw new Error(error.details[0].message);
  }

  // Validation to check whether this time is 30/60 min
  const startTime = moment(session.startTime);
  const endTime = moment(session.endTime);
  const timeDiff = moment.duration(endTime.diff(startTime)).asMinutes();

  // // console.log({ startTime, endTime });
  // // console.log(timeDiff);

  if (!(timeDiff === 30 || timeDiff === 60)) {
    throw new Error('invalid time range');
  }

  // Validation to check whether this time is available for this doctor
  const sessions = await Session.find({ doctor: req.params.id });
  sessions.forEach((sessionEach) => {
    console.log('running...');
    if (
      startTime.isBetween(sessionEach.startTime, sessionEach.endTime) ||
      endTime.isBetween(sessionEach.startTime, sessionEach.endTime) ||
      startTime.isSame(sessionEach.startTime) ||
      endTime.isSame(sessionEach.endTime) ||
      startTime.isSame(sessionEach.endTime) ||
      endTime.isSame(sessionEach.startTime)
    ) {
      throw new Error('this time is not available');
    }
  });

  // Validate inside array to make sure each date is unique and not in between others in the params
  return { startTime, endTime };
};

exports.sessionsValidationMethod1 = (req, sessions) => {
  const sessionsArray = [];

  sessions.forEach((session) => {
    sessionsArray.push(sessionValidation(req, session));
  });

  return sessionsArray;
};

exports.sessionsValidationMethod2 = async (req, sessions) => {
  const sessionsArray = [];

  for (const session of sessions) {
    const { startTime, endTime } = await sessionValidation(req, session);

    const newSession = new Session({
      startTime,
      endTime,
      doctor: req.user._id,
    });

    await newSession.save();

    sessionsArray.push({
      startTime: moment(startTime).toDate(),
      endTime: moment(endTime).toDate(),
    });
  }
  return sessionsArray;
};

exports.sessionExists = async (req) => {
  const session = await Session.findById(req.params.id, function (err) {
    if (err) {
      throw new Error('resource does not exist');
    }
  });
  return session;
};

exports.lessThanOneDay = (sessionStartTime) => {
  const currentTime = moment();
  const oneDayAhead = currentTime.add(1, 'days');
  const lessThanOneDayVar = oneDayAhead.isAfter(sessionStartTime);

  if (lessThanOneDayVar) {
    throw new Error('cannot change schedule if booking is within 24 hrs');
  }

  // return lessThanOneDayVar;
};

exports.isDoctorValidation = (req, isDoctor) => {
  if (isDoctor && !req.user.isDoctor) {
    // Doctor-only action
    throw new Error({ error: 'invalid action' });
  } else if (!isDoctor && req.user.isDoctor) {
    // Client-only action
    throw new Error({ error: 'invalid action' });
  }
};

exports.sessionValidation = sessionValidation;
