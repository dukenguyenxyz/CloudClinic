const router = require('express').Router();

const verifyToken = require('./verifyToken');
const {
  viewSessions,
  createSession,
  deleteSession,
  bookSession,
  updateSession,
  cancelSession,
} = require('../controllers/sessionsController');

// // Doctor Routes
// Get all sessions
router.get('/', verifyToken, viewSessions);

// Create available session
router.post('/', verifyToken, createSession);

// Delete session
router.delete('/:id', verifyToken, deleteSession);

// // Client Routes
// Book a session (Maybe PUT or POST request?)
router.patch('/:id/book', verifyToken, bookSession);

// Update a session (if less than 24hr from booking)
router.patch('/:id/update', verifyToken, updateSession);

// Cancel a session (if less than 24hr from booking) (DELETE request)
router.patch('/:id/cancel', verifyToken, cancelSession);

module.exports = router;
