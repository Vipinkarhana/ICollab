const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const isloggedin = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, config.JWT_SECRET, (err, user) => {
    if (err) {
      console.error(err);
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

module.exports = { isloggedin };
