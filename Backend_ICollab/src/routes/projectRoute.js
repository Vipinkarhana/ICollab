const express = require('express');
const router = express.Router();
const {
  addProject,
  categorySuggestions
} = require('../controllers/projectController');
const { isloggedin } = require('../middlewares/auth');

router.post('/addproject', isloggedin, addProject);
router.get('/categorysuggestions', isloggedin, categorySuggestions);

module.exports = router;
