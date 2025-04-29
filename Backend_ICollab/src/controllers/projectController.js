const ApiError = require('../utils/ApiError');
const userModel = require('../models/user');
const projectModel = require('../models/project');
const allowedTechnologies = require('../../config/technologies.json');
const allowedCategories = require('../../config/category.json');
const { uploadToR2, deleteFromR2 } = require('../../config/s3');

const addProject = async (req, res, next) => {
       let newProject;
    try{
     
        const username = req.user.username;
        let {name, tagline, problem, challenges, technology, collaborator,links, videoLink, media, logo, stillOngoing, startDate, endDate, category, description } = req.body;
        const user = await userModel.findOne({ username: username });
        technology = Array.isArray(req.body.technology) 
                ? req.body.technology 
                : [req.body.technology].filter(Boolean);
        collaborator = Array.isArray(collaborator) 
                ? req.body.collaborator 
                : [req.body.collaborator].filter(Boolean);
        if (!user) {
            return next(new ApiError(404, 'User not found'));
          }
        if(!name){
            return next(new ApiError(400, 'Name is required'));
        }
        if(!tagline){
            return next(new ApiError(400, 'Tagline is required'));
        }
        if(!technology || technology.length === 0){
            return next(new ApiError(400, 'Technology is required'));
        }
        if (!Array.isArray(technology) || technology.length === 0) {
            return next(new ApiError(400, 'Technology must be a non-empty array'));
          }

            if(collaborator.length>0){
                const collaboratorRegex = collaborator.map(c => 
                    new RegExp(`^${c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i')
                );

                const users = await userModel.find({
                    $or: [
                        { username: { $in: collaboratorRegex } },
                        { email: { $in: collaboratorRegex } }
                    ]
                });

                const validIdentifiers = new Set();
                users.forEach(user => {
                    validIdentifiers.add(user.username.toLowerCase());
                    validIdentifiers.add(user.email.toLowerCase());
                });

                const invalidCollaborators = collaborator.filter(c => 
                    !validIdentifiers.has(c.toLowerCase())
                );

                if (invalidCollaborators.length > 0) {
                    return next(new ApiError(
                        400, 
                        `Invalid collaborators: ${invalidCollaborators.join(', ')}. ` +
                        'They must be existing usernames or emails.'
                    ));
                }
            }
        if(!links){
            return next(new ApiError(400, 'Link is required'));
        }
        if(!startDate){
            return next (new ApiError(400, 'A start date is required'));
        }
        if(!category){
            return next (new ApiError(400, 'A category is required'));
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
              collaborator,
              links,
              videoLink,
              category,
              description,
            });

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
        next(err);
        if (newProject) {
            await projectModel.findByIdAndDelete(newProject._id);
            if (newProject.logo) await deleteFromR2(newProject.logo);
            for (const mediaKey of newProject.media) {
              await deleteFromR2(mediaKey);
            }
          }
          
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


const categorySuggestions = (req, res, next) => {
    try{
        const query = req.query.qer || '';
        const lowerQuery = query.toLowerCase();
        const filteredCategories = allowedCategories.filter(category => category.toLowerCase().includes(lowerQuery));

        res.status(200).json(filteredCategories);
    }
    catch(err){
        next(err);
    }
};



const collaboratorSuggestions = async (req, res, next) => {
    try{
        const query = req.query.qer || '';
        if (!query) return res.json([]);
        const searchRegex = new RegExp(`^${query}`, 'i');
        //const user = await userModel.findOne({ username: username });

        const suggestions = await userModel.find({
            $or: [
                { username: searchRegex },
                { email: searchRegex }
            ]
        })
        .select('_id username email') // Return only necessary fields
        .limit(5) // Limit to 5 results
        .lean(); // Convert to plain JS object

        res.status(200).json(suggestions);
    }
    catch(err){
        next(err);
    }
};


const project = async (req, res, next) => {
  try {
    const {projectId} = req.body;
    const project = await projectModel.findOne({_id: projectId}).populate('user');
    if (!project) {
          throw new ApiError(404, 'Project not found');
        }
    res.status(200).json({
      message: 'Project fetched',
      status: 'success',
      data: project,
    });
  } catch (err) {
    next(err);
  }
};


const projectFeed = async (req, res, next) => {
    try{
        const feed = await projectModel.aggregate([
            {
                $facet: {
                    ongoing: [
                        {$match: {isOngoing: true}},
                        {$sort: {createdAt: -1}},
                        {$limit: 4},
                        {$project: {
                            id: '$_id',
                            name: 1,
                            tagline: 1,
                            technology: 1,
                            collaborator: 1,
                            category: 1,
                            startDate: 1,
                        }},
                    ],
                    finished: [
                        {$match: {isOngoing: false}},
                        {$sort: {createdAt: -1}},
                        {$limit: 4},
                        {$project: {
                            id: '_id',
                            name: 1,
                            tagline: 1,
                            technology: 1,
                            collaborator: 1,
                            category: 1,
                            startDate: 1,
                            endDate: 1
                        }},
                    ]
                }
            }
        ]);
        res.status(200).json({
            success: true,
            data: {
              ongoing: feed[0].ongoing,
              finished: feed[0].finished
            }
          });
    }
    catch(err){
        next(err);
    }
};



const ongoingFeed = async (req, res, next) => {
    try{
        const { timestamp } = req.query; // the timestamp sent by the frontend

        if (!timestamp) {
            return next(new ApiError(400, 'Timestamp is required'));
        }

        const date = new Date(Number(timestamp));
        if(isNaN(date.getTime())){
            return next(new ApiError(400, 'Timestamp must be a number'));
        }
        const feed = await projectModel.find(
            {createdAt: { $lt: date }, isOngoing: true, },
            {_id: 1, name: 1, tagline: 1, technology: 1, collaborator: 1, category: 1, startDate: 1}
        ).sort({createdAt: -1}).limit(10).lean();

        res.status(200).json({
            success: true,
            data: feed
          });
    }
    catch (err){
        next(err);
    }
};

const finishedFeed = async (req, res, next) => {
    try{
        const { timestamp } = req.query; // the timestamp sent by the frontend

        if (!timestamp) {
            return next(new ApiError(400, 'Timestamp is required'));
        }

        const date = new Date(Number(timestamp));
        if(isNaN(date.getTime())){
            return next(new ApiError(400, 'Timestamp must be a number'));
        }
        const feed = await projectModel.find(
            {createdAt: { $lt: date }, isOngoing: false, },
            {_id: 1, name: 1, tagline: 1, technology: 1, collaborator: 1, category: 1, startDate: 1, endDate: 1}
        ).sort({createdAt: -1}).limit(10).lean();

        res.status(200).json({
            success: true,
            data: feed
          });
    }
    catch (err){
        next(err);
    }
};


const fetchUserProjects = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const projects = await projectModel.find({ user: userId }).populate('user', 'username name profile_pic');

    res.status(200).json({
      message: 'User projects fetched successfully',
      status: 'success',
      data: projects,
    });
  } catch (err) {
    next(err);
  }
};


module.exports = {
  addProject,
  technologySuggestions,
  categorySuggestions,
  collaboratorSuggestions,
  project,
  projectFeed,
  ongoingFeed,
  fetchUserProjects,
  finishedFeed,
};