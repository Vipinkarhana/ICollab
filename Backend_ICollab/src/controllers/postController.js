const postModel = require('../models/post');
const commentModel = require('../models/comment');
const ApiError = require('../utils/ApiError');
const config = require('../../config/config');
const userModel = require('../models/user');
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
        select: 'username profile_pic name designation'
      }
    });
    
    if (!user) {
      return next(new ApiError(404, 'User not found'));
    }

    res.status(200).json({
      message: 'User posts retrieved successfully',
      data: user.posts,
      status: 'success'
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

    post.media.push(updatedMedia);
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
      .sort({ createdAt: -1 })
      .limit(10)
      .populate('user', 'username name profile_pic designation');

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
    let presignedUrls;
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });
    const { postid, newcontent } = req.body;
    const post = await postModel.findOne({ _id: postid, user: user._id });

    if (!post) return next(new ApiError(404, 'Post not found or unauthorized'));
    if (newcontent) post.content = newcontent;
    
    if(req.body.data){

        const stringsArray = [];
        const media = [];
    try {
        const combinedArray = req.body.data; // Parse JSON data

        combinedArray.forEach(item => {
            if (typeof item === "string") {
                stringsArray.push(item); // Add to string array
            } else if (typeof item === "object" && item.fileName && item.fileType) {
                media.push(item); // Add file metadata to files array
            }
        });


         // Find media to be deleted
         const existingMedia = post.media || [];
         const mediaToDelete = existingMedia.filter((mediaUrl) => !stringsArray.includes(mediaUrl));
 
         // Delete old media from R2
         await Promise.all(mediaToDelete.map((url) => deleteFromR2(url)));


         post.media = stringsArray;
         post.status = "draft";

    } catch (error) {
        return next(error);
    }


    if(media.length>0){
      presignedUrls = await Promise.all(
        media.map(async ({ fileType, fileName }) => {
          const key = `posts/${post._id}/${Date.now()}-${fileName}`;
          return await generatePresignedUrl(key, fileType);
        })
      );
    }
      }

    await post.save();

    res.status(200).json({
      message: 'Post updated successfully',
      data: presignedUrls,
      status: 'success',
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};




const deletePost = async (req, res, next) => {
  try {
    const { postid } = req.body;
    const username = req.user.username;
    const user = await userModel.findOne({ username: username });

    const post = await postModel.findOne({ _id: postid, user: user._id });

    if (!post) return next(new ApiError(404, 'Post not found or unauthorized'));

    // Delete media from Cloudflare R2
    if ( post?.media?.length > 0) {
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
  deletePost
};
