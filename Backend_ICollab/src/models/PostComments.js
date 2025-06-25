const mongoose = require('mongoose');

const postCommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostComment',
    default: null
  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PostComment'
  }]
}, { timestamps: true });

module.exports = mongoose.model('PostComment', postCommentSchema);