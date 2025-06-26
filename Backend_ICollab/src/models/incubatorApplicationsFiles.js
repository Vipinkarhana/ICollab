const mongoose = require('mongoose');
const { Schema } = mongoose;

const FileSchema = new Schema({
  incubator: {
    type: Schema.Types.ObjectId,
    ref: 'Incubator',
    required: true
  },
  field: {
    type: String,
    required: true // e.g. 'graduatedProof', 'infrastructureProof'
  },
  filename: {
    type: String,
    required: true // storage key or GridFS ObjectId
  },
  originalName: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true // e.g. 'application/pdf'
  },
  size: {
    type: Number,
    required: true // in bytes
  },
  url: {
    type: String // optional, if using external storage
  },
  uploadDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('File', FileSchema);
