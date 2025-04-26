const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  addProject,
  technologySuggestions,
  categorySuggestions,
  collaboratorSuggestions,
  project,
  projectFeed,
  ongoingFeed,
  finishedFeed,
} = require('../controllers/projectController');
const { isloggedin } = require('../middlewares/auth');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post('/addproject', isloggedin, upload.fields([{name: 'logo', maxCount: 1}, {name: 'media', maxCount: 5}]) ,addProject);
router.get('/technologysuggestions', isloggedin, technologySuggestions);
router.get('/categorysuggestions', isloggedin, categorySuggestions);
router.get('/collaboratorsuggestions', isloggedin, collaboratorSuggestions);
router.get('/project', isloggedin, project);
router.get('/projectfeed', isloggedin, projectFeed);
router.get('/ongoingfeed', isloggedin, ongoingFeed);
router.get('/finishedfeed', isloggedin, finishedFeed);

module.exports = router;
