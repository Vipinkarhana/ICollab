const mongoose = require('mongoose');
const Project = require('../src/models/project'); // adjust path to your model
const config = require('../config/config');

// Replace with your actual connection string
const MONGO_URI = config.MONGO_URI;

// Replace with your actual CDN or media base URLs
const BASE_URL = `${config.S3_PUBLIC_URL}/`;

/// helper to trim media name
function cleanMediaUrl(item) {
  if (!item || item.startsWith('https')) return item;

  const firstDash = item.indexOf('-');
  const secondDash = item.indexOf('-', firstDash + 1);

  if (firstDash !== -1 && secondDash !== -1) {
    const trimmed = item.substring(0, secondDash); // up to second dash
    const extension = item.substring(item.lastIndexOf('.')); // get file extension
    return BASE_URL + trimmed + extension;
  }

  return BASE_URL + item; // fallback if no second dash
}

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const projects = await Project.find({});

    for (const project of projects) {
      let needsUpdate = false;

      // Fix media URLs
      if (Array.isArray(project.media)) {
        const updatedMedia = project.media.map((item) => {
          const cleaned = cleanMediaUrl(item);
          if (cleaned !== item) needsUpdate = true;
          return cleaned;
        });
        project.media = updatedMedia;
      }

      // Fix logo URL
      if (project.logo && !project.logo.startsWith('https')) {
        const cleanedLogo = cleanMediaUrl(project.logo);
        if (cleanedLogo !== project.logo) {
          project.logo = cleanedLogo;
          needsUpdate = true;
        }
      }

      if (needsUpdate) {
        await project.save({ validateBeforeSave: false });
        console.log(`Updated project: ${project.name}`);
      }
    }

    console.log('All projects checked.');
    mongoose.disconnect();
  } catch (err) {
    console.error('Error updating projects:', err);
    mongoose.disconnect();
  }
})();
