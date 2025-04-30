const express = require('express');
const router = express.Router();
const {
  profile,
  userProfile,
  updateProfile
} = require('../controllers/profileController');
const { isloggedin } = require('../middlewares/auth');

router.post('/updateprofile' ,isloggedin, updateProfile);
router.get('/view', isloggedin, profile);
router.get('/:username', isloggedin, userProfile);
module.exports = router;
