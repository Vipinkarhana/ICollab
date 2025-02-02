const express = require('express');
const router = express.Router();
const { isloggedin } = require('../middlewares/auth');

router.get('/', function (req, res, next) {
  res.json({
    message: 'Welcome to the ICollab API',
  });
});

router.get('/test', isloggedin, function (req, res, next) {
  res.json({
    data: req.user,
    message: 'Test route',
  });
});

module.exports = router;
