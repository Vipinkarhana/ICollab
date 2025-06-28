const jwt = require("jsonwebtoken");
const config = require("../../config/config");

const isloggedin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded; // So you can use req.user.id
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token is invalid or expired" });
  }
};

module.exports = { isloggedin };
