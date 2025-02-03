const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verifyemail,
  googleAuth,
  linkedin,
  linkedinauth,
  logout,
  refreshToken,
  addpost,
  likepost,
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/verifyemail', verifyemail);
router.post('/google', googleAuth);
router.get('/linkedin', linkedin);
router.get('/linkedincallback', linkedinauth);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.post('/addpost', addpost);
router.post('/likepost', likepost);

module.exports = router;