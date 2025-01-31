const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verifyemail,
  googleAuth,
  linkedin,
  linkedinauth,
  updateprofile,
  //   logout,
  //   refreshToken,
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/verifyemail', verifyemail);
router.post('/google', googleAuth);
router.get('/linkedin', linkedin);
router.get('/linkedincallback', linkedinauth);
//router.post('/updateprofile', updateprofile);
// router.post('/logout', logout);
// router.post('/refresh', refreshToken);

module.exports = router;
