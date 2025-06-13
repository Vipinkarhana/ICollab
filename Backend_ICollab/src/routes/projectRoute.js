const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  addProject,
  technologySuggestions,
  categorySuggestions,
  collaboratorSuggestions,
  project,
  ongoingFeed,
  fetchUserProjects,
  finishedFeed,
  updateTopProjects,
  sendCollabRequest,
  acceptCollabRequest,
  rejectCollabRequest,
  getCollabRequest,
  deleteProject,
  editProject,
  createComment,
  getProjectComments,
} = require('../controllers/projectController');
const { isloggedin } = require('../middlewares/auth');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post(
  '/addproject',
  isloggedin,
  upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'media', maxCount: 5 },
  ]),
  addProject
);
router.get('/technologysuggestions', isloggedin, technologySuggestions);
router.get('/categorysuggestions', isloggedin, categorySuggestions);
router.get('/collaboratorsuggestions', isloggedin, collaboratorSuggestions);
router.get('/ongoingfeed', isloggedin, ongoingFeed);
router.get('/finishedfeed', isloggedin, finishedFeed);
router.get('/userprojects/:username', fetchUserProjects);
router.post('/sendcollabreq', isloggedin, sendCollabRequest);
router.post('/acceptcollabreq', isloggedin, acceptCollabRequest);
router.post('/rejectcollabreq', isloggedin, rejectCollabRequest);
router.get('/getcollabreq', isloggedin, getCollabRequest);
router.post('/deleteproject', isloggedin, deleteProject);
router.put('/topprojects', isloggedin, updateTopProjects);
router.put('/editproject', isloggedin, upload.fields([{name: 'logo', maxcount: 1}, {name: 'media', maxcount: 5}]), editProject);
router.post('/createcomment', isloggedin, createComment);
router.get('/getprojectcomments', isloggedin, getProjectComments);
router.get('/:projectId', isloggedin, project);

module.exports = router;