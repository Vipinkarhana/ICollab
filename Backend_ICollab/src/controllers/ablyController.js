require("dotenv").config(); // Ensure .env is loaded
const Ably = require("ably");
const Room = require("../models/Room");

const ably = new Ably.Rest(process.env.ABLY_API_KEY);

// ✅ Controller: Generate Ably Token (for user-authorized channels)
const generateToken = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Generating token for user:", userId);
    console.log("ABLY_API_KEY exists?", !!process.env.ABLY_API_KEY);

    if (!process.env.ABLY_API_KEY) {
      return res.status(500).json({ error: "ABLY_API_KEY not configured" });
    }

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
        if (err) {
          console.error("Ably Token Creation Error:", err);
          return res.status(500).json({ error: "Token creation failed" });
        }

        return res.json(tokenRequest);
      }
    );
  } catch (err) {
    console.error("GenerateToken Crash:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// ✅ Controller: Get Ably Channel History
const getHistory = async (req, res) => {
  const { channelId, limit = 50 } = req.query;

  if (!channelId) {
    return res.status(400).json({ error: "channelId is required" });
  }

  try {
    const page = await ably.channels.get(channelId).history({ limit: parseInt(limit) });
    const messages = page.items.reverse(); // oldest messages first
    res.json(messages);
  } catch (err) {
    console.error("Ably history error:", err);
    res.status(500).json({ error: "Failed to fetch message history" });
  }
};

module.exports = {
  generateToken,
  getHistory,
};
