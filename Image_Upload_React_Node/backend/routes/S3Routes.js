import express from "express";

import {
  getFileUploadUrl,
} from "../controllers/S3Controller.js";

const router = express.Router();

router
  .route("/getFileUploadUrl")
  .put(getFileUploadUrl);

export default router;
