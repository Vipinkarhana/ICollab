const express = require('express');
const router = express.Router();
const { incubatorFileUpload } = require('../utils/multer');
const { isloggedin } = require('../middlewares/auth');
const { eventUpload } = require('../utils/multer');

const fileFields = [
  { name: 'startups_incubated', maxCount: 1 },
  { name: 'startups_graduated', maxCount: 1 },
  { name: 'startups_followon_investments', maxCount: 1 },
  { name: 'survival_rate', maxCount: 1 },
  { name: 'infra_support', maxCount: 1 },
  { name: 'govt_support', maxCount: 1 },
  { name: 'no_of_startups_invested', maxCount: 1 },
  { name: 'total_investment_raised', maxCount: 1 },
  { name: 'corpus_allocated', maxCount: 1 },
  { name: 'startups_above_2cr', maxCount: 1 },
  { name: 'IP_Registered', maxCount: 1 },
  { name: 'mentoring_hours', maxCount: 1 },
  { name: 'stakeholder_events', maxCount: 1 },
  { name: 'industry_corporate_connect', maxCount: 1 },
  { name: 'other_support', maxCount: 1 }
];

const {
  createIncubatorApplication,
  checkApplicationStatus,
  getCurrentIncubator,
  createProgram,
  getMyPrograms,
  updateProgram,
  deleteProgram,
  createEvent,
  getProgramsCount,
} = require('../controllers/incubatorController');


router.post('/', isloggedin, incubatorFileUpload.fields(fileFields), createIncubatorApplication);
router.get('/:id/status', isloggedin, checkApplicationStatus);
router.get('/myincubatordetails', isloggedin, getCurrentIncubator);
router.post('/createprogram', isloggedin, createProgram);
router.put('/updateprogram/:id', isloggedin, updateProgram);
router.put('/deleteprogram', isloggedin, deleteProgram);
router.get('/myprograms', isloggedin, getMyPrograms);
router.post('/createevent', isloggedin, eventUpload.fields([ { name: 'eventBanner', maxCount: 1 }, { name: 'speakerPhotos', maxCount: 10 } ]), createEvent);
router.get('/programs/count', isloggedin, getProgramsCount);

module.exports = router;