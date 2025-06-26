const express = require("express");
const router = express.Router();
const {getMyRooms} = require("../controllers/roomController");
const {isloggedin} = require("../middlewares/auth");

router.get("/myrooms", isloggedin, getMyRooms);

module.exports = router;
