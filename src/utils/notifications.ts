import { NotificationSettings } from '../types';
import { GAZA_CONSCIENCE_MESSAGES } from '../data/gazaQuotes';

export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop/mobile notifications.');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

export const sendGazaNotification = (title?: string, body?: string): boolean => {
  if (!('Notification' in window) || Notification.permission !== 'granted') {
    return false;
  }

  const randomQuote = GAZA_CONSCIENCE_MESSAGES[Math.floor(Math.random() * GAZA_CONSCIENCE_MESSAGES.length)];
  const notifTitle = title || `🇵🇸 Monthly Grocery Conscience Reminder`;
  const notifBody = body || `${randomQuote.quote} — Keep your monthly grocery basket 100% Boycott-Free!`;

  try {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(notifTitle, {
          body: notifBody,
          icon: '/icons/icon-192.png',
          badge: '/icons/icon-192.png',
          tag: 'monthly-grocery-reminder',
          data: {
            url: '/'
          }
        });
      });
    } else {
      new Notification(notifTitle, {
        body: notifBody,
        icon: '/icons/icon-192.png'
      });
    }
    return true;
  } catch (e) {
    console.error('Error firing notification:', e);
    return false;
  }
};

export const checkAndScheduleMonthlyReminder = (settings: NotificationSettings): void => {
  if (!settings.enabled || Notification.permission !== 'granted') {
    return;
  }

  const today = new Date();
  const currentDay = today.getDate();
  const currentMonthYear = `${today.getFullYear()}-${today.getMonth() + 1}`;

  // If today matches user's preferred grocery day and hasn't triggered this month
  if (currentDay === settings.monthlyDay && settings.lastTriggered !== currentMonthYear) {
    sendGazaNotification(
      '🛒 Time for Monthly Grocery Shopping!',
      'Don’t buy the blood of your brothers and sisters in Gaza. Review your shopping list with safe, ethical alternatives now.'
    );
    settings.lastTriggered = currentMonthYear;
  }
};
