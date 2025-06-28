const express = require("express");
const router = express.Router();
const {generateToken,getHistory} = require("../controllers/ablyController");
const { isloggedin } = require("../middlewares/auth");

router.get("/token", isloggedin, generateToken,()=>{
  console.log("hit");
  
});
router.get("/history", getHistory); // optional: protect if needed

module.exports = router;
