const express = require('express');
const { getMyAllPost } = require('../../Admin/controllers/postController');
const router = express.Router();

router.get('/myallpost', getMyAllPost);

module.exports = router;
