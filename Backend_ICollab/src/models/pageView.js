const mongoose = require('mongoose');

const pageViewSchema = mongoose.Schema({
  page: { type: String, required: true, unique: true },
  views: {
    type: Map,
    of: Number, // stores: { "YYYY-MM-DD": count }
    default: {},
  },
});

module.exports = mongoose.model('PageView', pageViewSchema);
