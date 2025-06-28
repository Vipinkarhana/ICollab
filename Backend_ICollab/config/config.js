const { S3 } = require('@aws-sdk/client-s3');
const { sign } = require('jsonwebtoken');

require('dotenv').config();

const config = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  FRONTEND_URL: process.env.FRONTEND_URL,
  PUBLIC_URL: process.env.PUBLIC_URL, //Public URL for the backend
  //Secrets
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRE: process.env.JWT_EXPIRE,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE,
  SECRET_KEY: process.env.SECRET_KEY, //For email verification Token Secret Key
  COOKIE_SECRET: process.env.COOKIE_SECRET, //For cookie encryption
  // 3rd Party API Keys
  EMAIL_ID: process.env.EMAIL_ID,
  EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
  LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
  LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
  S3_API_ENDPOINT: process.env.S3_API_ENDPOINT,
  S3_BUCKET_NAME: process.env.S3_BUCKET_NAME,
  S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
  S3_SECRET_ACCESS_KEY: process.env.S3_SECRET_ACCESS_KEY,
  S3_REGION: process.env.S3_REGION,
  S3_PUBLIC_URL: process.env.S3_PUBLIC_URL,
  ABLY_API_KEY: process.env.ABLY_API_KEY,
  CookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    maxAge: 30 * 24 * 60 * 60 * 1000,
    //domain: process.env.NODE_ENV === 'production' ? process.env.COOKIE_DOMAIN : undefined,
  },
};

module.exports = config;
