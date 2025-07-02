const Room = require("../models/Room");
const Group = require("../models/Group");
const user = require("../models/user");
const getMyRooms = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming userId is sent in the request body
    console.log(`Fetching rooms for user: ${userId}`);
    

    // Find all rooms where user is a member
    const rooms = await Room.find({ members: userId })
      .lean(); // Better performance if you're not modifying documents

    console.log(`Fetched ${rooms} rooms for user ${userId}`);

    // Fetch groups for each room
    const roomIds = rooms.map((room) => room._id);
    const groups = await Group.find({ room: { $in: roomIds } })
      .select("name room _id isDefault members").populate({
        path: "members",
        select: "name _id",
      })
      .lean();
    console.log(`Fetched ${groups} groups for user ${userId}`);

    // Attach groups to rooms
    const groupedByRoom = {};
    for (const group of groups) {
      const { _id, ...rest } = group;
      console.log(`Processing group: ${_id} in room: ${rest}`);
      const roomId = group.room.toString();
      if (!groupedByRoom[roomId]) groupedByRoom[roomId] = [];
      groupedByRoom[roomId].push({id: _id, ...rest});
    }

    console.log(`Groups grouped by room:`, groupedByRoom);

    const roomsWithGroups = rooms.map(({_id, ...room}) => ({
      id: _id,
      ...room,
      groups: groupedByRoom[_id] || [],
    }));

    console.log(`Rooms fetched for user ${userId}:`, roomsWithGroups);

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
