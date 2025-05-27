const express = require('express');
const {
  sendNotification,
  getLatestNotifications,
  getUserNotifications,
  deleteNotification,
  markAsRead,
} = require('../controllers/notificationController.js');

const router = express.Router();

router.post('/send', sendNotification);
router.get('/latest', getLatestNotifications);
router.get('/user/:username', getUserNotifications);
router.post('/mark-read', markAsRead);
router.post('/delete', deleteNotification);

module.exports = router;
