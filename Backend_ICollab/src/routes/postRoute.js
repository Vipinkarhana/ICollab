const express = require('express');
const router = express.Router();
const {
  addpost,
  likepost,
  feed,
} = require('../controllers/postController');
const { validatePost } = require('../middlewares/validation');
const {isloggedin} = require('../middlewares/auth');

router.post('/addpost', isloggedin ,validatePost ,addpost);
router.post('/likepost', likepost);
router.get('/feed', feed);

module.exports = router;