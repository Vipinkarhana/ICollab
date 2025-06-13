const express = require('express');
const router = express.Router();
const { fileUpload, resumeUpload } = require('../utils/multer');
const {
  profile,
  userProfile,
  updateProfile,
  updateProfilePicture,
  updateResume
} = require('../controllers/profileController');
const { isloggedin } = require('../middlewares/auth');

router.post('/updateprofile', isloggedin, updateProfile);
router.post('/picture', isloggedin, fileUpload.single('profilePicture'), updateProfilePicture);
router.post('/resume', isloggedin, resumeUpload.single('resume'), updateResume);
router.get('/view', isloggedin, profile);
router.get('/:username', isloggedin, userProfile);
module.exports = router;