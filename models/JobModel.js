import mongoose from "mongoose";
import { COMPLAINT_STATUS, COMPLAINT_TYPE } from "../utils/constants.js";
const JobSchema = new mongoose.Schema(
  {
    company: String,
    position: String,
    jobStatus: {
      type: String,
      enum: Object.values(COMPLAINT_STATUS),
      default: COMPLAINT_STATUS.REPORTED,
    },
    jobType: {
      type: String,
      enum: Object.values(COMPLAINT_TYPE),
      default: COMPLAINT_TYPE.WATER,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
export default mongoose.model("Job", JobSchema);
