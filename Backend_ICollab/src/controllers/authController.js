const userModel = require('../models/user');
const ApiError = require('../utils/ApiError');
const config = require('../../config/config');

const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/GenerateToken');
const { hashPassword, comparePassword } = require('../utils/PasswordEncoder');

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(new ApiError(400, 'User already exists'));
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const accessToken = generateAccessToken({
      id: newUser._id,
      role: newUser.role,
    });
    const refreshToken = generateRefreshToken({
      id: newUser._id,
      role: newUser.role,
    });

    res.cookie('refreshToken', refreshToken, config.CookieOptions);

    res.status(201).json({
      message: 'User registered successfully',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return next(new ApiError(401, 'Invalid email'));
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return next(new ApiError(401, 'password'));
        }

        const accessToken = generateAccessToken({
            id: user._id,
            role: user.role,
        });
        const refreshToken = generateRefreshToken({
            id: user._id,
            role: user.role,
        });

        res.cookie('refreshToken', refreshToken, config.CookieOptions);

        res.status(200).json({
            message: 'Login successful',
            accessToken,
            refreshToken,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };
