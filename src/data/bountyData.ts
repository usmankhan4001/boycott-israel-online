// Bounty Board Dataset: Demand Aggregator for Unmade Domestic Market Gaps
// Connecting conscious consumer purchasing power directly to domestic entrepreneurs and food scientists

export interface MarketBounty {
  id: string;
  category: 'Baby Care' | 'Electronics & Hardware' | 'Personal Care & Cosmetics' | 'Food & Beverages' | 'Cleaning & Household' | 'Clothing & Textiles';
  title: string;
  shortTagline: string;
  description: string;
  boycottedTargetToReplace: string;
  unmetDemandSummary: string;
  pledgedMonthlySpendPkr: number;
  totalPledgersCount: number;
  upvotesCount: number;
  urgency: 'Critical' | 'High' | 'Medium';
  targetPricePkr: number;
  unit: string;
  suggestedDomesticMakers: string[];
  scientificRequirements: string[];
  activeProposalsCount: number;
  proposals: {
    id: string;
    makerName: string;
    city: string;
    status: 'Prototyping' | 'Lab Testing' | 'Crowdfunding' | 'Ready for Beta';
    summary: string;
    contactEmail?: string;
  }[];
}

export const INITIAL_BOUNTIES: MarketBounty[] = [
  {
    id: 'bounty-baby-formula',
    category: 'Baby Care',
    title: '100% Organic Grass-Fed Whole Goat & Cow Milk Infant Formula',
    shortTagline: 'Pure nourishment without palm oil, synthetic maltodextrin, or heavy metal contamination',
    description: 'A sovereign, non-toxic infant formula manufactured in Pakistan using organic grass-fed dairy from local certified pastures, fortified with natural DHA from marine algae and organic prebiotics.',
    boycottedTargetToReplace: 'Nestlé Cerelac, Nido, Lactogen, NAN Pro (Nestlé Corp)',
    unmetDemandSummary: 'Thousands of mothers across Pakistan are desperate to boycott Nestlé infant products but lack a clean, certified domestic alternative with modern pediatric nutritional balance.',
    pledgedMonthlySpendPkr: 14850000, // PKR 14.85 Million/month pledged
    totalPledgersCount: 3720,
    upvotesCount: 4890,
    urgency: 'Critical',
    targetPricePkr: 2800,
    unit: '800g canister',
    suggestedDomesticMakers: ['Engro Foods (Olper\'s Pro)', 'Fauji Foods (Nurpur Bio)', 'PCSIR National Nutrition Labs', 'Kisan Organics'],
    scientificRequirements: [
      'Zero refined palm olein (prevents calcium soap formation)',
      '100% lactose-based carbohydrate source (no corn syrup solids)',
      'A2 beta-casein grass-fed whole milk fat globule membrane (MFGM)',
      'Third-party batch testing for lead, cadmium, and arsenic (< 1 ppb)'
    ],
    activeProposalsCount: 2,
    proposals: [
      {
        id: 'prop-1',
        makerName: 'Sufi Agro-Bio Labs',
        city: 'Lahore',
        status: 'Lab Testing',
        summary: 'Formulating whole A2 goat milk powder with cold-spray drying technology. Clinical baby trial phase commencing Q4.'
      },
      {
        id: 'prop-2',
        makerName: 'PakPure Nutrition Startups',
        city: 'Islamabad',
        status: 'Prototyping',
        summary: 'Micro-algae DHA extraction and organic pasture certification in Sargodha dairy belt.'
      }
    ]
  },
  {
    id: 'bounty-open-smartphone',
    category: 'Electronics & Hardware',
    title: 'Sovereign Open-Source Smartphone (Hardware Switches & Repairable)',
    shortTagline: 'Privacy-first handset running de-Googled OS with conflict-free mineral sourcing',
    description: 'An ethically assembled smartphone with modular, user-replaceable battery, hardware kill switches for camera/mic, and running open-source PostmarketOS or GrapheneOS fork.',
    boycottedTargetToReplace: 'Apple iPhone, Google Pixel, Samsung Galaxy',
    unmetDemandSummary: 'Muslim tech workers, journalists, and activists need a smartphone completely free from NSA/Pegasus surveillance backdoors and unethically mined Congo cobalt.',
    pledgedMonthlySpendPkr: 28400000,
    totalPledgersCount: 1950,
    upvotesCount: 6120,
    urgency: 'High',
    targetPricePkr: 55000,
    unit: 'device',
    suggestedDomesticMakers: ['Inverex Tech / Microelectronics Hub', 'NUST DeepTech Incubator', 'QMobile Sovereign Labs'],
    scientificRequirements: [
      'Modular screw assembly (Zero glued glass sandwiches)',
      'Direct hardware toggle switches for Baseband modem, Wi-Fi, and Microphones',
      'Verified fair-traceability cobalt and recycled tantalum components',
      'Unlocked bootloader with lifetime open-source Linux kernel support'
    ],
    activeProposalsCount: 1,
    proposals: [
      {
        id: 'prop-3',
        makerName: 'Al-Khwarizmi Open Hardware Guild',
        city: 'Islamabad',
        status: 'Prototyping',
        summary: 'RISC-V architecture test board with e-ink secondary display and custom local PCB soldering.'
      }
    ]
  },
  {
    id: 'bounty-mineral-sunscreen',
    category: 'Personal Care & Cosmetics',
    title: '100% Non-Nano Zinc Oxide Mineral Sunscreen (Ocean & Skin Safe)',
    shortTagline: 'Broad spectrum SPF 50+ without titanium dioxide, benzene, or endocrine disruptors',
    description: 'A completely clean sunscreen formulated with pharmaceutical-grade non-nano zinc oxide, organic cold-pressed jojoba, and raw shea butter that leaves no white cast on South Asian skin tones.',
    boycottedTargetToReplace: 'L\'Oréal Paris, Neutrogena (Johnson & Johnson), Garnier, Nivea',
    unmetDemandSummary: 'Standard commercial sunscreens are packed with endocrine-disrupting oxybenzone, octinoxate, and carcinogenic benzene contaminants.',
    pledgedMonthlySpendPkr: 9200000,
    totalPledgersCount: 4600,
    upvotesCount: 3950,
    urgency: 'High',
    targetPricePkr: 1800,
    unit: '100ml pump bottle',
    suggestedDomesticMakers: ['Conatural Skincare', 'Mana Beauty Spirit', 'Herbal Heritage Lab Lahore'],
    scientificRequirements: [
      '22% Non-Nano Zinc Oxide active ingredient (>200nm particle size)',
      'Zero chemical benzene/octocrylene UV filters',
      'Infused with domestic astaxanthin and green tea polyphenols for cellular repair',
      'Microplastic-free, biodegradable aluminum container'
    ],
    activeProposalsCount: 3,
    proposals: [
      {
        id: 'prop-4',
        makerName: 'BioTayyib Labs',
        city: 'Karachi',
        status: 'Ready for Beta',
        summary: 'Developed tinted non-greasy non-nano zinc formula tailored for wheatish Pakistani complexions. SPF 52 tested.'
      }
    ]
  },
  {
    id: 'bounty-bio-detergent',
    category: 'Cleaning & Household',
    title: 'Plant-Based Enzymatic Bio-Detergent & Soapnut Laundry Concentrate',
    shortTagline: '100% greywater safe, zero synthetic perfumes, SLS, optical brighteners, or phosphates',
    description: 'A high-potency laundry concentrate derived from Himalayan soapnuts (Reetha), natural fermented bio-enzymes, and pure essential oils that cleans deep without poisoning rivers.',
    boycottedTargetToReplace: 'Ariel, Tide (Procter & Gamble), Surf Excel, Sunlight (Unilever)',
    unmetDemandSummary: 'Household laundry detergents are a multi-billion rupee monopoly where foreign multinationals export profits and discharge toxic endocrine disruptors into Pakistani waterways.',
    pledgedMonthlySpendPkr: 18200000,
    totalPledgersCount: 8100,
    upvotesCount: 5240,
    urgency: 'Critical',
    targetPricePkr: 850,
    unit: '1 Litre bottle (40 loads)',
    suggestedDomesticMakers: ['Sufi Soap & Chemical Industries', 'Kashmir Soap Works', 'Brite Domestic Labs'],
    scientificRequirements: [
      'Cold-extracted indigenous Sapindus mukorossi (Reetha) saponin base',
      'Protease, Amylase, and Lipase natural non-GMO enzymes',
      'Zero synthetic linear alkylbenzene sulfonate (LAS)',
      'Pure therapeutic lemongrass and tea tree antimicrobial fragrance'
    ],
    activeProposalsCount: 2,
    proposals: [
      {
        id: 'prop-5',
        makerName: 'Kisan BioEnzymes',
        city: 'Faisalabad',
        status: 'Crowdfunding',
        summary: 'Partnered with 200 Reetha growers in Hazara to produce concentrated enzymatic detergent blocks.'
      }
    ]
  },
  {
    id: 'bounty-tayyib-cola',
    category: 'Food & Beverages',
    title: 'Artisanal Real Botanical Kola & Wild Honey Soda',
    shortTagline: 'Brewed with real Kola nut, whole spices, citrus oils, and raw cane jaggery (Gur)',
    description: 'A genuine botanical soda brewed the ancient way using real African kola nuts, cinnamon bark, nutmeg, lime essential oils, and sweetened with raw unrefined jaggery. Zero artificial dyes, zero phosphoric acid.',
    boycottedTargetToReplace: 'Coca-Cola, Pepsi, Sprite, Fanta',
    unmetDemandSummary: 'People crave a dark, fizzy, refreshing cola beverage with friends and family, but refuse to drink chemical dye cocktails that fund genocide.',
    pledgedMonthlySpendPkr: 22600000,
    totalPledgersCount: 11400,
    upvotesCount: 7850,
    urgency: 'Critical',
    targetPricePkr: 150,
    unit: '330ml glass bottle',
    suggestedDomesticMakers: ['Murree Brewery (Sparkling Division)', 'Pakola Beverages Ltd', 'Gourmet Foods', 'Mezan Beverages'],
    scientificRequirements: [
      'Extract of certified Cola acuminata nuts',
      'Zero High Fructose Corn Syrup (HFCS-55) or Aspartame (E951)',
      'Natural roasted date seed or unrefined cane molasses for dark rich color (No E150d caramel)',
      'Natural tartaric and malic acid from green tamarind and lemon (No E338 bone leacher)'
    ],
    activeProposalsCount: 2,
    proposals: [
      {
        id: 'prop-6',
        makerName: 'Sufi Heritage Beverages',
        city: 'Lahore',
        status: 'Prototyping',
        summary: 'Sparkling botanical craft soda with raw citrus oils and fermented ginger-tamarind cola base in recycled amber bottles.'
      }
    ]
  },
  {
    id: 'bounty-artisanal-chocolate',
    category: 'Food & Beverages',
    title: 'Single-Origin Fair-Trade 70% Dark Chocolate & Desi Hazelnut Spread',
    shortTagline: 'Directly sourced cocoa with raw cane sugar, A2 milk, and zero child labor',
    description: 'Silky, rich, ethically-sourced bean-to-bar dark chocolate and pure hazelnut-cocoa spread made with real stone-ground hazelnuts and zero hydrogenated palm oil.',
    boycottedTargetToReplace: 'KitKat, Dairy Milk, Nutella (Ferrero), Galaxy (Mars Inc), Toblerone',
    unmetDemandSummary: 'Multinational chocolate giants are notorious for West African child slave labor and massive corporate complicity in Israel.',
    pledgedMonthlySpendPkr: 11500000,
    totalPledgersCount: 5200,
    upvotesCount: 4300,
    urgency: 'Medium',
    targetPricePkr: 450,
    unit: '80g artisanal bar / 350g jar',
    suggestedDomesticMakers: ['L\'Artisan Chocolatier Karachi', 'Butler\'s Local Roasters', 'PureDesi Chocolates Lahore'],
    scientificRequirements: [
      'Stone-ground for 48 hours in granite melangers',
      'Zero palm oil or polyglycerol polyricinoleate (PGPR / E476)',
      'Minimum 60% pure roasted cocoa butter content',
      'Fair-direct payments exceeding Fairtrade floor price by 40% to farmer cooperatives'
    ],
    activeProposalsCount: 1,
    proposals: [
      {
        id: 'prop-7',
        makerName: 'SilkRoute Cacao Craft',
        city: 'Hunza & Karachi',
        status: 'Lab Testing',
        summary: 'Tempered single-origin cocoa bars infused with wild Hunza walnuts and organic raw khobani honey.'
      }
    ]
  }
];
