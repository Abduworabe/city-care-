import { createContext, useContext, useState, useEffect, useCallback } from "react";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount]     = useState(0);
  const [loading, setLoading]             = useState(false);
  const [page, setPage]                   = useState(1);
  const [numOfPages, setNumOfPages]       = useState(1);

  const fetchNotifications = useCallback(async (p = 1) => {
    try {
      setLoading(true);
      const { data } = await customFetch.get(`/notifications?page=${p}&limit=20`);
      setNotifications(p === 1 ? data.notifications : (prev) => [...prev, ...data.notifications]);
      setUnreadCount(data.unread);
      setNumOfPages(data.numOfPages);
      setPage(p);
    } catch (_) {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUnreadCount = useCallback(async () => {
    try {
      const { data } = await customFetch.get("/notifications/unread-count");
      setUnreadCount(data.count);
    } catch (_) {}
  }, []);

  const markAsRead = async (id) => {
    try {
      await customFetch.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (_) {}
  };

  const markAllAsRead = async () => {
    try {
      await customFetch.patch("/notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (_) {}
  };

  const deleteNotification = async (id) => {
    try {
      await customFetch.delete(`/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      setUnreadCount((c) => Math.max(0, c - 1));
    } catch (_) {}
  };

  const clearAll = async () => {
    try {
      await customFetch.delete("/notifications/clear-all");
      setNotifications([]);
      setUnreadCount(0);
    } catch (_) {}
  };

  const sendAdminMessage = async ({ recipientId, title, message, relatedJob }) => {
    try {
      await customFetch.post("/notifications/send", { recipientId, title, message, relatedJob });
      toast.success("Message sent successfully");
      return true;
    } catch (err) {
      toast.error(err?.response?.data?.msg || "Failed to send message");
      return false;
    }
  };

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30000);
    return () => clearInterval(interval);
  }, [fetchUnreadCount]);

  return (
    <NotificationContext.Provider
      value={{
        notifications, unreadCount, loading, page, numOfPages,
        fetchNotifications, markAsRead, markAllAsRead,
        deleteNotification, clearAll, sendAdminMessage, fetchUnreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used inside NotificationProvider");
  return ctx;
};
