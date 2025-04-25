const mongoose = require('mongoose');

const allowedTechnologies = require('../../config/technologies.json');
const allowedCategories = require('../../config/category.json');

let projectschema = mongoose.Schema(
  {
    user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          required: true,
    },
    name: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    problem: {
      type: String,
    },
    challenges: {
      type: String,
    },
    technology: {
      type: [String],
      enum: allowedTechnologies,
      required: true,
    },
    collaborator: {
      type: [String]
    },
    category: {
      type: String,
      enum: allowedCategories,
      required: true,
    },
    links: {
      type: String,
      required:true,
    },
    videoLink: {
      type: String,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
        type: Date,
    },
    // role: {
    //     type: String,
    //     required: true,
    // },
    media: {
      type: [String],
    },
    logo: {
      type: String,
    },
    // tags: {
    //   type: String,
    // },
    // collaborators: {
    //     type: String,
    //   },
    isOngoing: {
        type: Boolean
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.updatedAt;
        // delete ret.status; // TODO: Uncomment this line to hide the status field (v0)
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('project', projectschema);
