const userModel = require('../models/user');
const ApiError = require('../utils/ApiError');
const config = require('../../config/config');
const axios = require('axios');

const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/GenerateToken');
const { hashPassword, comparePassword } = require('../utils/PasswordEncoder');
const { sendVerificationEmail } = require('../utils/VerifyMails');
const jwt = require('jsonwebtoken');

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
      emailToken: jwt.sign({ email }, config.SECRET_KEY, { expiresIn: '1h' }),
    });

    await newUser.save();
    await sendVerificationEmail(newUser, newUser.emailToken);
    res.status(200).json({
      message: 'Verification email sent',
      status: 'success',
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
      return next(new ApiError(401, 'User Does Not Exist'));
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return next(new ApiError(401, 'Please check your password'));
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
      status: 'success',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

const verifyemail = async (req, res, next) => {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, config.SECRET_KEY); // Verify token
    const user = await userModel.findOne({ email: decoded.email });

    if (user && !user.isVerified) {
      user.isVerified = true;
      user.emailToken = null; // Clear the token after verification
      await user.save();

      const refreshToken = generateRefreshToken({
        id: user._id,
        role: user.role,
      });

      res.cookie('refreshToken', refreshToken, config.CookieOptions);

      res.status(303).redirect(config.FRONTEND_URL);
    } else {
      return next(new ApiError(400, 'Invalid or expired token'));
    }
  } catch (err) {
    next(err);
  }
};

const googleAuth = async (req, res, next) => {
  const { credential } = req.body;
  try {
    const response = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    );
    const { sub, email, name } = response.data; // `sub` is the unique user ID

    let user = await userModel.findOne({ email });
    if (!user) {
      user = new userModel({
        name,
        email,
        isVerified: true,
      });
      await user.save();
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
      status: 'success',
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, verifyemail, googleAuth };
