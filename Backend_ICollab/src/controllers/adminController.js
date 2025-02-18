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




const createAdmin = async (req, res, next) => {
  try {
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });

    const newAdmin = new adminModel({
      user: user._id,
    });

    await newAdmin.save();

    res.status(201).json({
      message: 'Admin created successfully',
      data: { adminid: newAdmin._id },
      status: 'success',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { createAdmin, isAdmin };
