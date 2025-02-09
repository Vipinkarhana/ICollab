const express = require('express');
const router = express.Router();
const {
  profile,
  changeAbout,
  changeExperience,
} = require('../controllers/profileController');
const { isloggedin } = require('../middlewares/auth');

router.get('/view', isloggedin, profile);
router.post('/changeabout', isloggedin, changeAbout);
router.post('/changeexperience', isloggedin, changeExperience);

module.exports = router;