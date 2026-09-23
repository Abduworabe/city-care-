import Discussion from "../models/DiscussionModel.js";
import { StatusCodes } from "http-status-codes";

// GET /discussions
export const getDiscussions = async (req, res) => {
  const { category, search, page: pg } = req.query;
  const query = {};
  if (category && category !== "all") query.category = category;
  if (search) {
    query.$or = [
      { title:   { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }
  const page  = Number(pg) || 1;
  const limit = 10;
  const skip  = (page - 1) * limit;

  const discussions = await Discussion.find(query)
    .sort({ pinned: -1, createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .populate("author", "name lastName avatar role")
    .select("-replies");

  const total = await Discussion.countDocuments(query);

  res.status(StatusCodes.OK).json({
    discussions,
    total,
    numOfPages: Math.ceil(total / limit),
    currentPage: page,
  });
};

// GET /discussions/:id
export const getDiscussion = async (req, res) => {
  const discussion = await Discussion.findById(req.params.id)
    .populate("author", "name lastName avatar role")
    .populate("replies.author", "name lastName avatar role");
  if (!discussion) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Discussion not found" });
  res.status(StatusCodes.OK).json({ discussion });
};

// POST /discussions
export const createDiscussion = async (req, res) => {
  req.body.author = req.user.userId;
  const discussion = await Discussion.create(req.body);
  await discussion.populate("author", "name lastName avatar role");
  res.status(StatusCodes.CREATED).json({ discussion });
};

// DELETE /discussions/:id
export const deleteDiscussion = async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);
  if (!discussion) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Not found" });
  const isOwner = discussion.author.toString() === req.user.userId;
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) return res.status(StatusCodes.FORBIDDEN).json({ msg: "Not authorized" });
  await discussion.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Discussion deleted" });
};

// POST /discussions/:id/reply
export const addReply = async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Content required" });
  const discussion = await Discussion.findById(req.params.id);
  if (!discussion) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Discussion not found" });
  if (discussion.closed && req.user.role !== "admin")
    return res.status(StatusCodes.FORBIDDEN).json({ msg: "Discussion is closed" });

  discussion.replies.push({ author: req.user.userId, content });
  await discussion.save();
  await discussion.populate("replies.author", "name lastName avatar role");

  res.status(StatusCodes.CREATED).json({ replies: discussion.replies });
};

// DELETE /discussions/:id/reply/:replyId
export const deleteReply = async (req, res) => {
  const discussion = await Discussion.findById(req.params.id);
  if (!discussion) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Not found" });
  const reply = discussion.replies.id(req.params.replyId);
  if (!reply) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Reply not found" });
  const isOwner = reply.author.toString() === req.user.userId;
  const isAdmin = req.user.role === "admin";
  if (!isOwner && !isAdmin) return res.status(StatusCodes.FORBIDDEN).json({ msg: "Not authorized" });
  reply.deleteOne();
  await discussion.save();
  res.status(StatusCodes.OK).json({ msg: "Reply deleted" });
};

// PATCH /discussions/:id/pin  (admin only)
export const togglePin = async (req, res) => {
  if (req.user.role !== "admin") return res.status(StatusCodes.FORBIDDEN).json({ msg: "Admin only" });
  const discussion = await Discussion.findById(req.params.id);
  if (!discussion) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Not found" });
  discussion.pinned = !discussion.pinned;
  await discussion.save();
  res.status(StatusCodes.OK).json({ pinned: discussion.pinned });
};

// PATCH /discussions/:id/close  (admin only)
export const toggleClose = async (req, res) => {
  if (req.user.role !== "admin") return res.status(StatusCodes.FORBIDDEN).json({ msg: "Admin only" });
  const discussion = await Discussion.findById(req.params.id);
  if (!discussion) return res.status(StatusCodes.NOT_FOUND).json({ msg: "Not found" });
  discussion.closed = !discussion.closed;
  await discussion.save();
  res.status(StatusCodes.OK).json({ closed: discussion.closed });
};
