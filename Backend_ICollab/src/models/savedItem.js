const mongoose = require('mongoose');

const savedItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
      required: true,
    },
    savedPosts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post', // Reference to the Post model
      },
    ],
    savedProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project', // Reference to the Project model
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('SavedItem', savedItemSchema);
