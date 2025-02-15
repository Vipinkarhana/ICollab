const mongoose = require('mongoose');

let profileschma = mongoose.Schema(
  {
    social: {
      linkedin: {
        type: String,
      },
      twitter: {
        type: String,
      },
      github: {
        type: String,
      },
    },
    about: {
      type: String,
    },
    experience: {
      company: String,
      startDate: Date,
      endDate: Date,
      role: String,
      desc: String,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('profile', profileschma);
