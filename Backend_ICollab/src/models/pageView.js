const mongoose = require('mongoose');

const pageViewSchema = mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PageView', pageViewSchema);
