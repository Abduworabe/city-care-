import Notification from "../models/NotificationModel.js";
import User from "../models/UserModel.js";
import { StatusCodes } from "http-status-codes";

// ── Helper: create a notification ──────────────────────────────────────────
export const createNotification = async ({
  recipient, sender, type, title, message, relatedJob, metadata = {},
}) => {
  try {
    await Notification.create({ recipient, sender, type, title, message, relatedJob, metadata });
  } catch (err) {
    console.error("Notification creation failed:", err.message);
  }
};

// ── GET /notifications  — get current user's notifications ────────────────
export const getNotifications = async (req, res) => {
  const page  = Number(req.query.page)  || 1;
  const limit = Number(req.query.limit) || 20;
  const skip  = (page - 1) * limit;

  const notifications = await Notification.find({ recipient: req.user.userId })
    .sort("-createdAt")
    .skip(skip)
    .limit(limit)
    .populate("sender", "name lastName avatar role");

  const total  = await Notification.countDocuments({ recipient: req.user.userId });
  const unread = await Notification.countDocuments({ recipient: req.user.userId, isRead: false });

  res.status(StatusCodes.OK).json({ notifications, total, unread, numOfPages: Math.ceil(total / limit) });
};

// ── PATCH /notifications/:id/read — mark one as read ───────────────────────
export const markAsRead = async (req, res) => {
  await Notification.findOneAndUpdate(
    { _id: req.params.id, recipient: req.user.userId },
    { isRead: true }
  );
  res.status(StatusCodes.OK).json({ msg: "Marked as read" });
};

// ── PATCH /notifications/read-all — mark all as read ───────────────────────
export const markAllAsRead = async (req, res) => {
  await Notification.updateMany(
    { recipient: req.user.userId, isRead: false },
    { isRead: true }
  );
  res.status(StatusCodes.OK).json({ msg: "All marked as read" });
};

// ── DELETE /notifications/:id — delete one ─────────────────────────────────
export const deleteNotification = async (req, res) => {
  await Notification.findOneAndDelete({ _id: req.params.id, recipient: req.user.userId });
  res.status(StatusCodes.OK).json({ msg: "Notification deleted" });
};

// ── DELETE /notifications/clear-all — delete all ───────────────────────────
export const clearAllNotifications = async (req, res) => {
  await Notification.deleteMany({ recipient: req.user.userId });
  res.status(StatusCodes.OK).json({ msg: "All notifications cleared" });
};

// ── POST /notifications/send — admin sends message to a user ───────────────
export const sendAdminMessage = async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(StatusCodes.FORBIDDEN).json({ msg: "Admin only" });
  }
  const { recipientId, title, message, relatedJob } = req.body;
  if (!recipientId || !title || !message) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: "recipientId, title and message are required" });
  }
  const recipient = await User.findById(recipientId);
  if (!recipient) {
    return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found" });
  }
  await createNotification({
    recipient: recipientId,
    sender: req.user.userId,
    type: "admin_message",
    title,
    message,
    relatedJob: relatedJob || null,
  });
  res.status(StatusCodes.CREATED).json({ msg: "Message sent" });
};

// ── GET /notifications/unread-count — lightweight badge count ──────────────
export const getUnreadCount = async (req, res) => {
  const count = await Notification.countDocuments({
    recipient: req.user.userId,
    isRead: false,
  });
  res.status(StatusCodes.OK).json({ count });
};
