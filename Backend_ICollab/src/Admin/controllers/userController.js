const userModel = require('../../models/user');

const getAllUsers = async (req, res, next) => {
    try {
      const users = await userModel.find().select(
        'name username profile_pic email designation role'
      );
  
      res.status(200).json({
        message: 'All users retrieved successfully',
        data: users,
        status: 'success',
      });
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = { getAllUsers };
  