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
  try {
    const username = req.user.username;
    let {
      name,
      tagline,
      problem,
      challenges,
      technology,
      collaborator,
      links,
      videoLink,
      media,
      logo,
      stillOngoing,
      startDate,
      endDate,
      category,
      description,
    } = req.body;
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
    if (!name) {
      return next(new ApiError(400, 'Name is required'));
    }
    if (!tagline) {
      return next(new ApiError(400, 'Tagline is required'));
    }
    if (!technology || technology.length === 0) {
      return next(new ApiError(400, 'Technology is required'));
    }
    if (!Array.isArray(technology) || technology.length === 0) {
      return next(new ApiError(400, 'Technology must be a non-empty array'));
    }

    if (collaborator.length > 0) {
      const collaboratorRegex = collaborator.map(
        (c) => new RegExp(`^${c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i')
      );

      const users = await userModel.find({
        $or: [
          { username: { $in: collaboratorRegex } },
          { email: { $in: collaboratorRegex } },
        ],
      });

      const validIdentifiers = new Set();
      users.forEach((user) => {
        validIdentifiers.add(user.username.toLowerCase());
        validIdentifiers.add(user.email.toLowerCase());
      });

      const invalidCollaborators = collaborator.filter(
        (c) => !validIdentifiers.has(c.toLowerCase())
      );

      if (invalidCollaborators.length > 0) {
        return next(
          new ApiError(
            400,
            `Invalid collaborators: ${invalidCollaborators.join(', ')}. ` +
            'They must be existing usernames or emails.'
          )
        );
      }
    }
    if (!links) {
      return next(new ApiError(400, 'Link is required'));
    }
    if (!startDate) {
      return next(new ApiError(400, 'A start date is required'));
    }
    if (!category) {
      return next(new ApiError(400, 'A category is required'));
    }
    const isOngoing = stillOngoing === true || stillOngoing === 'true';
    const projectEndDate = isOngoing ? null : endDate;
    if (!isOngoing && !endDate) {
      return next(
        new ApiError(400, 'End Date is required for non-ongoing projects')
      );
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
      const logoFile = Array.isArray(req.files.logo)
        ? req.files.logo[0]
        : req.files.logo;
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
  } catch (err) {
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
  try {
    const query = req.query.qer || '';
    const lowerQuery = query.toLowerCase();
    const filteredTechnologies = allowedTechnologies.filter((technology) =>
      technology.toLowerCase().includes(lowerQuery)
    );

    res.status(200).json(filteredTechnologies);
  } catch (err) {
    next(err);
  }
};

const categorySuggestions = (req, res, next) => {
  try {
    const query = req.query.qer || '';
    const lowerQuery = query.toLowerCase();
    const filteredCategories = allowedCategories.filter((category) =>
      category.toLowerCase().includes(lowerQuery)
    );

    res.status(200).json(filteredCategories);
  } catch (err) {
    next(err);
  }
};

const collaboratorSuggestions = async (req, res, next) => {
  try {
    const query = req.query.qer || '';
    if (!query) return res.json([]);
    const searchRegex = new RegExp(`^${query}`, 'i');
    //const user = await userModel.findOne({ username: username });

    const suggestions = await userModel
      .find({
        $or: [{ username: searchRegex }, { email: searchRegex }],
      })
      .select('_id username email') // Return only necessary fields
      .limit(5) // Limit to 5 results
      .lean(); // Convert to plain JS object

    res.status(200).json(suggestions);
  } catch (err) {
    next(err);
  }
};

function generateR2Url(key) {
      if (!key) return null;
      const url = `${config.S3_PUBLIC_URL}/${key}`;
      return url;
    };

const project = async (req, res, next) => {
  try {
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    const userId = user._id;
    const { projectId } = req.params;
    const project = await projectModel
      .findOne({ _id: projectId })
      .populate('user', 'username email profile_pic');
    if (!project) {
      throw new ApiError(404, 'Project not found');
    }

    const isSaved = await SavedItem.exists({
      user: userId,
      savedProjects: project._id,
    });

    let collaborators;
    if (
      project.collaborator.length > 0 &&
      typeof project.collaborator[0] === 'string'
    ) {
      // Clean legacy collaborator strings
      const cleanedCollaborators = project.collaborator.map(
        (c) => c.replace(/[^a-zA-Z0-9@._-]/g, '') // Remove special characters
      );

      // Legacy string-based collaborators (username/email)
      const collaboratorRegex = cleanedCollaborators.map(
        (c) => new RegExp(`^${c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, 'i')
      );

      collaborators = await userModel.find({
        $or: [
          { username: { $in: collaboratorRegex } },
          { email: { $in: collaboratorRegex } },
        ],
      });
    } else {
      // ObjectId-based collaborators
      collaborators = await userModel
        .find({
          _id: { $in: project.collaborator },
        })
        .select('username email profile_pic');
    }

    
    const formattedProject = {
      ...project.toObject(),
      collaborator: collaborators,
      isSaved: !!isSaved,
      logo: generateR2Url(project.logo),
      media: project.media.map(generateR2Url),
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

const ongoingFeed = async (req, res, next) => {
  try {
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    const userId = user._id;
    const { timestamp } = req.query; // the timestamp sent by the frontend

    if (!timestamp) {
      return next(new ApiError(400, 'Timestamp is required'));
    }

    const date = new Date(Number(timestamp));
    if (isNaN(date.getTime())) {
      return next(new ApiError(400, 'Timestamp must be a number'));
    }

    const savedItems = await SavedItem.findOne({ user: userId }).lean();
    const savedProjectIds = savedItems?.savedProjects || [];

    const feed = await projectModel
      .find(
        { createdAt: { $lt: date }, isOngoing: true },
        {
          _id: 1,
          name: 1,
          tagline: 1,
          technology: 1,
          collaborator: 1,
          category: 1,
          startDate: 1,
          createdAt: 1,
          updatedAt: 1,
          isOngoing: 1,
          user: 1,
        }
      )
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
      .transform((results) =>
        results.map(({ _id, ...rest }) => ({
          id: _id,
          ...rest,
          isSaved: savedProjectIds.includes(_id)
        }))
      );

    res.status(200).json({
      success: true,
      data: feed,
    });
  } catch (err) {
    next(err);
  }
};

const finishedFeed = async (req, res, next) => {
  try {
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    const userId = user._id;
    const { timestamp } = req.query; // the timestamp sent by the frontend

    if (!timestamp) {
      return next(new ApiError(400, 'Timestamp is required'));
    }

    const date = new Date(Number(timestamp));
    if (isNaN(date.getTime())) {
      return next(new ApiError(400, 'Timestamp must be a number'));
    }

    const savedItems = await SavedItem.findOne({ user: userId });
    const savedProjectIds = savedItems?.savedProjects || [];

    const feed = await projectModel
      .find(
        { createdAt: { $lt: date }, isOngoing: false },
        {
          _id: 1,
          name: 1,
          tagline: 1,
          technology: 1,
          collaborator: 1,
          category: 1,
          startDate: 1,
          endDate: 1,
          createdAt: 1,
          user: 1,
        }
      )
      .sort({ createdAt: -1 })
      .limit(10)
      .lean()
      .transform((results) =>
        results.map(({ _id, ...rest }) => ({
          id: _id,
          ...rest,
          isSaved: savedProjectIds.includes(_id),
        }))
      );

    res.status(200).json({
      success: true,
      data: feed,
    });
  } catch (err) {
    next(err);
  }
};

const fetchUserProjects = async (req, res, next) => {
  try {
    const { username } = req.params;

    const user = await userModel.findOne({ username }).lean();

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        status: 'fail',
      });
    }

    const rawprojects = await projectModel
      .find({ user: user._id })
      .populate('user', 'username name profile_pic')
      .lean();

       // Map each raw project into a “formatted” project, converting logo & media keys → full URLs
    const projects = rawprojects.map((proj) => {
      // a) Turn proj.logo (which might be something like "projects/abc/logo.png")
      //    into a real URL, or null if it’s falsy
      const fullLogo = proj.logo
        ? generateR2Url(proj.logo)
        : null;

      // b) Map each element in proj.media (e.g. ["projects/abc/img1.png", ...])
      //    into generateR2Url(...)
      const fullMediaArray = Array.isArray(proj.media)
        ? proj.media.map((relPath) => generateR2Url(relPath)).filter((u) => u)
        : [];

      // c) Return a shallow‐copy of the proj object, but overwrite logo+media
      return {
        ...proj,
        logo: fullLogo,
        media: fullMediaArray,
      };
    });

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
    const userId = req.user.id;
    const { topProjectIds } = req.body;

    if (!Array.isArray(topProjectIds)) {
      return res
        .status(400)
        .json({ success: false, error: 'topProjectIds must be an array' });
    }

    if (topProjectIds.length > 3) {
      return res
        .status(400)
        .json({ success: false, error: 'You can only pin up to 3 projects.' });
    }

    const isValidIds = topProjectIds.every((id) =>
      /^[0-9a-fA-F]{24}$/.test(id)
    );
    if (!isValidIds) {
      return res
        .status(400)
        .json({
          success: false,
          error: 'One or more project IDs are invalid.',
        });
    }

    const updatedProfile = await Profile.findOneAndUpdate(
      { user: userId },
      { topProjects: topProjectIds },
      { new: true, upsert: true }
    );
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

const sendCollabRequest = async (req, res, next) => {
  const { recieverUsername, projectid } = req.body;

  try {
    const user = await userModel
      .findOne({ username: req.user.username })
      .lean();
    const reciever = await userModel
      .findOne({ username: recieverUsername })
      .lean();
    const project = await projectModel
      .findOne({ _id: projectid, user: user._id })
      .lean();

    if (!reciever) {
      return next(new ApiError(400, 'Reciever does not exist'));
    }

    if (!user) {
      return next(new ApiError(400, 'User does not exist'));
    }

    if (!project) {
      return next(
        new ApiError(400, 'Project does not exist or you are not the owner')
      );
    }

    const requested = await collabRequestModel.exists({
      sender: user._id,
      reciever: reciever._id,
      project: projectid,
    });
    const collaborated = project.collaborator.includes(reciever._id);

    if (requested) {
      return next(
        new ApiError(
          400,
          'You have already sent the request! No need to send the request again.'
        )
      );
    } else if (collaborated) {
      return next(
        new ApiError(
          400,
          'You already have that user as collaborator in this project.'
        )
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
        project: projectid,
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
  try {
    const user = await userModel
      .findOne({ username: req.user.username })
      .lean();
    const requests = await collabRequestModel
      .find({ reciever: user._id })
      .populate('sender project')
      .lean();

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
  try {
    const user = await userModel.findOne({ username: req.user.username });
    const { projectid } = req.body;
    const deleteProject = await projectModel.findOneAndDelete({
      _id: projectid,
      user: user._id,
    });
    if (!deleteProject) {
      return next(new ApiError(400, 'No such project is available.'));
    }
    await SavedItem.updateMany(
      { savedProjects: projectid },
      { $pull: { savedProjects: projectid } }
    );
    res.status(200).json({
      message: 'Project Deleted Successfully',
      status: 'success',
      data: projectid,
    });
  } catch (error) {
    next(error);
  }
};

const editProject = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ username: req.user.username });
    const { projectId, name, tagline, problem, challenges, technology, collaborator, links, videoLink, media, removeLogo, stillOngoing, startDate, endDate, category, description } = req.body;

    const project = await projectModel.findOne({ _id: projectId, user: user._id });
    if (!project) return next(new ApiError(404, 'Project not found or unauthorized'));

    if (name) {
      project.name = name;
    }
    if (tagline) {
      project.tagline = tagline;
    }
    if (problem) {
      project.problem = problem;
    }
    if (challenges) {
      project.challenges = challenges;
    }
    if (technology && technology.length > 0) {
      const techArr = Array.isArray(technology)
        ? technology
        : [technology].filter(Boolean);
      project.technology = techArr;
    }
    if (collaborator !== undefined) {
      const collaboratorArray = Array.isArray(collaborator)
        ? collaborator
        : [collaborator].filter(Boolean);
      if (collaboratorArray.length > 0) {
        const collaboratorRegex = collaboratorArray.map(c =>
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

        const invalidCollaborators = collaboratorArray.filter(c =>
          !validIdentifiers.has(c.toLowerCase())
        );

        if (invalidCollaborators.length > 0) {
          return next(new ApiError(
            400,
            `Invalid collaborators: ${invalidCollaborators.join(', ')}. ` +
            'They must be existing usernames or emails.'
          ));
        }
        project.collaborator = collaboratorArray;
      }
      else {
        project.collaborator = [];
      }

    }
    if (links) {
      project.links = links;
    }
    if (videoLink) {
      project.videoLink = videoLink;
    }
    if (stillOngoing != undefined) {
      const isOngoing = (stillOngoing === true || stillOngoing === 'true');
      project.isOngoing = isOngoing;
      if (!isOngoing && !endDate) {
        return next(new ApiError(400, 'End Date is required for non-ongoing projects'));
      }
      }
      if (startDate) {
        project.startDate = startDate;
      }
      if (endDate) {
        project.endDate = endDate;
      }
      if (category) {
        project.category = category;
      }
      if (description) {
        project.description = description;
      }
      try{
    let existingMedia = [];
    try {
      if (req.body.existingMedia) {
        existingMedia = JSON.parse(req.body.existingMedia);
      }
    } catch (e) {
      return next(new ApiError(400, 'Invalid existingMedia format'));
    }

    // Delete media not in existingMedia list
    const mediaToDelete = project.media.filter(
      mediaKey => !existingMedia.includes(mediaKey)
    );
    
    await Promise.all(
      mediaToDelete.map(key => deleteFromR2(key))
    );
    
    // Update project media with kept files
    project.media = existingMedia;
      } catch (err) {
        return next(new ApiError(400, 'Invalid media format'));
      }
     if (req.files?.media) {
      const mediaFiles = Array.isArray(req.files.media) ? req.files.media : [req.files.media];
      for (const mediaFile of mediaFiles) {
        const mediaKey = `projects/${project._id}/media-${Date.now()}-${mediaFile.originalname}`;
        await uploadToR2(mediaKey, mediaFile.buffer, mediaFile.mimetype);
        project.media.push(mediaKey);
      }
    }

    if (req.files?.logo) {
      // Delete old logo
      if (project.logo) {
        await deleteFromR2(project.logo);
      }
      // Upload new logo
      const logoFile = Array.isArray(req.files.logo) ? req.files.logo[0] : req.files.logo;
      const logoKey = `projects/${project._id}/logo-${Date.now()}-${logoFile.originalname}`;
      await uploadToR2(logoKey, logoFile.buffer, logoFile.mimetype);
      project.logo = logoKey;
    } else if (removeLogo === 'true') {
      if (project.logo) {
        await deleteFromR2(project.logo);
        project.logo = null;
      }
    }

    await project.save();

    return res.status(200).json({
      message: 'Project updated successfully',
      status: 'success',
      data: {
        projectid: project._id,
        logo: project.logo ? `${config.S3_PUBLIC_URL}/${project.logo}` : null,
        media: project.media.map(key => `${config.S3_PUBLIC_URL}/${key}`)
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};


module.exports = {
  addProject,
  technologySuggestions,
  categorySuggestions,
  collaboratorSuggestions,
  project,
  ongoingFeed,
  fetchUserProjects,
  updateTopProjects,
  finishedFeed,
  sendCollabRequest,
  acceptCollabRequest,
  rejectCollabRequest,
  getCollabRequest,
  deleteProject,
  editProject,
};
