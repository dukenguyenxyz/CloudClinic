const moment = require('moment');

const Session = require('../models/Session');
const {
  sessionValidation,
  sessionsValidationMethod1,
  sessionsValidationMethod2,
  sessionExists,
  lessThanOneDay,
  isDoctorValidation,
} = require('../utils/validations/sessions');

// // Doctor Actions
// Get all sessions
exports.viewSessions = async (req, res) => {
  try {
    let sessions = null;

    sessions = req.user.isDoctor
      ? await Session.find({ doctor: req.user.id })
      : await Session.find({ client: req.user.id });

    res.send(sessions);
  } catch (e) {
    res.status(500).send(e);
  }
};

// Create available session
exports.createSession = async (req, res) => {
  try {
    // Check if creator is doctor
    isDoctorValidation(req, true);
    // if (!req.user.isDoctor) res.status(400).send({ error: 'invalid action' });

    const { startTime, endTime } = await sessionValidation(
      req,
      // res,
      req.body,
      true
    );
    // // Validate input
    // const { error } = sessionValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    // // Validation to check whether this time is 30/60 min
    // const startTime = moment.unix(req.body.startTime);
    // const endTime = moment.unix(req.body.endTime);
    // const timeDiff = moment.duration(endTime.diff(startTime)).asMinutes;

    // if (!(timeDiff === 30 || timeDiff === 60)) {
    //   res.status(400).send({ error: 'invalid time range' });
    // }

    // // Validation to check whether this time is available for this doctor
    // const sessions = await Session.find({ doctor: req.user });
    // sessions.forEach((session) => {
    //   if (
    //     startTime.isBetween(session.startTime, session.endTime) ||
    //     endTime.isBetween(session.startTime, session.endTime)
    //   )
    //     res.status(400).send({ error: 'this time is not available' });
    // });

    // Create session
    const session = new Session({
      startTime,
      endTime,
      doctor: req.user._id,
    });

    await session.save();
    res.send(session);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.createSessions = async (req, res) => {
  try {
    // Check if creator is doctor
    isDoctorValidation(req, true);
    // if (!req.user.isDoctor) res.status(400).send({ error: 'invalid action' });

    //  METHOD 1
    // const sessions = await sessionsValidationMethod1(req, res, req.body);

    // sessions.forEach(async (reqSession) => {
    //   // const startTime = moment.unix(reqSession.startTime);
    //   // const endTime = moment.unix(reqSession.endTime);

    //   const session = new Session({
    //     startTime: reqSession.startTime,
    //     endTime: reqSession.endTime,
    //     doctor: req.user._id,
    //   });

    //   await session.save();
    // });

    // METHOD 2
    const sessions = await sessionsValidationMethod2(req, req.body);

    // console.log(sessions);

    res.status(201).send(sessions);
  } catch (e) {
    res.status(500).send();
  }
};

// Delete session
exports.deleteSession = async (req, res) => {
  try {
    // Check if creator is doctor
    isDoctorValidation(req, true);
    // if (!req.user.isDoctor) res.status(400).send({ error: 'invalid action' });

    // Find session
    const session = await Session.findById(req.params.id);

    if (!session) {
      res.status(404).send();
    }

    // Check if the doctor owns this session
    if (!(String(session.doctor) === String(req.user._id))) {
      res.status(400).send({ error: 'invalid action' });
    }

    // Check if the session already has a booking
    if (session.client) {
      console.log('Session is booked by a client');
    }

    // Delete sesssions
    await session.remove();
    res.send(session);
  } catch (e) {
    res.status(500).send(e);
  }
};

// // Client Actions
// Book a session
exports.bookSession = async (req, res) => {
  try {
    // Check if creator is client
    isDoctorValidation(req, false);
    // if (req.user.isDoctor) res.status(400).send({ error: 'invalid action' });

    // // Find session
    // const session = await Session.findById(req.params._id);

    // if (!session) {
    //   res.status(404).send();
    // }

    const session = await sessionExists(req);

    // Check if session has no booking
    if (session.client) {
      res.status(400).send({ error: 'booking is no longer available' });
    }

    session.client = req.user._id;
    session.save();

    res.status(201).send(session);
  } catch (e) {
    res.status(500).send(e);
  }
};

// Update a session (if less than 24hr from booking)
exports.updateSession = async (req, res) => {
  try {
    // Check if creator is doctor
    isDoctorValidation(req, false);
    // if (req.user.isDoctor) res.status(400).send({ error: 'invalid action' });

    const session = await sessionExists(req);

    // // Find session
    // const session = await Session.findById(req.params._id);

    // if (!session) {
    //   res.status(404).send();
    // }

    // Refactor this
    // Check if session has no booking
    if (String(session.client) !== String(req.user._id)) {
      res.status(400).send({ error: 'invalid action' });
    }

    const { startTime, endTime } = await sessionValidation(
      req,
      req.body,
      false
    );

    // // Validate input
    // const { error } = sessionValidation(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    // // Check if current time is before 24 hours
    lessThanOneDay(session.startTime);

    // const currentTime = moment(Date.now());
    // const oneDayAhead = currentTime.add(moment.duration(24, 'h'));
    // const lessThanOneDay = oneDayAhead.isAfter(session.startTime);

    // if (!lessThanOneDay) {
    //   res
    //     .status(404)
    //     .send({ error: 'cannot change schedule if booking is within 24 hrs ' });
    // }

    // session.startTime = req.body.startTime;
    // session.endTime = req.body.endTime;

    session.startTime = startTime;
    session.endTime = endTime;
    session.save();

    res.send(session);
  } catch (e) {
    res.status(500).send(e);
  }
};

// Cancel a session (if less than 24hr from booking)
exports.cancelSession = async (req, res) => {
  try {
    // Check if creator is client
    isDoctorValidation(req, false);
    // if (req.user.isDoctor) res.status(400).send({ error: 'invalid action' });

    const session = await sessionExists(req);
    // // Find session
    // const session = await Session.findById(req.params._id);

    // if (!session) {
    //   res.status(404).send();
    // }

    // Check if session has no booking
    if (String(session.client) !== String(req.user._id)) {
      res.status(400).send({ error: 'invalid action' });
    }

    // Check if current time is before 24 hours
    lessThanOneDay(session.startTime);
    // const minTime = 60 * 60 * 24 * 1000; // one day
    // if (!(Date.now() - session.startTime > minTime)) {
    //   res
    //     .status(404)
    //     .send({ error: 'cannot change schedule if booking is within 24 hrs ' });
    // }

    session.client = null;
    session.save();

    res.send(session);
  } catch (e) {
    res.status(500).send();
  }
};
