const userModel = require('../models/user');
const ApiError = require('../utils/ApiError');
const config = require('../../config/config');

const {
  generateAccessToken,
  generateRefreshToken,
} = require('../utils/GenerateToken');
const { hashPassword, comparePassword } = require('../utils/PasswordEncoder');
const {sendVerificationEmail} = require('../utils/VerifyMails');
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
      emailToken: jwt.sign({ email }, 'config.SECRET_KEY', { expiresIn: '1h' }),
    });

    await newUser.save().then(async function () {
      await sendVerificationEmail(newUser, newUser.emailToken);
      res.status(200).send("Verification Mail sent");
    });

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

const verifyemail = async(req, res, next) => {
  const { token } = req.query;
  
    try {
      const decoded = jwt.verify(token, 'config.SECRET_KEY'); // Verify token
      const user = await userModel.findOne({ email: decoded.email });
  
      if (user && !user.isVerified) {
        user.isVerified = true;
        user.emailToken = null; // Clear the token after verification
        await user.save();
        res.status(200).send("Successfully Verified");
      } else {
        res.status(500).send("Internal Server Error");
      }
    } catch (err) {
      console.error('Error during email verification:', err);
    }
};

module.exports = { register, login, verifyemail };