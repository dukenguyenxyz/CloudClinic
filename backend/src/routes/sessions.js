const router = require('express').Router();

const Session = require('../models/Session');
const verifyToken = require('./verifyToken');

// // DOCTOR

// Get all sessions
router.get('/', verifyToken, async (req, res) => {
  try {
    let sessions = null;

    if (req.user.isDoctor) {
      sessions = await Session.find({ doctor: req.user._id });
    } else {
      sessions = await Session.find({ client: req.user._id });
    }

    res.send(sessions);
  } catch (e) {
    res.status(500).send();
  }
});

// Create available session
router.post('/new', verifyToken, async (req, res) => {
  try {
    // Check if creator is doctor
    if (!req.user.isDoctor) res.status(400).send({ error: 'invalid action' });

    // Validation to check whether this time is available

    // Create session
    const session = new Session({
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      doctor: req.user._id,
    });

    await session.save();

    res.send(session);
  } catch (e) {
    res.status(500).send();
  }
});

// Delete session
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    // Check if creator is doctor
    if (!req.user.isDoctor) res.status(400).send({ error: 'invalid action' });

    // Find session
    const session = await Session.findById(req.params._id);

    // Check if the doctor owns this session
    if (session.doctor !== req.user._id) {
      res.status(400).send({ error: 'invalid action' });
    }

    // Check if the session already has a booking
    if (session.client) {
      console.log('Sessions is booked by a client');
    }

    // Delete sesssions
    await session.remove();
    res.send(session);
  } catch (e) {
    res.status(500).send();
  }
});

// // CLIENT

// Book a session
router.patch('/book/:id', verifyToken, async (req, res) => {
  try {
    // Find session
    const session = await Session.findById(req.params._id);

    if (!session) {
      res.status(404).send();
    }

    // Check if session has no booking
    if (session.client) {
      res.status(400).send({ error: 'booking is no longer available' });
    }

    // Check if the client is making the booking not the doctor
    if (req.user.isDoctor) {
      res.status(400).send({ error: 'invalid action' });
    }

    session.client = req.user._id;
    session.startTime = req.body.startTime;
    session.endTime = req.body.endTime;
    session.save();

    res.send(session);
  } catch (e) {
    res.status(500).send();
  }
});

// Postpone a session (if less than 24hr from booking)
router.patch('/update/:id', verifyToken, async (req, res) => {
  try {
    // Find session
    const session = await Session.findById(req.params._id);

    if (!session) {
      res.status(404).send();
    }

    // Check if the client is making the booking not the doctor
    if (req.user.isDoctor) {
      res.status(400).send({ error: 'invalid action' });
    }

    // Check if session has no booking
    if (session.client !== req.user) {
      res.status(400).send({ error: 'invalid action' });
    }

    // Check if current time is before 24 hours
    const minTime = 60 * 60 * 24 * 1000; // one day
    if (!(Date.now() - session.startTime > minTime)) {
      res
        .status(404)
        .send({ error: 'cannot change schedule if booking is within 24 hrs ' });
    }

    session.startTime = req.body.startTime;
    session.endTime = req.body.endTime;
    session.save();

    res.send(session);
  } catch (e) {
    res.status(500).send();
  }
});

// Cancel a session (if less than 24hr from booking)
router.patch('/cancel/:id', verifyToken, async (req, res) => {
  try {
    // Find session
    const session = await Session.findById(req.params._id);

    if (!session) {
      res.status(404).send();
    }

    // Check if the client is making the booking not the doctor
    if (req.user.isDoctor) {
      res.status(400).send({ error: 'invalid action' });
    }

    // Check if session has no booking
    if (session.client !== req.user) {
      res.status(400).send({ error: 'invalid action' });
    }

    // Check if current time is before 24 hours
    const minTime = 60 * 60 * 24 * 1000; // one day
    if (!(Date.now() - session.startTime > minTime)) {
      res
        .status(404)
        .send({ error: 'cannot change schedule if booking is within 24 hrs ' });
    }

    session.client = null;
    session.save();

    res.send(session);
  } catch (e) {
    res.status(500).send();
  }
});
