const ApiError = require('../utils/ApiError');
const userModel = require('../models/user');
const profileModel = require('../models/profile');

const profile = async (req, res, next) => {
  try {
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    if(!user||!user.profile){
        throw new ApiError(404, 'User profile not found');
    }
    const profileId = user.profile.toString();
    const profile = await profileModel.findOne({'_id': profileId});
    if(!profile){
        throw new ApiError(404, 'User profile not found');
    }
    res.status(200).json({data: profile});
  } catch (err) {
    next(err);
  }
};

const changeAbout = async (req, res, next) => {
    try{
        const username = req.user.username;
        const user = await userModel.findOne({ username: username });
        const {about} = req.body
        await profileModel.findByIdAndUpdate(user.profile._id, {
                $set: { about: about },
              });
        res.status(200).json({message: "Successfully updated About"});
    }
    catch(err){
        next(err);
    }
};

const changeExperience = async (req, res, next) => {
    try{
        const username = req.user.username;
        const user = await userModel.findOne({ username: username });
        const {company, startDate, endDate, role, desc} = req.body
        await profileModel.findByIdAndUpdate(user.profile._id, {
                $set: { experience: {
                    company: company,
                    startDate: startDate,
                    endDate: endDate,
                    role: role,
                    desc: desc,
                } },
              });
              res.status(200).json({message: "Successfully updated Experience"});
    }
    catch(err){
        next(err);
    }
};

module.exports = {
  profile,
  changeAbout,
  changeExperience,
};
