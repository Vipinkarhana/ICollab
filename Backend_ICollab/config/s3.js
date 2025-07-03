const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { v4: uuidv4 } = require('uuid');
const config = require('./config');

const s3 = new S3Client({
  region: config.S3_REGION,
  endpoint: config.S3_API_ENDPOINT,
  credentials: {
    accessKeyId: config.S3_ACCESS_KEY,
    secretAccessKey: config.S3_SECRET_ACCESS_KEY,
  },
});

function generatePublicUrl(key) {
  return `${config.S3_PUBLIC_URL}/${key}`;
}

const uploadToR2 = async (key, buffer, contentType) => {
  const command = new PutObjectCommand({
    Bucket: config.S3_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
  });
  await s3.send(command);
  return generatePublicUrl(key);
};

const deleteFromR2 = async (fileUrl) => {
  try {
    // Extract key from URL
    // const urlObj = new URL(fileUrl);
    // const key = urlObj.pathname.substring(1); // Remove leading "/"
    const key = fileUrl.replace(`${config.S3_PUBLIC_URL}/`, '');
    const command = new DeleteObjectCommand({
      Bucket: config.S3_BUCKET_NAME,
      Key: key,
    });

    await s3.send(command);
    console.log(`Deleted file from R2: ${fileUrl}`);
  } catch (err) {
    console.error('Error deleting file from R2:', err);
  }
};

async function generatePresignedUrl(filename, contentType) {
  const command = new PutObjectCommand({
    Bucket: config.S3_BUCKET_NAME,
    Key: filename,
    ContentType: contentType,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 120 });
  return signedUrl;
}


async function generateDownloadUrl(fileUrl, expiresIn = 3600) {
  const key = extractKeyFromUrl(fileUrl);
  const command = new GetObjectCommand({
    Bucket: config.S3_BUCKET_NAME,
    Key: key,
  });

  return getSignedUrl(s3, command, { expiresIn });
}

// Add helper to extract key from URL
function extractKeyFromUrl(fileUrl) {
  const urlObj = new URL(fileUrl);
  return urlObj.pathname.substring(1);
}

module.exports = { generatePresignedUrl, deleteFromR2, uploadToR2, generateDownloadUrl , extractKeyFromUrl, generatePublicUrl };
