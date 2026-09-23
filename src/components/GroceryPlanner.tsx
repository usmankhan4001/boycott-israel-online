import React, { useState } from 'react';
import { GroceryItem, NotificationSettings, ProductItem } from '../types';
import { BrandLogo } from './BrandLogo';
import { 
  ShoppingCart, 
  Plus, 
  Trash2, 
  Check, 
  AlertTriangle, 
  CheckCircle2, 
  Bell, 
  Share2, 
  ArrowRightLeft, 
  Calendar,
  X,
  ShieldCheck,
  Building2,
  Sparkles,
  Volume2
} from 'lucide-react';
import { 
  requestNotificationPermission, 
  sendGazaNotification 
} from '../utils/notifications';
import { saveStoredNotificationSettings } from '../utils/storage';
import { useTranslation } from '../i18n/useTranslation';

interface Props {
  groceryList: GroceryItem[];
  setGroceryList: React.Dispatch<React.SetStateAction<GroceryItem[]>>;
  notificationSettings: NotificationSettings;
  setNotificationSettings: React.Dispatch<React.SetStateAction<NotificationSettings>>;
  products: ProductItem[];
}

export const GroceryPlanner: React.FC<Props> = ({
  groceryList,
  setGroceryList,
  notificationSettings,
  setNotificationSettings,
  products
}) => {
  const { t, isUrdu } = useTranslation();
  const [newItemName, setNewItemName] = useState('');
  const [showNotificationModal, setShowNotificationModal] = useState(false);
  const [notifSuccessMsg, setNotifSuccessMsg] = useState('');
  const [testNotificationSent, setTestNotificationSent] = useState(false);

  // Conscience Calculations
  const totalItems = groceryList.length;
  const boycottedItems = groceryList.filter(i => i.isBoycott);
  const ethicalItems = groceryList.filter(i => !i.isBoycott);
  const checkedItems = groceryList.filter(i => i.checked);
  const conscienceScore = totalItems === 0 ? 100 : Math.round((ethicalItems.length / totalItems) * 100);

  // Add Item to Grocery List
  const handleAddItem = (nameToAdd?: string) => {
    const name = (nameToAdd || newItemName).trim();
    if (!name) return;

    // Check if the entered name matches a known boycotted item
    const match = products.find(p => 
      p.name.toLowerCase().includes(name.toLowerCase()) ||
      p.parentCompany.toLowerCase().includes(name.toLowerCase())
    );

    const isBoycott = !!match;

    const newItem: GroceryItem = {
      id: `g-${Date.now()}-${Math.random()}`,
      name: name,
      category: match?.category || 'General Grocery',
      isBoycott,
      parentCompany: match?.parentCompany,
      boycottReason: match?.boycottReason,
      chosenAlternative: isBoycott ? undefined : name,
      suggestedAlternatives: match?.alternatives || [],
      checked: false,
      quantity: 1,
      unit: 'item',
      logo: match?.logo
    };

    setGroceryList(prev => [newItem, ...prev]);
    if (!nameToAdd) setNewItemName('');
  };

  // Toggle Checkbox with Haptic Feedback
  const handleToggleCheck = (id: string) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(15);
    }
    setGroceryList(prev => prev.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  // Delete Item
  const handleDeleteItem = (id: string) => {
    setGroceryList(prev => prev.filter(item => item.id !== id));
  };

  // Clear Checked Items
  const handleClearChecked = () => {
    setGroceryList(prev => prev.filter(item => !item.checked));
  };

  // Swap Boycott Item with Safe Alternative
  const handleSwapAlternative = (item: GroceryItem, altName: string, altCountry: string, altLogo?: string) => {
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(20);
    }
    setGroceryList(prev => prev.map(i => {
      if (i.id === item.id) {
        return {
          ...i,
          name: altName,
          isBoycott: false,
          chosenAlternative: `${altName} (${altCountry})`,
          alternativeCountry: altCountry,
          logo: altLogo
        };
      }
      return i;
    }));
  };

  // Share via WhatsApp / Clipboard
  const handleShareList = () => {
    let msg = isUrdu 
      ? `🇵🇸 *میری بائیکاٹ سے پاک گروسری لسٹ:*\n\n`
      : `🇵🇸 *My 100% Boycott-Free Grocery Checklist for Gaza:*\n\n`;
    groceryList.forEach((item, idx) => {
      const status = item.checked ? '✅' : '⬜';
      const boycState = item.isBoycott 
        ? (isUrdu ? `⚠️ [نہ خریدیں: ${item.name} - محفوظ متبادل لیں!]` : `⚠️ [DON'T BUY: ${item.name} - Replace with safe alternative!]`) 
        : `✓ ${item.name}`;
      msg += `${status} ${idx + 1}. ${boycState}\n`;
    });
    msg += `\n*${isUrdu ? 'محفوظ خریداری اسکور' : 'Conscience Score'}: ${conscienceScore}%*\n`;
    msg += `_"${isUrdu ? 'غزہ کے مظلومین کا خون نہ خریدیں۔' : 'Do not buy the blood of your brothers and sisters in Gaza.'}"_\n`;
    msg += `Checked on Free Palestine App (boycottisraelonline.com)`;

    if (navigator.share) {
      navigator.share({
        title: isUrdu ? 'بائیکاٹ سے پاک گروسری لسٹ' : 'Boycott-Free Grocery List',
        text: msg
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(msg);
      alert(isUrdu ? '✓ گروسری لسٹ کاپی ہوگئی! واٹس ایپ پر شیئر کریں۔' : '✓ Grocery checklist copied to clipboard! Paste it in WhatsApp or Notes.');
    }
  };

  // Enable Notifications & Save
  const handleSaveNotificationSchedule = async (day: number) => {
    const granted = await requestNotificationPermission();
    if (granted) {
      const updated: NotificationSettings = {
        enabled: true,
        monthlyDay: day,
        reminderTime: '09:00',
        lastTriggered: undefined
      };
      setNotificationSettings(updated);
      saveStoredNotificationSettings(updated);
      setNotifSuccessMsg(isUrdu ? `✓ ہر ماہ کی ${day} تاریخ کے لیے یاد دہانی محفوظ!` : `✓ Reminder set for the ${day}${day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'} of every month`);
      setTimeout(() => setNotifSuccessMsg(''), 4000);
    } else {
      alert(isUrdu ? 'براہ کرم براؤزر کی سیٹنگز میں نوٹیفکیشن کی اجازت دیں۔' : 'Please allow notification permissions in your browser or phone settings.');
    }
  };

  // Instant Test Notification
  const handleTestNotification = async () => {
    const granted = await requestNotificationPermission();
    if (granted) {
      const sent = sendGazaNotification(
        isUrdu ? '🇵🇸 ماہانہ گروسری الرٹ' : '🇵🇸 Gaza Conscience Grocery Alert',
        isUrdu ? 'شاپنگ پر جانے سے پہلے اپنی گروسری لسٹ چیک کریں اور بائیکاٹ سے پاک خریداری یقینی بنائیں۔' : 'Don’t buy the blood of your children: Review your monthly grocery list before heading to the supermarket!'
      );
      if (sent) {
        setTestNotificationSent(true);
        setTimeout(() => setTestNotificationSent(false), 4000);
      }
    }
  };

  const householdStaples = [
    { label: t.staples.oil, query: 'Cooking Oil' },
    { label: t.staples.tea, query: 'Black Tea' },
    { label: t.staples.rice, query: 'Basmati Rice' },
    { label: t.staples.detergent, query: 'Laundry Detergent' },
    { label: t.staples.soap, query: 'Bath Soap' },
    { label: t.staples.toothpaste, query: 'Toothpaste' },
    { label: t.staples.dishwashing, query: 'Dishwashing Bar' },
    { label: t.staples.diapers, query: 'Baby Diapers' }
  ];

  return (
    <div className={`max-w-3xl mx-auto px-4 sm:px-6 pt-4 pb-24 md:pb-12 space-y-5 ${isUrdu ? 'font-urdu' : ''}`}>
      
      {/* App Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-zinc-100 tracking-tight">
              {t.groceryTitle}
            </h1>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
            {t.grocerySubtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowNotificationModal(true)}
            className="p-2.5 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-700 shadow-sm transition-all"
            title={t.monthlyAlert}
          >
            <Bell className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </button>

          <button
            onClick={handleShareList}
            className="px-3.5 py-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{t.shareList}</span>
          </button>
        </div>
      </div>

      {/* Conscience Status Banner */}
      <div className={`p-4 rounded-3xl border transition-all ${
        boycottedItems.length > 0 
          ? 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-900/60 text-rose-900 dark:text-rose-100' 
          : 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-100'
      }`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold flex items-center gap-1.5">
            {boycottedItems.length > 0 ? (
              <>
                <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span className="text-rose-700 dark:text-rose-300">{boycottedItems.length} {t.boycottedItemsInBasket}</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-emerald-700 dark:text-emerald-300">{t.ethicalBasket}</span>
              </>
            )}
          </span>
          <span className="text-xs font-black tracking-tight">{conscienceScore}%</span>
        </div>

        {/* Progress bar */}
        <div className="h-2.5 w-full bg-zinc-200/80 dark:bg-zinc-800 rounded-full overflow-hidden mb-2.5">
          <div 
            className={`h-full rounded-full transition-all duration-300 ${
              conscienceScore === 100 ? 'bg-emerald-600 dark:bg-emerald-500' : 'bg-rose-600 dark:bg-rose-500'
            }`}
            style={{ width: `${conscienceScore}%` }}
          />
        </div>

        <p className="text-xs leading-relaxed text-zinc-700 dark:text-zinc-300">
          {boycottedItems.length > 0
            ? t.groceryWarning
            : t.groceryClean}
        </p>
      </div>

      {/* Quick Add Bar */}
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 space-y-3 shadow-sm">
        <form onSubmit={(e) => { e.preventDefault(); handleAddItem(); }} className="flex gap-2">
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder={isUrdu ? "چیز کا نام درج کریں (مثلاً کوکنگ آئل، اوریو، سرف، چائے)..." : "Type item name (e.g. Cooking Oil, Oreo, Surf, Tea)..."}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1 shrink-0 shadow-sm active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{isUrdu ? 'شامل کریں' : 'Add'}</span>
          </button>
        </form>

        {/* Quick Staple Suggestions */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="text-[11px] shrink-0 font-medium">{t.quickAdd}</span>
          {householdStaples.map((staple, i) => (
            <button
              key={i}
              onClick={() => handleAddItem(staple.label)}
              className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 text-[11px] font-medium shrink-0 transition-colors"
            >
              + {staple.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grocery Items List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs px-1 text-zinc-500 dark:text-zinc-400">
          <span>{t.itemCount} ({checkedItems.length}/{totalItems} {t.purchased})</span>
          {checkedItems.length > 0 && (
            <button
              onClick={handleClearChecked}
              className="text-rose-600 dark:text-rose-400 hover:underline font-medium"
            >
              {t.clearChecked}
            </button>
          )}
        </div>

        {groceryList.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-zinc-700 dark:text-zinc-300">{t.emptyGrocery}</p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mx-auto">
              {t.emptyGroceryPrompt}
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {groceryList.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  item.checked 
                    ? 'bg-zinc-50/80 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800/60 opacity-60' 
                    : item.isBoycott 
                    ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/40' 
                    : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  
                  {/* Left: Custom Checkbox + Item Info */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <button
                      onClick={() => handleToggleCheck(item.id)}
                      className={`w-6 h-6 rounded-full border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                        item.checked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-zinc-300 dark:border-zinc-600 hover:border-emerald-500'
                      }`}
                    >
                      {item.checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </button>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold truncate ${
                          item.checked 
                            ? 'line-through text-zinc-400 dark:text-zinc-500' 
                            : 'text-zinc-900 dark:text-zinc-100'
                        }`}>
                          {item.name}
                        </span>
                        {item.isBoycott && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 text-[10px] font-bold border border-rose-200 dark:border-rose-800 shrink-0">
                            {t.boycottTarget}
                          </span>
                        )}
                      </div>

                      {/* Safe Alternative Note or Warning */}
                      {item.isBoycott ? (
                        <div className="space-y-1.5 pt-1">
                          <p className="text-xs text-rose-600 dark:text-rose-400 font-medium">
                            {t.parentCompany} {item.parentCompany || 'Supports Israeli Occupation'}
                          </p>
                          
                          {/* Swap Alternatives Pills */}
                          {item.suggestedAlternatives && item.suggestedAlternatives.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1.5 pt-1">
                              <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                                <ArrowRightLeft className="w-3 h-3 text-emerald-500" />
                                {t.safeAlt}:
                              </span>
                              {item.suggestedAlternatives.slice(0, 3).map((alt) => (
                                <button
                                  key={alt.name}
                                  onClick={() => handleSwapAlternative(item, alt.name, alt.country, alt.logo)}
                                  className="px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-bold transition-all flex items-center gap-1"
                                >
                                  <span>{t.swapTo} {alt.name}</span>
                                  <span className="text-[10px] opacity-75">({alt.country})</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{t.safeLocalChoice}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right: Delete Action */}
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="p-1.5 text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Monthly Reminder Configuration Modal */}
      {showNotificationModal && (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 ${isUrdu ? 'font-urdu' : ''}`}>
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-5">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
                    {t.monthlyAlert}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {t.monthlyAlertSub}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowNotificationModal(false)}
                className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60 space-y-2">
              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {isUrdu 
                  ? '„غزہ کے مظلومین کا خون نہ خریدیں۔ محفوظ اور معیاری پاکستانی متبادل اپنائیں۔‟'
                  : '_"Do not buy the blood of your brothers and sisters in Gaza. Remind yourself to buy safe, local alternatives."_'}
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                {isUrdu ? 'ہر ماہ منتخب تاریخ کو آپ کو شاپنگ سے پہلے الرٹ نوٹیفکیشن موصول ہوگا۔' : 'You will receive a notification on your chosen day each month before shopping.'}
              </p>
            </div>

            {/* Choose Day of Month */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                {t.selectShoppingDay}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[1, 5, 10, 25].map((day) => (
                  <button
                    key={day}
                    onClick={() => handleSaveNotificationSchedule(day)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                      notificationSettings.monthlyDay === day && notificationSettings.enabled
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-emerald-500'
                    }`}
                  >
                    {isUrdu ? `${day} تاریخ` : `${day}${day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th'}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Test Notification Simulator Button */}
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
              <button
                onClick={handleTestNotification}
                className="w-full py-2.5 px-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-emerald-500" />
                <span>{t.testNotification}</span>
              </button>
              
              {testNotificationSent && (
                <p className="text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-in fade-in">
                  {isUrdu ? '✓ نوٹیفکیشن بھیج دیا گیا ہے!' : '✓ Notification sent! Check your notification center / status bar.'}
                </p>
              )}
              {notifSuccessMsg && (
                <p className="text-center text-xs font-bold text-emerald-600 dark:text-emerald-400 animate-in fade-in">
                  {notifSuccessMsg}
                </p>
              )}
            </div>

            <button
              onClick={() => setShowNotificationModal(false)}
              className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md transition-all"
            >
              {t.done}
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

