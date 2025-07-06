const express = require("express");
const router = express.Router();
const { getMessagesByGroup } = require("../controllers/messageController");
const { isloggedin } = require('../middlewares/auth');

router.get("/group/:groupId", isloggedin, getMessagesByGroup);

module.exports = router;
