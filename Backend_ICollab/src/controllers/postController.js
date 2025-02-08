const postModel = require('../models/post');
const commentModel = require('../models/comment');
const ApiError = require('../utils/ApiError');
const config = require('../../config/config');
const userModel = require('../models/user');
const { URL } = require('url'); 

const { generatePresignedUrl } = require('../../config/s3');

const addpost = async (req, res, next) => {
    try{
      const username = req.user.username;
      const user = await userModel.findOne({'username': username});
      const {content, media} = req.body;

      if(!content) res.status(400).json({error: "Content is required."});
      const newPost = new postModel({
        user: user._id, content, 
      });

      await newPost.save();

      const presignedUrls = await Promise.all(
        media.map(async ({ fileType, fileName }) => {
          const key = `posts/${newPost._id}/${Date.now()}-${fileName}`;
          return await generatePresignedUrl(key, fileType);
        })
      );

      res.status(201).json({
        message: "Post created successfully", 
        data: { postid: newPost._id, presignedUrls }, 
        status: 'success'});
    }
    catch(err){
      next(err);
    }
  };

const addPostMedia = async (req, res, next) => {
    const { postid, media } = req.body;
    try {
      const post = await postModel.findOne({ '_id': postid, 'status': 'draft' });

      if (!post) return res.status(404).json({ error: "Post not Found" });

      const updatedMedia = media.map(url => {
        const urlObj = new URL(url);
        const filePath = urlObj.pathname;
        return `${config.S3_PUBLIC_URL}${filePath}`;
      });

      post.media = updatedMedia;
      post.status = 'public';
      await post.save();
      await post.populate("user", "username name profile_pic designation");

      res.status(200).json({
        message: "Post media added successfully",
        data: post,
        status: 'success'
      });
      
    } catch (err) {
      next(err);
    }
};
  
  const likepost = async (req, res, next) => {
    try{
      const postid = req.body.postid; //dummy post id
      //post = await postModel.findOne({'_id':postid});
      const newPost = await postModel.updateOne(
        {_id : postid},
        { $inc: { likes: 1 } },
      );
      res.json(newPost);
    }
    catch(err){
      next(err);
    }
  };
  
  
  const feed = async (req, res, next) => {
    try{
      const timestamp = req.body.timestamp; // the timestamp sent by the frontend
  
    if (!timestamp) {
      return res.status(400).json({ error: 'Timestamp is required' });
    }
  
       // Convert timestamp to Date format
       const date = new Date(Number(timestamp));
  
      // Fetch posts after the provided timestamp
      const posts = await postModel.find({ createdAt: { $gt: date } })
        .sort({ createdAt: -1 }) // Sort to show posts in order of creation
        .limit(20) // Limit the result to 20 posts (or whatever the desired chunk is)
        .populate('user')
        .populate('comments');
  
      return res.json(posts);
    }
    catch(err){
      res.status(500).json({error: "Server Error"});
    }
  };

  module.exports = {
    addpost,
    addPostMedia,
    likepost,
    feed,
  };