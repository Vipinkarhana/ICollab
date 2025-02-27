const mongoose = require('mongoose');

let connectionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    connectedusers:[ {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      }],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        // delete ret.status; // TODO: Uncomment this line to hide the status field (v0)
         delete ret.updatedAt;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('userConnections', connectionSchema);