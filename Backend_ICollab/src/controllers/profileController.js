const ApiError = require('../utils/ApiError');
const userModel = require('../models/user');
const profileModel = require('../models/profile');
const { late } = require('zod');

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
  const { firstName, lastName, password, about, designation, skills, links } = req.body;
  console.log(req.body);
  const name = `${firstName} ${lastName}`;
  const newProfileData = { about, designation, skills, links };
  console.log(req.user);
  const username = req.user.username;
  try{
    const user = await userModel.findOneAndUpdate(
      { username: username },
      { $set: {
        name: name,
        password: password
      } },
      { new: true }
    )
    console.log(user);
    const profile = await profileModel.findOneAndUpdate(
      { _id: user?.profile },
      { $set: { 
        about: about,
        designation: designation,
        skills: skills,
        links: links
      } },
      { new: true }
    )
    console.log(profile)

    res.status(200).json({
      message: "User Profile Updated",
      status: 'success'
    })
  }
  catch(err){
    next(err);
  }
}

const userprofile = async (req, res, next) => {
  try {
    const username = req.params.username;
    const user = await userModel
      .findOne({ username: username })
      .populate('profile')
      .populate({ path: 'posts', populate: { path: 'user' } });
    if (!user || !user.profile) {
      throw new ApiError(404, 'User profile not found');
    }
    res.status(200).json({
      message: 'User profile fetched',
      status: 'success',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  profile,
  userprofile,
  updateProfile
};
