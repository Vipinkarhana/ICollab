var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var helmet = require('helmet');
const config = require('./config/config');
const sanitizeInput = require('./src/middlewares/sanitize');

var ApiError = require('./src/utils/ApiError');
const connectDB = require('./config/DB');
var indexRouter = require('./src/routes/index');
var authRouter = require('./src/routes/authRoute');
var postRouter = require('./src/routes/postRoute');
var profileRouter = require('./src/routes/profileRoute');
var surveyRouter = require('./src/routes/surveyRoute');
var userRouter = require('./src/Admin/routes/userRoute');
var postRouter = require('./src/Admin/routes/postRoute');

var app = express();

connectDB();
app.use(cors({ origin: config.FRONTEND_URL, credentials: true }));
app.use(sanitizeInput);
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/admin/user', userRouter);
app.use('/admin/posts', postRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/profile', profileRouter);
app.use('/api/announcement', surveyRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new ApiError(404, "The requested resource couldn't be found"));
});

// Global Error-Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.statusCode || 500).json({
    error: {
      stack: config.NODE_ENV === 'production' ? ' ' : err.stack,
    },
    message: err.message || 'Internal Server Error',
    status: 'failed',
  });
};

// Use the error-handling middleware
app.use(errorHandler);

module.exports = app;
