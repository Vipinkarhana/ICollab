const express = require('express');
const router = express.Router();
const {
  addProject
} = require('../controllers/projectController');
const { isloggedin } = require('../middlewares/auth');

router.post('/addproject', isloggedin, addProject);

module.exports = router;
