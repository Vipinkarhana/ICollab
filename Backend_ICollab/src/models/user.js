const mongoose = require('mongoose');

let userschma = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
      default: '/assets/Avatar.png',
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin', 'incubator', 'organization'],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    emailToken: { type: String },
    phone_no: {
      type: Number,
      // unique: true, // TODO: NULL is allowed for now
      required: false,
    },
    social: {
      type: String,
      unique: true,
      required: false,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.isVerified;
        return ret;
      },
    },
  }
);

module.exports = mongoose.model('user', userschma);
