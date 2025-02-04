// middlewares/sanitizeMiddleware.js
const sanitize = require('mongo-sanitize');

const sanitizeInput = (req, res, next) => {
  if (req.body) {
    req.body = sanitize(req.body); // Sanitize the body to prevent NoSQL injection
  }
  if (req.query) {
    req.query = sanitize(req.query); // Sanitize query parameters
  }
  if (req.params) {
    req.params = sanitize(req.params); // Sanitize URL parameters
  }
  next(); // Proceed to the next middleware
};

module.exports = sanitizeInput;