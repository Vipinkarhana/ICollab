const ApiError = require('../utils/ApiError');
const userModel = require('../models/user');
const postModel = require('../models/post');
const projectModel = require('../models/project');
const SavedItem = require('../models/savedItem');
const userConnections = require('../models/connections');
const profileModel = require('../models/profile'); // Make sure this path is correct

const profile = async (req, res, next) => {
  try {
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    if (!user || !user.profile) {
      throw new ApiError(404, 'User profile not found');
    }
    const profileId = user.profile.toString();
    const profile = await profileModel.findOne({ _id: profileId });
    if (!profile) {
      throw new ApiError(404, 'User profile not found');
    }
    res.status(200).json({
      message: 'User profile fetched',
      status: 'success',
      data: profile,
    });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  const { firstName, lastName, password, about, designation, skills, links } =
    req.body;
  const name = `${firstName} ${lastName}`;
  try {
    const username = req.user.username;
    const user = await userModel.findOneAndUpdate(
      { username: username },
      {
        $set: {
          name: name,
          password: password,
        },
      },
      { new: true }
    );
    const profile = await profileModel.findOneAndUpdate(
      { _id: user?.profile },
      {
        $set: {
          about: about,
          designation: designation,
          skills: skills,
          links: links,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: 'User Profile Updated',
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

const userProfile = async (req, res, next) => {
  try {
    const username = req.params.username;

    const user = await userModel.findOne({ username }).populate({
      path: 'profile',
      populate: {
        path: 'topProjects',
      },
    });

    console.log("User Profile: ",user);

    if (!user || !user.profile) {
      throw new ApiError(404, 'User profile not found');
    }

    const postCount = await postModel.countDocuments({ user: user._id });
    const projectCount = await projectModel.countDocuments({ user: user._id });

    const userProjects = await projectModel.find({ user: user._id });

    let collaboratorsSet = new Set();
    userProjects.forEach((project) => {
      project.collaborator?.forEach((collab) => {
        collaboratorsSet.add(collab);
      });
    });
    const collaboratorCount = collaboratorsSet.size;

    const saved = await SavedItem.findOne({ user: user._id });
    const savedPostsCount = saved?.savedPosts?.length || 0;
    const savedProjectsCount = saved?.savedProjects?.length || 0;
    const savedItemsCount = savedPostsCount + savedProjectsCount;

    res.status(200).json({
      message: 'User profile fetched successfully',
      status: 'success',
      data: {
        user,
        stats: {
          posts: postCount,
          projects: projectCount,
          collaborators: collaboratorCount,
          saved: savedItemsCount,
        },
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  profile,
  userProfile,
  updateProfile,
};
