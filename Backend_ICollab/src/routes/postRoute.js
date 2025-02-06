const express = require('express');
const router = express.Router();
const {
  addpost,
  likepost,
  feed,
} = require('../controllers/postController');
const { validatePost } = require('../middlewares/validation');

router.post('/addpost', validatePost ,addpost);
router.post('/likepost', likepost);
router.get('/feed', feed);

module.exports = router;