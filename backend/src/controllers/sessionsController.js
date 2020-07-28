const Session = require('../models/Session');
const {
  sessionValidation,
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
    res.status(400).send(e);
  }
};

// Create available session
exports.createSession = async (req, res) => {
  try {
    // Check if creator is doctor
    isDoctorValidation(req, true);

    const { startTime, endTime } = await sessionValidation(req, req.body, true);

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

    const sessions = await sessionsValidationMethod2(req, req.body);

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

    const session = await sessionExists(req);

    // Check if session has no booking
    if (session.client) {
      res.status(400).send({ error: 'booking is no longer available' });
    }

    session.client = req.user._id;
    session.save();

    res.status(200).send(session);
  } catch (e) {
    res.status(500).send(e);
  }
};

// Update a session (if less than 24hr from booking)
exports.updateSession = async (req, res) => {
  // Check if creator is doctor
  isDoctorValidation(req, false);

  const session = await sessionExists(req);

  // Refactor this
  // Check if session has no booking
  if (String(session.client) !== String(req.user._id)) {
    res.status(400).send({ error: 'invalid action' });
  }

  const { startTime, endTime } = await sessionValidation(req, req.body, false);

  // // Check if current time is before 24 hours
  lessThanOneDay(session.startTime);

  try {
    session.startTime = startTime;
    session.endTime = endTime;
    session.save();

    res.status(200).send(session);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Cancel a session (if less than 24hr from booking)
exports.cancelSession = async (req, res) => {
  // Check if creator is client
  isDoctorValidation(req, false);

  const session = await sessionExists(req);

  // Check if session has no booking
  if (String(session.client) !== String(req.user._id)) {
    res.status(400).send({ error: 'invalid action' });
  }

  // Check if current time is before 24 hours
  lessThanOneDay(session.startTime);

  try {
    session.client = null;
    session.save();

    res.send(session);
  } catch (e) {
    res.status(400).send(e);
  }
};
