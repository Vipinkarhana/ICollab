const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  addProject,
  technologySuggestions
} = require('../controllers/projectController');
const { isloggedin } = require('../middlewares/auth');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/addproject', isloggedin, upload.fields([{name: 'logo', maxCount: 1}, {name: 'media', maxCount: 5}]) ,addProject);
router.get('/technologysuggestions', isloggedin, technologySuggestions);

module.exports = router;
