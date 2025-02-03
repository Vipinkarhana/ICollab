const mongoose = require('mongoose');

let commentschma = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
    },
    {
        timestamps: true,
        toJSON: {
          transform: (doc, ret) => {
            delete ret._id;
            delete ret.__v;
            return ret;
          },
        },
      },
  );

module.exports = mongoose.model('comment', commentschma);