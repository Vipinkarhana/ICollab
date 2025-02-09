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
    status: {
      type: String,
      enum: ['public', 'network', 'draft'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.updatedAt;
        // delete ret.status; // TODO: Uncomment this line to hide the status field (v0)
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('post', postschma);
