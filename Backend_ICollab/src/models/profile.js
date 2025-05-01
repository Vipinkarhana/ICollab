const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    // required: true
  },

  about: {
    type: String
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
    }
  },

  skills: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds the limit of 5']
  },

  links: {
    type: [String]
  },

  stats: {
    posts: {
      type: Number,
      default: 0
    },
    projects: {
      type: Number,
      default: 0
    },
    collaborators: {
      type: Number,
      default: 0
    },
    savedItems: {
      type: Number,
      default: 0
    }
  },

  topProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project'
  }]
}, { timestamps: true });

function arrayLimit(val) {
  return val.length <= 5;
}

profileSchema.path('topProjects').validate(function (val) {
  return val.length <= 3;
}, 'You can only pin up to 3 projects.');

module.exports = mongoose.model('profile', profileSchema);
