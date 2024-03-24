import dotenv from "dotenv";
import aws from "aws-sdk";
import crypto from "crypto";
import { promisify } from "util";
const randomBytes = promisify(crypto.randomBytes);

dotenv.config({ path: "backend/Config/config.env" });

const region = process.env.AWS_REGION;
const bucketName = process.env.AUDIO_BUCKET;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export const getS3UploadUrl = async (fileType) => {
  const rawBytes = await randomBytes(16);
  const fileName = rawBytes.toString("hex") + `.${fileType}`;

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Expires: 60,
  };
try {
   const uploadURL = await s3.getSignedUrlPromise("putObject", params);
   return uploadURL;
} catch (error) {
  return undefined;
}
 
};
