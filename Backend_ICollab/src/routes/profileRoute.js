const express = require('express');
const router = express.Router();
const {
  profile,
  changeUserInfo,
  changeAbout,
  changeExperience,
  userprofile,
} = require('../controllers/profileController');
const { isloggedin } = require('../middlewares/auth');

router.get('/view', isloggedin, profile);
router.post('/changeuserinfo', isloggedin, changeUserInfo);
router.post('/changeabout', isloggedin, changeAbout);
router.post('/changeexperience', isloggedin, changeExperience);
router.get('/:username', isloggedin, userprofile);

module.exports = router;
