const express = require('express');
const router = express.Router();

const {
    saveItem,
    unsaveItem,
    getAllSavedItems,
} = require("../controllers/saveItemController");

const { isloggedin } = require("../middlewares/auth");

router.post('/saveitem', isloggedin ,saveItem );
router.post('/unsaveitem', isloggedin, unsaveItem);
router.get('/saveditems', isloggedin, getAllSavedItems);

module.exports = router;

