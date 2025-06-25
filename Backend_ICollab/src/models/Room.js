const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      unique: true,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    channelId: {
      type: String,
      required: true,
      unique: true,
    },
    group:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: "Group",
          required: true,
        }],
    // defaultGroup: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Group",
    //   required: true,
    // },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
