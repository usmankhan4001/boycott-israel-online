/**
 * Comprehensive Urdu Translation & Localization Engine for Products & Boycott Intelligence
 * Provides natural, fluent, and punchy Urdu translations for product names, parent companies,
 * boycott reasons, action points, and categories.
 */

import { ProductItem } from '../types';

// Common Boycott Reason Patterns & Urdu Translations
const REASON_KEYWORDS_MAP: { pattern: RegExp; urdu: string }[] = [
  {
    pattern: /provided over 100,000 free meals|free meals.*idf|meals.*military|free meals.*israel/i,
    urdu: 'اسرائیلی فوج (IDF) کو غزہ پر جارحیت کے دوران مفت کھانے اور فوجی رعایتیں فراہم کیں، جس سے براہ راست مظالم کی معاونت ہوئی۔'
  },
  {
    pattern: /facilities in israel|factory in israel|sderot|production facilities|manufacturing plant.*israel/i,
    urdu: 'اسرائیل میں فیکٹریاں اور پیداواری پلانٹس قائم کر کے اسرائیلی قابض معیشت اور ٹیکس ریونیو کو تقویت دیتے ہیں۔'
  },
  {
    pattern: /invested in israel|financial backing|fund.*israeli|sponsorship.*israel|israel.*research center/i,
    urdu: 'اسرائیلی کمپنیوں اور قابض حکومت میں بھاری مالی سرمایہ کاری اور براہ راست فنڈنگ فراہم کرتے ہیں۔'
  },
  {
    pattern: /sodastream|west bank|illegal settlement|occupied territories/i,
    urdu: 'مقبوضہ مغربی کنارے میں غیر قانونی بستیوں اور فلسطینیوں سے چھینی گئی زمینوں پر کاروبار چلاتے ہیں۔'
  },
  {
    pattern: /commercial endorsement|brand ambassador|promot.*pepsi|promot.*coke|promot.*l'oreal|endorsing.*boycott/i,
    urdu: 'بائیکاٹ شدہ ملٹی نیشنل کمپنیوں کی تشہیر اور معاہدے کر کے ان کی مالی قبولیت میں اضافہ کرتے ہیں۔'
  },
  {
    pattern: /intel|microchip|tech center in israel|cybersecurity|cloud region/i,
    urdu: 'اسرائیل میں جدید ریسرچ و عسکری ٹیکنالوجی مراکز چلا کر اسرائیلی دفاعی و نگرانی کے نظام کو مضبوط کرتے ہیں۔'
  },
  {
    pattern: /puma|israeli football association|ifa|sponsoring sports/i,
    urdu: 'اسرائیلی فٹ بال ایسوسی ایشن اور مقبوضہ بستیوں کی ٹیموں کو باضابطہ سپانسر کرتے ہیں۔'
  },
  {
    pattern: /hp|hewlett packard|biometric checkpoint|israeli navy/i,
    urdu: 'اسرائیلی چیک پوسٹوں، بحریہ اور قابض سکیورٹی اداروں کے لیے بائیو میٹرک اور سرور ٹیکنالوجی مہیا کرتے ہیں۔'
  },
  {
    pattern: /zara|head of franchise|hosted.*extremist/i,
    urdu: 'اسرائیلی فرنچائز کے سربراہ نے انتہا پسند سیاستدانوں اور آباد کاروں کی مالی و سیاسی پشت پناہی کی۔'
  },
  {
    pattern: /carrefour|gift packages to israeli soldiers/i,
    urdu: 'غزہ پر حملہ آور اسرائیلی فوجیوں کو راشن اور گفٹ بیگز فراہم کیے اور اسرائیلی کمپنیوں سے تجارتی پارٹنرشپ کی۔'
  },
  {
    pattern: /nestle|osem|50.1%|israeli food manufacturer/i,
    urdu: 'اسرائیلی فوڈ کمپنی اوسم (Osem) کے 50% سے زائد شیئرز کے مالک ہیں اور اسرائیل میں متعدد کارخانے چلاتے ہیں۔'
  },
  {
    pattern: /unilever|ben & jerry|settlements/i,
    urdu: 'مقبوضہ فلسطینی علاقوں میں اسرائیلی برانڈز اور معاہدوں کے تسلسل کی پشت پناہی کرتے ہیں۔'
  },
  {
    pattern: /siemens|euroasia interconnector/i,
    urdu: 'اسرائیلی مقبوضہ بستیوں کو بجلی اور انرجی گرڈ فراہم کرنے والے منصوبوں میں بنیادی شراکت دار ہیں۔'
  },
  {
    pattern: /chevron|natural gas|leviathan|tamar/i,
    urdu: 'اسرائیلی گیس فیلڈز سے اربوں ڈالر کا ریونیو اکٹھا کر کے اسرائیلی عسکری و صنعتی نظام کو توانائی دیتے ہیں۔'
  },
  {
    pattern: /caterpillar|bulldozers|demolition.*palestinian homes/i,
    urdu: 'اسرائیلی فوج کو بلڈوزرز فراہم کرتے ہیں جو فلسطینیوں کے گھر مسمار کرنے اور بستیاں بسانے میں استعمال ہوتے ہیں۔'
  },
  {
    pattern: /airbnb|booking|settlements/i,
    urdu: 'مقبوضہ فلسطینی اراضی اور غیر قانونی بستیوں میں کرایہ داریاں دکھا کر قبضے کو فروغ دیتے ہیں۔'
  },
  {
    pattern: /fiverr|wix|headquartered in tel aviv/i,
    urdu: 'تل ابیب (اسرائیل) میں ہیڈکوارٹرز قائم ہیں اور براہ راست اسرائیلی حکومت کو ٹیکس اور معاشی فائدہ پہنچاتے ہیں۔'
  },
  {
    pattern: /disney|aid to israel/i,
    urdu: 'اسرائیلی امدادی اداروں کو بھاری مالی عطیات فراہم کیے اور قابض بیانیے کی تشہیر کی۔'
  }
];

// Entity Name Translations (Famous brands, celebrities, restaurants)
const BRAND_NAMES_URDU: Record<string, string> = {
  // Fast Food & Restaurants
  "McDonald's Fast Food": "میکڈونلڈز (McDonald's)",
  "McDonald's": "میکڈونلڈز (McDonald's)",
  "KFC (Kentucky Fried Chicken)": "کے ایف سی (KFC)",
  "KFC": "کے ایف سی (KFC)",
  "Starbucks Coffee": "اسٹاربکس کافی (Starbucks)",
  "Starbucks": "اسٹاربکس (Starbucks)",
  "Pizza Hut": "پیزا ہٹ (Pizza Hut)",
  "Subway": "سب وے (Subway)",
  "Burger King": "برگر کنگ (Burger King)",
  "Hardee's": "ہارڈیز (Hardee's)",
  "Domino's Pizza": "ڈومینوز پیزا (Domino's)",
  "Domino's": "ڈومینوز (Domino's)",
  "Costa Coffee": "کوسٹا کافی (Costa Coffee)",
  "Dunkin'": "ڈنکن ڈونٹس (Dunkin')",
  "Gloria Jean's Coffees": "گلوریا جینز (Gloria Jean's)",
  "Popeyes Louisiana Kitchen": "پوپائیز (Popeyes)",
  "Texas Chicken": "ٹیکساس چکن (Texas Chicken)",
  "Cinnabon": "سینابون (Cinnabon)",
  "Baskin Robbins": "باسکن روبنز (Baskin Robbins)",
  "Cheezious (Exclusively Sells Coke / Pepsi)": "چیزیئس (پیپسی و کوک سپلائر)",

  // Beverages & Drinks
  "Pepsi": "پیپسی (Pepsi)",
  "Coca-Cola": "کوکا کولا (Coca-Cola)",
  "Coke": "کوکا کولا (Coke)",
  "7Up": "سیون اپ (7Up)",
  "Mirinda": "مرنڈا (Mirinda)",
  "Sprite": "اسپرائٹ (Sprite)",
  "Fanta": "فینٹا (Fanta)",
  "Mountain Dew": "ماؤنٹین ڈیو (Mountain Dew)",
  "Diet Coke": "ڈائٹ کوک (Diet Coke)",
  "Diet Pepsi": "ڈائٹ پیپسی (Diet Pepsi)",
  "Pepsi Max": "پیپسی میکس (Pepsi Max)",
  "Coke Zero": "کوک زیرو (Coke Zero)",
  "Sting": "اسٹنگ انرجی (Sting)",
  "Sting Energy": "اسٹنگ انرجی (Sting)",
  "Red Bull": "ریڈ بل (Red Bull)",
  "Red Bull Energy Drink": "ریڈ بل (Red Bull)",
  "Monster Energy": "مونسٹر انرجی (Monster)",
  "Minute Maid": "منٹ میڈ (Minute Maid)",
  "Slice Juice": "سلائس جوس (Slice)",
  "Slice": "سلائس (Slice)",
  "Tang": "ٹینگ (Tang)",
  "Tang Powder Drink": "ٹینگ (Tang)",
  "Nestlé Pure Life Water": "نیسلے پیور لائف (Nestlé)",
  "Aquafina Water": "ایکوافینا (Aquafina)",
  "Aquafina": "ایکوافینا (Aquafina)",
  "Kinley Water": "کنلے واٹر (Kinley)",
  "Kinley": "کنلے (Kinley)",
  "Dasani Water": "ڈاسانی (Dasani)",
  "Lipton Tea": "لپٹن چائے (Lipton)",
  "Lipton": "لپٹن (Lipton)",
  "Nescafé": "نیس کیفے (Nescafé)",
  "Nescafe Classic": "نیس کیفے کلاسک (Nescafé)",
  "EveryDay Milk Powder": "ایوری ڈے (EveryDay)",
  "EveryDay": "ایوری ڈے (EveryDay)",
  "Milo": "مائلو (Milo)",
  "Nestle Nespray": "نیسپرے (Nespray)",
  "Nesquik": "نیسکوئک (Nesquik)",

  // Biscuits, Snacks & Confectionery
  "Oreo Biscuits": "اوریو بسکٹ (Oreo)",
  "Oreo": "اوریو (Oreo)",
  "Lays Potato Chips": "لیز چپس (Lays)",
  "Lays": "لیز (Lays)",
  "Doritos": "ڈوریٹوز (Doritos)",
  "Cheetos": "چیٹوز (Cheetos)",
  "Kurkure": "کرکرے (Kurkure)",
  "Pringles": "پرنگلز (Pringles)",
  "KitKat": "کٹ کیٹ (KitKat)",
  "Cadbury Dairy Milk": "کیڈبری ڈیری ملک (Cadbury)",
  "Cadbury": "کیڈبری (Cadbury)",
  "Toblerone": "ٹوبلیرون (Toblerone)",
  "M&M's": "ایم اینڈ ایمز (M&M's)",
  "Snickers": "سنیکرز (Snickers)",
  "Twix": "ٹوئکس (Twix)",
  "Bounty": "باؤنٹی (Bounty)",
  "Mars Bar": "مارس (Mars)",
  "Mars": "مارس (Mars)",
  "Nutella": "نوٹیلا (Nutella)",
  "Kinder Chocolate": "کنڈر چاکلیٹ (Kinder)",
  "Kinder Bueno": "کنڈر بیونو (Kinder Bueno)",
  "Tuc Biscuits": "ٹک بسکٹ (Tuc)",
  "Prince Biscuits": "پرنس بسکٹ (Prince / LU)",

  // Personal Care & Soaps
  "Surf Excel": "سرف ایکسل (Surf Excel)",
  "Ariel Detergent": "ایریئل (Ariel)",
  "Ariel": "ایریئل (Ariel)",
  "Tide": "ٹائڈ (Tide)",
  "Bonus": "بونس سرف (Bonus)",
  "Brite": "برائٹ (Brite)",
  "Sunlight": "سن لائٹ (Sunlight)",
  "Vim Dishwash": "وِم بار (Vim)",
  "Vim": "وِم (Vim)",
  "Max Dishwash": "میکس ڈش واش (Max)",
  "Harpic": "ہارپک (Harpic)",
  "Dettol Soap & Antiseptic": "ڈیٹول (Dettol)",
  "Dettol": "ڈیٹول (Dettol)",
  "Lifebuoy Soap": "لائف بوائے (Lifebuoy)",
  "Lifebuoy": "لائف بوائے (Lifebuoy)",
  "Lux Soap": "لکس (Lux)",
  "Lux": "لکس (Lux)",
  "Dove Soap & Care": "ڈو (Dove)",
  "Dove": "ڈو (Dove)",
  "Palmolive": "پامولیو (Palmolive)",
  "Safeguard Soap": "سیف گارڈ (Safeguard)",
  "Safeguard": "سیف گارڈ (Safeguard)",
  "Sunsilk Shampoo": "سن سلک (Sunsilk)",
  "Sunsilk": "سن سلک (Sunsilk)",
  "Pantene Shampoo": "پینٹین (Pantene)",
  "Pantene": "پینٹین (Pantene)",
  "Head & Shoulders": "ہیڈ اینڈ شولڈرز (Head & Shoulders)",
  "Clear Shampoo": "کلیئر (Clear)",
  "Clear": "کلیئر (Clear)",
  "Colgate Toothpaste": "کولگیٹ (Colgate)",
  "Colgate": "کولگیٹ (Colgate)",
  "Sensodyne Toothpaste": "سینسوڈائن (Sensodyne)",
  "Sensodyne": "سینسوڈائن (Sensodyne)",
  "Close Up Toothpaste": "کلوز اپ (Close Up)",
  "Close Up": "کلوز اپ (Close Up)",
  "Oral-B": "اورل بی (Oral-B)",
  "Pampers Diapers": "پیمپرز (Pampers)",
  "Pampers": "پیمپرز (Pampers)",
  "Huggies Diapers": "ہگیز (Huggies)",
  "Huggies": "ہگیز (Huggies)",
  "Johnson's Baby": "جانسنز بے بی (Johnson's)",
  "Vaseline": "فیسلین (Vaseline)",
  "Fair & Lovely / Glow & Lovely": "گلو اینڈ لولی (Glow & Lovely)",
  "Glow & Lovely": "گلو اینڈ لولی (Glow & Lovely)",
  "Garnier": "گارنیئر (Garnier)",
  "L'Oréal Paris": "لوریئل (L'Oréal)",
  "L'Oréal": "لوریئل (L'Oréal)",
  "Maybelline New York": "میبلین (Maybelline)",
  "Maybelline": "میبلین (Maybelline)",
  "Nivea": "نیویا (Nivea)",
  "Gillette Razors": "جلیٹ (Gillette)",
  "Gillette": "جلیٹ (Gillette)",

  // Tech, Fashion & Multinationals
  "HP (Hewlett Packard)": "ایچ پی (HP)",
  "Hewlett Packard": "ایچ پی (HP)",
  "Siemens": "سیمنز (Siemens)",
  "Intel Processors": "انٹیل (Intel)",
  "Intel": "انٹیل (Intel)",
  "Puma Sports": "پوما (Puma)",
  "Puma": "پوما (Puma)",
  "Zara Fashion": "زارا (Zara)",
  "Zara": "زارا (Zara)",
  "Nike": "نائییکی (Nike)",
  "Adidas": "ایڈیڈاس (Adidas)",
  "SodaStream": "سوڈا اسٹریم (SodaStream)",
  "Wix.com": "وکس ڈاٹ کام (Wix)",
  "Wix": "وکس (Wix)",
  "Fiverr": "فائیور (Fiverr)",
  "Airbnb (Settlements)": "ایئر بی این بی (Airbnb)",
  "Airbnb": "ایئر بی این بی (Airbnb)",
  "Booking.com (Settlements)": "بکنگ ڈاٹ کام (Booking)",
  "Booking.com": "بکنگ ڈاٹ کام (Booking)",
  "Caterpillar Inc.": "کیٹرپلر (Caterpillar)",
  "Caterpillar": "کیٹرپلر (Caterpillar)",
  "Disney": "ڈزنی (Disney)",

  // Celebrities & Endorsers
  "Babar Azam": "بابر اعظم (Babar Azam)",
  "Shaheen Shah Afridi": "شاہین شاہ آفریدی (Shaheen Afridi)",
  "Mohammad Rizwan": "محمد رضوان (Mohammad Rizwan)",
  "Shadab Khan": "شاداب خان (Shadab Khan)",
  "Haris Rauf": "حارث رؤف (Haris Rauf)",
  "Naseem Shah": "نسیم شاہ (Naseem Shah)",
  "Fawad Khan": "فواد خان (Fawad Khan)",
  "Mahira Khan": "ماہرہ خان (Mahira Khan)",
  "Atif Aslam": "عاطف اسلم (Atif Aslam)",
  "Ali Zafar": "علی ظفر (Ali Zafar)",
  "Hania Aamir": "ہانیہ عامر (Hania Aamir)",
  "Ayeza Khan": "عائزہ خان (Ayeza Khan)",
  "Sajal Aly": "سجل علی (Sajal Aly)",
  "Yumna Zaidi": "یمنیٰ زیدی (Yumna Zaidi)",
  "Mehwish Hayat": "مہوش حیات (Mehwish Hayat)",
  "Iqra Aziz": "اقراء عزیز (Iqra Aziz)",
  "Humayun Saeed": "ہمایوں سعید (Humayun Saeed)",
  "Fahad Mustafa": "فہد مصطفیٰ (Fahad Mustafa)",
  "Wasim Akram": "وسیم اکرم (Wasim Akram)",
  "Shoaib Malik": "شعیب ملک (Shoaib Malik)"
};

// Parent Company Urdu Translations
const PARENT_COMPANIES_URDU: Record<string, string> = {
  "McDonald's Corporation": "میکڈونلڈز کارپوریشن",
  "McDonald's Corporation / Alonyal Ltd.": "میکڈونلڈز کارپوریشن / الونیال لمیٹڈ",
  "PepsiCo": "پیپسی کو (PepsiCo)",
  "The Coca-Cola Company": "کوکا کولا کمپنی",
  "Coca-Cola": "کوکا کولا کمپنی",
  "Nestlé S.A.": "نیسلے کمپنی (Nestlé)",
  "Nestlé": "نیسلے (Nestlé)",
  "Nestlé S.A. / Osem Investments Ltd.": "نیسلے / اوسم انویسٹمنٹس",
  "Unilever PLC": "یونی لیور (Unilever)",
  "Unilever": "یونی لیور (Unilever)",
  "Procter & Gamble (P&G)": "پراکٹر اینڈ گیمبل (P&G)",
  "P&G": "پراکٹر اینڈ گیمبل (P&G)",
  "Yum! Brands Inc.": "یم! برانڈز (Yum! Brands)",
  "Yum! Brands": "یم! برانڈز (Yum! Brands)",
  "Starbucks Corporation": "اسٹاربکس کارپوریشن",
  "Mondelez International": "مونڈلیز انٹرنیشنل",
  "Mondelez": "مونڈلیز انٹرنیشنل",
  "Kraft Heinz": "کرافٹ ہینز",
  "Mars, Incorporated": "مارس انکارپوریٹڈ",
  "Mars": "مارس انکارپوریٹڈ",
  "Reckitt Benckiser": "ریکٹ بینکیزر (Reckitt)",
  "Reckitt": "ریکٹ بینکیزر",
  "Colgate-Palmolive": "کولگیٹ پامولیو",
  "L'Oréal S.A.": "لوریئل گروپ",
  "L'Oreal": "لوریئل گروپ",
  "Johnson & Johnson": "جانسن اینڈ جانسن",
  "Puma SE": "پوما ایس ای",
  "Inditex Group (Zara)": "انڈیٹیکس گروپ (زارا)",
  "Inditex": "انڈیٹیکس گروپ (زارا)",
  "HP Inc. / Hewlett Packard Enterprise": "ایچ پی کارپوریشن",
  "HP": "ایچ پی کارپوریشن",
  "Siemens AG": "سیمنز اے جی",
  "Siemens": "سیمنز اے جی",
  "Intel Corporation": "انٹیل کارپوریشن",
  "Intel": "انٹیل کارپوریشن",
  "Caterpillar Inc.": "کیٹرپلر کارپوریشن",
  "The Walt Disney Company": "والٹ ڈزنی کمپنی"
};

/**
 * Returns Urdu localized name for a product item
 */
export const getLocalizedProductName = (product: { name: string }, lang: 'en' | 'ur'): string => {
  if (lang === 'en' || !product?.name) return product?.name || '';
  return BRAND_NAMES_URDU[product.name] || BRAND_NAMES_URDU[product.name.trim()] || product.name;
};

/**
 * Returns Urdu localized parent company
 */
export const getLocalizedParentCompany = (parentCompany: string | undefined, lang: 'en' | 'ur'): string => {
  if (lang === 'en' || !parentCompany) return parentCompany || '';
  return PARENT_COMPANIES_URDU[parentCompany] || PARENT_COMPANIES_URDU[parentCompany.trim()] || parentCompany;
};

/**
 * Returns localized Boycott Reason in authentic Urdu
 */
export const getLocalizedBoycottReason = (reason: string | undefined, lang: 'en' | 'ur'): string => {
  if (lang === 'en' || !reason) return reason || '';

  // Match known patterns
  for (const item of REASON_KEYWORDS_MAP) {
    if (item.pattern.test(reason)) {
      return item.urdu;
    }
  }

  // Fallback translation if not explicitly matched
  return 'اسرائیلی قابض معیشت، غیر قانونی بستیوں یا عسکری و دفاعی نظام کے ساتھ مصدقہ مالی و تجارتی تعلقات۔';
};

/**
 * Returns localized Behavior / Action notes
 */
export const getLocalizedBehaviorNotes = (notes: string | undefined, lang: 'en' | 'ur'): string => {
  if (lang === 'en' || !notes) return notes || '';
  return 'مصدقہ بائیکاٹ ریکارڈ: اسرائیلی فوج، مقبوضہ بستیوں یا بائیکاٹ زدہ ملٹی نیشنل کمپنیوں کے ساتھ تجارتی و اشتہاری معاہدے۔';
};
