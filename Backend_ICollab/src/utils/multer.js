const multer = require('multer');

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg',
  'application/pdf': 'pdf',
};

const fileUpload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
    files: 1 // Single file
  },
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid file type');
    cb(error, isValid);
  },
});

const incubatorFileUpload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max
    files: 15 // Single file
  },
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid file type');
    cb(error, isValid);
  },
});

const resumeUpload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB for PDFs
     files: 1 // Single file
  },
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid file type');
    cb(error, isValid);
  },
});


const eventUpload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max per file
    files: 20 // Max 20 files (banner + max 19 speakers)
  },
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error('Invalid file type. Only images are allowed');
    cb(error, isValid);
  },
});


module.exports = {
    fileUpload,
    resumeUpload,
    eventUpload,
    incubatorFileUpload
};