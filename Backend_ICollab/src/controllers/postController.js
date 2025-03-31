const postModel = require('../models/post');
const commentModel = require('../models/comment');
const ApiError = require('../utils/ApiError');
const config = require('../../config/config');
const userModel = require('../models/user');
const connectionModel = require('../models/connections');
const { URL } = require('url');
const { generatePresignedUrl, deleteFromR2 } = require('../../config/s3');
  

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
    user.posts.push(newPost._id);
    await user.save();

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

const getMyPost = async (req, res, next) => {
  try {
    const username = req.user.username;
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
    post.media.push(...updatedMedia);
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
    const connection = await connectionModel.findOne({ user: req.user.id });
    //const connection = await connectionModel.findOne({ user: req.body.userid });
    const connectionIds = connection?.connectedusers || [];
    console.log("Connection IDs:", connectionIds);
    const posts = await postModel.aggregate([
  {
    $match: {
      createdAt: { $lt: date },
      status: 'public'
    }
  },
  {
    $addFields: {
      isConnection: {
        $cond: { if: { $in: ['$user', connectionIds] }, then: 1, else: 0 }
      }
    }
  },
  {
    $sort: { createdAt: -1 }
  },
  {
    $limit: 10
  },
  {
    $sort: { isConnection: -1 }
  },
  {
    $lookup: {
      from: 'users',           // the collection name for users
      localField: 'user',      // field in posts referencing the user
      foreignField: '_id',     // field in users to join on
      as: 'user'
    }
  },
  {
    $unwind: '$user'
  },
  {
    $project: {
      // Projecting specific user fields similar to populate
      'user.username': 1,
      'user.name': 1,
      'user.profile_pic': 1,
      'user.designation': 1,
      // Optionally project other post fields if needed, e.g.:
      media: 1,
      tag:1,
      comments:1,
      likes:1,
      content: 1,
      createdAt: 1,
      isConnection: 1
    }
  }
]);


    res.status(200).json({
      message: 'Feed fetched successfully',
      data: posts,
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

const editPost = async (req, res, next) => {
  try {
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    const { postid, newcontent, existingMedia, newMedia } = req.body;

    const post = await postModel.findOne({ _id: postid, user: user._id });
    if (!post) return next(new ApiError(404, 'Post not found or unauthorized'));

    if (newcontent) {
      post.content = newcontent;
    }

    const mediaToDelete = (post.media || []).filter(
      (mediaUrl) => !existingMedia.includes(mediaUrl)
    );

    await Promise.all(mediaToDelete.map((url) => deleteFromR2(url)));

    post.media = existingMedia;
    post.status = 'draft';

    let presignedUrls = [];
    if (newMedia && newMedia.length > 0) {
      presignedUrls = await Promise.all(
        newMedia.map(async ({ fileType, fileName }) => {
          const key = `posts/${post._id}/${Date.now()}-${fileName}`;
          return await generatePresignedUrl(key, fileType);
        })
      );
    }

    await post.save();

    return res.status(200).json({
      message: 'Post updated successfully',
      status: 'success',
      data: { postid: post._id, presignedUrls },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { postid } = req.body;
    const username = req.user.username;
    console.log(postid, username);
    const user = await userModel.findOne({ username: username });

    const post = await postModel.findOne({ _id: postid, user: user._id });

    if (!post) return next(new ApiError(404, 'Post not found or unauthorized'));

    // Delete media from Cloudflare R2
    if (post?.media?.length > 0) {
      console.log(post.media);
      await Promise.all(post.media.map((url) => deleteFromR2(url)));
    }

    // Remove post from user's posts array
    await userModel.updateOne({ _id: user._id }, { $pull: { posts: postid } });

    // Delete post from database
    await postModel.deleteOne({ _id: postid });

    res.status(200).json({
      message: 'Post deleted successfully',
      status: 'success',
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addpost,
  getMyPost,
  addPostMedia,
  likepost,
  feed,
  editPost,
  deletePost,
};
