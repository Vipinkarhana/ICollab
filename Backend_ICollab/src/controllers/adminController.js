const userModel = require('../models/user');
const ApiError = require('../utils/ApiError');

const isAdmin = async (req, res, next) => {
  try {
    const { username } = req.user;
    console.log("Username from token:", username);

    if (!username) {
      return next(new ApiError(401, 'Invalid token: Username missing'));
    }

    const user = await userModel.findOne({ username });
    console.log("User from DB:", user);

    if (!user) {
      return next(new ApiError(401, 'User not found'));
    }

    if (user.role === "admin") {
      return res.status(200).json({ message: "Admin access granted" });
    } else {
      return next(new ApiError(403, 'You are not an admin'));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { isAdmin };
