const express = require('express');
const router = express.Router();
const {
  sendRequest,
  acceptRequest,
  rejectRequest,
  suggestedNetwork,
  userNetwork,
} = require('../controllers/networkController');
const { validatePost } = require('../middlewares/validation');
const { isloggedin } = require('../middlewares/auth');

router.post('/sendrequest', isloggedin, sendRequest);
router.post('/acceptrequest', isloggedin, acceptRequest);
router.post('/rejectrequest', isloggedin, rejectRequest);
router.post('/suggestednetwork', isloggedin, suggestedNetwork);
router.post('/usernetwork', isloggedin, userNetwork);

module.exports = router;