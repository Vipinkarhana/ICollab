// controllers/incubatorController.js
const mongoose = require('mongoose');
const Incubator = require('../models/incubatorApplication');
const File = require('../models/incubatorApplicationsFiles');
const { uploadToR2 } = require('../utils/S3');
const { v4: uuidv4 } = require('uuid');
const generateUniqueUsername = require('../utils/usernamegenerate');

exports.createIncubatorApplication = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // 1. Process form data
    const formData = req.body;
    
    // 2. Generate unique username
    const username = await generateUniqueUsername(formData.representative.email);
    
    // 3. Create incubator application
    const incubator = new Incubator({
      ...formData,
      username,
      status: 'pending',
      submittedAt: new Date(),
      incorporatedOn: new Date(formData.incorporatedOn),
    });

    // 4. Process file uploads
    const fileUrls = {};
    const fileFields = [
      'startups_incubated', 'startups_graduated', 'startups_followon_investments',
      'survival_rate', 'infra_support', 'govt_support', 'no_of_startups_invested',
      'total_investment_raised', 'corpus_allocated', 'paid_mentors',
      'startups_above_2cr', 'IP_Registered', 'mentoring_hours',
      'stakeholder_events', 'industry_corporate_connect', 'other_support'
    ];

    for (const field of fileFields) {
      if (!req.files[field]) {
        throw new Error(`Missing file for ${field}`);
      }
      
      const file = req.files[field][0];
      const fileKey = `incubator-files/${uuidv4()}.pdf`;
      
      await uploadToR2(
        fileKey,
        file.buffer,
        file.mimetype
      );
      
      fileUrls[field] = fileKey;
    }

    // 5. Save incubator application
    const savedIncubator = await incubator.save({ session });

    // 6. Create file records
    const fileDoc = new File({
      incubator: savedIncubator._id,
      ...fileUrls
    });

    await fileDoc.save({ session });

    // 7. Commit transaction
    await session.commitTransaction();
    
    res.status(201).json({
      message: 'Application submitted successfully',
      incubatorId: savedIncubator._id,
      status: savedIncubator.status
    });

  } catch (error) {
    // 8. Rollback on error
    await session.abortTransaction();
    
    console.error('Application submission error:', error);
    res.status(500).json({
      error: error.message || 'Failed to submit application'
    });
  } finally {
    session.endSession();
  }
};

// Additional controller for application status check
exports.checkApplicationStatus = async (req, res) => {
  try {
    const application = await Incubator.findById(req.params.id)
      .select('status');
    
    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }
    
    res.json({
      status: application.status
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};