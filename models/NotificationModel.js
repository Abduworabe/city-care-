import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    recipient: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: [
        "complaint_submitted",   // admin notified when citizen submits
        "status_updated",        // citizen notified when admin updates status
        "complaint_resolved",    // citizen notified when resolved
        "complaint_closed",      // citizen notified when closed
        "admin_message",         // admin sends custom message to user
        "new_user_registered",   // admin notified when new user registers
      ],
      required: true,
    },
    title: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false },
    relatedJob: {
      type: mongoose.Types.ObjectId,
      ref: "Job",
    },
    metadata: { type: Object, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
