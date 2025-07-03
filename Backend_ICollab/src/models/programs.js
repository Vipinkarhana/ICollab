const mongoose = require('mongoose');

const programSchema = new mongoose.Schema({
  incubator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Incubator',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  duration: {
    type: Number,
    required: true,
    min: 1
  },
  startDate: {
    type: Date,
    required: true
  },
  fundingAmount: {
    type: Number,
    required: true,
    min: 0
  },
  level: {
    type: String,
    required: true,
    enum: ['beginner', 'intermediate', 'advanced']
  },
  mentorship: {
    type: Boolean,
    default: false
  },
  workspaceAccess: {
    type: Boolean,
    default: false
  },
  corporateAccess: {
    type: Boolean,
    default: false
  },
  mode: {
    type: String,
    required: true,
    enum: ['online', 'offline', 'hybrid']
  },
  uniqueFeatures: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

programSchema.index({ incubator: 1, startDate: 1 });

module.exports = mongoose.model('Program', programSchema);