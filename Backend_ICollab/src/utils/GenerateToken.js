const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const generateAccessToken = (user) => {
  return jwt.sign(user, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRE });
};

const generateRefreshToken = (user) => {
  return jwt.sign(user, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRE,
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
