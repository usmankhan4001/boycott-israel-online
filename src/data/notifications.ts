import { AppNotification } from '../types';

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    title: 'Welcome to Boycott Israel Online! 🇵🇸',
    message: 'Empower your daily consumer choices with verified boycott data, barcode scanner, and ethical local alternatives.',
    type: 'system',
    link: '/directory',
    isRead: false,
    createdAt: '2025-01-01T00:00:00.000Z'
  },
  {
    id: 'notif-2',
    title: 'Victory: Puma Ends IFA Contract',
    message: 'Global grassroots boycott efforts succeeded in ending Puma\'s sponsorship of the Israel Football Association.',
    type: 'post',
    link: '/community',
    isRead: false,
    createdAt: '2025-01-20T14:30:00.000Z'
  },
  {
    id: 'notif-3',
    title: 'Barcode Verification Tip',
    message: 'Always check product barcodes starting with 729 or inspect parent conglomerates before checkout.',
    type: 'reminder',
    link: '/scanner',
    isRead: false,
    createdAt: '2025-02-01T10:00:00.000Z'
  },
  {
    id: 'notif-4',
    title: 'New Community Stories Published',
    message: 'Read real stories on switching to Pakistani household brands and share your own boycott journey.',
    type: 'post',
    link: '/community',
    isRead: false,
    createdAt: '2025-02-15T09:00:00.000Z'
  }
];
