const express = require('express');
const router = express.Router();
const {
  sendRequest,
  acceptRequest,
  rejectRequest,
  suggestedNetwork,
  userNetwork,
  getRequest,
} = require('../controllers/networkController');
const { validatePost } = require('../middlewares/validation');
const { isloggedin } = require('../middlewares/auth');

router.get('/getrequest', isloggedin, getRequest);
router.post('/sendrequest', isloggedin, sendRequest);
router.post('/acceptrequest', isloggedin, acceptRequest);
router.post('/rejectrequest', isloggedin, rejectRequest);
router.get('/suggestednetwork', isloggedin, suggestedNetwork);
router.get('/usernetwork', isloggedin, userNetwork);

module.exports = router;
