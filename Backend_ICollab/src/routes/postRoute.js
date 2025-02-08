const express = require('express');
const router = express.Router();
const {
  addpost,
  addPostMedia,
  likepost,
  feed,
} = require('../controllers/postController');
const { validatePost } = require('../middlewares/validation');
const {isloggedin} = require('../middlewares/auth');

router.post('/', isloggedin  ,addpost);
router.post('/addmedia', isloggedin, addPostMedia);
router.post('/likepost', likepost);
router.get('/feed', feed);

module.exports = router;