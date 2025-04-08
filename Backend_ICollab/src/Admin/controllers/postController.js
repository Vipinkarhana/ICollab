const userModel = require('../../models/user');
const ApiError = require('../../utils/ApiError');

const getMyAllPost = async (req, res) => {
  try {
    const { username } = req.query;
    console.log(username);
    const user = await userModel.findOne({ username }).populate({
      path: 'posts',
      populate: {
        path: 'user',
        select: 'username profile_pic name designation',
      },
    });

    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    res.status(200).json({
      message: 'User posts retrieved successfully',
      data: user.posts,
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getMyAllPost };
