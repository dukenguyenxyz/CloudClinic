// Instruction: https://www.youtube.com/watch?v=2jqok-WgelI

const router = require('express').Router();
const User = require('../models/User');
const { signUpValidation, signInValidation } = require('./validation');

// Sign up
router.post('/signup', async (req, res) => {
  // Validation before creation
  const { error } = signUpValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check for unique email
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('email already exists');

  // Create new user from request body
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  // Try to save otherwise send error
  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Sign in
router.post('/signin', (req, res) => {
  res.send('Sign in');
});

// Sign out

// Users listing
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    const userMap = {};

    users.forEach(function (user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });
});

module.exports = router;
