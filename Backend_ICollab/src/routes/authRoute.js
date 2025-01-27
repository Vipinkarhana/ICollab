const express = require('express');
const router = express.Router();
const {
  register,
  login,
  verifyemail,
  googleAuth,
  //   logout,
  //   refreshToken,
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/verifyemail', verifyemail);
router.post('/google', googleAuth);
// router.post('/logout', logout);
// router.post('/refresh', refreshToken);

module.exports = router;
