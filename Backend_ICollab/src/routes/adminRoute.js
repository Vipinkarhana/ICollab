const express = require('express');
const { isAdmin } = require('../controllers/adminController');
const { isloggedin } = require('../middlewares/auth');

const router = express.Router();

router.get('/', isloggedin, isAdmin);

module.exports = router;
