const mongoose = require('mongoose');

let projectschema = mongoose.Schema(
  {
    user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
        type: String,
        required: true,
      },
    startDate: {
        type: Date,
        required: true,
      },
    endDate: {
        type: Date,
      },
    role: {
        type: String,
        required: true,
      },
    media: {
      type: [String],
    },
    tags: {
      type: String,
    },
    collaborators: {
        type: String,
      },
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
