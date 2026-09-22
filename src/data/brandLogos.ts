// Comprehensive High-Quality Brand & Personality Assets Mapping
export interface BrandAsset {
  domain: string;
  brandfetchCdn?: string;
  directImage?: string;
  svgIcon?: string;
  color?: string;
  isAvatar?: boolean;
}

export const BRAND_ASSETS: Record<string, BrandAsset> = {
  // Global Boycott FMCG Brands
  'coca-cola': {
    domain: 'coca-cola.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/coca-cola.com/w/400/h/400',
    color: '#F40009'
  },
  'coke': {
    domain: 'coca-cola.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/coca-cola.com/w/400/h/400',
    color: '#F40009'
  },
  'pepsi': {
    domain: 'pepsi.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Pepsi_logo_2014.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/pepsi.com/w/400/h/400',
    color: '#004B93'
  },
  'pepsico': {
    domain: 'pepsi.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Pepsi_logo_2014.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/pepsi.com/w/400/h/400',
    color: '#004B93'
  },
  '7up': {
    domain: '7up.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/7up_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/7up.com/w/400/h/400',
    color: '#008B47'
  },
  'mirinda': {
    domain: 'pepsi.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Mirinda_Logo.svg',
    color: '#FF6600'
  },
  'fanta': {
    domain: 'fanta.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Fanta_logo_2023.svg',
    color: '#FF6900'
  },
  'sprite': {
    domain: 'sprite.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Sprite_2022.svg',
    color: '#008B47'
  },
  'mountain dew': {
    domain: 'mountaindew.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/b/b3/Mountain_Dew_logo.svg',
    color: '#6EB43F'
  },
  'aquafina': {
    domain: 'aquafina.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/aquafina.com/w/400/h/400',
    color: '#006298'
  },
  'kinley': {
    domain: 'coca-cola.com',
    color: '#0072CE'
  },

  // Fast Food & Restaurant Chains
  'mcdonalds': {
    domain: 'mcdonalds.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/mcdonalds.com/w/400/h/400',
    color: '#FFBC0D'
  },
  "mcdonald's": {
    domain: 'mcdonalds.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/3/36/McDonald%27s_Golden_Arches.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/mcdonalds.com/w/400/h/400',
    color: '#FFBC0D'
  },
  'kfc': {
    domain: 'kfc.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/sco/b/bf/KFC_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/kfc.com/w/400/h/400',
    color: '#A3080C'
  },
  'pizza hut': {
    domain: 'pizzahut.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/d/d2/Pizza_Hut_logo_%282014%29.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/pizzahut.com/w/400/h/400',
    color: '#EE3124'
  },
  'subway': {
    domain: 'subway.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Subway_2016_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/subway.com/w/400/h/400',
    color: '#008938'
  },
  'dominos': {
    domain: 'dominos.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Dominos_pizza_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/dominos.com/w/400/h/400',
    color: '#006491'
  },
  "domino's": {
    domain: 'dominos.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Dominos_pizza_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/dominos.com/w/400/h/400',
    color: '#006491'
  },
  'dominos pizza': {
    domain: 'dominos.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Dominos_pizza_logo.svg',
    color: '#006491'
  },
  "domino's pizza": {
    domain: 'dominos.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Dominos_pizza_logo.svg',
    color: '#006491'
  },
  'starbucks': {
    domain: 'starbucks.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/starbucks.com/w/400/h/400',
    color: '#006241'
  },
  'burger king': {
    domain: 'burgerking.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Burger_King_logo_%281999%29.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/burgerking.com/w/400/h/400',
    color: '#ED7902'
  },
  'hardees': {
    domain: 'hardees.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/9/91/Hardee%27s_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/hardees.com/w/400/h/400',
    color: '#D8232A'
  },
  "hardee's": {
    domain: 'hardees.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/9/91/Hardee%27s_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/hardees.com/w/400/h/400',
    color: '#D8232A'
  },
  'carls jr': {
    domain: 'carlsjr.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/9/91/Hardee%27s_logo.svg',
    color: '#D8232A'
  },
  'tim hortons': {
    domain: 'timhortons.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Tim_Hortons_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/timhortons.com/w/400/h/400',
    color: '#C8102E'
  },
  'papa johns': {
    domain: 'papajohns.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Papa_John%27s_Pizza_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/papajohns.com/w/400/h/400',
    color: '#007A3E'
  },
  "papa john's": {
    domain: 'papajohns.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Papa_John%27s_Pizza_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/papajohns.com/w/400/h/400',
    color: '#007A3E'
  },
  'dunkin': {
    domain: 'dunkindonuts.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Dunkin%27_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/dunkindonuts.com/w/400/h/400',
    color: '#FF671F'
  },
  'dunkin donuts': {
    domain: 'dunkindonuts.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Dunkin%27_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/dunkindonuts.com/w/400/h/400',
    color: '#FF671F'
  },
  "dunkin' donuts": {
    domain: 'dunkindonuts.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Dunkin%27_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/dunkindonuts.com/w/400/h/400',
    color: '#FF671F'
  },
  'costa coffee': {
    domain: 'costa.co.uk',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/7/7c/Costa_Coffee_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/costa.co.uk/w/400/h/400',
    color: '#6A1024'
  },
  'krispy kreme': {
    domain: 'krispykreme.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/0/08/Krispy_Kreme_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/krispykreme.com/w/400/h/400',
    color: '#006B3F'
  },
  'cinnabon': {
    domain: 'cinnabon.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Cinnabon_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/cinnabon.com/w/400/h/400',
    color: '#34B6E4'
  },
  'gloria jeans': {
    domain: 'gloriajeanscoffees.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/e/e6/Gloria_Jean%27s_Coffees_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/gloriajeanscoffees.com/w/400/h/400',
    color: '#5C311E'
  },
  'texas chicken': {
    domain: 'texaschicken.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/a/a2/Texas_Chicken_Logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/texaschicken.com/w/400/h/400',
    color: '#E31B23'
  },
  'popeyes': {
    domain: 'popeyes.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Popeyes_logo_2020.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/popeyes.com/w/400/h/400',
    color: '#FA6B00'
  },
  'baskin robbins': {
    domain: 'baskinrobbins.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Baskin-Robbins_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/baskinrobbins.com/w/400/h/400',
    color: '#E01A4F'
  },
  'baskin-robbins': {
    domain: 'baskinrobbins.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Baskin-Robbins_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/baskinrobbins.com/w/400/h/400',
    color: '#E01A4F'
  },
  'chilis': {
    domain: 'chilis.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Chili%27s_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/chilis.com/w/400/h/400',
    color: '#007A3E'
  },
  "chili's": {
    domain: 'chilis.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Chili%27s_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/chilis.com/w/400/h/400',
    color: '#007A3E'
  },
  'tgi fridays': {
    domain: 'tgifridays.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/3/30/TGI_Fridays_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/tgifridays.com/w/400/h/400',
    color: '#D8232A'
  },

  // Safe Pakistani Dining Alternatives
  'daily deli co': {
    domain: 'dailydeli.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/dailydeli.pk/w/400/h/400',
    color: '#E31B23'
  },
  'cheezious': {
    domain: 'cheezious.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/cheezious.com/w/400/h/400',
    color: '#FFB800'
  },
  'ranchers': {
    domain: 'rancherscafe.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/rancherscafe.com/w/400/h/400',
    color: '#8B4513'
  },
  'johnny & jugnu': {
    domain: 'johnnyandjugnu.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/johnnyandjugnu.com/w/400/h/400',
    color: '#E31B23'
  },
  'howdy': {
    domain: 'howdy.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/howdy.pk/w/400/h/400',
    color: '#000000'
  },
  'broadway pizza': {
    domain: 'broadwaypizza.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/broadwaypizza.com.pk/w/400/h/400',
    color: '#E31B23'
  },
  'california pizza': {
    domain: 'californiapizza.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/californiapizza.com.pk/w/400/h/400',
    color: '#D8232A'
  },
  '14th street pizza': {
    domain: '14thstreetpizza.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/14thstreetpizza.com/w/400/h/400',
    color: '#D8232A'
  },
  'optp': {
    domain: 'optp.biz',
    brandfetchCdn: 'https://cdn.brandfetch.io/optp.biz/w/400/h/400',
    color: '#E31B23'
  },
  'kababjees fried chicken': {
    domain: 'kababjeesfriedchicken.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/kababjees.com/w/400/h/400',
    color: '#E31B23'
  },
  'kababjees': {
    domain: 'kababjees.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/kababjees.com/w/400/h/400',
    color: '#C8102E'
  },
  'ginsoy': {
    domain: 'ginsoy.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/ginsoy.com/w/400/h/400',
    color: '#000000'
  },
  'chaaye khana': {
    domain: 'chaayekhana.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/chaayekhana.com/w/400/h/400',
    color: '#8B4513'
  },
  'chai shai': {
    domain: 'chaishai.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/chaishai.pk/w/400/h/400',
    color: '#8B4513'
  },
  'coffee wagera': {
    domain: 'coffeewagera.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/coffeewagera.com/w/400/h/400',
    color: '#5C311E'
  },
  'second cup': {
    domain: 'secondcup.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/secondcup.com/w/400/h/400',
    color: '#6A1024'
  },

  // Pakistani Personalities & Celebrity Profiles
  'babar azam': {
    domain: 'pcb.com.pk',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/4/43/Babar_azam_2023.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'shaheen afridi': {
    domain: 'pcb.com.pk',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Shaheen_Afridi_jogging_Sri_Lanka_vs_Pakistan_-_2nd_TEST_Match_-_SSC%2C_Colombo_%28cropped%29.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'shaheen shah afridi': {
    domain: 'pcb.com.pk',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/0/02/Shaheen_Afridi_jogging_Sri_Lanka_vs_Pakistan_-_2nd_TEST_Match_-_SSC%2C_Colombo_%28cropped%29.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'haris rauf': {
    domain: 'pcb.com.pk',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/3/36/1_53_Haris_Rauf.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'shadab khan': {
    domain: 'pcb.com.pk',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Shadab_Khan.png',
    color: '#004B93',
    isAvatar: true
  },
  'naseem shah': {
    domain: 'pcb.com.pk',
    directImage: 'https://unavatar.io/x/iNaseemShah',
    color: '#004B93',
    isAvatar: true
  },
  'mohammad rizwan': {
    domain: 'pcb.com.pk',
    directImage: 'https://unavatar.io/x/iMRizwanPak',
    color: '#004B93',
    isAvatar: true
  },
  'imad wasim': {
    domain: 'pcb.com.pk',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Imad_Wasim_1.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'wasim akram': {
    domain: 'pepsi.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Wasim-akram-gesf-2018-7878.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'shoaib malik': {
    domain: 'pepsi.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Shoaib_Malik_answering_RAPID_FIRE_questions_%28PCB%29_01.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'sania mirza': {
    domain: 'instagram.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Sania_Mirza_at_the_launch_of_her_book_%27Ace_Against_Odds%27.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'mahira khan': {
    domain: 'loreal.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Mahira_Khan_2024_%281%29.png',
    color: '#E31B23',
    isAvatar: true
  },
  'fawad khan': {
    domain: 'coca-cola.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Fawad_khan_at_grazia_young_faishon_awards.jpg',
    color: '#F40009',
    isAvatar: true
  },
  'ayeza khan': {
    domain: 'nestle.com',
    directImage: 'https://unavatar.io/instagram/ayezakhan.ak',
    color: '#005CA9',
    isAvatar: true
  },
  'danish taimoor': {
    domain: 'loreal.com',
    directImage: 'https://unavatar.io/instagram/danishtaimoor16',
    color: '#E31B23',
    isAvatar: true
  },
  'hania aamir': {
    domain: 'unilever.com',
    directImage: 'https://unavatar.io/instagram/haniaheheofficial',
    color: '#1F36C7',
    isAvatar: true
  },
  'fahad mustafa': {
    domain: 'pepsi.com',
    directImage: 'https://unavatar.io/x/fahadmustafa26',
    color: '#004B93',
    isAvatar: true
  },
  'atif aslam': {
    domain: 'coca-cola.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Atif_Aslam_at_Badlapur_%28cropped%29.jpg',
    color: '#F40009',
    isAvatar: true
  },
  'momina mustehsan': {
    domain: 'coca-cola.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Momina_Mustehsan_at_New_Islamabad_Airport_-_2020_%28cropped%29.jpg',
    color: '#F40009',
    isAvatar: true
  },
  'ali zafar': {
    domain: 'twitter.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/f/f2/Ali_Zafar%2C_VOA_%281%29.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'sajal aly': {
    domain: 'instagram.com',
    directImage: 'https://unavatar.io/instagram/sajalaly',
    color: '#004B93',
    isAvatar: true
  },
  'sajal ali': {
    domain: 'instagram.com',
    directImage: 'https://unavatar.io/instagram/sajalaly',
    color: '#004B93',
    isAvatar: true
  },
  'yumna zaidi': {
    domain: 'instagram.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Yumna_Zaidi.png',
    color: '#004B93',
    isAvatar: true
  },
  'maya ali': {
    domain: 'instagram.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Maya_Ali_2020.png',
    color: '#004B93',
    isAvatar: true
  },
  'iqra aziz': {
    domain: 'instagram.com',
    directImage: 'https://unavatar.io/instagram/iiqraaziz',
    color: '#004B93',
    isAvatar: true
  },
  'ahad raza mir': {
    domain: 'instagram.com',
    directImage: 'https://unavatar.io/instagram/ahadrazamir',
    color: '#004B93',
    isAvatar: true
  },
  'ushna shah': {
    domain: 'instagram.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Usnah_Shah.jpg',
    color: '#059669',
    isAvatar: true
  },
  'hamza ali abbasi': {
    domain: 'instagram.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Hamza_Ali_Abbasi.jpg',
    color: '#059669',
    isAvatar: true
  },
  'fatima bhutto': {
    domain: 'twitter.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Fatima_Bhutto_9296410.jpg',
    color: '#059669',
    isAvatar: true
  },
  'osman khalid butt': {
    domain: 'twitter.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Osman_Khalid_Butt.jpg',
    color: '#059669',
    isAvatar: true
  },

  // Major Boycott Consumer Goods
  'nestle': {
    domain: 'nestle.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/d/d8/Nestl%C3%A9.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/nestle.com/w/400/h/400',
    color: '#005CA9'
  },
  'nestlé': {
    domain: 'nestle.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/d/d8/Nestl%C3%A9.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/nestle.com/w/400/h/400',
    color: '#005CA9'
  },
  'unilever': {
    domain: 'unilever.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/e/e4/Unilever.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/unilever.com/w/400/h/400',
    color: '#1F36C7'
  },
  'procter & gamble': {
    domain: 'pg.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Procter_%26_Gamble_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/pg.com/w/400/h/400',
    color: '#003CAE'
  },
  'p&g': {
    domain: 'pg.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Procter_%26_Gamble_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/pg.com/w/400/h/400',
    color: '#003CAE'
  },
  'loreal': {
    domain: 'loreal.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/L%27Or%C3%A9al_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/loreal.com/w/400/h/400',
    color: '#E31B23'
  },
  "l'oreal": {
    domain: 'loreal.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/L%27Or%C3%A9al_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/loreal.com/w/400/h/400',
    color: '#E31B23'
  },
  "l'oréal": {
    domain: 'loreal.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/L%27Or%C3%A9al_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/loreal.com/w/400/h/400',
    color: '#E31B23'
  },
  'garnier': {
    domain: 'garnier.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Garnier_logo.svg',
    color: '#8DB900'
  },
  'puma': {
    domain: 'puma.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/3/37/Puma_AG.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/puma.com/w/400/h/400',
    color: '#000000'
  },
  'hp': {
    domain: 'hp.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/HP_logo_2012.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/hp.com/w/400/h/400',
    color: '#0096D6'
  },
  'zara': {
    domain: 'zara.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Zara_Logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/zara.com/w/400/h/400',
    color: '#000000'
  },
  'carrefour': {
    domain: 'carrefour.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/1/12/Carrefour_logo_no_text.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/carrefour.com/w/400/h/400',
    color: '#004E98'
  },
  'disney': {
    domain: 'disney.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/disney.com/w/400/h/400',
    color: '#113CCF'
  },
  'disney+': {
    domain: 'disney.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/disney.com/w/400/h/400',
    color: '#113CCF'
  },
  'oreo': {
    domain: 'oreo.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Oreo_Wordmark.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/oreo.com/w/400/h/400',
    color: '#0033A0'
  },
  'lays': {
    domain: 'lays.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Lay%27s_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/lays.com/w/400/h/400',
    color: '#FFDE00'
  },
  "lay's": {
    domain: 'lays.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/e/e0/Lay%27s_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/lays.com/w/400/h/400',
    color: '#FFDE00'
  },
  'doritos': {
    domain: 'doritos.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/6/6c/Doritos_2013.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/doritos.com/w/400/h/400',
    color: '#D81E05'
  },
  'kitkat': {
    domain: 'kitkat.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/1/16/KitKat_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/kitkat.com/w/400/h/400',
    color: '#D71920'
  },
  'kit kat': {
    domain: 'kitkat.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/1/16/KitKat_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/kitkat.com/w/400/h/400',
    color: '#D71920'
  },
  'dove': {
    domain: 'dove.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/2/23/Dove_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/dove.com/w/400/h/400',
    color: '#003478'
  },
  'sunsilk': {
    domain: 'sunsilk.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Sunsilk_Logo.svg',
    color: '#E01A4F'
  },
  'lux': {
    domain: 'unilever.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/e/e4/Unilever.svg',
    color: '#C5A059'
  },
  'surf excel': {
    domain: 'surfexcel.in',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/e/e4/Unilever.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/unilever.com/w/400/h/400',
    color: '#F37021'
  },
  'ariel': {
    domain: 'ariel.co.uk',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Procter_%26_Gamble_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/pg.com/w/400/h/400',
    color: '#009247'
  },
  'lipton': {
    domain: 'lipton.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Lipton_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/lipton.com/w/400/h/400',
    color: '#FFCC00'
  },
  'head & shoulders': {
    domain: 'headandshoulders.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Procter_%26_Gamble_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/headandshoulders.com/w/400/h/400',
    color: '#0072CE'
  },
  'colgate': {
    domain: 'colgate.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Colgate_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/colgate.com/w/400/h/400',
    color: '#E4002B'
  },
  'sensodyne': {
    domain: 'sensodyne.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Sensodyne_logo.svg',
    color: '#005CA9'
  },
  'pampers': {
    domain: 'pampers.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/0/07/Pampers_Logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/pampers.com/w/400/h/400',
    color: '#00A3A6'
  },
  'cerelac': {
    domain: 'nestle.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/d/d8/Nestl%C3%A9.svg',
    color: '#005CA9'
  },
  'nido': {
    domain: 'nestle.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/d/d8/Nestl%C3%A9.svg',
    color: '#FFCC00'
  },
  'intel': {
    domain: 'intel.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Intel_logo_%282020%29.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/intel.com/w/400/h/400',
    color: '#0068B5'
  },
  'siemens': {
    domain: 'siemens.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Siemens_AG_logo.svg',
    brandfetchCdn: 'https://cdn.brandfetch.io/siemens.com/w/400/h/400',
    color: '#00646E'
  },

  // Safe Pakistani Beverage & Food Alternatives
  'cola next': {
    domain: 'mezangroup.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/mezangroup.com/w/400/h/400',
    color: '#D8232A'
  },
  'pakola': {
    domain: 'pakola.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/pakola.com.pk/w/400/h/400',
    color: '#008B47'
  },
  'gourmet cola': {
    domain: 'gourmetfoods.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/gourmetfoods.com.pk/w/400/h/400',
    color: '#D8232A'
  },
  'gourmet': {
    domain: 'gourmetfoods.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/gourmetfoods.com.pk/w/400/h/400',
    color: '#D8232A'
  },
  'tapal': {
    domain: 'tapaltea.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/tapaltea.com/w/400/h/400',
    color: '#C8102E'
  },
  'vital': {
    domain: 'vitaltea.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/vitaltea.com.pk/w/400/h/400',
    color: '#007A3D'
  },
  'mezan': {
    domain: 'mezangroup.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/mezangroup.com/w/400/h/400',
    color: '#D8232A'
  },
  'dalda': {
    domain: 'daldafoods.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/daldafoods.com/w/400/h/400',
    color: '#007A3E'
  },
  'sufi': {
    domain: 'sufigroup.biz',
    brandfetchCdn: 'https://cdn.brandfetch.io/sufigroup.biz/w/400/h/400',
    color: '#008B47'
  },
  'mitchells': {
    domain: 'mitchells.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/mitchells.com.pk/w/400/h/400',
    color: '#D8232A'
  },
  "mitchell's": {
    domain: 'mitchells.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/mitchells.com.pk/w/400/h/400',
    color: '#D8232A'
  },
  'shezan': {
    domain: 'shezan.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/shezan.com/w/400/h/400',
    color: '#E30613'
  },
  'candyland': {
    domain: 'candyland.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/candyland.com.pk/w/400/h/400',
    color: '#E31B23'
  },
  'hilal': {
    domain: 'hilal.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/hilal.com.pk/w/400/h/400',
    color: '#D8232A'
  },
  'sooper': {
    domain: 'ebm.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/ebm.com.pk/w/400/h/400',
    color: '#E31B23'
  },
  'shan': {
    domain: 'shanfoods.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/shanfoods.com/w/400/h/400',
    color: '#E31B23'
  },
  'national': {
    domain: 'nfoods.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/nfoods.com/w/400/h/400',
    color: '#D8232A'
  },
  'olpers': {
    domain: 'engrofoods.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/engrofoods.com/w/400/h/400',
    color: '#005CA9'
  },
  "olper's": {
    domain: 'engrofoods.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/engrofoods.com/w/400/h/400',
    color: '#005CA9'
  },
  'j.': {
    domain: 'junaidjamshed.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/junaidjamshed.com/w/400/h/400',
    color: '#000000'
  },
  'junaid jamshed': {
    domain: 'junaidjamshed.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/junaidjamshed.com/w/400/h/400',
    color: '#000000'
  },
  'khaadi': {
    domain: 'khaadi.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/khaadi.com/w/400/h/400',
    color: '#000000'
  },
  'sapphire': {
    domain: 'sapphireonline.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/sapphireonline.pk/w/400/h/400',
    color: '#000000'
  },
  'outfitters': {
    domain: 'outfitters.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/outfitters.com.pk/w/400/h/400',
    color: '#000000'
  },
  'servis': {
    domain: 'servis.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/servis.com/w/400/h/400',
    color: '#D8232A'
  },
  'bata': {
    domain: 'bata.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/bata.com.pk/w/400/h/400',
    color: '#D8232A'
  }
};

export const getBrandAsset = (name: string): BrandAsset | undefined => {
  if (!name) return undefined;

  // 1. Check exact key match
  const lower = name.toLowerCase().trim();
  if (BRAND_ASSETS[lower]) return BRAND_ASSETS[lower];

  // 2. Extract base name without parentheses (e.g. "Babar Azam (Pepsi Ambassador)" -> "Babar Azam")
  const withoutParentheses = lower.replace(/\s*\([^)]*\)/g, '').trim();
  if (BRAND_ASSETS[withoutParentheses]) return BRAND_ASSETS[withoutParentheses];

  // 3. Normalized without special punctuation (e.g. "mcdonald's" -> "mcdonalds")
  const alphaNumBase = withoutParentheses.replace(/[^a-z0-9\s]/g, '').trim();
  const alphaNumFull = lower.replace(/[^a-z0-9\s]/g, '').trim();
  if (BRAND_ASSETS[alphaNumBase]) return BRAND_ASSETS[alphaNumBase];
  if (BRAND_ASSETS[alphaNumFull]) return BRAND_ASSETS[alphaNumFull];

  // 4. Sort all registered asset keys by LENGTH descending so specific names take precedence
  const sortedKeys = Object.keys(BRAND_ASSETS).sort((a, b) => b.length - a.length);

  // Check matching on base name first (so "babar azam" matches before any endorsement keyword)
  for (const key of sortedKeys) {
    const cleanKey = key.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    if (alphaNumBase === cleanKey) return BRAND_ASSETS[key];
    if (alphaNumBase.includes(cleanKey) && cleanKey.length >= 3) return BRAND_ASSETS[key];
  }

  // Check matching on full name
  for (const key of sortedKeys) {
    const cleanKey = key.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
    if (alphaNumFull === cleanKey) return BRAND_ASSETS[key];
    if (alphaNumFull.includes(cleanKey) && cleanKey.length >= 3) return BRAND_ASSETS[key];
  }

  return undefined;
};
