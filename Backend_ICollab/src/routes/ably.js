const express = require("express");
const router = express.Router();
const Ably = require("ably");
const Room = require("../models/Room");

const ably = new Ably.Rest(process.env.ABLY_API_KEY);

// ✅ Route 1: Generate Ably Token (only for user's rooms)
router.get("/token", async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware

    const rooms = await Room.find({ members: userId });

    if (!rooms.length) {
      return res.status(403).json({ error: "User not part of any rooms" });
    }

    const capabilities = {};
    rooms.forEach((room) => {
      capabilities[room.channelId] = ["subscribe", "publish", "presence"];
    });

    ably.auth.createTokenRequest(
      {
        clientId: userId,
        capability: JSON.stringify(capabilities),
      },
      (err, tokenRequest) => {
        if (err) return res.status(500).json({ error: "Token error" });
        res.json(tokenRequest);
      }
    );
  } catch (err) {
    console.error("Ably token error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ✅ Route 2: Get Ably Channel History
router.get("/history", async (req, res) => {
  const { channelId, limit = 50 } = req.query;

  if (!channelId) return res.status(400).json({ error: "channelId is required" });

  try {
    const page = await ably.channels.get(channelId).history({ limit: parseInt(limit) });
    const messages = page.items.reverse(); // oldest first
    res.json(messages);
  } catch (err) {
    console.error("Ably history error:", err);
    res.status(500).json({ error: "Failed to fetch message history" });
  }
});

module.exports = router;
