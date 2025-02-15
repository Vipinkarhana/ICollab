// Migrating profile.posts to user.posts

const mongoose = require('mongoose');
const userModel = require('../src/models/user');
const profileModel = require('../src/models/profile');
const postModel = require('../src/models/post');
const connectDB = require('../config/DB');
require('dotenv').config();

async function migratePostsToUser() {
  connectDB();

  const users = await userModel.find().populate('profile'); // Fetch users with profiles

  for (const user of users) {
    if (user.profile) {
      // Fetch posts from profile
      const posts = await postModel.find({ _id: { $in: user.profile.posts } });

      // Move posts to user
      await userModel.updateOne({ _id: user._id }, { 
        $set: { posts: posts.length > 0 ? posts.map(post => post._id) : [] } 
      });

      // Remove posts reference from profile
      await profileModel.updateOne({ _id: user.profile._id }, { $unset: { posts: "" } });
    }
  }

  console.log("Migration completed!");
  mongoose.connection.close();
}

migratePostsToUser().catch(console.error);
