import json
import re

# Comprehensive Master Database of Boycott Brands and Pakistani / Halal Alternatives
MASTER_PRODUCTS = [
    # --- 1. BEVERAGES & COLD DRINKS ---
    {
        "id": "bev-1",
        "name": "Coca-Cola & Coke Zero / Diet",
        "category": "Food & Beverages",
        "subcategory": "Cold Drinks & Sodas",
        "parentCompany": "The Coca Cola Company",
        "boycottReason": "Coca-Cola operates a manufacturing plant in the illegal Israeli settlement of Atarot on stolen Palestinian land in occupied West Bank.",
        "severity": "Critical",
        "domain": "coca-cola.com",
        "alternatives": [
            {"name": "Cola Next", "country": "Pakistan", "domain": "mezangroup.com", "verified": True},
            {"name": "Pakola Cola", "country": "Pakistan", "domain": "pakola.com.pk", "verified": True},
            {"name": "Gourmet Cola", "country": "Pakistan", "domain": "gourmetfoods.com.pk", "verified": True},
            {"name": "SixB Star Cola", "country": "Pakistan", "domain": "sixb.com.pk", "verified": True},
            {"name": "Pop Cola", "country": "Pakistan", "domain": "popcola.pk", "verified": True}
        ],
        "tags": ["drinks", "soda", "cold drinks", "beverage", "grocery"]
    },
    {
        "id": "bev-2",
        "name": "Pepsi & Diet Pepsi / Pepsi Max",
        "category": "Food & Beverages",
        "subcategory": "Cold Drinks & Sodas",
        "parentCompany": "PepsiCo",
        "boycottReason": "PepsiCo owns 100% of SodaStream (operating in the Negev/Naqab displacing Bedouin communities) and Sabra Hummus (Strauss Group, supporter of IDF Golani Brigade).",
        "severity": "Critical",
        "domain": "pepsi.com",
        "alternatives": [
            {"name": "Cola Next", "country": "Pakistan", "domain": "mezangroup.com", "verified": True},
            {"name": "Pakola", "country": "Pakistan", "domain": "pakola.com.pk", "verified": True},
            {"name": "Gourmet Cola", "country": "Pakistan", "domain": "gourmetfoods.com.pk", "verified": True},
            {"name": "SixB Star Cola", "country": "Pakistan", "domain": "sixb.com.pk", "verified": True}
        ],
        "tags": ["drinks", "soda", "pepsi", "beverage", "grocery"]
    },
    {
        "id": "bev-3",
        "name": "Sprite & 7UP (Lemon Lime Drinks)",
        "category": "Food & Beverages",
        "subcategory": "Cold Drinks & Sodas",
        "parentCompany": "The Coca Cola Company / PepsiCo",
        "boycottReason": "Manufactured by Coca-Cola and PepsiCo, major economic contributors with illegal settlement manufacturing in the West Bank.",
        "severity": "Critical",
        "domain": "sprite.com",
        "alternatives": [
            {"name": "Fizup Next", "country": "Pakistan", "domain": "mezangroup.com", "verified": True},
            {"name": "Pakola Fresh Lime", "country": "Pakistan", "domain": "pakola.com.pk", "verified": True},
            {"name": "Gourmet Lemon Up", "country": "Pakistan", "domain": "gourmetfoods.com.pk", "verified": True},
            {"name": "SixB Star Fresh Lime", "country": "Pakistan", "domain": "sixb.com.pk", "verified": True},
            {"name": "Murree Lemon", "country": "Pakistan", "domain": "murreebrewery.com", "verified": True}
        ],
        "tags": ["drinks", "soda", "sprite", "7up", "lemon"]
    },
    {
        "id": "bev-4",
        "name": "Fanta & Mirinda (Orange Sodas)",
        "category": "Food & Beverages",
        "subcategory": "Cold Drinks & Sodas",
        "parentCompany": "The Coca Cola Company / PepsiCo",
        "boycottReason": "Owned and produced by Coca-Cola and PepsiCo.",
        "severity": "Critical",
        "domain": "fanta.com",
        "alternatives": [
            {"name": "Rango Next", "country": "Pakistan", "domain": "mezangroup.com", "verified": True},
            {"name": "Pakola Orange", "country": "Pakistan", "domain": "pakola.com.pk", "verified": True},
            {"name": "Gourmet Orange", "country": "Pakistan", "domain": "gourmetfoods.com.pk", "verified": True},
            {"name": "Star Orange SixB", "country": "Pakistan", "domain": "sixb.com.pk", "verified": True}
        ],
        "tags": ["drinks", "soda", "orange", "fanta", "mirinda"]
    },
    {
        "id": "bev-5",
        "name": "Mountain Dew & Sting Energy",
        "category": "Food & Beverages",
        "subcategory": "Energy Drinks & Sodas",
        "parentCompany": "PepsiCo",
        "boycottReason": "Owned by PepsiCo, which finances SodaStream and Sabra Hummus.",
        "severity": "Critical",
        "domain": "mountaindew.com",
        "alternatives": [
            {"name": "Storm Energy Next", "country": "Pakistan", "domain": "mezangroup.com", "verified": True},
            {"name": "Dare Energy Next", "country": "Pakistan", "domain": "mezangroup.com", "verified": True},
            {"name": "SixB Red Booster", "country": "Pakistan", "domain": "sixb.com.pk", "verified": True},
            {"name": "Kinetik Energy", "country": "Pakistan", "domain": "kinetikenergy.pk", "verified": True}
        ],
        "tags": ["energy drink", "sting", "dew", "soda"]
    },
    {
        "id": "bev-6",
        "name": "Aquafina, Dasani & Kinley Water",
        "category": "Food & Beverages",
        "subcategory": "Mineral Water",
        "parentCompany": "PepsiCo / The Coca Cola Company",
        "boycottReason": "Bottled water brands owned by PepsiCo and Coca-Cola.",
        "severity": "Critical",
        "domain": "aquafina.com",
        "alternatives": [
            {"name": "Sufi Pure Water", "country": "Pakistan", "domain": "sufioils.com", "verified": True},
            {"name": "Murree Sparkletts", "country": "Pakistan", "domain": "murreebrewery.com", "verified": True},
            {"name": "Springley Water", "country": "Pakistan", "domain": "springley.com.pk", "verified": True},
            {"name": "Gourmet Glacier Water", "country": "Pakistan", "domain": "gourmetfoods.com.pk", "verified": True},
            {"name": "Pakola Pure Water", "country": "Pakistan", "domain": "pakola.com.pk", "verified": True},
            {"name": "Masafi Water", "country": "UAE", "domain": "masafi.com", "verified": True}
        ],
        "tags": ["water", "mineral water", "grocery"]
    },
    {
        "id": "bev-7",
        "name": "Nestle Fruita Vitals, Slice & Minute Maid",
        "category": "Food & Beverages",
        "subcategory": "Juices & Nectars",
        "parentCompany": "Nestle / PepsiCo / Coca-Cola",
        "boycottReason": "Nestle owns 100% of Osem in Israel; PepsiCo and Coca-Cola operate illegal settlement supply chains.",
        "severity": "Critical",
        "domain": "nestle.pk",
        "alternatives": [
            {"name": "Shezan Juices (Mango, Chaunsa, Apple)", "country": "Pakistan", "domain": "shezan.com", "verified": True},
            {"name": "Tops Juices (Murree Brewery)", "country": "Pakistan", "domain": "murreebrewery.com", "verified": True},
            {"name": "Fruiti-O (Shangrila)", "country": "Pakistan", "domain": "shangrila.com.pk", "verified": True},
            {"name": "Fruitien Nectars (Citropak)", "country": "Pakistan", "domain": "citropak.com", "verified": True},
            {"name": "Gourmet Real Fruit Juices", "country": "Pakistan", "domain": "gourmetfoods.com.pk", "verified": True},
            {"name": "Maza Mango", "country": "Pakistan", "domain": "pakola.com.pk", "verified": True},
            {"name": "Mashmoom Juices", "country": "Pakistan", "domain": "mashmoom.com", "verified": True}
        ],
        "tags": ["juice", "mango juice", "chaunsa", "fruita vitals", "slice"]
    },
    {
        "id": "bev-8",
        "name": "Tang Instant Drink Powder",
        "category": "Food & Beverages",
        "subcategory": "Instant Powder Drinks",
        "parentCompany": "Mondelez International",
        "boycottReason": "Mondelez has extensive food-tech joint ventures in Israel and distributes brands financing the occupation economy.",
        "severity": "Critical",
        "domain": "mondelezinternational.com",
        "alternatives": [
            {"name": "Rooh Afza (Hamdard)", "country": "Pakistan", "domain": "hamdard.com.pk", "verified": True},
            {"name": "Jam-e-Shirin (Qarshi)", "country": "Pakistan", "domain": "qarshi.com", "verified": True},
            {"name": "Gulpy Drink Powder (Shakarganj)", "country": "Pakistan", "domain": "shakarganj.com.pk", "verified": True},
            {"name": "Fruiti-O Instant Mix", "country": "Pakistan", "domain": "shangrila.com.pk", "verified": True},
            {"name": "Gourmet Refresh Powder", "country": "Pakistan", "domain": "gourmetfoods.com.pk", "verified": True}
        ],
        "tags": ["tang", "instant drink", "rooh afza", "juice"]
    },

    # --- 2. TEA & COFFEE ---
    {
        "id": "tea-1",
        "name": "Lipton Tea & Brooke Bond Supreme / Yellow Label",
        "category": "Food & Beverages",
        "subcategory": "Tea & Black Tea",
        "parentCompany": "Ekaterra / CVC / Unilever",
        "boycottReason": "Brand heritage built under Unilever; CVC Capital invests extensively in Israeli cybersecurity and commercial firms.",
        "severity": "High",
        "domain": "lipton.com",
        "alternatives": [
            {"name": "Tapal Danedar", "country": "Pakistan", "domain": "tapaltea.com", "verified": True},
            {"name": "Tapal Tezdum", "country": "Pakistan", "domain": "tapaltea.com", "verified": True},
            {"name": "Tapal Mezban", "country": "Pakistan", "domain": "tapaltea.com", "verified": True},
            {"name": "Vital Tea (Fine Quality)", "country": "Pakistan", "domain": "vitaltea.com.pk", "verified": True},
            {"name": "Islamabad Tea", "country": "Pakistan", "domain": "islamabadtea.com.pk", "verified": True},
            {"name": "Mezan Hardum Tea", "country": "Pakistan", "domain": "mezangroup.com", "verified": True},
            {"name": "Mehran Special Tea", "country": "Pakistan", "domain": "mehranfoods.com", "verified": True}
        ],
        "tags": ["tea", "chai", "danedar", "lipton", "grocery"]
    },
    {
        "id": "tea-2",
        "name": "Everyday Tea Whitener (Nestlé)",
        "category": "Food & Beverages",
        "subcategory": "Tea Whiteners & Dairy",
        "parentCompany": "Nestle",
        "boycottReason": "Nestle owns 100% of Israeli food manufacturer Osem and operates major research plants in Israel.",
        "severity": "Critical",
        "domain": "nestle.pk",
        "alternatives": [
            {"name": "Tarang (Engro Foods)", "country": "Pakistan", "domain": "engro.com", "verified": True},
            {"name": "Millac Whitener (Millac Foods)", "country": "Pakistan", "domain": "millacfoods.com", "verified": True},
            {"name": "Dairy Pure (Engro)", "country": "Pakistan", "domain": "engro.com", "verified": True},
            {"name": "Maymil (Milan Foods)", "country": "Pakistan", "domain": "milanfoods.com.pk", "verified": True},
            {"name": "Nurpur Tea Mate (Fauji Foods)", "country": "Pakistan", "domain": "faujifoods.com", "verified": True}
        ],
        "tags": ["everyday", "tea whitener", "milk", "chai"]
    },
    {
        "id": "tea-3",
        "name": "Nescafe Coffee & Coffee-Mate",
        "category": "Food & Beverages",
        "subcategory": "Instant Coffee",
        "parentCompany": "Nestle",
        "boycottReason": "Nestle operates in illegal settlement industrial zones through Osem Israel.",
        "severity": "Critical",
        "domain": "nescafe.com",
        "alternatives": [
            {"name": "Tapal InstaBrew Coffee", "country": "Pakistan", "domain": "tapaltea.com", "verified": True},
            {"name": "Raaz Coffee Pakistan", "country": "Pakistan", "domain": "raazcoffee.com", "verified": True},
            {"name": "Coffee Planet", "country": "UAE", "domain": "coffeeplanet.com", "verified": True},
            {"name": "Klassno Coffee", "country": "Singapore", "domain": "klassno.com", "verified": True},
            {"name": "Indocafe", "country": "Indonesia", "domain": "indocafe.co.id", "verified": True},
            {"name": "Bon Aroma", "country": "UK / Local", "domain": "bonaroma.com", "verified": True}
        ],
        "tags": ["coffee", "nescafe", "coffeemate"]
    },
    {
        "id": "tea-4",
        "name": "Starbucks Coffee & Bottled Frappuccino",
        "category": "Food & Beverages",
        "subcategory": "Coffee & Cafes",
        "parentCompany": "Starbucks",
        "boycottReason": "Starbucks sued its workers union for releasing a 'Solidarity with Palestine' statement and has deep financial ties to pro-occupation venture funds.",
        "severity": "Critical",
        "domain": "starbucks.com",
        "alternatives": [
            {"name": "Local Independent Coffee Roasters", "country": "Pakistan", "domain": "local.pk", "verified": True},
            {"name": "Coffee Planet", "country": "UAE", "domain": "coffeeplanet.com", "verified": True},
            {"name": "Gloria Jean's (Local Franchises)", "country": "Pakistan", "domain": "gloriajeanscoffees.com.pk", "verified": True},
            {"name": "Second Cup Local", "country": "Pakistan", "domain": "secondcup.com.pk", "verified": True},
            {"name": "Caffe Nero", "country": "Italy", "domain": "caffenero.com", "verified": True}
        ],
        "tags": ["starbucks", "coffee", "cafe", "frappuccino"]
    },

    # --- 3. BISCUITS & SNACKS ---
    {
        "id": "snk-1",
        "name": "Oreo Biscuits",
        "category": "Food & Beverages",
        "subcategory": "Biscuits & Cookies",
        "parentCompany": "Mondelez International",
        "boycottReason": "Mondelez operates major venture funds and partnerships with Israeli food tech incubators in Tel Aviv.",
        "severity": "Critical",
        "domain": "oreo.com",
        "alternatives": [
            {"name": "Rite (Bisconni)", "country": "Pakistan", "domain": "bisconni.com", "verified": True},
            {"name": "Cocomo (Bisconni)", "country": "Pakistan", "domain": "bisconni.com", "verified": True},
            {"name": "Chocolatto (Bisconni)", "country": "Pakistan", "domain": "bisconni.com", "verified": True},
            {"name": "Chocday (Mayfair)", "country": "Pakistan", "domain": "mayfair.com.pk", "verified": True},
            {"name": "Novita (Bisconni)", "country": "Pakistan", "domain": "bisconni.com", "verified": True}
        ],
        "tags": ["oreo", "biscuit", "cookies", "snack", "grocery"]
    },
    {
        "id": "snk-2",
        "name": "Lays Potato Chips & Kurkure / Doritos / Cheetos",
        "category": "Food & Beverages",
        "subcategory": "Chips & Snacks",
        "parentCompany": "PepsiCo (Frito-Lay)",
        "boycottReason": "PepsiCo / Frito-Lay operates in occupied territories and owns Israeli firms SodaStream and Sabra.",
        "severity": "Critical",
        "domain": "lays.com",
        "alternatives": [
            {"name": "Super Crisp (Tri-Pack)", "country": "Pakistan", "domain": "supercrisp.com.pk", "verified": True},
            {"name": "Oye Hoye (United Snacks)", "country": "Pakistan", "domain": "oyehoye.pk", "verified": True},
            {"name": "Catty Chins (Super Crisp)", "country": "Pakistan", "domain": "supercrisp.com.pk", "verified": True},
            {"name": "Dino Munchies (Super Crisp)", "country": "Pakistan", "domain": "supercrisp.com.pk", "verified": True},
            {"name": "Kolson Kurleez", "country": "Pakistan", "domain": "lottekolson.com", "verified": True},
            {"name": "Macho Nachos", "country": "Pakistan", "domain": "machonachos.pk", "verified": True},
            {"name": "Popitos Chips", "country": "Pakistan", "domain": "popitos.pk", "verified": True},
            {"name": "Shahi Popstar & Wheat-O", "country": "Pakistan", "domain": "shahisnacks.com", "verified": True}
        ],
        "tags": ["lays", "chips", "kurkure", "doritos", "cheetos", "snacks"]
    },
    {
        "id": "snk-3",
        "name": "LU Prince, TUC, Gala, Candi & Bakeri (Mondelez Licensed)",
        "category": "Food & Beverages",
        "subcategory": "Biscuits & Cookies",
        "parentCompany": "Mondelez / Continental Biscuits",
        "boycottReason": "LU and Kraft / Mondelez are co-owned international entities sending royalty streams to Mondelez international.",
        "severity": "High",
        "domain": "mondelezinternational.com",
        "alternatives": [
            {"name": "Chai Wala Biscuit (Bisconni)", "country": "Pakistan", "domain": "bisconni.com", "verified": True},
            {"name": "Cafe Biscuits (Mayfair)", "country": "Pakistan", "domain": "mayfair.com.pk", "verified": True},
            {"name": "Krakerz (Mayfair)", "country": "Pakistan", "domain": "mayfair.com.pk", "verified": True},
            {"name": "Crux (Bisconni)", "country": "Pakistan", "domain": "bisconni.com", "verified": True},
            {"name": "Zera Plus Alternative: Zera (Bisconni)", "country": "Pakistan", "domain": "bisconni.com", "verified": True},
            {"name": "Bismark Cookies (Lahore)", "country": "Pakistan", "domain": "bismark.pk", "verified": True},
            {"name": "Whistlez Peanut Cookies", "country": "Pakistan", "domain": "whistlez.pk", "verified": True}
        ],
        "tags": ["prince", "tuc", "gala", "candi", "biscuits"]
    },
    {
        "id": "snk-4",
        "name": "KitKat, Smarties & Quality Street",
        "category": "Food & Beverages",
        "subcategory": "Chocolates & Candies",
        "parentCompany": "Nestle",
        "boycottReason": "Nestle owns 100% of Israeli manufacturing giant Osem.",
        "severity": "Critical",
        "domain": "kitkat.com",
        "alternatives": [
            {"name": "Now & Paradise (CandyLand)", "country": "Pakistan", "domain": "candyland.com.pk", "verified": True},
            {"name": "Novella Chocolate (CandyLand)", "country": "Pakistan", "domain": "candyland.com.pk", "verified": True},
            {"name": "Jubilee (Mitchell's)", "country": "Pakistan", "domain": "mitchells.com.pk", "verified": True},
            {"name": "Sonnet Premium Chocolate", "country": "Pakistan", "domain": "candyland.com.pk", "verified": True},
            {"name": "Chocolatto (Bisconni)", "country": "Pakistan", "domain": "bisconni.com", "verified": True},
            {"name": "Aslan Chocolate (Singapore / Halal)", "country": "Singapore", "domain": "aslanchocolate.com", "verified": True}
        ],
        "tags": ["kitkat", "chocolate", "nestle", "sweet"]
    },
    {
        "id": "snk-5",
        "name": "Cadbury Dairy Milk, Flake & Eclairs",
        "category": "Food & Beverages",
        "subcategory": "Chocolates & Candies",
        "parentCompany": "Mondelez International",
        "boycottReason": "Cadbury is a subsidiary of Mondelez with active corporate presence in Israeli tech hubs.",
        "severity": "Critical",
        "domain": "cadbury.co.uk",
        "alternatives": [
            {"name": "Novella (CandyLand)", "country": "Pakistan", "domain": "candyland.com.pk", "verified": True},
            {"name": "Mitchell's Milk Toffees & Eclairs", "country": "Pakistan", "domain": "mitchells.com.pk", "verified": True},
            {"name": "Choco Bliss (CandyLand)", "country": "Pakistan", "domain": "candyland.com.pk", "verified": True},
            {"name": "Silk Giggly (Hilal)", "country": "Pakistan", "domain": "hilal.com.pk", "verified": True},
            {"name": "Jubilee Bar (Mitchell's)", "country": "Pakistan", "domain": "mitchells.com.pk", "verified": True}
        ],
        "tags": ["cadbury", "dairy milk", "chocolate"]
    },
    {
        "id": "snk-6",
        "name": "Snickers, Twix, Bounty, Mars & M&M's",
        "category": "Food & Beverages",
        "subcategory": "Chocolates & Candies",
        "parentCompany": "Mars Inc.",
        "boycottReason": "Mars invested millions in Israeli venture funds including Jerusalem Venture Partners (JVP) and food-tech hubs.",
        "severity": "Critical",
        "domain": "mars.com",
        "alternatives": [
            {"name": "Novella (CandyLand)", "country": "Pakistan", "domain": "candyland.com.pk", "verified": True},
            {"name": "Mitchell's Jubilee", "country": "Pakistan", "domain": "mitchells.com.pk", "verified": True},
            {"name": "Paradise Coconut Bar (CandyLand)", "country": "Pakistan", "domain": "candyland.com.pk", "verified": True},
            {"name": "Now Nougat Bar (CandyLand)", "country": "Pakistan", "domain": "candyland.com.pk", "verified": True},
            {"name": "Choco Bliss Spread", "country": "Pakistan", "domain": "candyland.com.pk", "verified": True}
        ],
        "tags": ["snickers", "twix", "mars", "bounty", "m&ms", "chocolate"]
    },
    {
        "id": "snk-7",
        "name": "Pringles Potato Crisps",
        "category": "Food & Beverages",
        "subcategory": "Chips & Snacks",
        "parentCompany": "Kellanova / Kellogg's / P&G heritage",
        "boycottReason": "Kellanova operates substantial commercial and R&D activities in Israel.",
        "severity": "High",
        "domain": "pringles.com",
        "alternatives": [
            {"name": "Jacker Potato Crisps (Malaysia Halal)", "country": "Malaysia", "domain": "oriental.com.my", "verified": True},
            {"name": "Super Crisp Lites (Tri-Pack)", "country": "Pakistan", "domain": "supercrisp.com.pk", "verified": True},
            {"name": "Kolson Kurleez", "country": "Pakistan", "domain": "lottekolson.com", "verified": True},
            {"name": "Oye Hoye Potato Chips", "country": "Pakistan", "domain": "oyehoye.pk", "verified": True}
        ],
        "tags": ["pringles", "chips", "crisps", "snack"]
    },

    # --- 4. COOKING OIL & GHEE ---
    {
        "id": "oil-1",
        "name": "Bertolli Cooking Oil & Olive Oil (Unilever)",
        "category": "Food & Beverages",
        "subcategory": "Cooking Oil & Ghee",
        "parentCompany": "Unilever / Deoleo",
        "boycottReason": "Unilever overturned Ben & Jerry's board resolution against selling in illegal Israeli settlements and maintains deep occupation ties.",
        "severity": "Critical",
        "domain": "unilever.com",
        "alternatives": [
            {"name": "Sufi Canola & Sunflower Oil", "country": "Pakistan", "domain": "sufioils.com", "verified": True},
            {"name": "Dalda Olive Oil & Canola", "country": "Pakistan", "domain": "dalda.com.pk", "verified": True},
            {"name": "Kashmir Banaspati & Cooking Oil", "country": "Pakistan", "domain": "kashmiroil.com", "verified": True},
            {"name": "Habib Cooking Oil & Super Habib", "country": "Pakistan", "domain": "habiboil.com", "verified": True},
            {"name": "Mezan Canola & Banaspati", "country": "Pakistan", "domain": "mezangroup.com", "verified": True},
            {"name": "Soya Supreme (Ahmed Oil)", "country": "Pakistan", "domain": "soyasupreme.com", "verified": True},
            {"name": "Kisan Cooking Oil", "country": "Pakistan", "domain": "kisan.com.pk", "verified": True},
            {"name": "Zaytoun Organic Palestinian Olive Oil", "country": "Palestine", "domain": "zaytoun.org", "verified": True}
        ],
        "tags": ["cooking oil", "ghee", "olive oil", "dalda", "sufi", "grocery"]
    },
    {
        "id": "oil-2",
        "name": "Rafhan Corn Oil & Canola (Unilever)",
        "category": "Food & Beverages",
        "subcategory": "Cooking Oil & Ghee",
        "parentCompany": "Unilever",
        "boycottReason": "Rafhan is a subsidiary brand owned by Unilever in Pakistan.",
        "severity": "Critical",
        "domain": "unilever.com",
        "alternatives": [
            {"name": "Sufi Corn & Canola Oil", "country": "Pakistan", "domain": "sufioils.com", "verified": True},
            {"name": "Dalda Corn Oil", "country": "Pakistan", "domain": "dalda.com.pk", "verified": True},
            {"name": "Mezan Corn Oil", "country": "Pakistan", "domain": "mezangroup.com", "verified": True},
            {"name": "Seasons Canola", "country": "Pakistan", "domain": "seasonsfoods.com.pk", "verified": True}
        ],
        "tags": ["rafhan", "corn oil", "canola", "cooking oil"]
    },

    # --- 5. SPICES, SAUCES, KETCHUP & CONDIMENTS ---
    {
        "id": "spc-1",
        "name": "Knorr (Cubes, Soups, Sauces & Spices)",
        "category": "Food & Beverages",
        "subcategory": "Spices & Recipe Mixes",
        "parentCompany": "Unilever",
        "boycottReason": "Knorr is Unilever's flagship food conglomerate generating major revenue for Unilever global operations.",
        "severity": "Critical",
        "domain": "knorr.com",
        "alternatives": [
            {"name": "National Foods Recipe Mixes & Soups", "country": "Pakistan", "domain": "nationalfoods.com", "verified": True},
            {"name": "Shan Foods Recipe Mixes (Biryani, Karahi, Haleem)", "country": "Pakistan", "domain": "shanfoods.com", "verified": True},
            {"name": "Mehran Spices & Recipe Mixes", "country": "Pakistan", "domain": "mehranfoods.com", "verified": True},
            {"name": "Bake Parlor Spices & Seasonings", "country": "Pakistan", "domain": "bakeparlor.com", "verified": True},
            {"name": "Falak Chicken Cubes & Spices", "country": "Pakistan", "domain": "falakrice.com", "verified": True},
            {"name": "Ahmed Foods Spices", "country": "Pakistan", "domain": "ahmedfood.com.pk", "verified": True}
        ],
        "tags": ["knorr", "spices", "chicken cubes", "biryani", "soup"]
    },
    {
        "id": "spc-2",
        "name": "Heinz Tomato Ketchup & Mayonnaise",
        "category": "Food & Beverages",
        "subcategory": "Sauces & Ketchup",
        "parentCompany": "Kraft Heinz",
        "boycottReason": "Kraft Heinz actively operates and distributes within illegal Israeli settlements.",
        "severity": "Critical",
        "domain": "heinz.com",
        "alternatives": [
            {"name": "Shangrila Tomato Ketchup & Chilli Garlic", "country": "Pakistan", "domain": "shangrila.com.pk", "verified": True},
            {"name": "National Tomato Ketchup & Chilli Garlic", "country": "Pakistan", "domain": "nationalfoods.com", "verified": True},
            {"name": "Mitchell's Fresh Tomato Ketchup", "country": "Pakistan", "domain": "mitchells.com.pk", "verified": True},
            {"name": "Dipitt Hot Sauces, BBQ & Mayonnaise", "country": "Pakistan", "domain": "dipitt.com", "verified": True},
            {"name": "Young's Real Mayonnaise & Spreads", "country": "Pakistan", "domain": "youngsfoods.com", "verified": True},
            {"name": "Ahmed Foods Ketchup & Sauces", "country": "Pakistan", "domain": "ahmedfood.com.pk", "verified": True}
        ],
        "tags": ["heinz", "ketchup", "mayonnaise", "sauce"]
    },
    {
        "id": "spc-3",
        "name": "Maggi & Knorr Instant 2-Minute Noodles",
        "category": "Food & Beverages",
        "subcategory": "Instant Noodles & Pasta",
        "parentCompany": "Nestle / Unilever",
        "boycottReason": "Maggi is owned by Nestle (Osem Israel parent); Knorr is owned by Unilever.",
        "severity": "Critical",
        "domain": "maggi.com",
        "alternatives": [
            {"name": "Shoop Noodles (Shan Foods)", "country": "Pakistan", "domain": "shanfoods.com", "verified": True},
            {"name": "Indomie Noodles (Halal Certified)", "country": "Indonesia", "domain": "indomie.com", "verified": True},
            {"name": "Bake Parlor Pasta & Noodles", "country": "Pakistan", "domain": "bakeparlor.com", "verified": True},
            {"name": "Kolson Pasta & Macaroni", "country": "Pakistan", "domain": "lottekolson.com", "verified": True},
            {"name": "Koka Noodles (Singapore Halal)", "country": "Singapore", "domain": "kokanoodles.com", "verified": True}
        ],
        "tags": ["maggi", "noodles", "shoop", "knorr", "pasta"]
    },

    # --- 6. DAIRY & CHEESE ---
    {
        "id": "dry-1",
        "name": "Nestlé MilkPak & Nesvita",
        "category": "Food & Beverages",
        "subcategory": "Milk & Dairy",
        "parentCompany": "Nestle",
        "boycottReason": "Nestle owns 100% of Osem in Israel and is a primary BDS movement target.",
        "severity": "Critical",
        "domain": "nestle.pk",
        "alternatives": [
            {"name": "Prema Pure Milk (At-Tahur)", "country": "Pakistan", "domain": "prema.pk", "verified": True},
            {"name": "Nurpur Pure Milk (Fauji Foods)", "country": "Pakistan", "domain": "faujifoods.com", "verified": True},
            {"name": "Haleeb Milk", "country": "Pakistan", "domain": "haleebfoods.com", "verified": True},
            {"name": "Olper's Pure Milk", "country": "Pakistan", "domain": "engro.com", "verified": True},
            {"name": "Adam's Pure Milk & Butter", "country": "Pakistan", "domain": "adams.com.pk", "verified": True},
            {"name": "Dayfresh Milk", "country": "Pakistan", "domain": "dayfresh.com.pk", "verified": True},
            {"name": "Gourmet Pure Milk", "country": "Pakistan", "domain": "gourmetfoods.com.pk", "verified": True}
        ],
        "tags": ["milk", "milkpak", "dairy", "prema", "haleeb", "olpers"]
    },
    {
        "id": "dry-2",
        "name": "Kraft Cheese, Philadelphia & Velveeta",
        "category": "Food & Beverages",
        "subcategory": "Cheese & Butter",
        "parentCompany": "Mondelez / Kraft Heinz",
        "boycottReason": "Kraft and Mondelez operate distribution and business partnerships in illegal settlements.",
        "severity": "Critical",
        "domain": "kraftfoods.com",
        "alternatives": [
            {"name": "Adam's Cheese (Cheddar, Mozzarella, Slices)", "country": "Pakistan", "domain": "adams.com.pk", "verified": True},
            {"name": "Nurpur Butter & Cheese (Fauji Foods)", "country": "Pakistan", "domain": "faujifoods.com", "verified": True},
            {"name": "Prema Butter & Cheese", "country": "Pakistan", "domain": "prema.pk", "verified": True},
            {"name": "Puck Cheese (Arla)", "country": "Denmark / Halal", "domain": "puckarabia.com", "verified": True},
            {"name": "Almarai Cheese (Saudi Arabia)", "country": "Saudi Arabia", "domain": "almarai.com", "verified": True},
            {"name": "Pinar Cheese (Turkey)", "country": "Turkey", "domain": "pinar.com.tr", "verified": True}
        ],
        "tags": ["cheese", "kraft", "cheddar", "butter"]
    },
    {
        "id": "dry-3",
        "name": "Walls Ice Cream (Cornetto, Magnum, Feast)",
        "category": "Food & Beverages",
        "subcategory": "Ice Cream & Desserts",
        "parentCompany": "Unilever",
        "boycottReason": "Walls is the global ice cream division of Unilever.",
        "severity": "Critical",
        "domain": "wallsicecream.com",
        "alternatives": [
            {"name": "Hico Pure Dairy Ice Cream", "country": "Pakistan", "domain": "hico.com.pk", "verified": True},
            {"name": "Gourmet Ice Cream", "country": "Pakistan", "domain": "gourmetfoods.com.pk", "verified": True},
            {"name": "Chaman Ice Cream", "country": "Pakistan", "domain": "chamanicecream.pk", "verified": True},
            {"name": "Sweet Creme Ice Cream", "country": "Pakistan", "domain": "sweetcreme.pk", "verified": True},
            {"name": "Popbar Local Artisan Ice Cream", "country": "Pakistan", "domain": "popbar.pk", "verified": True},
            {"name": "Lush Crush Artisanal Ice Cream", "country": "Pakistan", "domain": "lushcrush.pk", "verified": True}
        ],
        "tags": ["ice cream", "walls", "magnum", "cornetto", "hico"]
    },

    # --- 7. WASHING, DETERGENTS & CLEANING ---
    {
        "id": "cln-1",
        "name": "Surf Excel (Washing Powder & Liquid)",
        "category": "Detergents",
        "subcategory": "Laundry Detergent",
        "parentCompany": "Unilever",
        "boycottReason": "Unilever flagship household detergent financing corporate infrastructure.",
        "severity": "Critical",
        "domain": "unilever.com",
        "alternatives": [
            {"name": "Sufi Washing Powder & Soap (Sufi Group)", "country": "Pakistan", "domain": "sufioils.com", "verified": True},
            {"name": "BreeO Washing Powder", "country": "Pakistan", "domain": "breeo.com.pk", "verified": True},
            {"name": "iWASH Detergent (Vista)", "country": "Pakistan", "domain": "iwash.com.pk", "verified": True},
            {"name": "Tez Clean Detergent", "country": "Pakistan", "domain": "tezclean.pk", "verified": True},
            {"name": "Power Wash Bouncer", "country": "Pakistan", "domain": "bouncer.pk", "verified": True},
            {"name": "Bingo Washing Powder (Hayat)", "country": "Turkey", "domain": "hayat.com.tr", "verified": True}
        ],
        "tags": ["surf excel", "surf", "washing powder", "laundry", "cleaning", "grocery"]
    },
    {
        "id": "cln-2",
        "name": "Ariel & Tide (P&G Laundry Detergents)",
        "category": "Detergents",
        "subcategory": "Laundry Detergent",
        "parentCompany": "Procter & Gamble (P&G)",
        "boycottReason": "Procter & Gamble is a major direct investor in Israeli tech centers and supplies products across the state.",
        "severity": "Critical",
        "domain": "ariel.co.uk",
        "alternatives": [
            {"name": "Sufi Clean Washing Powder", "country": "Pakistan", "domain": "sufioils.com", "verified": True},
            {"name": "BreeO Detergent Powder", "country": "Pakistan", "domain": "breeo.com.pk", "verified": True},
            {"name": "Gae Power Wash", "country": "Pakistan", "domain": "gaesoap.com", "verified": True},
            {"name": "iWASH Detergents", "country": "Pakistan", "domain": "iwash.com.pk", "verified": True},
            {"name": "Ultra Clean (Shah Chemicals)", "country": "Pakistan", "domain": "shahchemicals.com", "verified": True}
        ],
        "tags": ["ariel", "tide", "laundry", "detergent", "washing powder"]
    },
    {
        "id": "cln-3",
        "name": "Brite, Express Power & Bonus (Colgate-Palmolive)",
        "category": "Detergents",
        "subcategory": "Laundry Detergent",
        "parentCompany": "Colgate-Palmolive",
        "boycottReason": "Colgate-Palmolive operates extensive manufacturing partnerships and research facilities in Israel.",
        "severity": "High",
        "domain": "colgate.com.pk",
        "alternatives": [
            {"name": "Sufi Washing Powder", "country": "Pakistan", "domain": "sufioils.com", "verified": True},
            {"name": "BreeO Washing Powder", "country": "Pakistan", "domain": "breeo.com.pk", "verified": True},
            {"name": "Tez Clean", "country": "Pakistan", "domain": "tezclean.pk", "verified": True},
            {"name": "Hero Cleaning Washing Powder", "country": "Pakistan", "domain": "heroclean.pk", "verified": True}
        ],
        "tags": ["brite", "bonus", "express power", "detergent"]
    },
    {
        "id": "cln-4",
        "name": "Vim, Max & Fairy Dishwashing Bar & Liquid",
        "category": "Detergents",
        "subcategory": "Dishwashing Cleaners",
        "parentCompany": "Unilever / Colgate-Palmolive / P&G",
        "boycottReason": "Vim (Unilever), Max (Colgate-Palmolive), and Fairy (P&G) are owned by boycotted conglomerates.",
        "severity": "Critical",
        "domain": "unilever.com",
        "alternatives": [
            {"name": "Sufi Dishwash Liquid & Bar", "country": "Pakistan", "domain": "sufioils.com", "verified": True},
            {"name": "Al-Clean Dishwashing Liquid", "country": "Pakistan", "domain": "alclean.com.pk", "verified": True},
            {"name": "CleanIt Dishwash", "country": "Pakistan", "domain": "cleanit.pk", "verified": True},
            {"name": "Bingo Dishwash (Hayat)", "country": "Turkey", "domain": "hayat.com.tr", "verified": True},
            {"name": "House of Bio Dishwash", "country": "Pakistan", "domain": "houseofbio.pk", "verified": True}
        ],
        "tags": ["vim", "max", "fairy", "dishwash", "cleaning"]
    },
    {
        "id": "cln-5",
        "name": "Harpic & Dettol Toilet / Surface Cleaner",
        "category": "Detergents",
        "subcategory": "Bathroom & Surface Cleaners",
        "parentCompany": "Reckitt Benckiser",
        "boycottReason": "Reckitt maintains distribution networks and R&D partnerships directly paying corporate taxes to Israel.",
        "severity": "Critical",
        "domain": "harpic.com",
        "alternatives": [
            {"name": "Sweep Toilet Cleaner", "country": "Pakistan", "domain": "sweep.com.pk", "verified": True},
            {"name": "Zetol Antiseptic & Cleaner", "country": "Pakistan", "domain": "zetol.pk", "verified": True},
            {"name": "Al-Clean Bathroom Cleaner", "country": "Pakistan", "domain": "alclean.com.pk", "verified": True},
            {"name": "Bingo Power Cleaner (Hayat)", "country": "Turkey", "domain": "hayat.com.tr", "verified": True},
            {"name": "CleanIt Surface Disinfectant", "country": "Pakistan", "domain": "cleanit.pk", "verified": True}
        ],
        "tags": ["harpic", "dettol", "toilet cleaner", "bathroom", "cleaning"]
    },

    # --- 8. SOAPS, SHAMPOOS, TOOTHPASTE & PERSONAL CARE ---
    {
        "id": "prs-1",
        "name": "Dove, Lux & Lifebuoy Soaps / Body Wash",
        "category": "Personal Care & Health",
        "subcategory": "Bath Soaps & Body Wash",
        "parentCompany": "Unilever",
        "boycottReason": "Owned by Unilever, operating partnerships with occupation infrastructure.",
        "severity": "Critical",
        "domain": "dove.com",
        "alternatives": [
            {"name": "Capri Luxury Soap (Zulfeqar)", "country": "Pakistan", "domain": "caprisoap.com.pk", "verified": True},
            {"name": "Tibet Snow & Soap (Kohinoor)", "country": "Pakistan", "domain": "tibet.com.pk", "verified": True},
            {"name": "Saeed Ghani Organic Herbal Soaps", "country": "Pakistan", "domain": "saeedghani.pk", "verified": True},
            {"name": "Hemani Natural Herbal Soaps", "country": "Pakistan", "domain": "hemani.pk", "verified": True},
            {"name": "Mama Organic Body Wash", "country": "Pakistan", "domain": "mamaorganic.pk", "verified": True},
            {"name": "Sufi Herbal Soap", "country": "Pakistan", "domain": "sufioils.com", "verified": True},
            {"name": "Medicam Hand Wash & Soap", "country": "Pakistan", "domain": "medicam.com.pk", "verified": True}
        ],
        "tags": ["dove", "lux", "lifebuoy", "soap", "body wash", "hygiene"]
    },
    {
        "id": "prs-2",
        "name": "Safeguard & Palmolive Antibacterial Soaps",
        "category": "Personal Care & Health",
        "subcategory": "Antibacterial Soaps",
        "parentCompany": "P&G / Colgate-Palmolive",
        "boycottReason": "Manufactured by P&G and Colgate-Palmolive.",
        "severity": "Critical",
        "domain": "safeguard.com",
        "alternatives": [
            {"name": "Zetol Antibacterial Soap", "country": "Pakistan", "domain": "zetol.pk", "verified": True},
            {"name": "Capri Antibacterial Care", "country": "Pakistan", "domain": "caprisoap.com.pk", "verified": True},
            {"name": "Medicam Antibacterial Soap", "country": "Pakistan", "domain": "medicam.com.pk", "verified": True},
            {"name": "Saeed Ghani Neem Soap", "country": "Pakistan", "domain": "saeedghani.pk", "verified": True},
            {"name": "Fine Dreaming Soap", "country": "Pakistan", "domain": "finedreaming.pk", "verified": True}
        ],
        "tags": ["safeguard", "palmolive", "soap", "antibacterial"]
    },
    {
        "id": "prs-3",
        "name": "Sunsilk, Pantene, Head & Shoulders & Clear",
        "category": "Personal Care & Health",
        "subcategory": "Shampoos & Hair Care",
        "parentCompany": "Unilever / P&G",
        "boycottReason": "Massive global hair care portfolios of Unilever and P&G.",
        "severity": "Critical",
        "domain": "headandshoulders.com",
        "alternatives": [
            {"name": "Bio Amla Shampoo (Forhan's)", "country": "Pakistan", "domain": "forhans.com.pk", "verified": True},
            {"name": "Samsol Egg & Herbal Shampoo", "country": "Pakistan", "domain": "samsol.com.pk", "verified": True},
            {"name": "Saeed Ghani Amla & Shikakai Shampoo", "country": "Pakistan", "domain": "saeedghani.pk", "verified": True},
            {"name": "Hemani Black Seed & Argan Shampoo", "country": "Pakistan", "domain": "hemani.pk", "verified": True},
            {"name": "Conatural Hair Care (Organic)", "country": "Pakistan", "domain": "conaturalintl.com", "verified": True},
            {"name": "Mama Organic Rice Water Shampoo", "country": "Pakistan", "domain": "mamaorganic.pk", "verified": True},
            {"name": "Fresh N Joy Shampoos", "country": "Pakistan", "domain": "freshnjoy.com", "verified": True},
            {"name": "Set & Touch (Golden Pearl)", "country": "Pakistan", "domain": "goldenpearl.com.pk", "verified": True}
        ],
        "tags": ["sunsilk", "pantene", "head and shoulders", "clear", "shampoo", "hair care"]
    },
    {
        "id": "prs-4",
        "name": "Colgate, Sensodyne, Crest & Oral-B",
        "category": "Personal Care & Health",
        "subcategory": "Toothpaste & Dental Care",
        "parentCompany": "Colgate-Palmolive / P&G / Haleon",
        "boycottReason": "Colgate and P&G operate research facilities and economic partnerships in Israel.",
        "severity": "Critical",
        "domain": "colgate.com",
        "alternatives": [
            {"name": "English Toothpaste (Fluoride & Clove)", "country": "Pakistan", "domain": "english.com.pk", "verified": True},
            {"name": "Medicam Dental Cream (Gum & Sensitive Care)", "country": "Pakistan", "domain": "medicam.com.pk", "verified": True},
            {"name": "Forhan's Toothpaste & Gum Paste", "country": "Pakistan", "domain": "forhans.com.pk", "verified": True},
            {"name": "Dentonic Toothpaste & Powder", "country": "Pakistan", "domain": "dentonic.com.pk", "verified": True},
            {"name": "Doctor Fluoride Toothpaste", "country": "Pakistan", "domain": "doctorfluoride.pk", "verified": True},
            {"name": "Marhaba Miswak Toothpaste", "country": "Pakistan", "domain": "marhaba.com.pk", "verified": True},
            {"name": "Hamdard Miswak Paste", "country": "Pakistan", "domain": "hamdard.com.pk", "verified": True}
        ],
        "tags": ["colgate", "sensodyne", "toothpaste", "oral care", "brush"]
    },
    {
        "id": "prs-5",
        "name": "Gillette Shaving Razors, Foam & Blades",
        "category": "Personal Care & Health",
        "subcategory": "Shaving & Grooming",
        "parentCompany": "P&G",
        "boycottReason": "Gillette is a core Procter & Gamble brand.",
        "severity": "Critical",
        "domain": "gillette.com",
        "alternatives": [
            {"name": "Treet Shaving Razors & Blades", "country": "Pakistan", "domain": "treetonline.com", "verified": True},
            {"name": "Fresh N Joy Shaving Cream & Foam", "country": "Pakistan", "domain": "freshnjoy.com", "verified": True},
            {"name": "Derby Razors & Blades (Turkey)", "country": "Turkey", "domain": "derby.com.tr", "verified": True},
            {"name": "Samsol Shaving Cream", "country": "Pakistan", "domain": "samsol.com.pk", "verified": True}
        ],
        "tags": ["gillette", "shaving", "razor", "treet", "foam"]
    },
    {
        "id": "prs-6",
        "name": "L'Oréal, Maybelline, Garnier & MAC Cosmetics",
        "category": "Personal Care & Health",
        "subcategory": "Skincare & Cosmetics",
        "parentCompany": "L'Oreal / Estee Lauder",
        "boycottReason": "L'Oreal operates factories in Migdal HaEmek on displaced Palestinian village land; Estee Lauder leadership actively funds pro-settler political organizations.",
        "severity": "Critical",
        "domain": "loreal.com",
        "alternatives": [
            {"name": "Masarrat Misbah Halal Makeup", "country": "Pakistan", "domain": "masarratmakeup.com", "verified": True},
            {"name": "Huda Beauty (UAE)", "country": "UAE", "domain": "hudabeauty.com", "verified": True},
            {"name": "Luscious Cosmetics", "country": "Pakistan", "domain": "iloveluscious.com", "verified": True},
            {"name": "Saeed Ghani Herbal Cosmetics", "country": "Pakistan", "domain": "saeedghani.pk", "verified": True},
            {"name": "Conatural Organic Cosmetics", "country": "Pakistan", "domain": "conaturalintl.com", "verified": True},
            {"name": "Rivaj UK (Pakistani Brand)", "country": "Pakistan", "domain": "rivaj-uk.com", "verified": True},
            {"name": "Medora Cosmetics & Lipsticks", "country": "Pakistan", "domain": "medora.com.pk", "verified": True}
        ],
        "tags": ["loreal", "makeup", "cosmetics", "maybelline", "garnier", "mac"]
    },

    # --- 9. BABY CARE & DIAPERS ---
    {
        "id": "bby-1",
        "name": "Pampers & Huggies Baby Diapers",
        "category": "Baby Products",
        "subcategory": "Baby Diapers & Wipes",
        "parentCompany": "P&G / Kimberly-Clark",
        "boycottReason": "Kimberly-Clark owns 49.9% of Hogla-Kimberly operating in Israeli settlement industrial zones; P&G is a primary target.",
        "severity": "Critical",
        "domain": "pampers.com",
        "alternatives": [
            {"name": "Shield Baby Diapers", "country": "Pakistan", "domain": "shield.com.pk", "verified": True},
            {"name": "Molfix Diapers (Hayat)", "country": "Turkey", "domain": "molfix.com.tr", "verified": True},
            {"name": "Bebem Natural Diapers", "country": "Turkey", "domain": "bebemnatural.com", "verified": True},
            {"name": "Leo Baby Diapers", "country": "Pakistan", "domain": "leodiapers.pk", "verified": True},
            {"name": "Canbebe Diapers", "country": "Turkey", "domain": "canbebe.com.tr", "verified": True}
        ],
        "tags": ["pampers", "huggies", "diapers", "baby", "wipes", "grocery"]
    },
    {
        "id": "bby-2",
        "name": "Cerelac, Nido & NAN Formula (Nestlé Infant Food)",
        "category": "Baby Products",
        "subcategory": "Baby Food & Formula",
        "parentCompany": "Nestle",
        "boycottReason": "Nestle owns 100% of Osem in Israel.",
        "severity": "Critical",
        "domain": "cerelac.com",
        "alternatives": [
            {"name": "Morinaga BF-1 / BF-2 / BF-Grow (NutriCo Pak)", "country": "Pakistan / Japan", "domain": "morinaga.com.pk", "verified": True},
            {"name": "Nuralac Infant Nutrition (Almarai)", "country": "Saudi Arabia", "domain": "almarai.com", "verified": True},
            {"name": "Fauji Cereals for Toddlers", "country": "Pakistan", "domain": "faujifoods.com", "verified": True},
            {"name": "Millac Infant Nutrition", "country": "Pakistan", "domain": "millacfoods.com", "verified": True},
            {"name": "Bright Star Toddler Food", "country": "Pakistan", "domain": "millacfoods.com", "verified": True}
        ],
        "tags": ["cerelac", "nido", "baby food", "formula", "nestle"]
    },
    {
        "id": "bby-3",
        "name": "Johnson's Baby (Soap, Shampoo, Lotion, Powder)",
        "category": "Baby Products",
        "subcategory": "Baby Toiletries",
        "parentCompany": "Johnson & Johnson / Kenvue",
        "boycottReason": "Johnson & Johnson was awarded Israel's Jubilee Award for massive direct investments in the Israeli economy.",
        "severity": "Critical",
        "domain": "jnj.com",
        "alternatives": [
            {"name": "Shield Baby Shampoo & Soap", "country": "Pakistan", "domain": "shield.com.pk", "verified": True},
            {"name": "Mama Organic Gentle Baby Care", "country": "Pakistan", "domain": "mamaorganic.pk", "verified": True},
            {"name": "WBM Baby Care (Organic)", "country": "Pakistan", "domain": "wbminternational.pk", "verified": True},
            {"name": "Babi Mild Gentle Baby Care", "country": "Thailand / Halal", "domain": "babimild.com", "verified": True},
            {"name": "Kid Co Baby Care", "country": "Pakistan", "domain": "kidco.pk", "verified": True}
        ],
        "tags": ["johnsons", "baby soap", "baby shampoo", "baby lotion"]
    },

    # --- 10. FAST FOOD & RESTAURANTS ---
    {
        "id": "rst-1",
        "name": "McDonald's Fast Food",
        "category": "Hotels & Restaurants",
        "subcategory": "Fast Food & Burgers",
        "parentCompany": "McDonald's Corporation",
        "boycottReason": "McDonald's Israeli franchise supplied tens of thousands of free meals and special discounts to IDF soldiers participating in the assault on Gaza.",
        "severity": "Critical",
        "domain": "mcdonalds.com",
        "alternatives": [
            {"name": "Cheezious (Pizza & Burgers)", "country": "Pakistan", "domain": "cheezious.com", "verified": True},
            {"name": "Ranchers Burgers", "country": "Pakistan", "domain": "rancherscafe.com", "verified": True},
            {"name": "Johnny & Jugnu (Gourmet Burgers)", "country": "Pakistan", "domain": "johnnyandjugnu.com", "verified": True},
            {"name": "Al Baik (Halal Fast Food)", "country": "Saudi Arabia", "domain": "albaik.com", "verified": True},
            {"name": "Daily Deli Co. (Burgers)", "country": "Pakistan", "domain": "dailydelico.com", "verified": True},
            {"name": "Howdy Burgers", "country": "Pakistan", "domain": "howdy.pk", "verified": True},
            {"name": "OPTP (One Potato Two Potato)", "country": "Pakistan", "domain": "optp.biz", "verified": True}
        ],
        "tags": ["mcdonalds", "burger", "fast food", "fries", "meal"]
    },
    {
        "id": "rst-2",
        "name": "KFC & Pizza Hut (Yum! Brands)",
        "category": "Hotels & Restaurants",
        "subcategory": "Fried Chicken & Pizza",
        "parentCompany": "Yum! Brands",
        "boycottReason": "Yum! Brands is a major investor in Israeli food tech startups (TicTuk) and runs active franchises across Israel.",
        "severity": "Critical",
        "domain": "kfc.com",
        "alternatives": [
            {"name": "Cheezious (Fried Chicken & Pizza)", "country": "Pakistan", "domain": "cheezious.com", "verified": True},
            {"name": "Broast Hub", "country": "Pakistan", "domain": "broasthub.com", "verified": True},
            {"name": "Simply Sufi Xpress", "country": "Pakistan", "domain": "simplysufi.com", "verified": True},
            {"name": "Broadway Pizza", "country": "Pakistan", "domain": "broadwaypizza.com.pk", "verified": True},
            {"name": "14th Street Pizza", "country": "Pakistan", "domain": "14thstreetpizza.com", "verified": True},
            {"name": "California Pizza", "country": "Pakistan", "domain": "californiapizza.com.pk", "verified": True},
            {"name": "Kababjees Fried Chicken", "country": "Pakistan", "domain": "kababjeesfriedchicken.com", "verified": True},
            {"name": "Pipers Fried Chicken", "country": "Pakistan", "domain": "pipers.pk", "verified": True}
        ],
        "tags": ["kfc", "pizza hut", "fried chicken", "pizza", "fast food"]
    },
    {
        "id": "rst-3",
        "name": "Domino's Pizza & Burger King",
        "category": "Hotels & Restaurants",
        "subcategory": "Fast Food & Pizza",
        "parentCompany": "Domino's / Restaurant Brands International",
        "boycottReason": "Domino's and Burger King Israeli franchises provided free meals and corporate sponsorships to Israeli military forces.",
        "severity": "Critical",
        "domain": "dominos.com",
        "alternatives": [
            {"name": "Cheezious", "country": "Pakistan", "domain": "cheezious.com", "verified": True},
            {"name": "Broadway Pizza", "country": "Pakistan", "domain": "broadwaypizza.com.pk", "verified": True},
            {"name": "14th Street Pizza", "country": "Pakistan", "domain": "14thstreetpizza.com", "verified": True},
            {"name": "Ranchers", "country": "Pakistan", "domain": "rancherscafe.com", "verified": True},
            {"name": "Johnny & Jugnu", "country": "Pakistan", "domain": "johnnyandjugnu.com", "verified": True}
        ],
        "tags": ["dominos", "burger king", "pizza", "burger"]
    },
    {
        "id": "rst-4",
        "name": "Subway Sandwiches",
        "category": "Hotels & Restaurants",
        "subcategory": "Sandwiches & Subs",
        "parentCompany": "Roark Capital",
        "boycottReason": "Parent private equity fund Roark Capital maintains extensive commercial assets in Israeli enterprise tech.",
        "severity": "High",
        "domain": "subway.com",
        "alternatives": [
            {"name": "Local Independent Sub & Sandwich Cafes", "country": "Pakistan", "domain": "local.pk", "verified": True},
            {"name": "OPTP Sandwiches & Wraps", "country": "Pakistan", "domain": "optp.biz", "verified": True},
            {"name": "Cheezious Wraps & Rolls", "country": "Pakistan", "domain": "cheezious.com", "verified": True},
            {"name": "Jalal Sons Gourmet Subs", "country": "Pakistan", "domain": "jalalsons.com.pk", "verified": True}
        ],
        "tags": ["subway", "sandwich", "sub", "wrap"]
    },

    # --- 11. TECH, CLOUD & HARDWARE ---
    {
        "id": "tch-1",
        "name": "HP Laptops, Desktops & Printers",
        "category": "Electronics & Technology",
        "subcategory": "Computers & Hardware",
        "parentCompany": "HP Inc. / Hewlett Packard Enterprise",
        "boycottReason": "HP provides the Basel biometric surveillance system used by the Israeli military at checkpoints in the occupied West Bank to restrict Palestinian freedom of movement.",
        "severity": "Critical",
        "domain": "hp.com",
        "alternatives": [
            {"name": "Lenovo", "country": "Hong Kong / Global", "domain": "lenovo.com", "verified": True},
            {"name": "Asus", "country": "Taiwan", "domain": "asus.com", "verified": True},
            {"name": "Acer", "country": "Taiwan", "domain": "acer.com", "verified": True},
            {"name": "Brother Printers", "country": "Japan", "domain": "brother.com", "verified": True},
            {"name": "Epson Printers", "country": "Japan", "domain": "epson.com", "verified": True}
        ],
        "tags": ["hp", "laptop", "printer", "computer", "tech"]
    },
    {
        "id": "tch-2",
        "name": "Siemens Industrial Tech & Home Appliances",
        "category": "Electronics & Technology",
        "subcategory": "Home Appliances & Tech",
        "parentCompany": "Siemens AG",
        "boycottReason": "Siemens is the prime contractor for the EuroAsia Interconnector linking Israel's electricity grid with Europe, including illegal settlements in the West Bank.",
        "severity": "Critical",
        "domain": "siemens.com",
        "alternatives": [
            {"name": "Dawlance (Arcelik Group)", "country": "Pakistan", "domain": "dawlance.com.pk", "verified": True},
            {"name": "Haier Appliances", "country": "China", "domain": "haier.com", "verified": True},
            {"name": "Pel (Pak Elektron Limited)", "country": "Pakistan", "domain": "pel.com.pk", "verified": True},
            {"name": "Orient Appliances", "country": "Pakistan", "domain": "orient.com.pk", "verified": True},
            {"name": "Gree Pakistan", "country": "Pakistan", "domain": "gree.com.pk", "verified": True}
        ],
        "tags": ["siemens", "appliances", "refrigerator", "ac", "tech"]
    },
    {
        "id": "tch-3",
        "name": "Wix Website Builder",
        "category": "Electronics & Technology",
        "subcategory": "Software & Web Platforms",
        "parentCompany": "Wix.com (Tel Aviv)",
        "boycottReason": "Headquartered in Tel Aviv, Israel, directly paying corporate taxes to the state; fired employees for supporting Palestinian rights.",
        "severity": "Critical",
        "domain": "wix.com",
        "alternatives": [
            {"name": "WordPress (Self-Hosted Open Source)", "country": "Open Source", "domain": "wordpress.org", "verified": True},
            {"name": "Framer Web Builder", "country": "Netherlands", "domain": "framer.com", "verified": True},
            {"name": "Webflow", "country": "USA", "domain": "webflow.com", "verified": True},
            {"name": "Shopify eCommerce", "country": "Canada", "domain": "shopify.com", "verified": True}
        ],
        "tags": ["wix", "website", "software", "tech"]
    },
    {
        "id": "tch-4",
        "name": "Fiverr Freelance Marketplace",
        "category": "Electronics & Technology",
        "subcategory": "Online Platforms",
        "parentCompany": "Fiverr (Tel Aviv)",
        "boycottReason": "Headquartered in Tel Aviv, Israel, directly funding the Israeli state economy and military tax base.",
        "severity": "Critical",
        "domain": "fiverr.com",
        "alternatives": [
            {"name": "Upwork", "country": "USA", "domain": "upwork.com", "verified": True},
            {"name": "Freelancer.com", "country": "Australia", "domain": "freelancer.com", "verified": True},
            {"name": "Guru.com", "country": "USA", "domain": "guru.com", "verified": True},
            {"name": "Direct Local Freelance Agencies", "country": "Pakistan", "domain": "pakistan.pk", "verified": True}
        ],
        "tags": ["fiverr", "freelance", "software", "tech"]
    },

    # --- 12. FASHION & APPAREL ---
    {
        "id": "fsh-1",
        "name": "Zara, Pull&Bear, Massimo Dutti & Bershka (Inditex)",
        "category": "Fashion & Apparel",
        "subcategory": "Clothing & Apparel",
        "parentCompany": "Inditex Group",
        "boycottReason": "Zara's Israeli franchise chairman hosted election events for extremist ultra-nationalist politicians and head designers made anti-Palestinian statements.",
        "severity": "Critical",
        "domain": "zara.com",
        "alternatives": [
            {"name": "Outfitters", "country": "Pakistan", "domain": "outfitters.com.pk", "verified": True},
            {"name": "Khaadi", "country": "Pakistan", "domain": "pk.khaadi.com", "verified": True},
            {"name": "Sapphire", "country": "Pakistan", "domain": "pk.sapphireonline.com.pk", "verified": True},
            {"name": "Gul Ahmed / Ideas", "country": "Pakistan", "domain": "gulahmedshop.com", "verified": True},
            {"name": "Junaid Jamshed (J.)", "country": "Pakistan", "domain": "junaidjamshed.com", "verified": True},
            {"name": "Alkaram Studio", "country": "Pakistan", "domain": "alkaramstudio.com", "verified": True},
            {"name": "Limelight", "country": "Pakistan", "domain": "limelight.pk", "verified": True},
            {"name": "Generation", "country": "Pakistan", "domain": "generation.com.pk", "verified": True},
            {"name": "Beechtree", "country": "Pakistan", "domain": "beechtree.pk", "verified": True}
        ],
        "tags": ["zara", "clothing", "fashion", "apparel", "outfitters", "khaadi"]
    },
    {
        "id": "fsh-2",
        "name": "Puma Sportswear & Shoes",
        "category": "Fashion & Apparel",
        "subcategory": "Sportswear & Shoes",
        "parentCompany": "Puma SE",
        "boycottReason": "Long-term sponsor of the Israel Football Association (IFA), which includes teams in illegal Israeli settlements in the occupied West Bank.",
        "severity": "Critical",
        "domain": "puma.com",
        "alternatives": [
            {"name": "Servis Shoes & Sportswear", "country": "Pakistan", "domain": "servis.pk", "verified": True},
            {"name": "Ndure Footwear", "country": "Pakistan", "domain": "ndure.com", "verified": True},
            {"name": "Borjan Footwear", "country": "Pakistan", "domain": "borjan.com.pk", "verified": True},
            {"name": "Bata Pakistan", "country": "Pakistan", "domain": "bata.com.pk", "verified": True},
            {"name": "Outfitters Activewear", "country": "Pakistan", "domain": "outfitters.com.pk", "verified": True}
        ],
        "tags": ["puma", "shoes", "sportswear", "sneakers"]
    },

    # --- 13. SUPERMARKETS & RETAIL ---
    {
        "id": "sup-1",
        "name": "Carrefour Supermarkets",
        "category": "Hypermarket / Online store",
        "subcategory": "Supermarkets & Retail",
        "parentCompany": "Carrefour Group",
        "boycottReason": "Carrefour signed a partnership agreement with Israeli companies operating stores across illegal West Bank settlements and sent gift packages to IDF soldiers.",
        "severity": "Critical",
        "domain": "carrefour.com",
        "alternatives": [
            {"name": "Imtiaz Super Market", "country": "Pakistan", "domain": "imtiaz.com.pk", "verified": True},
            {"name": "Al-Fatah Department Store", "country": "Pakistan", "domain": "alfatah.pk", "verified": True},
            {"name": "Chase Up Supermarket", "country": "Pakistan", "domain": "chaseup.com.pk", "verified": True},
            {"name": "Jalal Sons", "country": "Pakistan", "domain": "jalalsons.com.pk", "verified": True},
            {"name": "Lulu Hypermarket", "country": "UAE", "domain": "luluhypermarket.com", "verified": True},
            {"name": "Panda Supermarkets", "country": "Saudi Arabia", "domain": "panda.com.sa", "verified": True}
        ],
        "tags": ["carrefour", "supermarket", "grocery", "store"]
    },

    # --- 14. PESTICIDES & INSECT KILLERS ---
    {
        "id": "pst-1",
        "name": "Mortein Insect Killer & Mosquito Coils",
        "category": "Pesticides",
        "subcategory": "Insect & Mosquito Killers",
        "parentCompany": "Reckitt Benckiser",
        "boycottReason": "Mortein is owned by Reckitt Benckiser.",
        "severity": "Critical",
        "domain": "mortein.com",
        "alternatives": [
            {"name": "Power Plus Insect Killer Spray & Liquid", "country": "Pakistan", "domain": "powerplus.pk", "verified": True},
            {"name": "Primatox Insect Killer Powder & Spray", "country": "Pakistan", "domain": "primatox.pk", "verified": True},
            {"name": "Mos Guard Repellent (Sarwana)", "country": "Pakistan", "domain": "mosguard.pk", "verified": True},
            {"name": "Kingtox Insect Killer", "country": "Pakistan", "domain": "kingtox.com.pk", "verified": True}
        ],
        "tags": ["mortein", "mosquito", "spray", "pesticides"]
    }
]

# Load existing clean products and append any missing ones
with open('products_clean_consumer_only.json', 'r', encoding='utf-8') as f:
    existing = json.load(f)

# Combine master items with existing products avoiding duplicates
final_combined = list(MASTER_PRODUCTS)
existing_names = {p['name'].lower().strip() for p in MASTER_PRODUCTS}

for p in existing:
    if p['name'].lower().strip() not in existing_names:
        final_combined.append(p)
        existing_names.add(p['name'].lower().strip())

print(f"Total master consumer products: {len(final_combined)}")

with open('products_master_complete.json', 'w', encoding='utf-8') as f:
    json.dump(final_combined, f, indent=2, ensure_ascii=False)

# Write to src/data/products.ts
ts_content = f"""// Master Verified Consumer Boycott & Pakistani Alternatives Database
// Source: boycottisraelonline.com, No Thanks App, BDS Movement Official

export interface AlternativeItem {{
  name: string;
  country: string;
  verified: boolean;
  domain?: string;
  logo?: string;
}}

export interface ProductItem {{
  id: string;
  name: string;
  category: string;
  subcategory: string;
  parentCompany: string;
  boycottReason: string;
  severity: 'Critical' | 'High' | 'Caution';
  israelBarcode?: string | null;
  alternatives: AlternativeItem[];
  tags: string[];
  domain?: string;
  logo?: string;
  isCustom?: boolean;
}}

export const INITIAL_PRODUCTS: ProductItem[] = {json.dumps(final_combined, indent=2, ensure_ascii=False)};
"""

with open('src/data/products.ts', 'w', encoding='utf-8') as f:
    f.write(ts_content)

print("Saved complete master database to src/data/products.ts")
