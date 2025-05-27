const mongoose = require('mongoose');
const savedItemSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      unique: true,
      required: true,
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }],
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'project' }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('SavedItem', savedItemSchema);
