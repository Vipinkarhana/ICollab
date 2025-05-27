const express = require('express');
const router = express.Router();
const {
  sendRequest,
  acceptRequest,
  rejectRequest,
  suggestedNetwork,
  userNetwork,
  collabRequest,
  myCollabRequest,
} = require('../controllers/networkController');
const { validatePost } = require('../middlewares/validation');
const { isloggedin } = require('../middlewares/auth');

router.get('/collabrequest', isloggedin, collabRequest);
router.get('/mycollabrequest', isloggedin, myCollabRequest);
router.post('/sendrequest', isloggedin, sendRequest);
router.post('/acceptrequest', isloggedin, acceptRequest);
router.post('/rejectrequest', isloggedin, rejectRequest);
router.get('/suggestednetwork', isloggedin, suggestedNetwork);
router.get('/usernetwork', isloggedin, userNetwork);

module.exports = router;
