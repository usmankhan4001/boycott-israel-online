// Master Multi-Crisis Geopolitical & Corporate Complicity Dataset
// Connecting Palestine, Congo DRC, Sudan, and Kashmir through financial, military, and resource extraction webs

export interface CrisisZone {
  id: 'palestine' | 'congo' | 'sudan' | 'kashmir';
  name: string;
  flag: string;
  region: string;
  rootColonialActor: string;
  extractionResources: string[];
  affectedPopulation: string;
  humanitarianToll: string;
  unResolutions: string[];
  summary: {
    beginner: string;
    undergrad: string;
    scholar: string;
  };
}

export interface ComplicitEntity {
  id: string;
  name: string;
  category: 'Asset Manager' | 'Defense Contractor' | 'Big Tech' | 'Resource Extraction' | 'Conglomerate' | 'Financial Institution';
  logoText: string;
  headquarters: string;
  marketCapOrAumUsd: string;
  connectedCrises: ('palestine' | 'congo' | 'sudan' | 'kashmir')[];
  keyCrimesSummary: string;
  evidenceDossier: {
    beginner: string;
    undergrad: string;
    scholar: string;
  };
  financialComplicityMetric: string;
  unSecCitations: {
    title: string;
    filingOrDocNumber: string;
    year: number;
    url?: string;
  }[];
  directBoycottTargets: string[];
  localTayyibAction: string;
}

export interface ComplicityConnection {
  id: string;
  sourceId: string;
  targetId: string;
  type: 'Shareholding' | 'Weapons Supply' | 'Mineral Extraction' | 'Surveillance & Cloud' | 'Logistics & Fuel' | 'Settler Financing';
  crises: ('palestine' | 'congo' | 'sudan' | 'kashmir')[];
  description: string;
  financialMagnitude: string;
}

export const CRISIS_ZONES: CrisisZone[] = [
  {
    id: 'palestine',
    name: 'Palestine (Gaza & West Bank)',
    flag: '🇵🇸',
    region: 'Middle East / Levant',
    rootColonialActor: 'British Empire (Balfour Declaration 1917) & US Imperialism',
    extractionResources: ['Gaza Marine Gas Fields', 'West Bank Aquifers', 'Dead Sea Minerals', 'Stolen Agricultural Land'],
    affectedPopulation: '5.4 Million under occupation & blockade; 2.2M displaced in Gaza',
    humanitarianToll: '45,000+ murdered, complete infrastructure decimation, intentional engineered starvation',
    unResolutions: ['UNGA Res 181', 'UNSC Res 242', 'UNSC Res 2334', 'ICJ Advisory Opinion 2024 (Illegal Occupation)'],
    summary: {
      beginner: 'An ongoing military occupation and genocide where tech companies, weapon makers, and food conglomerates profit while innocent families are displaced and bombed.',
      undergrad: 'A settler-colonial military project backed by US military aid ($3.8B/yr) and corporate tech contracts (Project Nimbus) utilizing Gaza as a live-testing laboratory for AI targeting systems and surveillance architecture.',
      scholar: 'An outpost of Western imperial hegemony securing the Levant trade corridor and Mediterranean gas basins, maintained through hyper-militarized enclosure, racial capitalism, and algorithmic warfare enabled by transatlantic finance capital.'
    }
  },
  {
    id: 'congo',
    name: 'Congo (DRC - Katanga & Kivu)',
    flag: '🇨🇩',
    region: 'Central Africa',
    rootColonialActor: 'Belgian Monarchy (King Leopold II) & Western Corporate Cartels',
    extractionResources: ['Cobalt (70% global supply)', 'Coltan (Tantalum for microchips)', 'Copper', 'Industrial Diamonds', 'Gold'],
    affectedPopulation: '7+ Million internally displaced persons; 40,000+ child miners in artisanal pits',
    humanitarianToll: '6+ Million dead since 1996 through proxy militia warfare funded by mineral smuggling networks',
    unResolutions: ['UNSC Res 1533 (Arms Embargo & Minerals)', 'UNSC Res 2667 (DRC Sanctions Regime)'],
    summary: {
      beginner: 'Children as young as six dig toxic cobalt and coltan by hand with zero safety equipment so Western tech giants can make smartphones and electric cars.',
      undergrad: 'A neo-colonial extraction economy where multinational mining cartels (Glencore, Trafigura) and consumer electronics giants siphon raw mineral wealth while external militia groups terrorize local populations.',
      scholar: 'The quintessential sacrifice zone of global green capitalism. The unequal ecological exchange transfers severe toxic heavy-metal burdens and violent territorial dispossession onto the Congolese working class to subsidize Western energy transition paradigms.'
    }
  },
  {
    id: 'sudan',
    name: 'Sudan (Darfur & Khartoum)',
    flag: '🇸🇩',
    region: 'Northeast Africa / Sahel',
    rootColonialActor: 'Anglo-Egyptian Condominium & Regional Gulf Petro-Capital',
    extractionResources: ['Artisanal Gold (Jebel Amer)', 'Gum Arabic (Coca-Cola/Pepsi stabilizer)', 'Nile Agricultural Basins', 'Oil'],
    affectedPopulation: '10+ Million displaced (largest displacement crisis on earth); 25 Million facing famine',
    humanitarianToll: '150,000+ killed, mass ethnic cleansing in El Geneina, systematic rape weaponization by RSF',
    unResolutions: ['UNSC Res 1591 (Darfur Sanctions)', 'UNSC Res 2724 (Ramadan Ceasefire)'],
    summary: {
      beginner: 'The world\'s largest hunger and refugee crisis, fueled by warlords smuggling gold to Dubai and corporations buying Sudan\'s raw materials like soda stabilizer.',
      undergrad: 'A war orchestrated by the RSF paramilitary and SAF military factions, financed via multi-billion dollar illicit gold pipelines routed through UAE financial hubs and Western commodity trading desks.',
      scholar: 'A catastrophic crisis of imperial sub-imperialist clientelism. Regional petro-monarchies and transnational agri-commodity syndicates weaponize mercenary cartels to monopolize gold extraction and farmland, dismantling sovereign Sudanese civic statehood.'
    }
  },
  {
    id: 'kashmir',
    name: 'Kashmir (Indian-Occupied)',
    flag: '🏔️',
    region: 'South Asia / Himalayas',
    rootColonialActor: 'British Partition 1947 & Indian Hindutva State Militarism',
    extractionResources: ['Lithium (5.9M tonnes Reasi deposit)', 'Hydroelectric Power', 'Himalayan Timber & Saffron'],
    affectedPopulation: '8+ Million under permanent counter-insurgency surveillance and military curfews',
    humanitarianToll: '100,000+ dead since 1989, 10,000+ enforced disappearances, communication blockades',
    unResolutions: ['UNSC Res 47 (1948 Plebiscite Mandate)', 'UNSC Res 91', 'UNSC Res 122'],
    summary: {
      beginner: 'The most densely militarized region in the world, where local people live under strict military control while corporations buy up mountain lithium and river resources.',
      undergrad: 'A settler-colonial occupation accelerated after the revocation of Articles 370/35A in 2019, opening indigenous land to demographic engineering and joint Israeli-Indian surveillance technology deployment.',
      scholar: 'An integration of subcontinental ethno-nationalist territorial expansion with global defense capital. Israeli surveillance firms (Pegasus/NSO, Elbit) provide doctrinal and technological infrastructure for counter-insurgency pacification and raw lithium resource extraction.'
    }
  }
];

export const COMPLICIT_ENTITIES: ComplicitEntity[] = [
  {
    id: 'blackrock-vanguard',
    name: 'BlackRock & Vanguard Group',
    category: 'Asset Manager',
    logoText: 'BLK / VGI',
    headquarters: 'New York & Pennsylvania, USA',
    marketCapOrAumUsd: '$19.5 Trillion AUM Combined',
    connectedCrises: ['palestine', 'congo', 'sudan', 'kashmir'],
    keyCrimesSummary: 'The ultimate financial umbrella: Primary institutional shareholder in all major Western defense contractors (Lockheed, Boeing, RTX, Elbit), mining titans (Glencore, Rio Tinto), and Big Tech (Apple, Microsoft, Google).',
    evidenceDossier: {
      beginner: 'These two mega-funds own massive shares in almost every company bombing Gaza, extracting Congo cobalt, and profiting from weapons sales worldwide.',
      undergrad: 'Controls 6% to 15% voting equity across the entire military-industrial and tech complex. They profit directly from dividends generated by F-35 bomb sales to Israel, Cobalt mines in Katanga, and Gulf gold refineries.',
      scholar: 'The institutional epicenter of monopoly finance capital. Through universal shareholding and algorithmic ETF passive indexing (Aladdin platform), they orchestrate structural alignment between military procurement, neo-colonial extractivism, and Wall Street liquidity.'
    },
    financialComplicityMetric: '$180B+ invested in top 100 weapon manufacturers & mining conglomerates',
    unSecCitations: [
      { title: 'SEC Form 13F Institutional Holdings', filingOrDocNumber: 'SEC CIK# 0001364742', year: 2024 },
      { title: 'UN Report on Corporate Complicity in Occupied Palestinian Territory', filingOrDocNumber: 'A/HRC/43/71', year: 2023 }
    ],
    directBoycottTargets: ['BlackRock ETFs (iShares)', 'Vanguard Index Funds', 'Conglomerates under their majority voting blocs'],
    localTayyibAction: 'Shift savings to Shariah-compliant, non-interest cooperative banking and direct equity in domestic productive businesses.'
  },
  {
    id: 'elbit-systems',
    name: 'Elbit Systems Ltd.',
    category: 'Defense Contractor',
    logoText: 'ELBIT',
    headquarters: 'Haifa, Occupied Palestine / Israel',
    marketCapOrAumUsd: '$9.8 Billion Market Cap',
    connectedCrises: ['palestine', 'kashmir'],
    keyCrimesSummary: 'Supplies 85% of Israeli military land-based equipment and 85% of Hermes 450/900 combat drones used in Gaza strikes. Exports surveillance fencing and border tech to Indian military forces deployed in Kashmir.',
    evidenceDossier: {
      beginner: 'Makes the military combat drones, tank sensors, and white phosphorus bombs used directly to target civilians in Gaza and surveillance equipment in Kashmir.',
      undergrad: 'Primary contractor for the IDF. Operates the Ad-Dhahiriya and Beit Hanoun border fence sensor grids. Joint venture with Adani Defense in India to manufacture Hermes drones for Kashmir deployment.',
      scholar: 'Pioneers the \'battle-tested\' marketing doctrine, utilizing trapped civilian populations in Gaza and Kashmir as real-world proving grounds for autonomous lethal systems, loitering munitions, and biometric borders.'
    },
    financialComplicityMetric: '$5.97B Annual Revenue generated directly from occupation warfare',
    unSecCitations: [
      { title: 'UN Special Rapporteur Report on Arms Supplies to Israel', filingOrDocNumber: 'A/HRC/55/73', year: 2024 },
      { title: 'Amnesty International Weapon Dossier on Hermes Drones', filingOrDocNumber: 'MDE 15/015/2023', year: 2023 }
    ],
    directBoycottTargets: ['Elbit Systems', 'Scapa Healthcare (Elbit subsidiaries)', 'Companies leasing factory spaces to Elbit'],
    localTayyibAction: 'Divest university endowments and pension portfolios; demand complete arms embargo and supply chain blockage.'
  },
  {
    id: 'boeing-lockheed',
    name: 'Boeing & Lockheed Martin',
    category: 'Defense Contractor',
    logoText: 'LMT / BA',
    headquarters: 'Bethesda, MD & Arlington, VA, USA',
    marketCapOrAumUsd: '$210 Billion Combined Market Cap',
    connectedCrises: ['palestine', 'sudan'],
    keyCrimesSummary: 'Manufacturers of F-35 stealth fighters, F-15 strike aircraft, JDAM GPS precision guidance kits, Apache attack helicopters, and Hellfire missiles responsible for flattening residential towers in Gaza.',
    evidenceDossier: {
      beginner: 'Build the fighter jets, heavy guided bombs, and attack helicopters that destroy Gaza hospitals, schools, and homes.',
      undergrad: 'Recipient of billions in US Foreign Military Financing (FMF). Rushed emergency shipments of thousands of MK-84 2,000lb unguided bombs and GBU-39 Small Diameter Bombs to Tel Aviv during 2023-2024.',
      scholar: 'The kinetic enforcement arm of the petrodollar consensus. Sustained by direct Pentagon cost-plus contracts and state-sponsored export authorizations that subsidize domestic US aerospace manufacturing through offshore destruction.'
    },
    financialComplicityMetric: '$45B+ in ongoing weapon contracts supplied to the Israeli Air Force',
    unSecCitations: [
      { title: 'US State Department Defense Security Cooperation Agency (DSCA) Arms Sale Notifications', filingOrDocNumber: 'Transmittal No. 24-11', year: 2024 },
      { title: 'Human Rights Watch Report on US Guided Bomb Munition Fragments in Gaza Residential Strikes', filingOrDocNumber: 'HRW-OPT-2024', year: 2024 }
    ],
    directBoycottTargets: ['Commercial airliners procurement pressure', 'Defense contractor recruitment on college campuses'],
    localTayyibAction: 'Promote sovereign engineering talent and cancel national aerospace supply partnerships.'
  },
  {
    id: 'glencore-trafigura',
    name: 'Glencore & Trafigura Group',
    category: 'Resource Extraction',
    logoText: 'GLEN / TRAF',
    headquarters: 'Baar, Switzerland & Singapore',
    marketCapOrAumUsd: '$256 Billion Revenue',
    connectedCrises: ['congo', 'sudan', 'palestine'],
    keyCrimesSummary: 'Monopolizes Congolese cobalt/copper exports (Mutanda and Kamoto mines) while laundering conflict gold and trading crude oil shipments supplied to the Israeli port of Ashdod.',
    evidenceDossier: {
      beginner: 'Multi-billion dollar trading giants that buy cheap cobalt from Congo and supply crude oil tankers to fuel the Israeli military machine.',
      undergrad: 'Glencore operates massive open-cast cobalt operations in Katanga while paying corrupt middlemen and child-labor supply chains. Trafigura trades Russian and Azerbaijani crude shipped through Turkey to the Ashkelon and Haifa refineries.',
      scholar: 'The commodity trading shadow cartels operating under Swiss secrecy jurisdictions. They extract astronomical resource rents by arbitrating between conflict zone extraction, non-transparent offshore holding companies, and global processing hubs.'
    },
    financialComplicityMetric: 'Controls 30%+ of global tradable cobalt and delivered 1.2M+ barrels of jet fuel to Israel',
    unSecCitations: [
      { title: 'US Dept of Justice Foreign Corrupt Practices Act FCPA Resolution against Glencore', filingOrDocNumber: 'DOJ-22-540', year: 2022 },
      { title: 'Global Witness DRC Mining Human Rights & Child Labor Investigation', filingOrDocNumber: 'GW-DRC-2023-09', year: 2023 }
    ],
    directBoycottTargets: ['Glencore equity', 'Trafigura commodity supply bonds'],
    localTayyibAction: 'Demand strict mineral provenance tracking and ban conflict commodities from domestic industrial supply chains.'
  },
  {
    id: 'apple-microsoft-google',
    name: 'Big Tech Cartel (Apple, Microsoft, Alphabet Google)',
    category: 'Big Tech',
    logoText: 'AAPL / MSFT / GOOG',
    headquarters: 'Silicon Valley & Redmond, WA, USA',
    marketCapOrAumUsd: '$8.5 Trillion Combined Market Cap',
    connectedCrises: ['palestine', 'congo', 'kashmir'],
    keyCrimesSummary: 'Signatories of $1.2B Project Nimbus providing AI and cloud infrastructure to the Israeli military and Ministry of Defense; biggest end-consumers of Congolese cobalt and coltan without supply-chain child labor audits.',
    evidenceDossier: {
      beginner: 'Sell high-priced phones and laptops that use child-mined minerals from Congo, while providing the cloud and AI servers used to run surveillance and military targets in Palestine.',
      undergrad: 'Project Nimbus (Google Cloud + AWS) gives IDF facial recognition and automated target generation capabilities. Microsoft runs R&D centers in Herzliya and supplies Azure government cloud. Apple hardware drives 40,000+ artisanal miners in DRC.',
      scholar: 'Techno-imperialist enclosure: The convergence of surveillance capitalism and colonial spatial control. Cloud architectures convert occupied territories into experimental testing grounds for algorithmic population control while externalizing raw material extraction to Africa.'
    },
    financialComplicityMetric: '$1.2B Project Nimbus Contract + $400M+ Israeli R&D subsidies',
    unSecCitations: [
      { title: 'No Tech For Apartheid Open Letter & Employee Whistleblower Filings', filingOrDocNumber: 'NOTEC-2023-01', year: 2023 },
      { title: 'International Rights Advocates Lawsuit: Apple/Alphabet/Dell v. DRC Child Labor Victims', filingOrDocNumber: 'US District Court DC 1:19-cv-03737', year: 2021 }
    ],
    directBoycottTargets: ['Apple Hardware (iPhones, MacBooks)', 'Google Workspace / Gemini Enterprise', 'Microsoft Surface / Office 365 (replace with Open Source / LibreOffice)'],
    localTayyibAction: 'Adopt Linux, self-hosted Nextcloud, FOSS open-source productivity suites, and support domestic device repair cooperatives.'
  },
  {
    id: 'caterpillar-volvo',
    name: 'Caterpillar Inc.',
    category: 'Conglomerate',
    logoText: 'CAT',
    headquarters: 'Irving, Texas, USA',
    marketCapOrAumUsd: '$165 Billion Market Cap',
    connectedCrises: ['palestine', 'kashmir', 'congo'],
    keyCrimesSummary: 'Manufactures the weaponized D9 armored bulldozer used by the Israeli military for punitive home demolitions, tearing up Gaza water pipes, and clearing land in the illegal West Bank settlements.',
    evidenceDossier: {
      beginner: 'Builds the heavy armored bulldozers used to demolish Palestinian homes, tear down olive groves, and flatten entire neighborhoods.',
      undergrad: 'Equips the IDF with Caterpillar D9R armored bulldozers with bulletproof glass and heavy armor plating, essential for urban invasion tactics and illegal settlement road construction.',
      scholar: 'Infrastructural violence and spatial erasure. Caterpillar equipment serves as the physical apparatus for demographic engineering, replacing indigenous Palestinian villages and groves with militarized settlements and apartheid separation bypasses.'
    },
    financialComplicityMetric: '$100M+ in recurring weaponized heavy machinery contracts to Israel Ministry of Defense',
    unSecCitations: [
      { title: 'UN Special Rapporteur on Adequate Housing Special Report on Home Demolitions', filingOrDocNumber: 'A/77/190', year: 2022 },
      { title: 'BDS Movement Official Corporate Complicity Profile: Caterpillar', filingOrDocNumber: 'BDS-CAT-01', year: 2024 }
    ],
    directBoycottTargets: ['Caterpillar heavy machinery', 'CAT licensed footwear & apparel', 'CAT generator sets'],
    localTayyibAction: 'Switch to local engineering, Komatsu, or domestic equipment remanufacturing and local apparel makers.'
  },
  {
    id: 'coca-cola-pepsico',
    name: 'The Beverage Monopolies (Coca-Cola & PepsiCo)',
    category: 'Conglomerate',
    logoText: 'KO / PEP',
    headquarters: 'Atlanta, GA & Purchase, NY, USA',
    marketCapOrAumUsd: '$520 Billion Combined Market Cap',
    connectedCrises: ['palestine', 'sudan'],
    keyCrimesSummary: 'Coca-Cola operates an industrial bottling plant in the illegal Israeli settlement of Atarot on stolen Palestinian land. Both consume massive quantities of Sudanese Gum Arabic while draining millions in foreign dividends from Muslim economies.',
    evidenceDossier: {
      beginner: 'Operate factories on stolen Palestinian land and buy Sudan\'s natural gum while sending billions in profits back to Western hedge funds.',
      undergrad: 'Coca-Cola Israel (Central Bottling Company / CBC) operates in Atarot industrial zone, directly violating International Humanitarian Law. PepsiCo owns SodaStream (formerly Maale Adumim settlement) and Sabra Hummus (Strauss Group).',
      scholar: 'Metabolic rift and commodity imperialism. These monopolies extract local groundwater, induce massive public health crises (diabetes/obesity via toxic HFCS), and repatriate capital outward to Wall Street asset managers while sustaining settlement economies.'
    },
    financialComplicityMetric: '$3.8B in annual profits extracted from the MENA and South Asia regions',
    unSecCitations: [
      { title: 'UN Human Rights Council Database of Enterprises Involved in Illegal Settlements', filingOrDocNumber: 'A/HRC/43/71 - Item 59', year: 2020 },
      { title: 'Who Profits Research: Coca-Cola Israeli Settlement Operations', filingOrDocNumber: 'WP-CBC-2023', year: 2023 }
    ],
    directBoycottTargets: ['Coca-Cola', 'Sprite', 'Fanta', 'Pepsi', 'Mountain Dew', '7Up', 'Aquafina', 'Kinley', 'Lays', 'Doritos', 'Cheetos', 'Kurkure'],
    localTayyibAction: 'Switch immediately to 100% Pakistani cold drinks (Pakola, Gourmet Cola, Mezan, Cola Next) or raw fresh sattu and mint lemonades.'
  },
  {
    id: 'nestle-unilever',
    name: 'Nestlé & Unilever Cartel',
    category: 'Conglomerate',
    logoText: 'NESN / UL',
    headquarters: 'Vevey, Switzerland & London, UK',
    marketCapOrAumUsd: '$390 Billion Combined Market Cap',
    connectedCrises: ['palestine', 'congo'],
    keyCrimesSummary: 'Nestlé owns 100% of Osem, one of Israel\'s largest food manufacturers operating in Sderot and Kiryat Malachi. Unilever operates Strauss Ice Cream and previously defended Ben & Jerry\'s West Bank sales.',
    evidenceDossier: {
      beginner: 'Sell baby milk, chocolate, and tea while operating major factories in Israel and buying cocoa from West Africa and palm oil from displaced lands.',
      undergrad: 'Nestlé purchased full control of Osem Group (Tivall, Sabra salads partner, snacks) and opened an R&D hub in Israel. Unilever sells Wall\'s, Knorr, Lux, and Dove while draining foreign exchange.',
      scholar: 'Corporate monopolization of basic nutritional sustenance. The hyper-processing of food commodities combines extractivist agro-industrial supply chains with deep institutional ties to the Israeli state tax and pension funds.'
    },
    financialComplicityMetric: '$1.4B invested directly in Israeli manufacturing and logistics facilities',
    unSecCitations: [
      { title: 'Who Profits Dossier: Nestlé / Osem Israeli Manufacturing', filingOrDocNumber: 'WP-NES-2023', year: 2023 },
      { title: 'UN Database of Settlement Complicity', filingOrDocNumber: 'A/HRC/53/43', year: 2023 }
    ],
    directBoycottTargets: ['Nestlé Pure Life', 'Nido', 'Cerelac', 'Maggi', 'KitKat', 'Milo', 'Nescafe', 'Everyday', 'Lipton Tea', 'Knorr', 'Dove', 'Lux', 'Lifebuoy', 'Sunsilk'],
    localTayyibAction: 'Switch to Tapal Tea, Shan Foods, Shoop Noodles, Sufi Soaps, English Toothpaste, and pure local farm milk.'
  }
];

export const COMPLICITY_CONNECTIONS: ComplicityConnection[] = [
  {
    id: 'conn-1',
    sourceId: 'blackrock-vanguard',
    targetId: 'boeing-lockheed',
    type: 'Shareholding',
    crises: ['palestine', 'sudan'],
    description: 'BlackRock and Vanguard hold 14.8% combined equity in Lockheed Martin and 13.2% in Boeing, receiving billions in defense dividend payouts.',
    financialMagnitude: '$32.4 Billion equity value'
  },
  {
    id: 'conn-2',
    sourceId: 'blackrock-vanguard',
    targetId: 'glencore-trafigura',
    type: 'Shareholding',
    crises: ['congo', 'sudan'],
    description: 'Universal asset managers own major voting blocs in Swiss commodity traders, backing cobalt extraction in DRC and gold arbitrage in Sudan.',
    financialMagnitude: '$18.7 Billion equity value'
  },
  {
    id: 'conn-3',
    sourceId: 'blackrock-vanguard',
    targetId: 'apple-microsoft-google',
    type: 'Shareholding',
    crises: ['palestine', 'congo', 'kashmir'],
    description: 'Institutional index funds represent the top 2 shareholders in Apple, Microsoft, and Alphabet, insulating their boardrooms from ethical divestment pressure.',
    financialMagnitude: '$1.1 Trillion combined equity'
  },
  {
    id: 'conn-4',
    sourceId: 'apple-microsoft-google',
    targetId: 'glencore-trafigura',
    type: 'Mineral Extraction',
    crises: ['congo'],
    description: 'Big Tech supply chains consume 60%+ of the cobalt and tantalum mined by Glencore-linked concessions and artisanal child pits in Katanga DRC.',
    financialMagnitude: '$4.2 Billion annual mineral procurement'
  },
  {
    id: 'conn-5',
    sourceId: 'boeing-lockheed',
    targetId: 'elbit-systems',
    type: 'Weapons Supply',
    crises: ['palestine'],
    description: 'Joint integration: Elbit avionics, helmet displays, and sensor suites are installed inside US-built F-35 and F-16 airframes deployed in Gaza.',
    financialMagnitude: '$850 Million avionics subcontracts'
  },
  {
    id: 'conn-6',
    sourceId: 'elbit-systems',
    targetId: 'caterpillar-volvo',
    type: 'Surveillance & Cloud',
    crises: ['palestine', 'kashmir'],
    description: 'Elbit automated perimeter cameras and remote weapon stations are mounted onto Caterpillar D9 armored bulldozers and Kashmir border checkpoints.',
    financialMagnitude: '$220 Million security integration'
  },
  {
    id: 'conn-7',
    sourceId: 'coca-cola-pepsico',
    targetId: 'blackrock-vanguard',
    type: 'Shareholding',
    crises: ['palestine', 'sudan'],
    description: 'BlackRock & Vanguard control over 16% of Coca-Cola and 15% of PepsiCo, returning extracted profits from global Muslim markets directly to US pension & hedge funds.',
    financialMagnitude: '$78 Billion combined equity'
  }
];

// Adapter data exports for Takweyat stores & API fallback
export const GEOPOLITICAL_ZONES: any[] = [
  {
    id: 'palestine',
    zoneName: 'Palestine (Gaza & West Bank)',
    historicalColonialActor: 'British Empire (Balfour Declaration & Mandate)',
    rootCauseSummary: 'Settler-colonial occupation, military blockade, gas field appropriation, and land dispossession.',
    currentStatus: 'Active Genocide & Military Enclosure',
    keyExtractionResources: ['Offshore Natural Gas (Marine-1)', 'Farmland', 'Aquifers', 'Quarry Stone'],
    flagEmoji: '🇵🇸',
    coordinates: [31.9522, 35.2332],
    affectedPopulation: '5.4 Million indigenous Palestinians',
    crisisSummary: 'Over 75 years of illegal occupation and blockade financed through Western defense pipelines and venture capital.',
    unResolutions: ['UNGA 194 (Right of Return)', 'UNSC 242', 'UNSC 2334 (Illegal Settlements)', 'ICJ 2024 Advisory Ruling']
  },
  {
    id: 'congo',
    zoneName: 'Democratic Republic of the Congo (Katanga & Kivu)',
    historicalColonialActor: 'Belgian Monarchy (King Leopold II Genocide)',
    rootCauseSummary: 'Colonial forced-labor concessions transitioned into multinational tech mineral plunder and proxy militias.',
    currentStatus: 'Mass Atrocity & Resource Extraction Crisis',
    keyExtractionResources: ['Cobalt', 'Coltan (Tantalum)', 'Lithium', 'Industrial Copper', 'Gold'],
    flagEmoji: '🇨🇩',
    coordinates: [-4.0383, 21.7587],
    affectedPopulation: '6 Million+ casualties since 1996',
    crisisSummary: '70% of global cobalt supply extracted under hazardous conditions, fueling the EV and smartphone boom.',
    unResolutions: ['UNSC 1533 (Arms Embargo)', 'UNSC 2666 (MONUSCO Mandate)', 'OECD Due Diligence Guidance']
  },
  {
    id: 'sudan',
    zoneName: 'Sudan (Darfur & Khartoum)',
    historicalColonialActor: 'Anglo-Egyptian Condominium (1899–1956)',
    rootCauseSummary: 'Unequal regional development, petrodollar arbitrage, and foreign proxy financing of the RSF militia.',
    currentStatus: 'Catastrophic Famine & Proxy War',
    keyExtractionResources: ['Artisanal Gold (Jebel Amer)', 'Gum Arabic', 'Crude Petroleum', 'Arable Riverlands'],
    flagEmoji: '🇸🇩',
    coordinates: [12.8628, 30.2176],
    affectedPopulation: '10 Million+ displaced citizens',
    crisisSummary: 'Gold smuggled through foreign financial hubs to purchase Western and regional heavy weaponry.',
    unResolutions: ['UNSC 1556 (Darfur Sanctions)', 'UNSC 1593 (ICC Referral)', 'UNSC 2736 (2024 El Fasher Siege Resolution)']
  },
  {
    id: 'kashmir',
    zoneName: 'Jammu & Kashmir',
    historicalColonialActor: 'British Partition of India (1947)',
    rootCauseSummary: 'Unenforced plebiscite resolutions, demographic engineering, and militarized water resource control.',
    currentStatus: 'Permanent Military Occupation',
    keyExtractionResources: ['Salal Lithium Reserves (5.9M tons)', 'Glacial Freshwater Reservoirs', 'High-Grade Saffron', 'Pashmina Wool'],
    flagEmoji: '🏔️',
    coordinates: [33.7782, 76.5762],
    affectedPopulation: '13 Million Kashmiri residents',
    crisisSummary: 'Heavy troop density and surveillance apparatus deployed over vital freshwater and mineral reserves.',
    unResolutions: ['UNSC 47 (Plebiscite Mandate)', 'UNSC 51', 'UNSC 91']
  }
];

export const RAW_RESOURCES: any[] = [
  {
    id: 'res-cobalt',
    resourceName: 'Cobalt (Cathode-Grade)',
    primaryExtractionZoneId: 'congo',
    humanCostMetric: '42 child labor hours per EV pack / 6 hours per smartphone',
    exploitationRatio: '0.0034',
    isConflictMineral: true,
    description: 'Vital blue transition metal essential for lithium-ion battery stability. Mined by 40,000+ children in artisanal DRC pits.',
    primaryApplications: ['Apple iPhones', 'Tesla / EV Battery Packs', 'Samsung Handsets', 'HP Laptops'],
    environmentalCostSummary: 'Acidic tailings poison the Lualaba river basin.'
  },
  {
    id: 'res-coltan',
    resourceName: 'Coltan (Tantalum Powder)',
    primaryExtractionZoneId: 'congo',
    humanCostMetric: '1 fatal pit collapse per 350 kg extracted',
    exploitationRatio: '0.0028',
    isConflictMineral: true,
    description: 'Heat-resistant capacitor metal without which modern micro-circuit boards cannot function.',
    primaryApplications: ['Military Guidance Chips', 'Server Motherboards', 'PlayStation / Xbox Units', '5G Towers'],
    environmentalCostSummary: 'Deforestation of Kahuzi-Biéga National Park gorilla habitats.'
  },
  {
    id: 'res-gold-sudan',
    resourceName: 'Conflict Gold Bullion',
    primaryExtractionZoneId: 'sudan',
    humanCostMetric: '$140M in illegal gold = 12 heavy combat drone shipments to militias',
    exploitationRatio: '0.0089',
    isConflictMineral: true,
    description: 'Gold mined in Darfur, flown to regional refineries, and liquidated for weapons.',
    primaryApplications: ['Foreign Sovereign Reserves', 'Luxury Jewelry', 'Semiconductor Bonding Wire'],
    environmentalCostSummary: 'Mercury poisoning in Nile river tributaries.'
  }
];

export const PARENT_CONGLOMERATES: any[] = [
  {
    id: 'blackrock-vanguard',
    entityName: 'BlackRock & Vanguard Institutional Alliance',
    headquartersCountry: 'United States',
    annualRevenueUsd: 17800000000,
    lobbyingSpendUsd: 42000000,
    isDefenseContractor: false,
    topShareholders: ['Institutional Index Funds', 'State Pension Boards', 'Sovereign Wealth Funds'],
    marketCapUsd: 14000000000000,
    complicitySummary: 'Top institutional shareholder in all major Western arms manufacturers, Big Tech, and commodity monopolies.'
  },
  {
    id: 'lockheed-martin',
    entityName: 'Lockheed Martin Corporation',
    headquartersCountry: 'United States',
    annualRevenueUsd: 67600000000,
    lobbyingSpendUsd: 14500000,
    isDefenseContractor: true,
    topShareholders: ['State Street', 'Vanguard', 'BlackRock', 'Capital Group'],
    marketCapUsd: 110000000000,
    complicitySummary: 'Prime contractor for F-35 stealth fighters and Hellfire missiles used in civilian zone bombings.'
  },
  {
    id: 'unilever-nestle',
    entityName: 'Unilever & Nestlé Global FMCG Monopoly',
    headquartersCountry: 'United Kingdom / Switzerland',
    annualRevenueUsd: 160000000000,
    lobbyingSpendUsd: 22000000,
    isDefenseContractor: false,
    topShareholders: ['BlackRock', 'Vanguard', 'Norges Bank', 'Fidelity'],
    marketCapUsd: 380000000000,
    complicitySummary: 'Operating industrial packaging factories in illegal Israeli settlements and extracting billions in Muslim market profits.'
  }
];

export const COMPLICITY_EDGES: any[] = [
  {
    id: 'edge-1',
    conglomerateId: 'blackrock-vanguard',
    geopoliticalZoneId: 'palestine',
    complicityType: 'Defense Equity & Bombing Monetization',
    evidenceDossier: 'SEC Form 13F: BlackRock holds 8.2% of Lockheed Martin and 7.1% of Boeing, profiting from ordnance contracts.',
    financialValueUsd: 32400000000,
    evidenceUrls: ['https://www.sec.gov/edgar/searchedgar/companysearch'],
    severity: 'Critical',
    verifiedSource: 'SEC Form 13F & UN Special Rapporteur on Arms Transfers'
  },
  {
    id: 'edge-2',
    conglomerateId: 'blackrock-vanguard',
    geopoliticalZoneId: 'congo',
    complicityType: 'Resource Exploitation & Commodity Control',
    evidenceDossier: 'Institutional voting shares in Glencore and tech conglomerates consuming 70% of child-mined Katanga cobalt.',
    financialValueUsd: 18700000000,
    evidenceUrls: ['https://www.amnesty.org/en/documents/afr62/3183/2016/en/'],
    severity: 'Critical',
    verifiedSource: 'Amnesty International "This Is What We Die For" Report'
  },
  {
    id: 'edge-3',
    conglomerateId: 'lockheed-martin',
    geopoliticalZoneId: 'palestine',
    complicityType: 'F-35 & Hellfire Ordnance Supplier',
    evidenceDossier: 'Direct prime contract delivery of F-35I Adir strike fighters and AGM-114 Hellfire missiles used in Gaza infrastructure strikes.',
    financialValueUsd: 12500000000,
    evidenceUrls: ['https://www.dsca.mil/major-arms-sales'],
    severity: 'Critical',
    verifiedSource: 'US Defense Security Cooperation Agency (DSCA) Records'
  }
];

export const TOXIC_ADDITIVES: any[] = [
  {
    id: 'hfcs',
    code: 'Glucose-Fructose Syrup / HFCS-55',
    name: 'High Fructose Corn Syrup',
    commonProducts: ['Coca-Cola', 'Pepsi', 'Nestlé Ketchup', 'Commercial Biscuits'],
    healthRisks: ['Non-Alcoholic Fatty Liver Disease (NAFLD)', 'Severe Insulin Resistance', 'Visceral Fat Accumulation'],
    tayyibVerdict: 'Prohibited in pure Tayyib diet. Replace with raw sugarcane jaggery (Gur) or organic date paste.',
    saferAlternatives: ['Organic Cane Jaggery (Gur)', 'Wild Mountain Honey', 'Natural Date Molasses'],
    category: 'Sweetener'
  },
  {
    id: 'aspartame',
    code: 'E951 / Equal / NutraSweet',
    name: 'Aspartame Artificial Sweetener',
    commonProducts: ['Diet Coke', 'Pepsi Max', 'Sugar-Free Chewing Gums'],
    healthRisks: ['Neurotoxic Degradation', 'IARC Group 2B Possible Carcinogen', 'Gut Microbiome Dysbiosis'],
    tayyibVerdict: 'Synthetic neuro-toxin. Banned from Tayyib wholesome standard.',
    saferAlternatives: ['Raw Stevia Leaf Infusion', 'Pure Monkfruit Extract'],
    category: 'Sweetener'
  },
  {
    id: 'red-40',
    code: 'E129 / Allura Red AC',
    name: 'Red 40 Petroleum Dye',
    commonProducts: ['Doritos', 'Cheetos', 'Strawberry Syrups', 'Skittles'],
    healthRisks: ['Pediatric Hyperactivity (ADHD)', 'DNA Damage in Colon Mucosa', 'Benzidine Contamination'],
    tayyibVerdict: 'Petrochemical dye that requires warning label in EU. Completely forbidden in clean Tayyib standards.',
    saferAlternatives: ['Beetroot Juice Powder', 'Hibiscus (Karkadeh) Extract'],
    category: 'Artificial Color'
  },
  {
    id: 'titanium-dioxide',
    code: 'E171 / CI 77891',
    name: 'Titanium Dioxide Nanoparticles',
    commonProducts: ['Colgate Toothpaste', 'Commercial Mayonnaise', 'Chewing Gum Coating', 'Skim Milk Whitener'],
    healthRisks: ['Banned in European Union (2022)', 'Genotoxicity & Chromosome Breakage', 'Bio-accumulation in Liver/Spleen'],
    tayyibVerdict: 'Inorganic metal nanoparticles banned across EU. Reject all white-coated confectioneries.',
    saferAlternatives: ['Calcium Carbonate Mineral White', 'Organic Rice Starch'],
    category: 'Artificial Color'
  },
  {
    id: 'tbhq',
    code: 'E319 / Tert-Butylhydroquinone',
    name: 'TBHQ Petroleum Preservative',
    commonProducts: ['Lay\'s Potato Chips', 'McDonald\'s French Fries', 'Instant Noodles', 'Frozen Nuggets'],
    healthRisks: ['Immune System Suppression', 'Loss of T-Cell Protective Response', 'Neurotoxic Tremors'],
    tayyibVerdict: 'Industrial antioxidant derived from butane. Boycott-Safe but biologically destructive.',
    saferAlternatives: ['Organic Rosemary Leaf Oleoresin', 'Cold-Pressed Tocopherol (Vitamin E)'],
    category: 'Preservative'
  }
];

export const RETAIL_BRANDS: any[] = [
  {
    id: 'coca-cola',
    name: 'Coca-Cola',
    slug: 'coca-cola',
    brandType: 'boycotted',
    parentCompanyId: 'coca-cola-co',
    countryOfOrigin: 'United States',
    category: 'Food & Beverages',
    subcategory: 'Sodas & Beverages',
    boycottReason: 'Factory operating in illegal Atarot industrial settlement in occupied East Jerusalem.',
    severityTier: 1,
    directSubstitutes: ['pakola-soda', 'gourmet-cola', 'tayyib-botanical-cola'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg',
    toxicAdditiveFlags: ['HFCS-55', 'E150d Caramel Color', 'E338 Phosphoric Acid'],
    isHalalCertified: true,
    isTayyibCertified: false
  },
  {
    id: 'gourmet-cola',
    name: 'Gourmet Cola',
    slug: 'gourmet-cola',
    brandType: 'alternative',
    countryOfOrigin: 'Pakistan',
    category: 'Food & Beverages',
    subcategory: 'Sodas & Beverages',
    isHalalCertified: true,
    isTayyibCertified: false
  },
  {
    id: 'tayyib-botanical-cola',
    name: 'Artisanal Botanical Kola',
    slug: 'tayyib-botanical-cola',
    brandType: 'alternative',
    countryOfOrigin: 'Pakistan',
    category: 'Food & Beverages',
    subcategory: 'Sodas & Beverages',
    isHalalCertified: true,
    isTayyibCertified: true
  }
];

export const ALTERNATIVE_PROFILES: any[] = [
  {
    id: 'prof-gourmet',
    brandId: 'gourmet-cola',
    ingredientBreakdown: 'Carbonated Water, Sugar, Caramel Color, Citric Acid, Flavoring',
    isHalalCertified: true,
    isOrganic: false,
    isTayyib: false,
    packagingType: 'Plastic PET & Cans',
    editorialBadge: 'conditionally_recommended',
    originCountry: 'Pakistan',
    directSubstituteFor: ['coca-cola', 'pepsi'],
    toxicWarnings: ['High Refined Sugar Content', 'Synthetic Caramel Color E150d'],
    producerName: 'Gourmet Foods Lahore',
    farmToTable: false,
    cleanScore: 62
  },
  {
    id: 'prof-tayyib-cola',
    brandId: 'tayyib-botanical-cola',
    ingredientBreakdown: 'Real African Kola Nut Extract, Raw Jaggery (Gur), Tamarind, Clove, Lemon Oil, Mountain Spring Water',
    isHalalCertified: true,
    isOrganic: true,
    isTayyib: true,
    packagingType: 'Recycled Glass Bottle',
    editorialBadge: 'fully_recommended',
    originCountry: 'Pakistan',
    directSubstituteFor: ['coca-cola', 'pepsi'],
    toxicWarnings: [],
    producerName: 'BioTayyib Farm Guild',
    farmToTable: true,
    cleanScore: 98
  }
];

export const MARKET_GAPS: any[] = [
  {
    id: 'gap-baby-formula',
    category: 'Baby Care',
    productName: '100% Organic Grass-Fed Infant Formula',
    unmetDemandCount: 3720,
    pledgedMonthlySpendPkr: 14850000,
    description: 'A sovereign, clean infant milk formula made from local grass-fed dairy without refined palm oil or corn syrup.',
    votesCount: 4890,
    urgency: 'Critical',
    suggestedPakistaniMakers: ['Nurpur Bio Labs', 'Engro Foods Pakistan', 'PCSIR Labs'],
    targetMarketPricePkr: 2800,
    createdAt: '2026-09-01'
  },
  {
    id: 'gap-open-smartphone',
    category: 'Electronics & Hardware',
    productName: 'Sovereign Open-Source Repairable Smartphone',
    unmetDemandCount: 1950,
    pledgedMonthlySpendPkr: 28400000,
    description: 'Hardware switches for camera/mic, conflict-free cobalt supply, running open-source de-Googled OS.',
    votesCount: 6120,
    urgency: 'High',
    suggestedPakistaniMakers: ['NUST Tech Incubator', 'Inverex Electronics'],
    targetMarketPricePkr: 55000,
    createdAt: '2026-09-05'
  },
  {
    id: 'gap-mineral-sunscreen',
    category: 'Personal Care',
    productName: '100% Non-Nano Zinc Oxide Sunscreen SPF 50+',
    unmetDemandCount: 4600,
    pledgedMonthlySpendPkr: 9200000,
    description: 'Broad spectrum non-nano mineral sun protection without benzene, titanium dioxide, or endocrine disruptors.',
    votesCount: 3950,
    urgency: 'High',
    suggestedPakistaniMakers: ['Conatural Skincare', 'Mana Beauty Spirit'],
    targetMarketPricePkr: 1800,
    createdAt: '2026-09-10'
  },
  {
    id: 'gap-bio-detergent',
    category: 'Cleaning & Household',
    productName: 'Soapnut (Reetha) Enzymatic Laundry Concentrate',
    unmetDemandCount: 8100,
    pledgedMonthlySpendPkr: 18200000,
    description: 'Zero synthetic perfumes, phosphates, or SLS. 100% biodegradable laundry power derived from indigenous Himalayan soapnuts.',
    votesCount: 5240,
    urgency: 'Critical',
    suggestedPakistaniMakers: ['Sufi Soap Chemical Works', 'Kashmir Bio Soaps'],
    targetMarketPricePkr: 850,
    createdAt: '2026-09-12'
  }
];
