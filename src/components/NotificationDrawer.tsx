import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, 
  CheckCheck, 
  Trash2, 
  MessageSquare, 
  MessageCircle, 
  ShieldAlert, 
  Sparkles, 
  Clock, 
  ExternalLink,
  Settings,
  X,
  Volume2
} from 'lucide-react';
import { useNotificationStore } from '../stores/notificationStore';
import { useTranslation } from '../i18n/useTranslation';
import { Sheet } from './ui/sheet';
import { AppNotification } from '../types';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, clearAll } = useNotificationStore();
  const { t, isUrdu } = useTranslation();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'unread' | 'reminder' | 'post'>('all');
  const [showSettings, setShowSettings] = useState(false);
  const [pushEnabled, setPushEnabled] = useState(() => {
    return typeof Notification !== 'undefined' && Notification.permission === 'granted';
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const filteredNotifications = notifications.filter(n => {
    if (filter === 'unread') return !n.isRead;
    if (filter === 'reminder') return n.type === 'reminder';
    if (filter === 'post') return n.type === 'post' || n.type === 'comment';
    return true;
  });

  const handleNotificationClick = (item: AppNotification) => {
    if (!item.isRead) {
      markAsRead(item.id);
    }
    if (item.link) {
      onClose();
      navigate(item.link);
    }
  };

  const handleRequestPush = async () => {
    if (typeof Notification === 'undefined') return;
    try {
      const perm = await Notification.requestPermission();
      if (perm === 'granted') {
        setPushEnabled(true);
        new Notification('Boycott Israel Online', {
          body: 'Conscience alerts enabled! You will receive timely boycott updates.'
        });
      }
    } catch {}
  };

  const getIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'post':
        return <MessageSquare className="w-4 h-4 text-blue-500" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-emerald-500" />;
      case 'reminder':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'system':
      default:
        return <Sparkles className="w-4 h-4 text-rose-500" />;
    }
  };

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return isUrdu ? 'ابھی' : 'Just now';
      if (diffMins < 60) return isUrdu ? `${diffMins} منٹ پہلے` : `${diffMins}m ago`;
      if (diffHours < 24) return isUrdu ? `${diffHours} گھنٹے پہلے` : `${diffHours}h ago`;
      if (diffDays < 7) return isUrdu ? `${diffDays} دن پہلے` : `${diffDays}d ago`;
      return date.toLocaleDateString();
    } catch {
      return '';
    }
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      side="right"
      title={
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <Bell className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-black tracking-tight text-zinc-900 dark:text-white">
              {isUrdu ? 'نوٹیفیکیشن سنٹر' : 'Notification Center'}
            </h3>
            <p className="text-[11px] text-zinc-400 font-semibold">
              {unreadCount > 0 
                ? (isUrdu ? `${unreadCount} نئی اطلاعات موجود ہیں` : `${unreadCount} unread conscience alerts`)
                : (isUrdu ? 'تمام اطلاعات دیکھی جا چکی ہیں' : 'All caught up')}
            </p>
          </div>
        </div>
      }
      className="max-w-md w-full"
    >
      <div className="space-y-4">
        {/* Top Controls: Filter Pills & Action Buttons */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                  filter === 'all'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
                }`}
              >
                {isUrdu ? 'تمام' : 'All'} ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                  filter === 'unread'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
                }`}
              >
                {isUrdu ? 'غیر خواندہ' : 'Unread'} ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('reminder')}
                className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                  filter === 'reminder'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
                }`}
              >
                {isUrdu ? 'یاد دہانیاں' : 'Reminders'}
              </button>
              <button
                onClick={() => setFilter('post')}
                className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                  filter === 'post'
                    ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200'
                }`}
              >
                {isUrdu ? 'کمیونٹی' : 'Community'}
              </button>
            </div>

            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              title="Notification Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Actions Row */}
          <div className="flex items-center justify-between text-xs font-bold text-zinc-500 pt-1 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            {unreadCount > 0 ? (
              <button
                onClick={() => markAllAsRead()}
                className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 hover:underline active:scale-95 transition-all"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>{isUrdu ? 'تمام کو پڑھا ہوا نشان زد کریں' : 'Mark all as read'}</span>
              </button>
            ) : (
              <span className="text-[11px] text-zinc-400">
                {isUrdu ? 'کوئی نیا الرٹ نہیں' : 'No new unread alerts'}
              </span>
            )}

            {notifications.length > 0 && (
              <button
                onClick={() => clearAll()}
                className="flex items-center gap-1 text-rose-500 hover:text-rose-600 hover:underline active:scale-95 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{isUrdu ? 'سب صاف کریں' : 'Clear all'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Push Notification Toggle Setting Box */}
        {showSettings && (
          <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 space-y-2 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                  {isUrdu ? 'براؤزر پش الرٹس' : 'Push Conscience Alerts'}
                </span>
              </div>
              <button
                onClick={handleRequestPush}
                className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                  pushEnabled
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300'
                }`}
              >
                {pushEnabled ? (isUrdu ? 'فعال ہے ✓' : 'Enabled ✓') : (isUrdu ? 'فعال کریں' : 'Enable')}
              </button>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              {isUrdu 
                ? 'گروسری خریداری اور نئی مہمات کے بائیکاٹ نوٹیفیکیشنز اپنے ڈیوائس پر موصول کریں۔'
                : 'Get periodic reminders before monthly grocery shopping and critical boycott updates.'}
            </p>
          </div>
        )}

        {/* Notifications List */}
        <div className="space-y-2">
          {filteredNotifications.length === 0 ? (
            <div className="p-10 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 space-y-2">
              <Bell className="w-7 h-7 text-zinc-300 dark:text-zinc-600 mx-auto" />
              <p className="text-sm font-bold text-zinc-600 dark:text-zinc-400">
                {isUrdu ? 'اس وقت کوئی اطلاع نہیں ہے' : 'No notifications found'}
              </p>
              <p className="text-xs text-zinc-400">
                {isUrdu ? 'نئے الرٹس اور کمیونٹی اپ ڈیٹس یہاں ظاہر ہوں گے۔' : 'New boycott updates and community activity will show here.'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notif) => (
              <div
                key={notif.id}
                onClick={() => handleNotificationClick(notif)}
                className={`group relative p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  notif.isRead
                    ? 'bg-white dark:bg-zinc-900/60 border-zinc-150 dark:border-zinc-800/80 hover:border-zinc-300 dark:hover:border-zinc-700'
                    : 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-500/30 shadow-2xs hover:border-emerald-500/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 shrink-0 shadow-2xs">
                    {getIcon(notif.type)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h4 className={`text-xs sm:text-sm font-bold truncate ${
                        notif.isRead ? 'text-zinc-800 dark:text-zinc-200' : 'text-zinc-950 dark:text-white font-black'
                      }`}>
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-zinc-400 shrink-0 whitespace-nowrap">
                        {formatTime(notif.createdAt)}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                      {notif.message}
                    </p>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/60 text-[11px]">
                      {notif.link ? (
                        <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400">
                          <span>{isUrdu ? 'تفصیل دیکھیں' : 'View details'}</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      ) : (
                        <span />
                      )}

                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {!notif.isRead && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notif.id);
                            }}
                            className="text-zinc-400 hover:text-emerald-600 text-[10px] font-bold"
                          >
                            {isUrdu ? 'پڑھا ہوا' : 'Mark read'}
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteNotification(notif.id);
                          }}
                          className="text-zinc-400 hover:text-rose-600 p-0.5"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {!notif.isRead && (
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </Sheet>
  );
};
