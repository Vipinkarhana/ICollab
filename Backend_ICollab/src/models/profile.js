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
  }
);

module.exports = mongoose.model('profile', profileschma);