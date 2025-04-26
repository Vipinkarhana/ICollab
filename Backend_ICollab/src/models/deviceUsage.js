const mongoose = require('mongoose');

const deviceUsageSchema = mongoose.Schema(
  {
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

module.exports = mongoose.model('DeviceUsage', deviceUsageSchema);
