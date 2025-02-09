const postModel = require('../models/post');
const commentModel = require('../models/comment');
const ApiError = require('../utils/ApiError');
const config = require('../../config/config');
const userModel = require('../models/user');
const { URL } = require('url');

const { generatePresignedUrl } = require('../../config/s3');

const addpost = async (req, res, next) => {
  try {
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    const { content, media } = req.body;

    if (!content) return next(new ApiError(400, 'Content is required'));
    const newPost = new postModel({
      user: user._id,
      content,
    });

    await newPost.save();

    const presignedUrls = await Promise.all(
      media.map(async ({ fileType, fileName }) => {
        const key = `posts/${newPost._id}/${Date.now()}-${fileName}`;
        return await generatePresignedUrl(key, fileType);
      })
    );

    res.status(201).json({
      message: 'Post created successfully',
      data: { postid: newPost._id, presignedUrls },
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

const addPostMedia = async (req, res, next) => {
  const { postid, media } = req.body;
  try {
    const post = await postModel.findOne({ _id: postid, status: 'draft' });

    if (!post) return next(new ApiError(404, 'Post not found'));

    const updatedMedia = media.map((url) => {
      const urlObj = new URL(url);
      const filePath = urlObj.pathname;
      return `${config.S3_PUBLIC_URL}${filePath}`;
    });

    post.media = updatedMedia;
    post.status = 'public';
    await post.save();
    await post.populate('user', 'username name profile_pic designation');

    res.status(200).json({
      message: 'Post media added successfully',
      data: post,
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

const likepost = async (req, res, next) => {
  try {
    const postid = req.body.postid; //dummy post id
    //post = await postModel.findOne({'_id':postid});
    const newPost = await postModel.updateOne(
      { _id: postid },
      { $inc: { likes: 1 } }
    );
    res.json(newPost);
  } catch (err) {
    next(err);
  }
};

const feed = async (req, res, next) => {
  try {
    const { timestamp } = req.query; // the timestamp sent by the frontend

    if (!timestamp) {
      return next(new ApiError(400, 'Timestamp is required'));
    }

    const date = new Date(Number(timestamp));

    const posts = await postModel
      .find({ createdAt: { $lt: date }, status: 'public' })
      .sort({ createdAt: -1 }) // Sort to show posts in order of creation
      .limit(30) // Limit the result to 30 posts (or whatever the desired chunk is)
      .populate('user', 'username name profile_pic designation');

    res.status(201).json({
      message: 'Feed fetched successfully',
      data: posts,
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addpost,
  addPostMedia,
  likepost,
  feed,
};
