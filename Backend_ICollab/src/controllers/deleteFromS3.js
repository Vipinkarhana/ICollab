const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const config = require('../../config/config');

const s3 = new S3Client({
    region: 'auto',
    endpoint: config.S3_API_ENDPOINT,
    credentials: {
      accessKeyId: config.S3_ACCESS_KEY,
      secretAccessKey: config.S3_SECRET_ACCESS_KEY,
    },
  });
  
  const deleteFromR2 = async (fileUrl) => {
    try {
      const urlObj = new URL(fileUrl);
      const key = urlObj.pathname.substring(1); // Remove leading "/"
  
      const command = new DeleteObjectCommand({
        Bucket: config.S3_BUCKET,
        Key: key,
      });
  
      await s3.send(command);
      console.log(`Deleted file from R2: ${fileUrl}`);
    } catch (err) {
      console.error('Error deleting file from R2:', err);
    }
  };
  
  module.exports = { deleteFromR2 };