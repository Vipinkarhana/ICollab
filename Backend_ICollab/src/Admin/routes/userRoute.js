const express = require('express');
const { getAllUsers } = require('../../Admin/controllers/userController');
// const { isloggedin } = require('../middlewares/auth');
const router = express.Router();

router.get('/', getAllUsers);

module.exports = router;
