import { Router } from "express";
import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
  sendAdminMessage,
  getUnreadCount,
} from "../controllers/notificationController.js";

const router = Router();

// Specific routes MUST come before /:id to avoid param conflicts
router.get("/",              getNotifications);
router.get("/unread-count",  getUnreadCount);
router.post("/send",         sendAdminMessage);
router.patch("/read-all",    markAllAsRead);
router.delete("/clear-all",  clearAllNotifications);

// Param routes last
router.patch("/:id/read",    markAsRead);
router.delete("/:id",        deleteNotification);

export default router;
