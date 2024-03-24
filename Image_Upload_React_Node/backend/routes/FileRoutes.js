import express from "express";
import {
  createFile,
  forwardRequest,
} from "../controllers/FileController.js";

const router = express.Router();

router.route("/upload/file").post(createFile);

router.route("/forward-to-backend").post(forwardRequest);

export default router;
