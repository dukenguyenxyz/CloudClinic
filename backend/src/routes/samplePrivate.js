const router = require('express').Router();
const verifyToken = require('./verifyToken');
const User = require('../models/User');

// To make this route public, remove verifyToken from the params below

router.get('/', verifyToken, async (req, res) => {
  // If no need to access user_id remove async and await
  const currentUser = await User.findById(req.user);

  res.json({
    posts: {
      title: 'sample post',
      description: 'lorem ipsum',
      currentUser: currentUser.email,
    },
  });
});

module.exports = router;
