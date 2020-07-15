// Instruction: https://www.youtube.com/watch?v=2jqok-WgelI

const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

  // Password hashing
  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user from request body
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  // Try to save otherwise send error
  try {
    await user.save();
    res.send({ user: user._id, email: user.email });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Sign in
router.post('/signin', async (req, res) => {
  // Validation before creation
  const { error } = signInValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // // Obscure 400 incorrect email or password messages to prevent hacking
  // Check if email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send('email or password is incorrect');
  }

  // Check if password is correct
  const isMatchedPass = await bcrypt.compare(req.body.password, user.password);
  if (!isMatchedPass)
    return res.status(400).send('email or password is incorrect');

  // Create and assign a token
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);
  res.header('auth-token', token).send(token);
});

// Sign out

// Users (All)
router.get('/', (req, res) => {
  User.find({}, (err, users) => {
    const userMap = {};

    users.forEach(function (user) {
      userMap[user._id] = user;
    });

    res.send(userMap);
  });
});

// User (One)
router.get('/:id', async (req, res => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id)

    if (!user){
      return res.status(404).send()
    }

    res.send(user)
  }catch (err) {
    res.status(500).send
  }
  
}))

module.exports = router;
