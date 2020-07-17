const Joi = require('@hapi/joi'); // Validation
const moment = require('moment');

const Session = require('../../models/Session');

const sessionValidation = async (isDoctor, req) => {
  // Ensure date is always in the future
  const schema = Joi.object({
    startTime: Joi.date().timestamp('unix').min('now').required(),
    endTime: Joi.date().timestamp('unix').required(),
  });

  const joiValidation = (data) => {
    return schema.validate(data);
  };

  // Check if creator is doctor
  if (isDoctor) {
    if (!req.user.isDoctor) {
      throw new Error('invalid action');
      // res.status(400).send({ error: 'invalid action' });
    }
  } else if (!isDoctor && req.user.isDoctor) {
    throw new Error('invalid action');
  }

  // Validate input
  const { error } = joiValidation(req.body);
  if (error) {
    throw new Error(error.details[0].message);
    // return res.status(400).send(error.details[0].message);
  }

  // Validation to check whether this time is 30/60 min
  const startTime = moment.unix(req.body.startTime);
  const endTime = moment.unix(req.body.endTime);
  const timeDiff = moment.duration(endTime.diff(startTime)).asMinutes();

  if (!(timeDiff === 30 || timeDiff === 60)) {
    throw new Error('invalid time range');
    // res.status(400).send({ error: 'invalid time range' });
  }

  // Validation to check whether this time is available for this doctor
  const sessions = await Session.find({ doctor: req.user });
  sessions.forEach((session) => {
    if (
      startTime.isBetween(session.startTime, session.endTime) ||
      endTime.isBetween(session.startTime, session.endTime)
    ) {
      throw new Error('this time is not available');
      // res.status(400).send({ error: 'this time is not available' });
    }
  });
  return { startTime, endTime };
};

const sessionExists = async (req) => {
  const session = await Session.findById(req.params._id);

  if (!session) {
    throw new Error('resource does not exist');
    // res.status(404).send();
  }

  // Check if the client is making the booking not the doctor
  if (req.user.isDoctor) {
    throw new Error('invalid action');
    // res.status(400).send({ error: 'invalid action' });
  }

  // // Check if session has no booking
  // if (session.client !== req.user) {
  //   throw new Error('invalid action');
  //   // res.status(400).send({ error: 'invalid action' });
  // }

  return session;
};

const lessThanOneDay = (sessionStartTime) => {
  const currentTime = moment(Date.now());
  const oneDayAhead = currentTime.add(moment.duration(24, 'h'));
  const lessThanOneDayVar = oneDayAhead.isAfter(sessionStartTime);

  if (!lessThanOneDay) {
    // res
    //   .status(404)
    //   .send({ error: 'cannot change schedule if booking is within 24 hrs ' });

    throw new Error('cannot change schedule if booking is within 24 hrs');
  }

  return lessThanOneDayVar;
};

module.exports = { sessionValidation, sessionExists, lessThanOneDay };
