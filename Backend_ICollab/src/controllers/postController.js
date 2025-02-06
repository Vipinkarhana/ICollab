const postModel = require('../models/post');
const commentModel = require('../models/comment');
const ApiError = require('../utils/ApiError');
const config = require('../../config/config');

const addpost = async (req, res, next) => {
    try{
      const username = ayushbadola;
      user = userModel.findOne({'username': username});
      const {content, media, tag} = req.body;
      if(!content) res.status(400).json({error: "Content is required."});
      const newPost = new postModel({
        user, content, media, tag,
      });
      await newPost.save();
      res.status(201).json({message: "Post created successfully", post: newPost});
    }
    catch(err){
      res.status(500).json({ error: "Server error" });
    }
  };
  
  const likepost = async (req, res, next) => {
    try{
      const postid = 1234567890; //dummy post id
      //post = await postModel.findOne({'_id':postid});
      const newPost = await postModel.updateOne(
        {_id : postid},
        { $inc: { likes: 1 } },
      );
    }
    catch(err){
      res.status(500).json({error: "Server Error"});
    }
  };
  
  
  const feed = async (req, res, next) => {
    try{
      const { timestamp } = req.query; // the timestamp sent by the frontend
  
    if (!timestamp) {
      return res.status(400).json({ error: 'Timestamp is required' });
    }
  
       // Convert timestamp to Date format
       const date = new Date(Number(timestamp));
  
      // Fetch posts after the provided timestamp
      const posts = await postModel.find({ createdAt: { $gt: date } })
        .sort({ createdAt: -1 }) // Sort to show posts in order of creation
        .limit(20); // Limit the result to 20 posts (or whatever the desired chunk is)
  
      return res.json(posts);
    }
    catch(err){
      res.status(500).json({error: "Server Error"});
    }
  };

  module.exports = {
    addpost,
    likepost,
    feed,
  };