const express = require("express");
const router = express.Router();
const { generateToken } = require("../controllers/ablyController");
const { isloggedin } = require("../middlewares/auth");

router.get("/token", isloggedin, generateToken);

module.exports = router;
