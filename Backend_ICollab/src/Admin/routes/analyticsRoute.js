const express = require('express');
const {
  getAnalytics,
  trackPageView,
} = require('../controllers/analyticsController');
const router = express.Router();

router.get('/', getAnalytics);
router.post('/track-page-view', trackPageView);

module.exports = router;
