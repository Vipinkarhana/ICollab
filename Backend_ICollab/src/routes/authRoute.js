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

const { validateRegister, validateLogin, validatePost } = require('../middlewares/validation');

router.post('/register', validateRegister ,register);
router.post('/login', validateLogin ,login);
router.get('/verifyemail', verifyemail);
router.post('/google', googleAuth);
router.get('/linkedin', linkedin);
router.get('/linkedincallback', linkedinauth);
router.post('/logout', logout);
router.post('/refresh', refreshToken);
router.post('/addpost', validatePost ,addpost);
router.post('/likepost', likepost);

module.exports = router;