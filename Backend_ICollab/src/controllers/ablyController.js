const Ably = require("ably");

// Generate Ably Token Request
const generateToken = async (req, res) => {
  try {
    const clientId = req.user.id; // from isloggedin middleware

    if (!clientId) {
      return res.status(401).json({ error: "Unauthorized: No user ID found" });
    }

    const apiKey = process.env.ABLY_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "Ably API key is not configured" });
    }

    console.log("🔐 Generating token for clientId:", clientId);

    const ably = new Ably.Rest({ key: apiKey });
    console.log("ably",ably)
    // ably.auth.createTokenRequest({ clientId }, (err, tokenRequest) => {
    //   if (err) {
    //     console.error("❌ Error creating Ably token request:", err);
    //     return res.status(500).json({ error: "Failed to generate token" });
    //   }

    //   console.log("✅ Token created successfully");
    //   res.status(200).json(tokenRequest);
    // });
    const tokendetails=await ably.auth.requestToken({clientId});
    res.status(200).json(tokendetails);
  } catch (err) {
    console.error("❌ Ably controller error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { generateToken };
