const express = require('express');
const router = express.Router();

const {
  toggleSavedItem,
  getSavedPosts,
  getSavedProjects,
} = require("../controllers/saveItemController");

const { isloggedin } = require("../middlewares/auth");

// Save and unsave items
router.post('/toggle', isloggedin, toggleSavedItem);
// Separate endpoints
router.get('/posts', isloggedin, getSavedPosts);
router.get('/projects', isloggedin, getSavedProjects);

module.exports = router;
