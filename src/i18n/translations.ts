export interface Translations {
  // Navigation & Tabs
  allBrands: string;
  categories: string;
  grocery: string;
  whyBoycott: string;
  scanner: string;
  suggest: string;
  searchPlaceholder: string;
  install: string;
  back: string;
  share: string;
  settings: string;
  
  // Status Badges & Callouts
  doNotBuy: string;
  boycottTarget: string;
  complicitEndorser: string;
  endorser: string;
  critical: string;
  safe: string;
  safeAlt: string;
  barcode729: string;
  safeAlternatives: string;
  addAltToGrocery: string;
  shareEvidence: string;
  
  // Categories
  catAll: string;
  catFood: string;
  catPersonalCare: string;
  catTech: string;
  catClothing: string;
  catRestaurants: string;
  catCelebrities: string;
  
  // Detail & Action Plan
  promotedBrands: string;
  parentCompany: string;
  whyBoycottTitle: string;
  actionPlan: string;
  financialImpact: string;
  ethicalDemands: string;
  demandContractCancellation: string;
  
  // Scanner
  scannerTitle: string;
  scannerSubtitle: string;
  cameraScanner: string;
  manualLookup: string;
  safeToBuy: string;
  safeDesc: string;
  scanAnother: string;
  scanFromPhoto: string;
  scanningImage: string;
  switchCamera: string;
  enterBarcodeOrName: string;
  check: string;
  verify: string;
  quickChecks: string;
  alignBarcode: string;
  complicitAlert: string;
  complicitActionPrompt: string;
  financesOppression: string;
  barcode729Label: string;
  barcode729Desc: string;
  viewRecord: string;
  buySafeAltsPrompt: string;
  accessingCamera: string;
  cameraErrorMsg: string;
  noMatchFound: string;
  
  // Language Modal
  chooseLanguage: string;
  welcomeSubtitle: string;
  continueEnglish: string;
  continueUrdu: string;
  
  // Grocery
  groceryTitle: string;
  grocerySubtitle: string;
  emptyGrocery: string;
  emptyGroceryPrompt: string;
  clearList: string;
  clearChecked: string;
  shareList: string;
  addItemsPrompt: string;
  itemCount: string;
  boycottedItemsInBasket: string;
  ethicalBasket: string;
  groceryWarning: string;
  groceryClean: string;
  quickAdd: string;
  purchased: string;
  safeLocalChoice: string;
  swapTo: string;
  monthlyAlert: string;
  monthlyAlertSub: string;
  selectShoppingDay: string;
  testNotification: string;
  done: string;
  staples: {
    oil: string;
    tea: string;
    rice: string;
    detergent: string;
    soap: string;
    toothpaste: string;
    dishwashing: string;
    diapers: string;
  };

  // Categories View
  browseCategories: string;
  browseCategoriesSub: string;
  brandsTracked: string;
  explore: string;

  // About / Mission / FAQ
  aboutTitle: string;
  aboutSubtitle: string;
  impactTitle: string;
  impactDesc: string;
  bdsGuidelines: string;
  supportPakistani: string;
  pillar1Title: string;
  pillar1Desc: string;
  pillar2Title: string;
  pillar2Desc: string;
  pillar3Title: string;
  pillar3Desc: string;
  faqHeader: string;
  faqList: { q: string; a: string }[];

  // Suggestion Modal
  submitProposal: string;
  submitProposalSub: string;
  brandToBoycott: string;
  categoryLabel: string;
  parentLabel: string;
  safeLocalAltLabel: string;
  altOriginLabel: string;
  proofLabel: string;
  sendProposal: string;
  submittingProposal: string;
  proposalSuccess: string;
  proposalSuccessDesc: string;
}

export const translations: Record<'en' | 'ur', Translations> = {
  en: {
    // Navigation & Tabs
    allBrands: 'All Brands',
    categories: 'Categories',
    grocery: 'Grocery',
    whyBoycott: 'Why Boycott',
    scanner: '729 Scanner',
    suggest: 'Suggest',
    searchPlaceholder: 'Search brand, item or barcode...',
    install: 'Install',
    back: 'Back',
    share: 'Share',
    settings: 'Settings',

    // Status Badges & Callouts
    doNotBuy: 'DO NOT BUY',
    boycottTarget: 'BOYCOTT TARGET',
    complicitEndorser: 'COMPLICIT ENDORSER',
    endorser: 'Endorser',
    critical: 'Critical',
    safe: 'Safe',
    safeAlt: 'Safe Alt',
    barcode729: '729 Barcode',
    safeAlternatives: 'Safe Alternatives',
    addAltToGrocery: 'Add Safe Swap to Grocery',
    shareEvidence: 'Share Evidence',

    // Categories
    catAll: 'All',
    catFood: 'Food & Drinks',
    catPersonalCare: 'Personal Care',
    catTech: 'Technology',
    catClothing: 'Clothing',
    catRestaurants: 'Restaurants',
    catCelebrities: 'Celebrities',

    // Detail & Action Plan
    promotedBrands: 'Boycotted Brands Promoted:',
    parentCompany: 'Parent Company:',
    whyBoycottTitle: 'Why Boycott This Entity',
    actionPlan: 'Action Plan',
    financialImpact: 'Financial Impact:',
    ethicalDemands: 'Ethical Demands',
    demandContractCancellation: 'Demand contract cancellation',

    // Scanner
    scannerTitle: 'Barcode & 729 Scanner',
    scannerSubtitle: 'Scan retail barcode or check 729 Israeli prefix',
    cameraScanner: 'Camera Scanner',
    manualLookup: 'Manual Lookup',
    safeToBuy: 'SAFE TO BUY!',
    safeDesc: 'Not found on the boycott list',
    scanAnother: 'Scan Another',
    scanFromPhoto: 'Scan from Photo',
    scanningImage: 'Scanning Image...',
    switchCamera: 'Switch Camera',
    enterBarcodeOrName: 'Enter Barcode (729...) or Brand Name:',
    check: 'Check',
    verify: 'Verify',
    quickChecks: 'Quick Barcode & Brand Checks:',
    alignBarcode: 'Align barcode inside frame. Israeli 729 codes are flagged instantly.',
    complicitAlert: 'COMPLICIT ENDORSER ALERT',
    complicitActionPrompt: 'Demanded Action: Cancel brand contracts',
    financesOppression: 'This item directly finances apartheid & oppression',
    barcode729Label: '🚨 Registered in Israel (GS1 729 Barcode Prefix)',
    barcode729Desc: 'Barcodes starting with 729 are registered directly in Israel, channeling export proceeds to the Israeli economy.',
    viewRecord: 'View Full Record & Timeline',
    buySafeAltsPrompt: 'Buy These Safe Local Alternatives:',
    accessingCamera: 'Accessing camera viewfinder...',
    cameraErrorMsg: 'Camera permission was denied or camera is unavailable. You can enter the barcode/name or upload an image below.',
    noMatchFound: 'No Israeli 729 barcode prefix or boycotted parent conglomerate match found for',

    // Language Modal
    chooseLanguage: 'Choose Language',
    welcomeSubtitle: 'Select your preferred language',
    continueEnglish: 'Continue in English',
    continueUrdu: 'اردو میں جاری رکھیں',

    // Grocery
    groceryTitle: 'Grocery Conscience List',
    grocerySubtitle: 'Keep your monthly shopping 100% free of complicit brands',
    emptyGrocery: 'Your grocery checklist is empty',
    emptyGroceryPrompt: 'Add everyday items above before heading to the store to ensure 100% ethical shopping.',
    clearList: 'Clear List',
    clearChecked: 'Clear Checked',
    shareList: 'Share List',
    addItemsPrompt: 'Add safe Pakistani swaps from any boycotted item',
    itemCount: 'Items',
    boycottedItemsInBasket: 'Boycotted Items in Basket!',
    ethicalBasket: '100% Ethical Basket',
    groceryWarning: "⚠️ Gaza Conscience Warning: Do not buy the blood of your brothers and sisters in Gaza. Tap 'Swap' below to replace boycotted brands with safe local ones.",
    groceryClean: '🕊️ None of your hard-earned money will fund weapons or illegal settlements in Palestine today.',
    quickAdd: 'Quick add:',
    purchased: 'purchased',
    safeLocalChoice: 'Safe Choice: Local / Ethical Brand',
    swapTo: 'Swap to',
    monthlyAlert: 'Monthly Conscience Alert',
    monthlyAlertSub: 'Never forget before you do your monthly grocery',
    selectShoppingDay: 'Select Your Grocery Shopping Day:',
    testNotification: '🔔 Test Notification Now',
    done: 'Done',
    staples: {
      oil: 'Cooking Oil',
      tea: 'Black Tea',
      rice: 'Basmati Rice',
      detergent: 'Laundry Detergent',
      soap: 'Bath Soap',
      toothpaste: 'Toothpaste',
      dishwashing: 'Dishwashing Bar',
      diapers: 'Baby Diapers'
    },

    // Categories View
    browseCategories: 'Browse Household Categories',
    browseCategoriesSub: 'Purge complicit brands from every room in your house and discover 100% safe Pakistani alternatives.',
    brandsTracked: 'brands tracked',
    explore: 'Explore',

    // About / Mission
    aboutTitle: 'Boycott to End Oppression',
    aboutSubtitle: 'Understanding the power of economic resistance, how to purge complicit brands, and how we achieve victory.',
    impactTitle: 'Economic Impact',
    impactDesc: 'Every rupee diverted to local businesses weakens corporate complicity.',
    bdsGuidelines: 'Verified BDS Criteria',
    supportPakistani: 'Buy Pakistani',
    pillar1Title: 'Why We Boycott',
    pillar1Desc: 'Economic resistance is an absolute moral duty. Every dollar withheld directly deprives multinational corporations of revenue used to finance apartheid infrastructure, military operations, and illegal land theft in Palestine.',
    pillar2Title: 'How We Boycott',
    pillar2Desc: 'Systematically purge boycotted brands from your daily life. Check every barcode and product label before purchasing, completely replace them with authentic Pakistani alternatives, and demand local stores stop stocking complicit goods.',
    pillar3Title: 'Ending Oppression',
    pillar3Desc: 'Collective consumer action has historically dismantled apartheid regimes. By building economic sovereignty and strengthening our local Pakistani manufacturers, we break foreign corporate dominance and stand unyielding with Palestine.',
    faqHeader: 'Strategic Boycott Questions & Answers',
    faqList: [
      {
        q: 'Does my individual boycott really make a difference?',
        a: 'Yes. Multinational corporations operate on market sentiment and profit margins. In 2023–2024 alone, boycott campaigns caused documented billions of dollars in revenue losses and forced major conglomerates to divest from Israeli franchises. Collective refusal to purchase is devastating to complicit corporations.'
      },
      {
        q: 'How do I identify Israeli products by barcode?',
        a: 'Products manufactured directly in Israel carry barcodes starting with the prefix "729". Use our built-in camera scanner to verify any product in 1 second before placing it in your basket.'
      },
      {
        q: 'What is the role of Takweyat Foundation in this initiative?',
        a: 'Takweyat Foundation provides verified, research-backed consumer intelligence to empower Pakistani households to achieve 100% ethical, boycott-free shopping. We verify corporate parentage, document complicity evidence, and promote high-quality Pakistani local alternatives.'
      },
      {
        q: 'What should I do if a store only sells boycotted products?',
        a: 'Refuse to buy. Inform the store owner or manager directly that you are boycotting complicit brands and ask them to stock Pakistani alternatives like Gourmet, Pakola, Sufi, Dalda, Tapal, and English Toothpaste.'
      }
    ],

    // Suggestion Modal
    submitProposal: 'Submit Brand Proposal',
    submitProposalSub: 'Help our research team verify and expand boycott targets',
    brandToBoycott: 'Brand to Boycott *',
    categoryLabel: 'Category',
    parentLabel: 'Parent Company',
    safeLocalAltLabel: 'Safe Local Alternative',
    altOriginLabel: 'Alternative Origin',
    proofLabel: 'Reason / BDS Proof / Source Link *',
    sendProposal: 'Send Proposal to Moderation',
    submittingProposal: 'Submitting...',
    proposalSuccess: 'Proposal Submitted to CMS!',
    proposalSuccessDesc: 'Thank you. Your suggestion has been queued in the moderation inbox for research verification.'
  },

  ur: {
    // Navigation & Tabs (Short & Crisp)
    allBrands: 'تمام برانڈز',
    categories: 'کیٹیگریز',
    grocery: 'گروسری لسٹ',
    whyBoycott: 'بائیکاٹ کیوں؟',
    scanner: '۷۲۹ سکینر',
    suggest: 'تجویز دیں',
    searchPlaceholder: 'برانڈ، نام یا بارکوڈ تلاش کریں...',
    install: 'انسٹال کریں',
    back: 'واپس',
    share: 'شیئر کریں',
    settings: 'سیٹنگز',

    // Status Badges & Callouts (Short & Punchy)
    doNotBuy: 'نہ خریدیں',
    boycottTarget: 'بائیکاٹ ہدف',
    complicitEndorser: 'بائیکاٹ ہدف',
    endorser: 'مشہور شخصیت',
    critical: 'شدید',
    safe: 'محفوظ',
    safeAlt: 'محفوظ متبادل',
    barcode729: '۷۲۹ بارکوڈ',
    safeAlternatives: 'محفوظ پاکستانی متبادل',
    addAltToGrocery: 'متبادل گروسری میں شامل کریں',
    shareEvidence: 'شیئر کریں',

    // Categories (Short & Crisp)
    catAll: 'تمام',
    catFood: 'کھانے پینے کی اشیاء',
    catPersonalCare: 'ذاتی نگہداشت',
    catTech: 'ٹیکنالوجی',
    catClothing: 'لباس و فیشن',
    catRestaurants: 'ریسٹورنٹس',
    catCelebrities: 'مشہور شخصیات',

    // Detail & Action Plan
    promotedBrands: 'پروموٹ کیے گئے برانڈز:',
    parentCompany: 'مالک کمپنی:',
    whyBoycottTitle: 'بائیکاٹ کی وجہ',
    actionPlan: 'لائحہ عمل',
    financialImpact: 'معاشی اثر:',
    ethicalDemands: 'مطالبات',
    demandContractCancellation: 'معاہدہ منسوخ کرنے کا مطالبہ',

    // Scanner
    scannerTitle: 'بارکوڈ و ۷۲۹ سکینر',
    scannerSubtitle: 'کیمرہ سکینر اور اسرائیلی ۷۲۹ بارکوڈ چیک',
    cameraScanner: 'کیمرہ سکینر',
    manualLookup: 'دستی تلاش',
    safeToBuy: 'خریدنا محفوظ ہے!',
    safeDesc: 'بائیکاٹ لسٹ میں شامل نہیں ہے',
    scanAnother: 'دوبارہ سکین کریں',
    scanFromPhoto: 'تصویر سے سکین',
    scanningImage: 'تصویر سکین ہو رہی ہے...',
    switchCamera: 'کیمرہ تبدیل کریں',
    enterBarcodeOrName: 'بارکوڈ یا نام درج کریں:',
    check: 'چیک کریں',
    verify: 'تصدیق کریں',
    quickChecks: 'فوری چیک نمونے:',
    alignBarcode: 'بارکوڈ کو فریم کے اندر رکھیں۔ ۷۲۹ بارکوڈ فوری ظاہر ہوں گے۔',
    complicitAlert: 'مشہور شخصیت الرٹ',
    complicitActionPrompt: 'مطالبہ: برانڈ معاہدے منسوخ کریں',
    financesOppression: 'یہ پروڈکٹ اسرائیلی مظالم کی معاون ہے',
    barcode729Label: '🚨 اسرائیل میں رجسٹرڈ (۷۲۹ بارکوڈ)',
    barcode729Desc: '۷۲۹ سے شروع ہونے والے بارکوڈ اسرائیل میں رجسٹرڈ ہیں جن کی آمدن اسرائیلی معیشت کو جاتی ہے۔',
    viewRecord: 'مکمل تفصیل دیکھیں',
    buySafeAltsPrompt: 'یہ محفوظ پاکستانی متبادل خریدیں:',
    accessingCamera: 'کیمرہ لوڈ ہو رہا ہے...',
    cameraErrorMsg: 'کیمرہ رسائی دستیاب نہیں۔ نیچے بارکوڈ درج کریں یا تصویر اپ لوڈ کریں۔',
    noMatchFound: 'کوئی ۷۲۹ بارکوڈ یا بائیکاٹ تعلق نہیں ملا برائے',

    // Language Modal
    chooseLanguage: 'زبان منتخب کریں',
    welcomeSubtitle: 'ایپ کے لیے اپنی پسندیدہ زبان منتخب کریں',
    continueEnglish: 'Continue in English',
    continueUrdu: 'اردو میں جاری رکھیں',

    // Grocery
    groceryTitle: 'گروسری لسٹ',
    grocerySubtitle: 'ماہانہ خریداری کو بائیکاٹ برانڈز سے پاک رکھیں',
    emptyGrocery: 'گروسری لسٹ خالی ہے',
    emptyGroceryPrompt: 'شاپنگ سے پہلے اشیاء شامل کریں تاکہ خریداری 100% محفوظ رہے۔',
    clearList: 'لسٹ صاف کریں',
    clearChecked: 'مکمل صاف کریں',
    shareList: 'لسٹ شیئر کریں',
    addItemsPrompt: 'بائیکاٹ شدہ اشیاء کے محفوظ پاکستانی متبادل شامل کریں',
    itemCount: 'اشیاء',
    boycottedItemsInBasket: 'بائیکاٹ اشیاء شامل ہیں!',
    ethicalBasket: 'مکمل محفوظ لسٹ',
    groceryWarning: 'غزہ کے مظلومین کا خون نہ خریدیں۔ بائیکاٹ اشیاء کے بدلے مقامی متبادل اپنائیں۔',
    groceryClean: 'آپ کا پیسہ ظلم یا اسرائیلی کمپنیوں کو نہیں جا رہا۔',
    quickAdd: 'فوری اضافہ:',
    purchased: 'خریدی گئیں',
    safeLocalChoice: 'محفوظ پاکستانی برانڈ',
    swapTo: 'متبادل:',
    monthlyAlert: 'ماہانہ یاد دہانی الرٹ',
    monthlyAlertSub: 'گروسری خریداری سے پہلے نوٹیفکیشن حاصل کریں',
    selectShoppingDay: 'ماہانہ خریداری کا دن منتخب کریں:',
    testNotification: '🔔 ٹیسٹ نوٹیفکیشن بھیجیں',
    done: 'مکمل',
    staples: {
      oil: 'کوکنگ آئل',
      tea: 'چائے',
      rice: 'باسمتی چاول',
      detergent: 'سرف / ڈیٹرجنٹ',
      soap: 'صابن',
      toothpaste: 'ٹوتھ پیسٹ',
      dishwashing: 'برتن دھونے کا صابن',
      diapers: 'بے بی ڈائپرز'
    },

    // Categories View
    browseCategories: 'کیٹیگریز',
    browseCategoriesSub: 'گھر کی تمام اشیاء کے محفوظ پاکستانی متبادل تلاش کریں۔',
    brandsTracked: 'برانڈز',
    explore: 'دیکھیں',

    // About / Mission
    aboutTitle: 'بائیکاٹ کیوں اور کیسے؟',
    aboutSubtitle: 'معاشی مزاحمت اور پاکستانی متبادل برانڈز کی طاقت',
    impactTitle: 'معاشی اثرات',
    impactDesc: 'آپ کا ایک ایک روپیہ مقامی معیشت کو مضبوط اور ظلم کو کمزور کرتا ہے۔',
    bdsGuidelines: 'مصدقہ بائیکاٹ اصول',
    supportPakistani: 'پاکستانی پروڈکٹس اپنائیں',
    pillar1Title: 'بائیکاٹ کیوں؟',
    pillar1Desc: 'معاشی مزاحمت اخلاقی فرض ہے۔ ہر روپیہ جو روکا جائے، اسرائیلی جبر و تسلط کو کمزور کرتا ہے۔',
    pillar2Title: 'بائیکاٹ کیسے؟',
    pillar2Desc: 'روزمرہ استعمال کی تمام بائیکاٹ اشیاء کو فوری طور پر معیاری پاکستانی متبادل سے بدلیں۔',
    pillar3Title: 'آزادی کی منزل',
    pillar3Desc: 'صارفین کی اجتماعی طاقت نے تاریخی طور پر نسل پرست نظام گرائے ہیں۔ پاکستانی معیشت کو مضبوط کریں۔',
    faqHeader: 'اہم سوالات اور جوابات',
    faqList: [
      {
        q: 'کیا انفرادی بائیکاٹ سے واقعی فرق پڑتا ہے؟',
        a: 'جی ہاں! ملٹی نیشنل کمپنیاں منافع پر چلتی ہیں۔ حالیہ بائیکاٹ مہمات نے بائیکاٹ زدہ کمپنیوں کو اربوں ڈالر کا نقصان پہنچایا ہے۔'
      },
      {
        q: 'اسرائیلی مصنوعات کی بارکوڈ سے شناخت کیسے کریں؟',
        a: 'اسرائیل میں بننے والی اشیاء کا بارکوڈ ۷۲۹ (729) سے شروع ہوتا ہے۔ ہمارے کیمرہ سکینر سے فوری چیک کریں۔'
      },
      {
        q: 'تقویت فاؤنڈیشن کا کیا کردار ہے؟',
        a: 'تقویت فاؤنڈیشن پاکستانی عوام کو مستند تحقیقی معلومات اور بہترین مقامی متبادل فراہم کرتی ہے۔'
      },
      {
        q: 'اگر دکان پر صرف بائیکاٹ اشیاء ملیں تو کیا کریں؟',
        a: 'خریدنے سے انکار کریں اور دکاندار سے گورمے، پاکولہ، صوفی، تپال اور انگلش ٹوتھ پیسٹ جیسے پاکستانی متبادل منگوانے کا کہیں۔'
      }
    ],

    // Suggestion Modal
    submitProposal: 'برانڈ تجویز جمع کرائیں',
    submitProposalSub: 'ڈیٹابیس کو اپ ڈیٹ رکھنے میں ہماری مدد کریں',
    brandToBoycott: 'بائیکاٹ برانڈ کا نام *',
    categoryLabel: 'کیٹیگری',
    parentLabel: 'مالک کمپنی',
    safeLocalAltLabel: 'محفوظ مقامی متبادل',
    altOriginLabel: 'متبادل کا ملک',
    proofLabel: 'بائیکاٹ کی وجہ / ثبوت لنک *',
    sendProposal: 'تجویز جمع کرائیں',
    submittingProposal: 'جمع ہو رہا ہے...',
    proposalSuccess: 'تجویز موصول ہوگئی!',
    proposalSuccessDesc: 'شکریہ! تصدیق کے بعد اسے ڈیٹابیس میں شامل کر دیا جائے گا۔'
  }
};

export const getCategoryTranslation = (category: string, lang: 'en' | 'ur'): string => {
  if (lang === 'en' || !category) return category;
  
  const lower = category.toLowerCase().trim();
  if (lower === 'all' || lower === 'تمام') return 'تمام';
  if (lower.includes('restaurant') || lower.includes('place') || lower.includes('cafe') || lower.includes('food chain') || lower.includes('fast food')) return 'ریسٹورنٹس';
  if (lower.includes('celeb') || lower.includes('endorser') || lower.includes('actor') || lower.includes('cricketer')) return 'مشہور شخصیات';
  if (lower.includes('drink') || lower.includes('juice') || lower.includes('beverage') || lower.includes('soda') || lower.includes('cola')) return 'مشروبات';
  if (lower.includes('biscuit') || lower.includes('snack') || lower.includes('chip') || lower.includes('cookie')) return 'بسکٹ و سنیکس';
  if (lower.includes('tea') || lower.includes('coffee') || lower.includes('kahwa')) return 'چائے و کافی';
  if (lower.includes('detergent') || lower.includes('wash') || lower.includes('clean') || lower.includes('dishwash')) return 'سرف و صفائی';
  if (lower.includes('soap') || lower.includes('shampoo') || lower.includes('hygiene') || lower.includes('body wash') || lower.includes('skin')) return 'صابن و شیمپو';
  if (lower.includes('baby') || lower.includes('diaper') || lower.includes('infant')) return 'بے بی کیئر';
  if (lower.includes('toothpaste') || lower.includes('dental') || lower.includes('oral') || lower.includes('brush')) return 'ٹوتھ پیسٹ';
  if (lower.includes('cloth') || lower.includes('fashion') || lower.includes('apparel') || lower.includes('sportswear') || lower.includes('shoe')) return 'لباس و فیشن';
  if (lower.includes('tech') || lower.includes('electronic') || lower.includes('hardware') || lower.includes('software') || lower.includes('laptop')) return 'ٹیکنالوجی';
  if (lower.includes('personal') || lower.includes('care') || lower.includes('cosmetic')) return 'ذاتی نگہداشت';
  if (lower.includes('food') || lower.includes('grocery')) return 'کھانے پینے کی اشیاء';
  
  return category;
};

