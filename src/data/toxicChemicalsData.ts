// Master Chemical Exposer & Tayyib Wholesome Nutrition Dataset
// Exposing biochemical toxins in both boycotted multinationals and counterfeit cheap local swaps

export interface ToxicChemical {
  id: string;
  name: string;
  code: string;
  category: 'Sweetener' | 'Artificial Color' | 'Preservative' | 'Flavor Enhancer' | 'Bleaching Agent' | 'Emulsifier';
  severity: 'Dangerous' | 'High Risk' | 'Moderate Concern';
  euBanStatus: 'Banned' | 'Requires Warning Label' | 'Strictly Restricted' | 'Allowed';
  japanBanStatus: 'Banned' | 'Restricted' | 'Allowed';
  biologicalHazards: string[];
  cellularMechanism: string;
  commonProductsFoundIn: string[];
  halalVsTayyibVerdict: string;
  tayyibWholesomeAlternative: string;
}

export interface ToxicSwapComparison {
  id: string;
  category: string;
  boycottTarget: {
    name: string;
    parent: string;
    whyBoycott: string;
    toxicAdditives: string[];
  };
  dirtyLocalSwap: {
    name: string;
    warning: string;
    toxicAdditives: string[];
    isHalal: boolean;
    isTayyib: boolean;
    cleanScore: number; // 0-100
  };
  pureTayyibAlternative: {
    name: string;
    producer: string;
    origin: string;
    ingredients: string[];
    isHalal: boolean;
    isTayyib: boolean;
    cleanScore: number; // 0-100
    description: string;
  };
}

export const TOXIC_CHEMICALS_DICTIONARY: ToxicChemical[] = [
  {
    id: 'hfcs',
    name: 'High Fructose Corn Syrup (HFCS-55)',
    code: 'Glucose-Fructose Syrup',
    category: 'Sweetener',
    severity: 'Dangerous',
    euBanStatus: 'Strictly Restricted',
    japanBanStatus: 'Restricted',
    biologicalHazards: [
      'Non-Alcoholic Fatty Liver Disease (NAFLD)',
      'Severe Insulin Resistance & Type 2 Diabetes',
      'Leptin Resistance (shuts down brain satiety signaling, causing overeating)',
      'High Blood Pressure & Visceral Adiposity'
    ],
    cellularMechanism: 'Unlike glucose, fructose can only be metabolized by the liver. Fructose-1-phosphate conversion rapidly depletes cellular ATP, spikes uric acid, and triggers de novo lipogenesis (instant fat storage in hepatocytes).',
    commonProductsFoundIn: ['Coca-Cola', 'Pepsi', 'Commercial Ketchup', 'Packaged Fruit Punches', 'Cheap Local Sodas', 'Breakfast Cereals'],
    halalVsTayyibVerdict: 'Permissible (Halal) strictly by ritual law, but severely violates Tayyib (wholesomeness/non-harm) due to systemic metabolic toxicity.',
    tayyibWholesomeAlternative: 'Raw unpasteurized honey, organic date paste, raw jaggery (Gur), or unrefined dehydrated cane juice (Shakar).'
  },
  {
    id: 'aspartame',
    name: 'Aspartame',
    code: 'E951 / Equal / NutraSweet',
    category: 'Sweetener',
    severity: 'Dangerous',
    euBanStatus: 'Requires Warning Label',
    japanBanStatus: 'Restricted',
    biologicalHazards: [
      'Classified as Group 2B (Possibly Carcinogenic to Humans) by WHO IARC (2023)',
      'Destroys Beneficial Gut Microbiome (Akkermansia and Bifidobacteria)',
      'Neurological Migraines, Brain Fog & Neurotoxicity',
      'Spikes Artificial Cravings and Paradoxical Weight Gain'
    ],
    cellularMechanism: 'Breaks down in the gastrointestinal tract into phenylalanine (50%), aspartic acid (40%), and methanol (10%). Methanol oxidizes in human tissues into formaldehyde, a potent DNA mutagen and cellular cross-linker.',
    commonProductsFoundIn: ['Diet Coke', 'Pepsi Diet', 'Zero-Sugar Energy Drinks', 'Chewing Gums', 'Sugar-Free Local Juices'],
    halalVsTayyibVerdict: 'Halal but completely Anti-Tayyib. Introducing synthetic neurotoxic formaldehyde precursors into your blood stream harms the body (La Darar wa La Dirar).',
    tayyibWholesomeAlternative: 'Whole green stevia leaf infusion, organic monk fruit extract, or moderate consumption of dried dates and figs.'
  },
  {
    id: 'red-40',
    name: 'Red 40 (Allura Red AC)',
    code: 'E129 / CI 16035',
    category: 'Artificial Color',
    severity: 'High Risk',
    euBanStatus: 'Requires Warning Label',
    japanBanStatus: 'Restricted',
    biologicalHazards: [
      'EU Warning Mandatory: "May have an adverse effect on activity and attention in children" (ADHD)',
      'Petroleum-Derived Azo Dye with Carcinogenic Contaminants (p-Cresidine)',
      'Disrupts Gut Barrier & Triggers Colitis and Inflammatory Bowel Disease',
      'Severe Allergic Hives and Histamine Flare-ups'
    ],
    cellularMechanism: 'Metabolized by intestinal bacteria into aromatic amines that generate reactive oxygen species (ROS), causing oxidative damage to colonic epithelial tight junctions.',
    commonProductsFoundIn: ['Doritos', 'Cheetos Flamin Hot', 'Red Fruit Candies', 'Cheap Strawberry Syrups', 'Commercial Red Jellies'],
    halalVsTayyibVerdict: 'Synthetic petroleum-derived dye. While synthetic chemistry avoids animal pork derivatives, ingesting petroleum distillates that damage children\'s neurodevelopment violates the prophetic command for pure, clean sustenance.',
    tayyibWholesomeAlternative: 'Beetroot juice powder (Betanin), hibiscus flower extract (Sabdariffa), or organic black carrot concentrate.'
  },
  {
    id: 'titanium-dioxide',
    name: 'Titanium Dioxide',
    code: 'E171 / CI 77891',
    category: 'Artificial Color',
    severity: 'Dangerous',
    euBanStatus: 'Banned',
    japanBanStatus: 'Restricted',
    biologicalHazards: [
      'Fully BANNED across the entire European Union (EFSA 2022) as a food additive',
      'Genotoxicity: Accumulates inside cellular nuclei and causes DNA strand breaks',
      'Chronic intestinal inflammation and micro-lesions',
      'Crosses the blood-brain and placental barriers'
    ],
    cellularMechanism: 'Contains nano-sized particles (<100nm) that cannot be cleared by the body. Nanoparticles generate oxidative stress, penetrate cellular membranes, and cause chromosomal aberrations.',
    commonProductsFoundIn: ['Commercial White Frosting', 'Coffee Creamers', 'Skittles & White Candies', 'Cheap Chewing Gum', 'Powdered Milk Whitener'],
    halalVsTayyibVerdict: 'Strictly prohibited under wholesome Tayyib standards due to proven genotoxicity and international European food safety bans.',
    tayyibWholesomeAlternative: 'Natural organic coconut milk powder, pure ground rice starch, or calcium carbonate from clean mineral sources.'
  },
  {
    id: 'tbhq',
    name: 'TBHQ (Tertiary Butylhydroquinone)',
    code: 'E319',
    category: 'Preservative',
    severity: 'Dangerous',
    euBanStatus: 'Strictly Restricted',
    japanBanStatus: 'Banned',
    biologicalHazards: [
      'Banned in Japan and heavily restricted in the European Union',
      'Impairs Immune Response: Blunts T-cell and NK-cell viral defense',
      'Increases Severe Food Allergies (Peanut, Dairy, Gluten hypersensitivity)',
      'Neurotoxic in chronic doses and linked to liver enlargement'
    ],
    cellularMechanism: 'Synthetic petroleum-based phenolic antioxidant added to industrial oils to prevent rancidity for 2+ years. Interferes with Nrf2 protective antioxidant pathways and suppresses IL-2 immune signaling.',
    commonProductsFoundIn: ['Multinational Fast Food Fried Chicken Oils', 'Commercial Potato Chips', 'Packaged Instant Noodles', 'Microwave Popcorn', 'Processed Biscuits'],
    halalVsTayyibVerdict: 'Industrial petroleum stabilizer disguised as food preservation. Contradicts wholesome nourishment (Kulu min Tayyibat).',
    tayyibWholesomeAlternative: 'Organic rosemary leaf extract, cold-pressed virgin mustard or coconut oil, and vitamin E (Mixed Tocopherols).'
  },
  {
    id: 'msg',
    name: 'Monosodium Glutamate & Yeast Extract Hydrolysate',
    code: 'E621 / Flavor Enhancer',
    category: 'Flavor Enhancer',
    severity: 'Moderate Concern',
    euBanStatus: 'Allowed',
    japanBanStatus: 'Allowed',
    biologicalHazards: [
      'Excitotoxicity: Over-stimulates NMDA and glutamate receptors in the central nervous system',
      'Spikes appetite artificially to mask inferior raw ingredients',
      'Triggers severe headaches, facial flushing, and heart palpitations in sensitive individuals',
      'Destabilizes hypothalamic appetite regulation'
    ],
    cellularMechanism: 'Excess free glutamate crosses damaged or immature blood-brain barriers, triggering excessive calcium influx into neurons that can lead to neuronal stress.',
    commonProductsFoundIn: ['Maggi & Knorr Cubes', 'Commercial Fried Chicken Batter', 'Flavored Crisps & Nachos', 'Canned Soups', 'Chinese Fast Food'],
    halalVsTayyibVerdict: 'Halal certified, but used ubiquitously to disguise low-grade synthetic food paste as savory meat. True Tayyib cuisine derives umami from real bone broth, sun-dried mushrooms, and fermented spices.',
    tayyibWholesomeAlternative: 'Simmered grass-fed bone broth (Yakhni), sun-dried shiitake mushroom powder, nutritional yeast, and roasted garlic/onion paste.'
  },
  {
    id: 'tartrazine-yellow-5',
    name: 'Tartrazine (Yellow 5 / Yellow 6)',
    code: 'E102 / E110',
    category: 'Artificial Color',
    severity: 'High Risk',
    euBanStatus: 'Requires Warning Label',
    japanBanStatus: 'Restricted',
    biologicalHazards: [
      'Linked to Childhood Hyperactivity and Neurobehavioral changes',
      'Common Trigger for Chronic Asthma, Urticaria (Hives), and Eczema',
      'Contains Carcinogenic Byproducts (Benzidine and 4-Aminobiphenyl)',
      'Depletes Zinc and Vitamin B6 levels in developing children'
    ],
    cellularMechanism: 'Synthetic coal-tar and petroleum-derived azo dye that complexes with human serum albumin, provoking histamine degranulation from mast cells.',
    commonProductsFoundIn: ['Mountain Dew', 'Commercial Mango/Pineapple Drinks', 'Packaged Custard Powders', 'Orange Cream Biscuits', 'Bright Yellow Biryani Dyes'],
    halalVsTayyibVerdict: 'Synthetic coal-tar dye. Replacing this with sacred saffron (Zafran) and turmeric (Haldi) restores sunnah-aligned holistic health.',
    tayyibWholesomeAlternative: 'Organic pure ground turmeric (Curcuma longa), pure Persian saffron threads, or annatto seed extract.'
  }
];

export const TOXIC_SWAP_COMPARISONS: ToxicSwapComparison[] = [
  {
    id: 'swap-soda',
    category: 'Beverages & Sodas',
    boycottTarget: {
      name: 'Coca-Cola / Pepsi',
      parent: 'The Coca-Cola Company / PepsiCo Inc.',
      whyBoycott: 'Factories on occupied Palestinian land (Atarot), deep Israeli bond holdings, massive dividend flight to US asset managers.',
      toxicAdditives: ['High Fructose Corn Syrup (HFCS-55)', 'Caramel Color E150d (4-MEI Carcinogen)', 'Phosphoric Acid (E338 bone leacher)']
    },
    dirtyLocalSwap: {
      name: 'Cheap Local Counterfeit Soda',
      warning: 'Uses artificial sweeteners (Aspartame/Acesulfame-K), industrial food dyes, and tap water without micro-filtration to undercut prices.',
      toxicAdditives: ['Aspartame (E951)', 'Acesulfame-K (E950)', 'Sodium Benzoate (E211)', 'Artificial Cola Essence'],
      isHalal: true,
      isTayyib: false,
      cleanScore: 28
    },
    pureTayyibAlternative: {
      name: 'Cold-Pressed Raw Sattu, Mint Lemonade & Pakola Real Cane / Gourmet Pure',
      producer: 'Local Pakistani artisanal juice makers / Organic farmers',
      origin: 'Punjab & Sindh, Pakistan',
      ingredients: ['Roasted Barley (Sattu)', 'Fresh squeezed local lemons', 'Raw unrefined brown sugar (Gur)', 'Mint leaves', 'Himalayan pink salt'],
      isHalal: true,
      isTayyib: true,
      cleanScore: 96,
      description: '100% natural, provides lasting electrolyte hydration, supports domestic farmers, and contains zero synthetic food dyes or neurotoxic sweeteners.'
    }
  },
  {
    id: 'swap-chips',
    category: 'Snacks & Crisps',
    boycottTarget: {
      name: 'Lay\'s / Doritos / Cheetos',
      parent: 'PepsiCo Inc.',
      whyBoycott: 'PepsiCo owned SodaStream (occupied West Bank) and Sabra Hummus (Strauss Group). Drains millions in royalty repatriations.',
      toxicAdditives: ['Red 40 (E129)', 'Yellow 6 (E110)', 'TBHQ (E319)', 'Monosodium Glutamate (E621)', 'Hydrogenated Palm Olein']
    },
    dirtyLocalSwap: {
      name: 'Low-Grade Street Market Potato Chips',
      warning: 'Fried in repeatedly burned and oxidized cottonseed oil loaded with toxic free radicals and synthetic chemical seasoning.',
      toxicAdditives: ['TBHQ (E319)', 'Tartrazine (E102)', 'Excessive Industrial MSG', 'Recycled Oxidized Oil'],
      isHalal: true,
      isTayyib: false,
      cleanScore: 32
    },
    pureTayyibAlternative: {
      name: 'Sun-Dried Lotus Seeds (Makhana) & Handcrafted Desi Ghee Crisps',
      producer: 'Local Organic Artisanal Cooperatives (Kisan Organics / Pure Desi)',
      origin: 'Multan & Peshawar, Pakistan',
      ingredients: ['Whole roasted Foxnuts (Phool Makhana)', 'Pure A2 Cow Desi Ghee', 'Himalayan rock salt', 'Organic black pepper', 'Cumin'],
      isHalal: true,
      isTayyib: true,
      cleanScore: 98,
      description: 'Rich in plant protein, magnesium, and healthy fats. Promotes cardiovascular health and zero artificial colorings or chemical preservatives.'
    }
  },
  {
    id: 'swap-tea',
    category: 'Tea & Daily Brew',
    boycottTarget: {
      name: 'Lipton / Yellow Label',
      parent: 'Unilever / ekaterra (CVC Capital Partners)',
      whyBoycott: 'Massive corporate funding in Israeli technology accelerators and colonial plant exploitation.',
      toxicAdditives: ['Artificial Flavoring Agents', 'Bleached Paper Tea Bag Microplastics (PET/Nylon fibers released into boiling tea)']
    },
    dirtyLocalSwap: {
      name: 'Adulterated Loose CTC Dust Tea',
      warning: 'Mixed with spent dried tea waste, artificial coloring dyes (Metanil Yellow), and leather tanning residue to boost color fastness.',
      toxicAdditives: ['Metanil Yellow Color', 'Chemical Tea Dust Coatings', 'Excess Fluoride'],
      isHalal: true,
      isTayyib: false,
      cleanScore: 38
    },
    pureTayyibAlternative: {
      name: 'Tapal Danedar Pure Loose Leaf & Organic Green Herbal Infusions',
      producer: 'Tapal Tea (100% Pakistani Owned) / Hunza Valley Herbal Co',
      origin: 'Karachi & Gilgit-Baltistan, Pakistan',
      ingredients: ['100% Pure Orthodox Whole Tea Leaves', 'Handpicked Dried Kashmiri Kahwa Leaves', 'Crushed Green Cardamom', 'Saffron'],
      isHalal: true,
      isTayyib: true,
      cleanScore: 95,
      description: 'Authentic pure high-altitude loose leaf tea without microplastic teabag infusion. High in natural polyphenols and EGCG antioxidants.'
    }
  }
];
