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
    designation: {
      type: String,
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
    username: {
      type: String,
      unique: true,
      required: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'profile',
      required: false,
    },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'post',
      default: [],
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
        delete ret.emailToken;
        // delete ret.posts;
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

userschma.pre('save', function (next) {
  if (this.isModified('username')) {
    this.username = this.username.toLowerCase();
  }
  if (this.isModified('email')) {
    this.email = this.email.toLowerCase();
  }
  next();
});

module.exports = mongoose.model('user', userschma);
