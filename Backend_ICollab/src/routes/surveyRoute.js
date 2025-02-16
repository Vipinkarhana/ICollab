const express = require('express');
const router = express.Router();
const {submitSurvey} = require('../controllers/surveyController');
const {isloggedin} = require("../middlewares/auth");

router.post('/survey', isloggedin, submitSurvey);

module.exports = router;
