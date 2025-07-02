const express = require("express");
const router = express.Router();
const {createGroup} = require("../controllers/groupController");
const {isloggedin} = require("../middlewares/auth");

router.post("/create", isloggedin, createGroup);

module.exports = router;
