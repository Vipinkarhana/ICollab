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

const changeUserInfo = async (req, res, next) => {
  try {
    const username = req.user.username;
    let user = await userModel.findOne({ username: username });
    const { name, designation } = req.body;
    user = await userModel
      .findByIdAndUpdate(
        user._id,
        { $set: { name: name, designation: designation } },
        { new: true, lean: true }
      )
      .populate('profile');

    res.status(200).json({
      message: 'Successfully updated User Info',
      status: 'success',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const changeAbout = async (req, res, next) => {
  try {
    const username = req.user.username;
    const user = await userModel
      .findOne({ username: username })
      .populate('profile');
    const { about } = req.body;
    await profileModel.findByIdAndUpdate(user.profile._id, {
      $set: { about: about },
    });

    await user.populate('profile');
    res.status(200).json({
      message: 'Successfully updated About',
      status: 'success',
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

const changeExperience = async (req, res, next) => {
  try {
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    const { company, startDate, endDate, role, desc } = req.body;
    await profileModel.findByIdAndUpdate(user.profile._id, {
      $set: {
        experience: {
          company: company,
          startDate: startDate,
          endDate: endDate,
          role: role,
          desc: desc,
        },
      },
    });
    res.status(200).json({ message: 'Successfully updated Experience' });
  } catch (err) {
    next(err);
  }
};

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
  changeUserInfo,
  changeAbout,
  changeExperience,
  userprofile,
};
