const Group = require("../models/Group");
const Room = require("../models/Room");

const createGroup = async (req, res) => {
  try {
    const { name, roomId, members = [], isDefault = false } = req.body;
    const createdBy = req.user.id
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    const roomMemberIds = room.members.map(id => id.toString());
    const invalidMembers = members.filter(memberId => !roomMemberIds.includes(memberId));

    if (invalidMembers.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Some members are not part of the room and cannot be added to the group",
        invalidMembers,
      });
    }

    const newGroup = new Group({
      name,
      room: roomId,
      members,
      isDefault,
      createdBy
    });

    await newGroup.save();

    return res.status(201).json({
      success: true,
      message: "Group created successfully",
      group: newGroup,
    });
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error
      return res.status(400).json({
        success: false,
        message: "A group with this name already exists in the room.",
      });
    }

    console.error("Error creating group:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = { createGroup };
