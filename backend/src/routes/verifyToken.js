const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('access denied');
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findOne({
      _id: verified._id,
      'tokens.token': token,
    });

    if (!user) throw new Error();

    req.user = user;
    next();
  } catch (err) {
    res.status(400).send('invalid token');
  }
};
