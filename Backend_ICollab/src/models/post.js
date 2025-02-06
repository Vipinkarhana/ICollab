const mongoose = require('mongoose');

  
  let postschma = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      content: {
        type: String,
        unique: true,
        required: true,
      },
      media: {
        type: [String],
      },
      tag: {
        type: [String],
      },
      comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'comment',
      },
      likes: {
        type: Number,
        default: 0,
      },
    },
    {
        timestamps: true,
        toJSON: {
          transform: (doc, ret) => {
            delete ret.__v;
            return ret;
          },
        },
      },
  );

  module.exports = mongoose.model('post', postschma);