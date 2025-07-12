// controllers/incubatorController.js
const mongoose = require('mongoose');
const Incubator = require('../models/incubator');
const File = require('../models/incubatorFiles');
const { uploadToR2, deleteFromR2, generateDownloadUrl } = require('../../config/s3');
const { v4: uuidv4 } = require('uuid');
const generateUniqueUsername = require('../utils/usernamegenerate');
const Program = require('../models/programs');
const Event = require('../models/Event');






























exports.createIncubatorApplication = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // 1. Process form data
    const formData = req.body;
    // 2. Generate unique username
    const username = await generateUniqueUsername(formData.email);
    
    // 3. Create incubator application
    const incubator = new Incubator({
      name: formData.nameOfIncubator,
      incorporatedOn: new Date(formData.dateOfIncorporation),
      representative:{
        name: formData.representativeName,
        position: formData.representativePosition,
        email: formData.email,
        mobile: formData.mobile,
        altEmail: formData.alternateEmail,
        altMobile: formData.alternateMobile
      },
      address: {
        line1: formData.address,
        state: formData.state,
        city: formData.city,
        pincode: formData.pinCode
      },
      incubationSupport: {
        totalIncubated: formData.totalIncubated,
        graduated: formData.totalGraduated,
        raisedInvestments: formData.followOnInvestments,
        twoYearSurvivalRate: formData.survivalRate,
        infrastructure: formData.infraSupport
      },
      fundingDetails: {
        investedCount: formData.investedStartups,
        grantSupportedCount: formData.grantSupport,
        totalRaisedMillion: formData.totalInvestmentRaised,
        corpusAllocatedMillion: formData.totalCorpus
      },
      mentoringSupport: {
        startupsAbove2Cr: formData.highRevenueStartups,
        ipRegistered: formData.ipRegistered,
        avgMentorHoursPerMonth: formData.mentoringHours
      },
      eventsAndConnects: {
        stakeholderEvents: formData.eventsOrganized,
        industryPrograms: formData.industryPrograms,
        otherSupport: formData.otherSupport
      },
      heardAboutUs: formData.referralSource,
      username,
      status: 'pending',
      submittedAt: new Date()
    });

    // 4. Process file uploads
    const fileUrls = {};
    const fileFields = [
      'startups_incubated', 'startups_graduated', 'startups_followon_investments',
      'survival_rate', 'infra_support', 'govt_support', 'no_of_startups_invested',
      'total_investment_raised', 'corpus_allocated',
      'startups_above_2cr', 'IP_Registered', 'mentoring_hours',
      'stakeholder_events', 'industry_corporate_connect', 'other_support'
    ];

    for (const field of fileFields) {
      if (!req.files[field]) {
        throw new Error(`Missing file for ${field}`);
      }
      
      const file = req.files[field][0];
      const fileKey = `incubator-files/${uuidv4()}.pdf`;
      
      // Store the full URL instead of key
      fileUrls[field] = await uploadToR2(
      fileKey,
      file.buffer,
      file.mimetype
  );
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



 

exports.getCurrentIncubator = async (req, res) => {
  try {
    console.log("1");
    const incubatorId = '68650f9a0f6178d623074b2a'; // For testing purposes, replace with actual user ID in production
    // 2. Fetch incubator data
    const incubator = await Incubator.findById(incubatorId);
    if (!incubator) {
      return res.status(404).json({ error: 'Incubator not found' });
    }
    // 3. Fetch associated files
    const files = await File.findOne({ incubator: incubatorId });
    const response = {
      username: incubator.username,
      incorporatedOn: incubator.incorporatedOn,
      status: incubator.status,
      incubator: {
        nameOfIncubator: incubator.name,
        representativeName: incubator.representative.name,
        representativePosition: incubator.representative.position,
        email: incubator.representative.email,
        mobile: incubator.representative.mobile,
        alternateEmail: incubator.representative.altEmail,
        alternateMobile: incubator.representative.altMobile,
        address: incubator.address.line1,
        state: incubator.address.state,
        city: incubator.address.city,
        pinCode: incubator.address.pincode,
        totalIncubated: incubator.incubationSupport.totalIncubated,
        totalGraduated: incubator.incubationSupport.graduated,
        followOnInvestments: incubator.incubationSupport.raisedInvestments,
        survivalRate: incubator.incubationSupport.twoYearSurvivalRate,
        infraSupport: incubator.incubationSupport.infrastructure,
        investedStartups: incubator.fundingDetails.investedCount,
        grantSupport: incubator.fundingDetails.grantSupportedCount,
        totalInvestmentRaised: incubator.fundingDetails.totalRaisedMillion,
        totalCorpus: incubator.fundingDetails.corpusAllocatedMillion,
        highRevenueStartups: incubator.mentoringSupport.startupsAbove2Cr,
        ipRegistered: incubator.mentoringSupport.ipRegistered,
        mentoringHours: incubator.mentoringSupport.avgMentorHoursPerMonth,
        eventsOrganized: incubator.eventsAndConnects.stakeholderEvents,
        industryPrograms: incubator.eventsAndConnects.industryPrograms,
        otherSupport: incubator.eventsAndConnects.otherSupport,
        referralSource: incubator.heardAboutUs
      },
      files: files ? files.toObject() : {}
    };
    console.log("7");
    res.json(response);
    
  } catch (error) {
    console.error('Error fetching incubator details:', error);
    res.status(500).json({ error: 'Server error' });
  }
};










































// Create a new program
exports.createProgram = async (req, res) => {
  try {
    // const incubatorId = req.user.id;
    const incubatorId = '68650f9a0f6178d623074b2a'; // For testing purposes, replace with actual user ID in production
    const programData = req.body;
    
    // Verify incubator exists
    const incubator = await Incubator.findById(incubatorId);
    if (!incubator) {
      return res.status(404).json({ error: 'Incubator not found' });
    }
    
    // Create program
    const program = new Program({
      ...programData,
      incubator: incubatorId,
      startDate: new Date(programData.startDate)
    });
    
    await program.save();
    
    res.status(201).json({
      message: 'Program created successfully',
      program
    });
    
  } catch (error) {
    console.error('Error creating program:', error);
    res.status(400).json({ error: error.message || 'Failed to create program' });
  }
};

// Update a program
exports.updateProgram = async (req, res) => {
  try {
    // const incubatorId = req.user.id;
    const incubatorId = '68650f9a0f6178d623074b2a'; // For testing purposes, replace with actual user ID in production
    const programId = req.params.id;
    const updateData = req.body;
    
    // Verify program exists and belongs to incubator
    const program = await Program.findOne({
      _id: programId,
      incubator: incubatorId
    });
    
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    
    // Update fields
    Object.keys(updateData).forEach(key => {
      if (key === 'startDate') {
        program[key] = new Date(updateData[key]);
      } else if (key !== '_id' && key !== 'incubator') {
        program[key] = updateData[key];
      }
    });
    
    await program.save();
    
    res.json({
      message: 'Program updated successfully',
      program
    });
    
  } catch (error) {
    console.error('Error updating program:', error);
    res.status(400).json({ error: error.message || 'Failed to update program' });
  }
};

// Delete a program
exports.deleteProgram = async (req, res) => {
  try {
    // const incubatorId = req.user.id;
    const incubatorId = '68650f9a0f6178d623074b2a'; // For testing purposes, replace with actual user ID in production
    const programId = req.params.id;
    
    const program = await Program.findOneAndDelete({
      _id: programId,
      incubator: incubatorId
    });
    
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    
    res.json({
      message: 'Program deleted successfully'
    });
    
  } catch (error) {
    console.error('Error deleting program:', error);
    res.status(500).json({ error: 'Failed to delete program' });
  }
};

// Get incubator's programs (segregated by date)
exports.getMyPrograms = async (req, res) => {
  try {
    // const incubatorId = req.user.id;
    const incubatorId = '68650f9a0f6178d623074b2a'; // For testing purposes, replace with actual user ID in production
    const today = new Date();
    
    const programs = await Program.find({ incubator: incubatorId })
      .sort({ startDate: 1 });
    
    const upcoming = [];
    const past = [];
    
    programs.forEach(program => {
      if (program.startDate >= today) {
        upcoming.push(program);
      } else {
        past.push(program);
      }
    });
    
    res.json({
      upcoming,
      past
    });
    
  } catch (error) {
    console.error('Error fetching programs:', error);
    res.status(500).json({ error: 'Failed to fetch programs' });
  }
};

exports.getProgramsCount = async (req, res) => {
  try {
    // const incubatorId = req.user.id;
    const incubatorId = '68650f9a0f6178d623074b2a'; // For testing
    const count = await Program.countDocuments({ incubator: incubatorId });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get programs count' });
  }
};




































// Helper to get file extension
const getExtension = (mimetype) => mimetype.split('/')[1];

exports.createEvent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  const uploadedFiles = []; // Track uploaded files for rollback
  try {
    // Parse JSON data from form
    const eventData = JSON.parse(req.body.data);
    
    // Validate required fields
    if (!req.files || !req.files.eventBanner) {
      throw new Error('Event banner is required');
    }

    // Upload event banner
    const bannerFile = req.files.eventBanner[0];
    const bannerKey = `events/banners/${uuidv4()}.${getExtension(bannerFile.mimetype)}`;
    await uploadToR2(bannerKey, bannerFile.buffer, bannerFile.mimetype);
    uploadedFiles.push(bannerKey);

    // Process speaker photos
    const speakers = [];
    const speakerPhotos = req.files.speakerPhotos || [];
    
    for (const [index, speaker] of eventData.speakers.entries()) {
      if (!speakerPhotos[index]) {
        throw new Error(`Missing photo for speaker: ${speaker.name}`);
      }
      
      const photoFile = speakerPhotos[index];
      const photoKey = `events/speakers/${uuidv4()}.${getExtension(photoFile.mimetype)}`;
      await uploadToR2(photoKey, photoFile.buffer, photoFile.mimetype);
      uploadedFiles.push(photoKey);

      speakers.push({
        name: speaker.name,
        title: speaker.title,
        bio: speaker.bio,
        photo: photoKey
      });
    }

    // Create event document
    const event = new Event({
      ...eventData,
      eventDate: new Date(eventData.eventDate),
      eventBanner: bannerKey,
      speakers,
      targetAudience: Array.isArray(eventData.targetAudience) 
        ? eventData.targetAudience 
        : [eventData.targetAudience]
    });

    // Save to database
    const savedEvent = await event.save({ session });

    await session.commitTransaction();
    res.status(201).json({
      message: 'Event created successfully',
      eventId: savedEvent._id
    });

  } catch (error) {
    await session.abortTransaction();
    
    // Cleanup uploaded files on error
    for (const fileKey of uploadedFiles) {
      await deleteFromR2(fileKey).catch(console.error);
    }

    console.error('Event creation error:', error);
    res.status(400).json({ 
      error: error.message || 'Failed to create event' 
    });
  } finally {
    session.endSession();
  }
};

// Add other event controllers as needed
// (getEvents, updateEvent, deleteEvent, etc.)