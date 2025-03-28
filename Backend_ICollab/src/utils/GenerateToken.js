const jwt = require('jsonwebtoken');
const config = require('../../config/config');

const generateAccessToken = (user) => {
  const data = user.toObject();
  const payload = { id: data._id, username: data.username, role: data.role };
  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: config.JWT_EXPIRE,
  });
};

const generateRefreshToken = (user) => {
  const data = user.toObject();
  const payload = { id: data._id, username: data.username, role: user.role };
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH_EXPIRE,
  });
};

module.exports = { generateAccessToken, generateRefreshToken };
