const router = require('express').Router();

const verifyToken = require('./verifyToken');
const {
  signUp,
  signIn,
  signOut,
  signOutAll,
  viewProfile,
  updateProfile,
  deleteProfile,
  viewClients,
  viewClient,
  viewDoctors,
  viewDoctor,
  // createUpload,
} = require('../controllers/usersController');

const { createBooking } = require('../controllers/sessionsController');

// // Authentication routes
// Sign up
router.post('/signup', signUp);

// Sign in (Should be PATCH)
router.post('/signin', signIn);

// Sign out of current session (Should be DELETE)
router.patch('/signout', verifyToken, signOut);

// Sign out of all sessions (Should be DELETE)
router.patch('/signoutall', verifyToken, signOutAll);

// // Profile Routes
// Get own user's profile
router.get('/profile', verifyToken, viewProfile);

// Update profile
router.patch('/profile', verifyToken, updateProfile);

// Delete user's profile
router.delete('/profile', verifyToken, deleteProfile);

// // Client Routes (GET)
// All Clients
router.get('/clients', verifyToken, viewClients);

// One Client
router.get('/clients/:id', verifyToken, viewClient);

// // Doctor Routes (GET) // More validation required (Should be /doctors)
// All Doctors
router.get('/', viewDoctors);

// One Doctor
router.get('/:id', viewDoctor);

// Book a session (NEW Route)
router.post('/:id/book', verifyToken, createBooking);

// Upload an image to S3
// router.post('/upload', verifyToken, createUpload);

module.exports = router;
