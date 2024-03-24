import AWS from "aws-sdk";

import File from "../models/FileSchema.js";
import dotenv from "dotenv";

import { flaskRequest } from "../utils/ForwardRequestToFlask.js";

dotenv.config({ path: "backend/Config/config.env" });

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new AWS.S3();

export const createFile = async (req, res, next) => {
  try {
    let data = {
      fileName: req.body.fileName,
      fileSize: req.body.fileSize,
      date: req.body.date,
      time: req.body.time,
      completed: false,
    };

    if (req.body.s3Name) {
      data = {
        ...data,
        s3Name: req.body.s3Name,
      };
    }

    const file = await File.create(data);
    res.status(200).send({
      success: true,
      fileId: file._id,
      message: "File created successfully",
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error });
  }
};

export const forwardRequest = async (req, res, next) => {
  await flaskRequest(req.body.content, res);
  // try {
  //   res
  //     .status(201)
  //     .send({ success: true, message: "File created successfully" });
  // } catch (error) {
  //   res.status(500).send({ success: false, message: "File creation failed" });
  // }
};
