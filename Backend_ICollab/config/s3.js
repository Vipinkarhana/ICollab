const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { v4: uuidv4 } = require("uuid");
const config = require("./config");

const s3 = new S3Client({
    region: config.S3_REGION,
    endpoint: config.S3_API_ENDPOINT,
    credentials: {
        accessKeyId: config.S3_ACCESS_KEY,
        secretAccessKey: config.S3_SECRET_ACCESS_KEY,
    },
});

async function generatePresignedUrl(filename, contentType) {
    const command = new PutObjectCommand({ 
        Bucket: config.S3_BUCKET_NAME, 
        Key: filename,
        ContentType: contentType,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 120 });
    return signedUrl;
}

module.exports = {generatePresignedUrl };