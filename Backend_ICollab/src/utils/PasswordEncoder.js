const bcrypt = require('bcryptjs');
const ApiError = require('./ApiError');

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new ApiError(500, 'Error hashing password');
  }
};

const comparePassword = async (password, hashedPassword) => {
  try {
    const match = await bcrypt.compare(password, hashedPassword);
    return match;
  } catch (error) {
    throw new ApiError(500, 'Error comparing passwords');
  }
};

module.exports = { hashPassword, comparePassword };
