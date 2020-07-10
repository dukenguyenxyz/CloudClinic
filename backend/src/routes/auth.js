const router = require('express').Router();

router.post('/signup', (req, res) => {
  res.send('Sign up');
});

router.post('/signin', (req, res) => {
  res.send('Sign in');
});

module.exports = router;
