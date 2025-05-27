const express = require('express');
const router = express.Router();
const {
  addpost,
  getMyPost,
  addPostMedia,
  likeAndUnlikepost,
  feed,
  editPost,
  deletePost,
  toggleSavePost,
  getSavedPosts,
} = require('../controllers/postController');
const { validatePost } = require('../middlewares/validation');
const { isloggedin } = require('../middlewares/auth');

router.post('/', isloggedin, addpost);
router.get('/mypost/:username', getMyPost);
router.post('/addmedia', isloggedin, addPostMedia);
router.post('/likeandunlikepost', isloggedin, likeAndUnlikepost);
router.get('/feed', isloggedin, feed);
router.post('/editpost', isloggedin, editPost);
router.post('/deletepost', isloggedin, deletePost);
router.post('/savepost', isloggedin, toggleSavePost);
router.get('/savedposts', isloggedin, getSavedPosts);

module.exports = router;
