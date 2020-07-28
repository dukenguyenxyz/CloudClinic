const router = require('express').Router();

const verifyToken = require('./verifyToken');
const {
  viewSessions,
  createSession,
  createSessions,
  acceptBooking,
  declineBooking,
  deleteSession,
  bookSession,
  createBooking,
  updateSession,
  cancelSession,
} = require('../controllers/sessionsController');

// Get all sessions
router.get('/', verifyToken, viewSessions);

// // Doctor Routes
// Create available session
// router.post('/new', verifyToken, createSession);

// Create available sessions
// router.post('/', verifyToken, createSessions);

// Accept a booking
router.patch('/:id/accept', verifyToken, acceptBooking);

// Decline a booking
router.patch('/:id/decline', verifyToken, declineBooking);

// Update session (will be blank otherwise)

// Delete session
// router.delete('/:id', verifyToken, deleteSession);

// // Client Routes
// Book a session (Maybe PUT or POST request?)
// router.patch('/:id/book', verifyToken, bookSession);

// Create a booking
router.post('/:id/book', verifyToken, createBooking);

// Need Double Checking

// Update a session (if less than 24hr from booking)
router.patch('/:id/update', verifyToken, updateSession);

// Cancel a session (if less than 24hr from booking) (DELETE request)
router.patch('/:id/cancel', verifyToken, cancelSession);

module.exports = router;
