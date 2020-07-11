// Instruction: https://www.youtube.com/watch?v=2jqok-WgelI
// Hapi update: https://github.com/hapijs/joi/issues/2145

const router = require('express').Router();
const Joi = require('@hapi/joi'); // Validation
const User = require('../models/User');

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

// Sign up
router.post('/signup', async (req, res) => {
  // Validation before creation
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

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
