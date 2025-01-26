require('dotenv').config();

const config = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI,
  FRONTEND_URL: process.env.FRONTEND_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE,
  NODE_ENV: process.env.NODE_ENV,
  EMAIL_ID: process.env.EMAIL_ID,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  SECRET_KEY: process.env.SECRET_KEY, //For email verification Token Secret Key

  CookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    domain: process.env.COOKIE_DOMAIN || 'example.com',
    maxAge: process.env.JWT_REFRESH_EXPIRE,
  },
};

module.exports = config;
