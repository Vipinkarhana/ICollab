const mongoose = require('mongoose');

const savedItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'itemType',
    },
    itemType: {
      type: String,
      required: true,
      enum: ['post', 'project'],
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model('SavedItem', savedItemSchema);
