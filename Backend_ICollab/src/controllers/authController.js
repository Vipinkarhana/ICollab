const userModel = require('../models/user');
const postModel = require('../models/post');
const commentModel = require('../models/comment');
const profileModel = require('../models/profile');
const ApiError = require('../utils/ApiError');
const config = require('../../config/config');
const axios = require('axios');
const qs = require('qs');
const generateUsername = require('../utils/usernamegenerate');

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
    const username = await generateUsername(email);
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      emailToken: jwt.sign({ email }, config.SECRET_KEY, { expiresIn: '1h' }),
      username: username,
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

/*const updateprofile = async (req, res, next) => {
    const email = 'ayushobadola@gmail.com';
    const user = userModel.findOne({'email':email});
    user.role = req.body;
    user.social = req.body;
};*/

const login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log('Login:', email, password);

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new ApiError(401, 'User Does Not Exist'));
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return next(new ApiError(401, 'Please check your password'));
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, config.CookieOptions);

    res.status(200).json({
      message: 'Login successful',
      status: 'success',
      accessToken,
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
    const { sub, email, name, picture } = response.data; // `sub` is the unique user ID

    let user = await userModel.findOne({ email });
    const username = await generateUsername(email);
    const pass = Math.random().toString(36).slice(-8);
    const hashpass = await hashPassword(pass);
    if (!user) {
      user = new userModel({
        name,
        email,
        profile_pic: picture,
        isVerified: true,
        username: username,
        password: hashpass,
      });
      await user.save();
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

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

const linkedin = async (req, res, next) => {
  try {
    console.log('1');
    const authURL =
      `https://www.linkedin.com/oauth/v2/authorization?` +
      `response_type=code&` +
      `client_id=${config.LINKEDIN_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(`${config.PUBLIC_URL}/api/auth/linkedincallback`)}&` +
      `state=foobar&` +
      `scope=openid%20profile%20email`;
    res.redirect(authURL);
    console.log('2');
  } catch (err) {
    next(err);
  }
};

const linkedinauth = async (req, res, next) => {
  console.log('Entered Linkedin Auth');
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Invalid authorization code');
  }

  let profileres;
  try {
    console.log('1');
    const token = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      qs.stringify({
        grant_type: 'authorization_code',
        code: code,
        client_id: config.LINKEDIN_CLIENT_ID,
        client_secret: config.LINKEDIN_CLIENT_SECRET,
        redirect_uri: `${config.PUBLIC_URL}/api/auth/linkedincallback`,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    console.log('2');
    console.log('Topken.data: ', token.data);
    const { access_token: accessToken, expires_in: expiresIn } = token.data;
    console.log('accessToken: ', accessToken);
    profileres = await axios.get('https://api.linkedin.com/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('profileres: ', profileres.data);
  } catch (err) {
    console.error(
      'Error during LinkedIn Auth:',
      err.response?.data || err.message || err
    );
    next(err);
  }

  try {
    let user = await userModel.findOne({ email: profileres.data.email });
    const pass = Math.random().toString(36).slice(-8);
    const hashpass = await hashPassword(pass);
    const username = await generateUsername(profileres.data.email);
    if (!user) {
      user = new userModel({
        name: profileres.data.name,
        email: profileres.data.email,
        isVerified: true,
        password: hashpass,
        username: username,
      });
      await user.save();
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', refreshToken, config.CookieOptions);

    res.redirect(config.FRONTEND_URL);
  } catch (err) {
    console.error(
      'Error during storing data values in database via linkedin',
      err
    );
    next(err);
  }
};

const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.signedCookies;

  if (!refreshToken) {
    return next(new ApiError(401, 'Refresh token missing'));
  }

  try {
    const decoded = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return next(new ApiError(401, 'User not found'));
    }

    const accessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    res.cookie('refreshToken', newRefreshToken, config.CookieOptions);

    res.status(200).json({
      message: 'Token refreshed',
      status: 'success',
      accessToken,
    });
  } catch (error) {
    next(new ApiError(403, 'Invalid or expired token'));
  }
};

const logout = async (req, res, next) => {
  res.clearCookie('refreshToken', config.CookieOptions);
  res.status(200).json({
    message: 'Logout successful',
    status: 'success',
  });
};


const addpost = async (req, res, next) => {
  try{
    const username = ayushbadola;
    user = userModel.findOne({'username': username});
    const {content, media, tag} = req.body;
    if(!content) res.status(400).json({error: "Content is required."});
    const newPost = new postModel({
      user, content, media, tag,
    });
    await newPost.save();
    res.status(201).json({message: "Post created successfully", post: newPost});
  }
  catch(err){
    res.status(500).json({ error: "Server error" });
  }
};

const likepost = async (req, res, next) => {
  try{
    const postid = 1234567890; //dummy post id
    //post = await postModel.findOne({'_id':postid});
    const newPost = await postModel.updateOne(
      {_id : postid},
      { $inc: { likes: 1 } },
    );
  }
  catch(err){
    res.status(500).json({error: "Server Error"});
  }
};


module.exports = {
  register,
  login,
  verifyemail,
  googleAuth,
  linkedin,
  linkedinauth,
  refreshToken,
  logout,
  addpost,
  likepost,
  // updateprofile,
};
