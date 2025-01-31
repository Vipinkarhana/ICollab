const crypto = require("crypto");
const User = require("../models/user");

const generateUniqueUsername = async (email) => {
  if (!email.includes("@")) throw new Error("Invalid email format");

  const [firstPart, secondPart] = email.split("@"); // Extract email parts

  // Hash the domain and take first 5 characters
  const domainHash = crypto.createHash("sha256").update(secondPart).digest("hex").substring(0, 5);

  // Generate a random 4-digit suffix
  const randomSuffix = Math.floor(1000 + Math.random() * 9000); // Ensures a 4-digit number

  let username = `${firstPart}_${domainHash}${randomSuffix}`;

  return username;
};

module.exports = generateUniqueUsername;