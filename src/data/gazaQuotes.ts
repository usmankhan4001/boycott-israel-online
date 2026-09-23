export interface ConscienceMessage {
  id: string;
  title: string;
  quote: string;
  quoteUrdu?: string;
  reference: string;
  type: 'warning' | 'inspiration' | 'reflection';
}

export const GAZA_CONSCIENCE_MESSAGES: ConscienceMessage[] = [
  {
    id: 'msg-1',
    title: 'A Conscience at the Supermarket',
    quote: 'Do not buy the bullets that pierce the chests of the innocent children of Gaza. Check every item before you hand over your money.',
    quoteUrdu: 'غزہ کے معصوم بچوں کے خلاف استعمال ہونے والے ہتھیاروں کی معاونت نہ کریں۔ خریداری سے قبل ہر چیز چیک کریں۔',
    reference: 'Conscience Awakening for Gaza',
    type: 'warning'
  },
  {
    id: 'msg-2',
    title: 'The Power of Your Penny',
    quote: 'Every dollar, euro, or rupee you deny to complicit corporations weakens the machinery of genocide and occupation.',
    quoteUrdu: 'آپ کا روکا ہوا ایک ایک روپیہ نسل کشی اور ظلم کے نظام کو کمزور کرتا ہے۔',
    reference: 'Economic Boycott Principle',
    type: 'inspiration'
  },
  {
    id: 'msg-3',
    title: 'Their Blood is Not Cheap',
    quote: 'Convenience cannot outweigh human dignity. If a drink or chocolate is stained with oppression, choosing an alternative is our basic duty.',
    quoteUrdu: 'مظلومین کا خون معمولی نہیں۔ بائیکاٹ اشیاء کو چھوڑ کر محفوظ پاکستانی متبادل اپنانا ہمارا اخلاقی فرض ہے۔',
    reference: 'Solidarity with Palestine',
    type: 'warning'
  },
  {
    id: 'msg-4',
    title: 'Build Local, Support Ethical',
    quote: 'When you choose local and ethical alternatives, you empower honest local producers and refuse to be an accessory to injustice.',
    quoteUrdu: 'پاکستانی متبادل خرید کر مقامی معیشت مضبوط کریں اور ظلم کا حصہ بننے سے انکار کریں۔',
    reference: 'Economic Sovereignty',
    type: 'inspiration'
  },
  {
    id: 'msg-5',
    title: 'Stand on the Right Side of History',
    quote: 'History will remember what we ate, drank, and bought when the people of Gaza cried out for food, water, and life.',
    quoteUrdu: 'تاریخ یاد رکھے گی کہ جب غزہ کے لوگ پکار رہے تھے تو ہم نے کن برانڈز کا انتخاب کیا۔',
    reference: 'Moral Duty & Accountability',
    type: 'reflection'
  },
  {
    id: 'msg-6',
    title: 'Clean Your Monthly Grocery Basket',
    quote: 'A 100% Boycott-Free grocery basket is a peaceful weapon in your hands. Make this month’s shopping an act of resistance.',
    quoteUrdu: 'بائیکاٹ سے پاک گروسری لسٹ آپ کا پرامن ہتھیار ہے۔ اپنی خریداری کو مزاحمت بنائیں۔',
    reference: 'Monthly Grocery Conscience',
    type: 'inspiration'
  },
  {
    id: 'msg-7',
    title: 'Remember the Olive Trees',
    quote: 'From the river to the sea, Palestine will be free. Stand firm with those who have nothing left but their steadfast sumud (resilience).',
    quoteUrdu: 'دریائے اردن سے بحیرہ روم تک فلسطین آزاد ہوگا۔ مظلومین کے ساتھ ڈٹ کر کھڑے رہیں۔',
    reference: 'Sumud & Steadfastness',
    type: 'reflection'
  }
];

export const GROCERY_WARNING_MESSAGES = [
  "⚠️ Conscience Alert: This brand directly funds or enables the ongoing genocide in Gaza. Switch to a safe alternative to keep your hands clean.",
  "💔 Remember Gaza: The profits from this item help build illegal settlements on stolen Palestinian land. Choose conscience over convenience.",
  "🕊️ Stand Firm: Don't let your hard-earned salary finance weapons used against children. There is always a local and safe alternative.",
  "🚫 Red Line: Complicit corporation detected! Review the verified safe local replacements below before heading to checkout."
];

export const GROCERY_SUCCESS_MESSAGES = [
  "🌟 Alhamdullilah! Your grocery basket is 100% Boycott-Free! None of your money will fund oppression today.",
  "🇵🇸 Heroic Shopping: You have chosen ethical local products and protected the rights of the oppressed in Palestine.",
  "💚 Pure & Clean Basket: You demonstrated that human lives are infinitely more precious than brand loyalty."
];
