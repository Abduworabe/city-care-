import mongoose from "mongoose";

const ReplySchema = new mongoose.Schema(
  {
    author:  { type: mongoose.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true, maxlength: 2000 },
    likes:   [{ type: mongoose.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

const DiscussionSchema = new mongoose.Schema(
  {
    title:    { type: String, required: true, maxlength: 200 },
    content:  { type: String, required: true, maxlength: 5000 },
    author:   { type: mongoose.Types.ObjectId, ref: "User", required: true },
    category: {
      type: String,
      enum: ["general", "infrastructure", "water", "waste", "electricity", "roads", "announcement"],
      default: "general",
    },
    pinned:   { type: Boolean, default: false },
    closed:   { type: Boolean, default: false },
    likes:    [{ type: mongoose.Types.ObjectId, ref: "User" }],
    replies:  [ReplySchema],
    relatedJob: { type: mongoose.Types.ObjectId, ref: "Job" },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Virtual: reply count for list view
DiscussionSchema.virtual("replyCount").get(function () {
  return this.replies?.length || 0;
});

export default mongoose.model("Discussion", DiscussionSchema);
