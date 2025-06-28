const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const isloggedin = async (req, res, next) => {
  const authHeader = req.headers['authorization'];

  // Step 1: Check if Authorization header is present and well formed
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access token missing or malformed' });
  }

  // Step 2: Extract token
  const token = authHeader.split(' ')[1];
  console.log('Access token received:', token); // optional debug

  // Step 3: Verify token
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded; // attaches the user info to request
    next();
  } catch (err) {
    console.error('JWT verification failed:', err.message);
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = { isloggedin };
