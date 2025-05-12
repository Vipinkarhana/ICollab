const express = require('express');
const router = express.Router();

const {
    saveItem,
    unsaveItem,
    getAllSavedItems,
} = require("../controllers/saveItemController");

const { isLoggedin } = require("../middlewares/auth");

router.post('/saveitem', isLoggedin ,saveItem );
router.post('/unsaveitem', isLoggedin, unsaveItem);
router.get('/saveditems', isLoggedin, getAllSavedItems);

module.exports = router;

