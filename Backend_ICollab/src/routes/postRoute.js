const express = require('express');
const router = express.Router();
const {
  addpost,
  getMyPost,
  addPostMedia,
  likepost,
  feed,
} = require('../controllers/postController');
const { validatePost } = require('../middlewares/validation');
const { isloggedin } = require('../middlewares/auth');

router.post('/', isloggedin, addpost);
router.get('/mypost', isloggedin, getMyPost);
router.post('/addmedia', isloggedin, addPostMedia);
router.post('/likepost', isloggedin, likepost);
router.get('/feed', isloggedin, feed);

module.exports = router;
