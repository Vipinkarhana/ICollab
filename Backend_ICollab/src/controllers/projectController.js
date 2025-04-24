const ApiError = require('../utils/ApiError');
const userModel = require('../models/user');
const projectModel = require('../models/project');
const allowedTechnologies = require('../../config/technologies.json');
const allowedTypes = require('../../config/types.json');

const addProject = async (req, res, next) => {
       let newProject;
    try{
     
        const username = req.user.username;
        const {name, tagline, problem, challenges, technology, links, videoLink, media, logo, stillOngoing, startDate, endDate, type, description } = req.body;
        const user = await userModel.findOne({ username: username });
        if (!user) {
            return next(new ApiError(404, 'User not found'));
          }
        if(!name){
            return next(new ApiError(400, 'Name is required'));
        }
        if(!tagline){
            return next(new ApiError(400, 'Tagline is required'));
        }
        if(!technology){
            return next(new ApiError(400, 'Technology is required'));
        }
        if(!links){
            return next(new ApiError(400, 'Link is required'));
        }
        if(!startDate){
            return next (new ApiError(400, 'A start date is required'));
        }
        if(!type){
            return next (new ApiError(400, 'A type is required'));
        }
        const isOngoing = (stillOngoing === true || stillOngoing === 'true');
        const projectEndDate = isOngoing ? null : endDate;
        if (!isOngoing && !endDate) {
            return next(new ApiError(400, 'End Date is required for non-ongoing projects'));
        }
        const newProject = new projectModel({
              user: user._id,
              name,
              tagline,
              problem,
              challenges,
              endDate: projectEndDate,
              startDate,
              isOngoing,
              technology,
              links,
              videoLink,
              type,
              description,
            });
        await newProject.save();

        if (req.files?.logo) {
            const logoFile = Array.isArray(req.files.logo) ? req.files.logo[0] : req.files.logo;
            const logoKey = `projects/${newProject._id}/logo-${Date.now()}-${logoFile.originalname}`;
            await uploadToR2(logoKey, logoFile.buffer, logoFile.mimetype);
            newProject.logo = logoKey;
          }

          const mediaFiles = req.files?.media || [];
          const mediaKeys = [];
          for (const mediaFile of mediaFiles) {
            const mediaKey = `projects/${newProject._id}/media-${Date.now()}-${mediaFile.originalname}`;
            await uploadToR2(mediaKey, mediaFile.buffer, mediaFile.mimetype);
            mediaKeys.push(mediaKey);
          }
          newProject.media = mediaKeys;
      
          // Save project with media/logo keys
          await newProject.save();

        res.status(201).json({
            message: 'Project created successfully',
            data: { projectid: newProject._id },
            status: 'success',
        });
    }
    catch(err){
        if (newProject) {
            await projectModel.findByIdAndDelete(newProject._id);
            if (newProject.logo) await deleteFromR2(newProject.logo);
            for (const mediaKey of newProject.media) {
              await deleteFromR2(mediaKey);
            }
          }
          next(new ApiError(500, 'Failed to create project', err.message));
    }
};


const technologySuggestions = (req, res, next) => {
    try{
        const query = req.query.qer || '';
        const lowerQuery = query.toLowerCase();
        const filteredTechnologies = allowedTechnologies.filter(technology => technology.toLowerCase().includes(lowerQuery));

        res.status(200).json(filteredTechnologies);
    }
    catch(err){
        next(err);
    }
};


const typeSuggestions = (req, res, next) => {
    try{
        const query = req.query.qer || '';
        const lowerQuery = query.toLowerCase();
        const filteredTypes = allowedTypes.filter(type => type.toLowerCase().includes(lowerQuery));

        res.status(200).json(filteredTypes);
    }
    catch(err){
        next(err);
    }
};


module.exports = {
  addProject,
  technologySuggestions,
  typeSuggestions,
};