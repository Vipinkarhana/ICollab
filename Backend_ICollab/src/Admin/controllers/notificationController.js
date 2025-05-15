const Notification = require('../../models/notification.js');
const { sendSSE } = require("../routes/sseRoute.js");

// Send notification
const sendNotification = async (req, res) => {
  const { recipient, message } = req.body;
  if (!recipient || !message)
    return res.status(400).json({ error: 'All fields required' });

  try {
    if (recipient === "all") {
      const users = await Notification.find({}, "username");
      await Promise.all(
        users.map(async (user) => {
          await Notification.findOneAndUpdate(
            { username: user.username },
            { $push: { messages: { text: message } } },
            { upsert: true, new: true }
          );
          sendSSE(recipient, { text: message, createdAt: new Date() });
        })
      );
    } else {
      await Notification.findOneAndUpdate(
        { username: recipient },
        { $push: { messages: { text: message } } },
        { upsert: true, new: true }
      );
      sendSSE(recipient, { text: message });
    }

    res.status(200).json({ message: "Notification sent" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get last 10 sent messages (admin view)
const getLatestNotifications = async (req, res) => {
  try {
    const latest = await Notification.find().sort({ createdAt: -1 }).limit(10);
    res.json(latest);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get notifications for a specific user
const getUserNotifications = async (req, res) => {
  const { username } = req.params;
  try {
    const notif = await Notification.findOne({ username });
    res.json(notif?.messages || []);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const markAsRead = async (req, res) => {
  const { username, messageId } = req.body;
  try {
    await Notification.updateOne(
      { username, "messages._id": messageId },
      { $set: { "messages.$.read": true } }
    );
    res.status(200).json({ message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

const deleteNotification = async (req, res) => {
  const { username, messageId } = req.body;
  try {
    await Notification.updateOne(
      { username },
      { $pull: { messages: { _id: messageId } } }
    );
    res.status(200).json({ message: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};



module.exports = {
  sendNotification,
  getLatestNotifications,
  getUserNotifications,
  markAsRead,
  deleteNotification
};
