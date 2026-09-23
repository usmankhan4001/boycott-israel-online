import { create } from 'zustand';
import { AppNotification } from '../types';
import { INITIAL_NOTIFICATIONS } from '../data/notifications';
import { api } from '../lib/api';

const STORAGE_KEYS = {
  NOTIFICATIONS: 'bio_app_notifications'
};

const getStoredNotifications = (): AppNotification[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return INITIAL_NOTIFICATIONS;
};

const saveStoredNotifications = (notifications: AppNotification[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  } catch {}
};

interface NotificationState {
  notifications: AppNotification[];
  isLoading: boolean;
  
  // Computed
  getUnreadCount: () => number;

  // Actions
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  addNotification: (data: {
    title: string;
    message: string;
    type?: 'post' | 'comment' | 'system' | 'reminder';
    link?: string;
  }) => Promise<AppNotification>;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: getStoredNotifications(),
  isLoading: false,

  getUnreadCount: () => {
    return get().notifications.filter((n) => !n.isRead).length;
  },

  fetchNotifications: async () => {
    try {
      set({ isLoading: true });
      const res = await api.notifications.list();
      if (res?.notifications && res.notifications.length > 0) {
        set({ notifications: res.notifications, isLoading: false });
        saveStoredNotifications(res.notifications);
      } else {
        set({ notifications: getStoredNotifications(), isLoading: false });
      }
    } catch {
      set({ notifications: getStoredNotifications(), isLoading: false });
    }
  },

  markAsRead: async (id: string) => {
    const updated = get().notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    );
    set({ notifications: updated });
    saveStoredNotifications(updated);

    try {
      await api.notifications.markRead(id);
    } catch {}
  },

  markAllAsRead: async () => {
    const updated = get().notifications.map((n) => ({ ...n, isRead: true }));
    set({ notifications: updated });
    saveStoredNotifications(updated);

    try {
      await api.notifications.markAllRead();
    } catch {}
  },

  addNotification: async (data) => {
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: data.title.trim(),
      message: data.message.trim(),
      type: data.type || 'system',
      link: data.link || undefined,
      isRead: false,
      createdAt: new Date().toISOString()
    };

    const updated = [newNotif, ...get().notifications];
    set({ notifications: updated });
    saveStoredNotifications(updated);

    try {
      await api.notifications.create(newNotif);
    } catch {}

    return newNotif;
  },

  deleteNotification: (id: string) => {
    const updated = get().notifications.filter((n) => n.id !== id);
    set({ notifications: updated });
    saveStoredNotifications(updated);
  },

  clearAll: () => {
    set({ notifications: [] });
    saveStoredNotifications([]);
  }
}));
