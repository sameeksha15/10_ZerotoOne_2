import { Schema, model } from "mongoose";

const schema = {
  s3Name: { type: String },
  fileName: { type: String, required: true },
  fileSize: { type: String },
  date: {
    day: { type: String, required: true },
    month: { type: String, required: true },
    year: { type: String, required: true },
  },
  time: { type: String, required: true },
  completed: { type: Boolean, required: true },
};

const FileSchema = new Schema(schema, { timestamps: true });

export default model("File", FileSchema);