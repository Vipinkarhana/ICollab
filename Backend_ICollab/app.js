var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config/config');

var ApiError = require('./src/utils/ApiError');
const connectDB = require('./config/DB');
var indexRouter = require('./src/routes/index');
var authRouter = require('./src/routes/authRoute');

var app = express();

connectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new ApiError(404, "The requested resource couldn't be found"));
});

// Global Error-Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.statusCode || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      stack: process.env.NODE_ENV === 'production' ? ' ' : err.stack,
    },
    status: 'failed',
  });
};

// Use the error-handling middleware
app.use(errorHandler);

module.exports = app;
