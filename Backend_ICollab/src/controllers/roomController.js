const Room = require("../models/Room");
const Group = require("../models/Group");

const getMyRooms = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming userId is sent in the request body
    console.log(`Fetching rooms for user: ${userId}`);
    

    // Find all rooms where user is a member
    const rooms = await Room.find({ members: userId })
      .lean(); // Better performance if you're not modifying documents

    // Fetch groups for each room
    const roomIds = rooms.map((room) => room._id);
    const groups = await Group.find({ room: { $in: roomIds } })
      .select("name room _id isDefault")
      .lean();

    // Attach groups to rooms
    const groupedByRoom = {};
    for (const group of groups) {
      const roomId = group.room.toString();
      if (!groupedByRoom[roomId]) groupedByRoom[roomId] = [];
      groupedByRoom[roomId].push(group);
    }

    const roomsWithGroups = rooms.map((room) => ({
      ...room,
      groups: groupedByRoom[room._id.toString()] || [],
    }));

    res.status(200).json({
      message: "Rooms fetched successfully",
      data: roomsWithGroups,
      status: "success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {getMyRooms};
