import { GroceryItem, ProductItem, UserSuggestion, NotificationSettings } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';

const STORAGE_KEYS = {
  GROCERY_LIST: 'bio_grocery_list',
  USER_SUGGESTIONS: 'bio_user_suggestions',
  NOTIFICATION_SETTINGS: 'bio_notification_settings',
  DATA_SAVER: 'bio_data_saver_mode',
  THEME: 'bio_theme_mode',
  CUSTOM_PRODUCTS: 'bio_custom_products',
  EDITED_PRODUCTS: 'bio_edited_products_map',
  DELETED_PRODUCT_IDS: 'bio_deleted_product_ids',
  ADMIN_WEBHOOK_URL: 'bio_admin_webhook_url'
};

// Grocery List Operations
export const getStoredGroceryList = (): GroceryItem[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.GROCERY_LIST);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading grocery list:', e);
  }
  return [
    {
      id: 'g-1',
      name: 'Cooking Oil / Ghee',
      category: 'Food & Beverages',
      isBoycott: false,
      chosenAlternative: 'Sufi / Dalda (Pakistan)',
      checked: false,
      quantity: 1,
      unit: 'bottle'
    },
    {
      id: 'g-2',
      name: 'Tea Bags / Black Tea',
      category: 'Food & Beverages',
      isBoycott: false,
      chosenAlternative: 'Tapal Danedar (Pakistan)',
      checked: false,
      quantity: 1,
      unit: 'pack'
    },
    {
      id: 'g-3',
      name: 'Laundry Detergent',
      category: 'Detergents',
      isBoycott: false,
      chosenAlternative: 'Brite / BreeO / Sufi',
      checked: false,
      quantity: 1,
      unit: 'kg'
    }
  ];
};

export const saveStoredGroceryList = (list: GroceryItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.GROCERY_LIST, JSON.stringify(list));
  } catch (e) {
    console.error('Error saving grocery list:', e);
  }
};

// User Suggestions
export const getStoredSuggestions = (): UserSuggestion[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.USER_SUGGESTIONS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading suggestions:', e);
  }
  return [];
};

export const saveStoredSuggestion = (suggestion: UserSuggestion): UserSuggestion[] => {
  const list = getStoredSuggestions();
  const updated = [suggestion, ...list];
  try {
    localStorage.setItem(STORAGE_KEYS.USER_SUGGESTIONS, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving suggestions:', e);
  }
  return updated;
};

export const deleteStoredSuggestion = (id: string): UserSuggestion[] => {
  const list = getStoredSuggestions();
  const updated = list.filter(s => s.id !== id);
  try {
    localStorage.setItem(STORAGE_KEYS.USER_SUGGESTIONS, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting suggestion:', e);
  }
  return updated;
};

// Notification Settings
export const getStoredNotificationSettings = (): NotificationSettings => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATION_SETTINGS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error('Error loading notification settings:', e);
  }
  return {
    enabled: false,
    monthlyDay: 1,
    reminderTime: '10:00'
  };
};

export const saveStoredNotificationSettings = (settings: NotificationSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATION_SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Error saving notification settings:', e);
  }
};

// Data Saver Mode
export const getDataSaverMode = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEYS.DATA_SAVER) === 'true';
  } catch (e) {
    return false;
  }
};

export const setDataSaverMode = (enabled: boolean): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.DATA_SAVER, enabled ? 'true' : 'false');
  } catch (e) {
    console.error('Error saving data saver state:', e);
  }
};

// Admin Webhook Settings
export const getAdminWebhookUrl = (): string => {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_WEBHOOK_URL) || '';
};

export const saveAdminWebhookUrl = (url: string): void => {
  localStorage.setItem(STORAGE_KEYS.ADMIN_WEBHOOK_URL, url.trim());
};

// All Products including local custom additions and CMS edits
export const getAllProducts = (): ProductItem[] => {
  try {
    const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_PRODUCTS);
    const customItems: ProductItem[] = custom ? JSON.parse(custom) : [];

    const editedMapRaw = localStorage.getItem(STORAGE_KEYS.EDITED_PRODUCTS);
    const editedMap: Record<string, ProductItem> = editedMapRaw ? JSON.parse(editedMapRaw) : {};

    const deletedIdsRaw = localStorage.getItem(STORAGE_KEYS.DELETED_PRODUCT_IDS);
    const deletedIds: string[] = deletedIdsRaw ? JSON.parse(deletedIdsRaw) : [];
    const deletedSet = new Set(deletedIds);

    const merged = [...customItems, ...INITIAL_PRODUCTS]
      .filter(p => !deletedSet.has(p.id))
      .map(p => editedMap[p.id] || p);

    return merged;
  } catch (e) {
    return INITIAL_PRODUCTS;
  }
};

export const addCustomProduct = (item: ProductItem): ProductItem[] => {
  try {
    const custom = localStorage.getItem(STORAGE_KEYS.CUSTOM_PRODUCTS);
    const customItems: ProductItem[] = custom ? JSON.parse(custom) : [];
    const updated = [item, ...customItems];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PRODUCTS, JSON.stringify(updated));
    return getAllProducts();
  } catch (e) {
    return getAllProducts();
  }
};

export const updateProductInCms = (product: ProductItem): ProductItem[] => {
  try {
    const editedMapRaw = localStorage.getItem(STORAGE_KEYS.EDITED_PRODUCTS);
    const editedMap: Record<string, ProductItem> = editedMapRaw ? JSON.parse(editedMapRaw) : {};
    editedMap[product.id] = product;
    localStorage.setItem(STORAGE_KEYS.EDITED_PRODUCTS, JSON.stringify(editedMap));
    return getAllProducts();
  } catch (e) {
    return getAllProducts();
  }
};

export const deleteProductInCms = (productId: string): ProductItem[] => {
  try {
    const deletedIdsRaw = localStorage.getItem(STORAGE_KEYS.DELETED_PRODUCT_IDS);
    const deletedIds: string[] = deletedIdsRaw ? JSON.parse(deletedIdsRaw) : [];
    if (!deletedIds.includes(productId)) {
      deletedIds.push(productId);
      localStorage.setItem(STORAGE_KEYS.DELETED_PRODUCT_IDS, JSON.stringify(deletedIds));
    }
    return getAllProducts();
  } catch (e) {
    return getAllProducts();
  }
};

// Export Full Database JSON for Admin
export const exportFullDatabaseJson = (): string => {
  const current = getAllProducts();
  return JSON.stringify(current, null, 2);
};

// Import Full Database JSON
export const importFullDatabaseJson = (jsonString: string): ProductItem[] => {
  try {
    const parsed = JSON.parse(jsonString);
    if (Array.isArray(parsed)) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_PRODUCTS, JSON.stringify(parsed));
      localStorage.removeItem(STORAGE_KEYS.DELETED_PRODUCT_IDS);
      localStorage.removeItem(STORAGE_KEYS.EDITED_PRODUCTS);
      return getAllProducts();
    }
  } catch (e) {
    console.error('Import failed:', e);
  }
  return getAllProducts();
};
