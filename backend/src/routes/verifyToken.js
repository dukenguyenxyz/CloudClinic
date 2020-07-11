const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('access denied');
  try {
    const verified = jwt.verify(token, process.eventNames.TOKEN_SECRET);
    req.user = verified;
  } catch (err) {
    res.status(400).send('invalid token');
  }
};

module.exports.auth = auth;
