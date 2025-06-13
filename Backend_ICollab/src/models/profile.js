const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  institution: String,
  degree: String,
  fieldOfStudy: String,
  startDate: Date,
  endDate: Date,
  current: Boolean,
});

const experienceSchema = new mongoose.Schema({
  company: String,
  position: String,
  startDate: Date,
  endDate: Date,
  current: Boolean,
  description: String,
});

const profileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      // required: true
    },

    about: {
      type: String,
    },

    designation: {
      type: String,
    },

    address: {
      state: {
        type: String,
        // required: true
      },
      country: {
        type: String,
        // required: true
      },
      city: {
        type: String,
        // required: true
      }
    },

    skills: {
      type: [String],
      validate: [arrayLimit, '{PATH} exceeds the limit of 5'],
    },

    links: {
      type: [String],
    },

    topProjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
      },
    ],
    education: [educationSchema],
    experience: [experienceSchema],
    resume: String,
  },
  { timestamps: true }
);

function arrayLimit(val) {
  return val.length <= 5;
}

profileSchema.path('topProjects').validate(function (val) {
  return val.length <= 3;
}, 'You can only pin up to 3 projects.');

module.exports = mongoose.model('profile', profileSchema);
