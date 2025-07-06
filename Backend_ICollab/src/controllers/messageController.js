const user = require("../models/user");
const Message = require("../models/Message");
const getMessagesByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const messages = await Message.find({ group: groupId })
      .sort({ createdAt: 1 })
      .populate("sender", "name email");

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error fetching group messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getMessagesByGroup
};
