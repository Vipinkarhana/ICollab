const ApiError = require('../utils/ApiError');
const userModel = require('../models/user');
const projectModel = require('../models/project');
const collabRequestModel = require('../models/collaborationRequests');
const allowedTechnologies = require('../../config/technologies.json');
const Profile = require('../models/profile');
const allowedCategories = require('../../config/category.json');
const { uploadToR2, deleteFromR2 } = require('../../config/s3');
const config = require('../../config/config');
const SavedItem = require('../models/savedItem');

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
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    const userId = user._id;
    console.log("Backend hit by frontend");
    const {projectId} = req.params;
    console.log("projectId: ",projectId);
    const project = await projectModel.findOne({_id: projectId})
      .populate('user', 'username email profile_pic');;
    if (!project) {
          throw new ApiError(404, 'Project not found');
        }

        const isSaved = await SavedItem.exists({
          user: userId,
          savedProjects: project._id
      });


        let collaborators;
        if (project.collaborator.length > 0 && typeof project.collaborator[0] === 'string') {



            // Clean legacy collaborator strings
      const cleanedCollaborators = project.collaborator.map(c => 
        c.replace(/[^a-zA-Z0-9@._-]/g, '') // Remove special characters
      );


          // Legacy string-based collaborators (username/email)
          const collaboratorRegex = cleanedCollaborators.map(c => 
            new RegExp(`^${c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i')
          );
    
          collaborators = await userModel.find({
            $or: [
              { username: { $in: collaboratorRegex } },
              { email: { $in: collaboratorRegex } }
            ]
          });
        } else {
          // ObjectId-based collaborators
          collaborators = await userModel.find({
            _id: { $in: project.collaborator }
          }).select('username email profile_pic');
        }


        const generateR2Url = (key) => {
            if (!key) return null;
            const url = `${config.S3_PUBLIC_URL}/${key}`;
            console.log(`Generated URL for ${key}: ${url}`);
            return url;
          };
        const formattedProject = {
            ...project.toObject(),
            collaborator: collaborators,
            isSaved: !!isSaved,
            logo: generateR2Url(project.logo),
            media: project.media.map(generateR2Url)
          };
    res.status(200).json({
      message: 'Project fetched',
      status: 'success',
      data: formattedProject,
    });
  } catch (err) {
    next(err);
  }
};


const projectFeed = async (req, res, next) => {
  const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    const userId = user._id;
  const savedItems = await SavedItem.findOne({ user: userId });
        const savedProjectIds = savedItems?.savedProjects || [];
    try{
        const feed = await projectModel.aggregate([
            {
                $facet: {
                    ongoing: [
                        {$match: {isOngoing: true}},
                        {$sort: {createdAt: -1}},
                        {$limit: 4},
                        {
                          $addFields: {
                              isSaved: {
                                  $in: ["$_id", savedProjectIds]
                              }
                          }
                      },
                        {$project: {
                            id: '$_id',
                            name: 1,
                            tagline: 1,
                            technology: 1,
                            collaborator: 1,
                            category: 1,
                            startDate: 1,
                            createdAt: 1,
                            updatedAt: 1,
                            user: 1,
                        }},
                    ],
                    finished: [
                        {$match: {isOngoing: false}},
                        {$sort: {createdAt: -1}},
                        {$limit: 4},
                        {
                          $addFields: {
                              isSaved: {
                                  $in: ["$_id", savedProjectIds]
                              }
                          }
                      },
                        {$project: {
                            id: '$_id',
                            name: 1,
                            tagline: 1,
                            technology: 1,
                            collaborator: 1,
                            category: 1,
                            startDate: 1,
                            endDate: 1,
                            createdAt: 1,
                            user: 1,
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
      const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    const userId = user._id;
        const { timestamp } = req.query; // the timestamp sent by the frontend

        if (!timestamp) {
            return next(new ApiError(400, 'Timestamp is required'));
        }

        const date = new Date(Number(timestamp));
        if(isNaN(date.getTime())){
            return next(new ApiError(400, 'Timestamp must be a number'));
        }

        const savedItems = await SavedItem.findOne({ user: userId });
        const savedProjectIds = savedItems?.savedProjects || [];

        const feed = await projectModel.find(
            {createdAt: { $lt: date }, isOngoing: true, },
            {_id: 1, name: 1, tagline: 1, technology: 1, collaborator: 1, category: 1, startDate: 1,createdAt: 1,updatedAt: 1, isOngoing: 1, user:1}
        ).sort({createdAt: -1}).limit(10).lean() .transform(results => results.map(project => ({
          ...project,
          isSaved: savedProjectIds.includes(project._id)
      })));

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
      const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    const userId = user._id;
        const { timestamp } = req.query; // the timestamp sent by the frontend

        if (!timestamp) {
            return next(new ApiError(400, 'Timestamp is required'));
        }

        const date = new Date(Number(timestamp));
        if(isNaN(date.getTime())){
            return next(new ApiError(400, 'Timestamp must be a number'));
        }

        const savedItems = await SavedItem.findOne({ user: userId });
        const savedProjectIds = savedItems?.savedProjects || [];

        const feed = await projectModel.find(
            {createdAt: { $lt: date }, isOngoing: false, },
            {_id: 1, name: 1, tagline: 1, technology: 1, collaborator: 1, category: 1, startDate: 1, endDate: 1,createdAt: 1, user:1}
        ).sort({createdAt: -1}).limit(10).lean() .transform(results => results.map(project => ({
          ...project,
          isSaved: savedProjectIds.includes(project._id)
      })));

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
      const { username } = req.params;
  
      const user = await userModel.findOne({ username });
  
      if (!user) {
        return res.status(404).json({
          message: 'User not found',
          status: 'fail',
        });
      }
  
      const projects = await projectModel
        .find({ user: user._id })
        .populate('user', 'username name profile_pic');
  

        // const savedItem = await SavedItem.findOne({ user: user._id });
        // const savedProjectIds = savedItem?.savedProjects || [];
    
        // // Add isSaved status to each project
        // const projectsWithSavedStatus = projects.map(project => ({
        //   ...project.toObject(),
        //   isSaved: savedProjectIds.includes(project._id)
        // }));


      res.status(200).json({
        message: 'User projects fetched successfully',
        status: 'success',
        data: projects,
      });
    } catch (err) {
      next(err);
    }
  };
  
  const updateTopProjects = async (req, res) => {
    try {
      console.log(req.body)
      const userId = req.user.id;
      const { topProjectIds } = req.body;
      console.log(topProjectIds);
  
      
      if (!Array.isArray(topProjectIds)) {
        return res.status(400).json({ success: false, error: 'topProjectIds must be an array' });
      }
  
      if (topProjectIds.length > 3) {
        return res.status(400).json({ success: false, error: 'You can only pin up to 3 projects.' });
      }
  
      const isValidIds = topProjectIds.every(id => /^[0-9a-fA-F]{24}$/.test(id));
      if (!isValidIds) {
        return res.status(400).json({ success: false, error: 'One or more project IDs are invalid.' });
      }
  
      const updatedProfile = await Profile.findOneAndUpdate(
        { user: userId },
        { topProjects: topProjectIds },
        { new: true, upsert: true }
      );
      console.log("profile",updatedProfile);
      return res.status(200).json({
        success: true,
        message: 'Top projects updated successfully',
        topProjects: updatedProfile.topProjects,
      });
    } catch (error) {
      console.error('Error updating top projects:', error);
      return res.status(500).json({
        success: false,
        message: 'Server error while updating top projects',
      });
    }
  };
  
const toggleSaveProject = async (req, res, next) => {
  try {
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    const userId = user._id;
    const { projectid } = req.body;

    let savedDoc = await SavedItem.findOne({ user: userId });

    if (!savedDoc) {
      // If no saved document exists, create one with the project
      savedDoc = new SavedItem({
        user: userId,
        savedProjects: [projectid], // Add the project to the savedProjects array
      });
      await savedDoc.save();

      return res.status(200).json({
        message: 'Project saved successfully',
        status: 'saved',
      });
    }

    // If project is already saved, remove it (unsave)
    const isAlreadySaved = savedDoc.savedProjects.includes(projectid);

    if (isAlreadySaved) {
      savedDoc.savedProjects.pull(projectid);
      await savedDoc.save();

      return res.status(200).json({
        message: 'Project unsaved successfully',
        status: 'unsaved',
      });
    } else {
      // Else, save the post
      savedDoc.savedProjects.push(projectid);
      await savedDoc.save();

      return res.status(200).json({
        message: 'Project saved successfully',
        status: 'saved',
      });
    }
  } catch (err) {
    next(err);
  }
};


const getSavedProjects = async (req, res, next) => {
  try {
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    const userId = user._id;

    const saved = await SavedItem.findOne({ user: userId }).populate({
      path: 'savedProjects',
      populate: {
        path: 'user',
        select: 'username profile_pic name designation',
      },
    });

    res.status(200).json({
      message: 'Saved projects fetched successfully',
      data: saved?.savedProjects || [],
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};
  

const sendCollabRequest = async (req, res, next) => {
  const { recieverUsername, projectid } = req.body;

  
  try {
    const user = await userModel.findOne({ username: req.user.username }).lean();
  const reciever = await userModel
    .findOne({ username: recieverUsername })
    .lean();
    const project = await projectModel.findOne({_id: projectid, user: user._id});

    if (!reciever) {
      return next(new ApiError(400, 'Reciever does not exist'));
    }

    if (!user) {
      return next(new ApiError(400, 'User does not exist'));
    }

    if(!project){
      return next(new ApiError(400, 'Project does not exist or you are not the owner'));
    }


const requested = await collabRequestModel.exists({sender: user._id, reciever: reciever._id, project: projectid});

const collaborated = project.collaborator.includes(reciever._id);

    if (requested) {
      return next(
        new ApiError(
          400,
          'You have already sent the request! No need to send the request again.'
        )
      );
    }
    else if(collaborated){
      return next(
        new ApiError(400, 'You already have that user as collaborator in this project.')
      );
    }

    const newRequest = await collabRequestModel.create({
      sender: user._id,
      reciever: reciever._id,
      project: project,
    });

    res.status(200).json({
      message: 'Request Created',
      status: 'success',
      data: newRequest,
    });
  } catch (error) {
    next(error);
  }
};


const acceptCollabRequest = async (req, res, next) => {
  const { senderUsername, projectid } = req.body;
  

  try {
    const sender = await userModel.findOne({ username: senderUsername }).lean();
  const reciever = await userModel
    .findOne({ username: req.user.username })
    .lean();
  const request = await collabRequestModel
    .findOne({
      sender: sender._id,
      reciever: reciever._id,
      project: projectid
    })
    .lean();

    if (!request) {
      return next(new ApiError(400, 'Request does not exist'));
    }

   await projectModel.findOneAndUpdate(
      { _id: projectid },
      { $addToSet: { collaborator: reciever._id } },
      { new: true, upsert: true }
    );

    await collabRequestModel.findByIdAndDelete(request._id);

    res.status(200).json({
      message: 'Request Accepted',
      status: 'success',
      data: projectid,
    });
  } catch (error) {
    next(error);
  }
};


const rejectCollabRequest = async (req, res, next) => {
  const { senderUsername, projectid} = req.body;
  

  try {
    const sender = await userModel.findOne({ username: senderUsername }).lean();
  const reciever = await userModel
    .findOne({ username: req.user.username })
    .lean();

  const request = await collabRequestModel
    .findOne({
      sender: sender._id,
      reciever: reciever._id,
      project: projectid,
    })
    .lean();

    if (!request) {
      return next(new ApiError(400, 'Request is no longer available.'));
    }

    await collabRequestModel.findByIdAndDelete(request._id);

    res.status(200).json({
      message: 'Request Rejected',
      status: 'success',
      data: projectid,
    });
  } catch (error) {
    next(error);
  }
};


const getCollabRequest = async (req, res, next) => {
  const user = await userModel.findOne({ username: req.user.username }).lean();
  const requests = await collabRequestModel
    .find({ reciever: user._id })
    .populate('sender project');
  try {

    res.status(200).json({
      message: 'Requests fetched successfully',
      status: 'success',
      data: requests,
    });
  } catch (error) {
    next(error);
  }
};


const deleteProject = async (req, res, next) => {
  const user = await userModel.findOne({username: req.user.username});
  const {projectid} = req.body;
  console.log("ProjectId: ", projectid);
  const deleteProject = await projectModel.findOneAndDelete({_id: projectid, user: user._id});
  console.log("DeleteProject: ", deleteProject);
  if(!deleteProject){
    return next(new ApiError(400, 'No such project is available.'));
  }
  await SavedItem.updateMany({savedProjects: projectid}, {$pull: {savedProjects: projectid}});
   res.status(200).json({
      message: 'Project Deleted Successfully',
      status: 'success',
      data: projectid,
    });
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
  updateTopProjects,
  finishedFeed,
  toggleSaveProject,
  getSavedProjects,
  sendCollabRequest,
  acceptCollabRequest,
  rejectCollabRequest,
  getCollabRequest,
  deleteProject,
};