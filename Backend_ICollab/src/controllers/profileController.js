const ApiError = require('../utils/ApiError');
const userModel = require('../models/user');
const postModel = require('../models/post');
const projectModel = require('../models/project');
const SavedItem = require('../models/savedItem');
const userConnections = require('../models/connections');
const profileModel = require('../models/profile'); // Make sure this path is correct
const { uploadToR2, deleteFromR2 } = require('../../config/s3');
const { v4: uuidv4 } = require('uuid');
const config = require('../../config/config');

const profile = async (req, res, next) => {
  try {
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    if (!user || !user.profile) {
      throw new ApiError(404, 'User profile not found');
    }
    // Convert to plain objects
    const userObj = user.toObject();
    const profileObj = user.profile.toObject();

    const response = {
      ...profileObj,
      profile_pic: user.profile_pic === '/assets/Avatar.png' 
        ? user.profile_pic 
        : `${config.S3_PUBLIC_URL}/${user.profile_pic}`,
        links: profileObj.links || [],
    };


    res.status(200).json({
      message: 'User profile fetched',
      status: 'success',
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res, next) => {
  const { firstName, lastName, password, about, designation, skills, links, education, experience, address } =
    req.body;
  // const name = `${firstName} ${lastName}`;
  try {
    const username = req.user.username;
    const user = await userModel.findOne({ username });
    
    if (!user) throw new ApiError(404, 'User not found');

    // Update user fields
    if (firstName || lastName) {
      user.name = `${firstName || user.name.split(' ')[0]} ${lastName || user.name.split(' ')[1]}`;
      await user.save();
    }

    // Prepare profile update
    const profileUpdate = {
      about,
      designation,
      skills: Array.isArray(skills) ? skills : [],
      links: Array.isArray(links) ? links : [],
      ...(address && { address }),
      ...(education && { education }),
      ...(experience && { experience }),
    };

    // Update profile
    const profile = await profileModel.findOneAndUpdate(
      { _id: user.profile },
      { $set: profileUpdate },
      { new: true, runValidators: true }
    );



    res.status(200).json({
      message: 'User Profile Updated',
      status: 'success',
      data: profile
    });
  } catch (err) {
    next(err);
  }
};


const getExtension = (mimetype) => {
  const mimeToExt = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
  };
  return mimeToExt[mimetype] || 'jpg';
};



const updateProfilePicture = async (req, res, next) => {
  try {
    if (!req.file) throw new ApiError(400, 'No file uploaded');
    
    const username = req.user.username;
    const user = await userModel.findOne({ username }).populate('profile');
    
    if (!user) throw new ApiError(404, 'User not found');
    
    // Delete old picture if exists
    if (user.profile.profilePicture) {
      await deleteFromR2(user.profile.profilePicture);
    }

     const extension = getExtension(req.file.mimetype);
    if (!extension) throw new ApiError(400, 'Unsupported image format');

    // Upload new picture
    const fileKey = `profile-pictures/${uuidv4()}.${extension}`;
    console.log(fileKey);
    await uploadToR2(fileKey, req.file.buffer, req.file.mimetype);
    
    // Update profile
    const updatedUser = await userModel.findByIdAndUpdate(
      user._id,
      { profile_pic: `${config.S3_PUBLIC_URL}/${fileKey}` },
      { new: true }
    );

    res.status(200).json({
      message: 'Profile picture updated',
      status: 'success',
      data: { profilePicture: updatedUser.profile_pic }
    });
  } catch (err) {
    next(err);
  }
};



const updateResume = async (req, res, next) => {
  try {
    if (!req.file) throw new ApiError(400, 'No file uploaded');
    if (req.file.mimetype !== 'application/pdf') {
      throw new ApiError(400, 'Only PDF files are allowed');
    }

    const username = req.user.username;
    const user = await userModel.findOne({ username }).populate('profile');
    
    if (!user) throw new ApiError(404, 'User not found');
    
    // Delete old resume if exists
    if (user.profile.resume) {
      await deleteFromR2(user.profile.resume);
    }

    // Upload new resume
    const fileKey = `resumes/${uuidv4()}.pdf`;
    await uploadToR2(fileKey, req.file.buffer, req.file.mimetype);
    
    // Update profile
    const updatedProfile = await profileModel.findByIdAndUpdate(
      user.profile._id,
      { resume: `${config.S3_PUBLIC_URL}/${fileKey}` },
      { new: true }
    );

    res.status(200).json({
      message: 'Resume updated',
      status: 'success',
      data: { resume: updatedProfile.resume }
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
        user: {
          ...user.toJSON(),
        },
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
  updateProfilePicture,
  updateResume
};
