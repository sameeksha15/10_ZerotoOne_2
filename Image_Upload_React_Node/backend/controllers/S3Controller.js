import { getS3UploadUrl } from "../utils/S3File.js";
import File from "../models/FileSchema.js";

export const getFileUploadUrl = async (req, res, next) => {
  try {
    const fileType = req.body.fileType || "mp3";
    const url = await getS3UploadUrl(fileType);

    if (!url)
      return res
        .status(404)
        .send({ success: false, message: "Failed to generate upload URL" });

    res.status(200).send({ success: true, message: "url generated", url });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
};