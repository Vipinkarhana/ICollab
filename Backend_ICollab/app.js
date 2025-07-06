require('dotenv').config(); // Load env first
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/config');
const sanitizeInput = require('./src/middlewares/sanitize');
const connectDB = require('./config/DB');

const ApiError = require('./src/utils/ApiError');

// Routers
const indexRouter = require('./src/routes/index');
const authRouter = require('./src/routes/authRoute');
const postRouter = require('./src/routes/postRoute');
const profileRouter = require('./src/routes/profileRoute');
const surveyRouter = require('./src/routes/surveyRoute');
const projectRouter = require('./src/routes/projectRoute');
const adminUserRouter = require('./src/Admin/routes/userRoute');
const networkRouter = require('./src/routes/network');
const adminPostRouter = require('./src/Admin/routes/postRoute');
const adminAnalyticsRouter = require('./src/Admin/routes/analyticsRoute');
const adminNotificationRouter = require('./src/Admin/routes/notificationRoute');
const savedItemRouter = require('./src/routes/savedItemRoute');
const roomRouter = require('./src/routes/roomRoute');
const ablyRouter = require('./src/routes/ablyRoute');
const groupRouter = require('./src/routes/groupRoute')
const messageRouter = require('./src/routes/messageRoute');
const { router: sseRouter } = require('./src/Admin/routes/sseRoute');

// Create app instance
const app = express();

// Connect to MongoDB
connectDB();

// Setup CORS with allowed frontend URLs
const allowedOrigins = config.FRONTEND_URL.split(',');
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

// Security + Body Parsers
app.use(sanitizeInput);
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(config.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRouter);
app.use('/admin/user', adminUserRouter);
app.use('/admin/posts', adminPostRouter);
app.use('/admin/analytics', adminAnalyticsRouter);
app.use('/admin/notifications', adminNotificationRouter);
app.use('/sse', sseRouter);

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);
app.use('/api/profile', profileRouter);
app.use('/api/announcement', surveyRouter);
app.use('/api/network', networkRouter);
app.use('/api/project', projectRouter);
app.use('/api/saveitems', savedItemRouter);
app.use('/api/room', roomRouter);
app.use('/api/ably', ablyRouter);
app.use('/api/groups', groupRouter);
app.use('/api/messages', messageRouter);

// 404 Handler
app.use((req, res, next) => {
  next(new ApiError(404, "The requested resource couldn't be found"));
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.statusCode || 500).json({
    error: {
      stack: config.NODE_ENV === 'production' ? undefined : err.stack,
    },
    message: err.message || 'Internal Server Error',
    status: 'failed',
  });
});

module.exports = app;
