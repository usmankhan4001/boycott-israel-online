// High quality vector SVG and Brandfetch CDN mapping for major brands
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
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/512px-Coca-Cola_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/coca-cola.com/w/400/h/400',
    color: '#F40009'
  },
  'coke': {
    domain: 'coca-cola.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/512px-Coca-Cola_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/coca-cola.com/w/400/h/400',
    color: '#F40009'
  },
  'pepsi': {
    domain: 'pepsi.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pepsi_logo_2014.svg/512px-Pepsi_logo_2014.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/pepsi.com/w/400/h/400',
    color: '#004B93'
  },
  '7up': {
    domain: '7up.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/7up_logo.svg/512px-7up_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/7up.com/w/400/h/400',
    color: '#008B47'
  },
  'mirinda': {
    domain: 'pepsi.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/Mirinda_Logo.svg/512px-Mirinda_Logo.svg.png',
    color: '#FF6600'
  },
  'fanta': {
    domain: 'fanta.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Fanta_logo_2023.svg/512px-Fanta_logo_2023.svg.png',
    color: '#FF6900'
  },
  'sprite': {
    domain: 'sprite.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Sprite_2022.svg/512px-Sprite_2022.svg.png',
    color: '#008B47'
  },
  'mountain dew': {
    domain: 'mountaindew.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b3/Mountain_Dew_logo.svg/512px-Mountain_Dew_logo.svg.png',
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
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/McDonald%27s_Golden_Arches.svg/512px-McDonald%27s_Golden_Arches.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/mcdonalds.com/w/400/h/400',
    color: '#FFBC0D'
  },
  'kfc': {
    domain: 'kfc.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/512px-KFC_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/kfc.com/w/400/h/400',
    color: '#A3080C'
  },
  'pizza hut': {
    domain: 'pizzahut.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d2/Pizza_Hut_logo_%282014%29.svg/512px-Pizza_Hut_logo_%282014%29.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/pizzahut.com/w/400/h/400',
    color: '#EE3124'
  },
  'subway': {
    domain: 'subway.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Subway_2016_logo.svg/512px-Subway_2016_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/subway.com/w/400/h/400',
    color: '#008938'
  },
  'dominos': {
    domain: 'dominos.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dominos_pizza_logo.svg/512px-Dominos_pizza_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/dominos.com/w/400/h/400',
    color: '#006491'
  },
  'dominos pizza': {
    domain: 'dominos.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Dominos_pizza_logo.svg/512px-Dominos_pizza_logo.svg.png',
    color: '#006491'
  },
  'starbucks': {
    domain: 'starbucks.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/512px-Starbucks_Corporation_Logo_2011.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/starbucks.com/w/400/h/400',
    color: '#006241'
  },
  'burger king': {
    domain: 'burgerking.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Burger_King_logo_%281999%29.svg/512px-Burger_King_logo_%281999%29.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/burgerking.com/w/400/h/400',
    color: '#ED7902'
  },
  'hardees': {
    domain: 'hardees.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Hardee%27s_logo.svg/512px-Hardee%27s_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/hardees.com/w/400/h/400',
    color: '#D8232A'
  },
  'carls jr': {
    domain: 'carlsjr.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/91/Hardee%27s_logo.svg/512px-Hardee%27s_logo.svg.png',
    color: '#D8232A'
  },
  'tim hortons': {
    domain: 'timhortons.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Tim_Hortons_logo.svg/512px-Tim_Hortons_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/timhortons.com/w/400/h/400',
    color: '#C8102E'
  },
  'papa johns': {
    domain: 'papajohns.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Papa_John%27s_Pizza_logo.svg/512px-Papa_John%27s_Pizza_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/papajohns.com/w/400/h/400',
    color: '#007A3E'
  },
  'dunkin': {
    domain: 'dunkindonuts.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Dunkin%27_logo.svg/512px-Dunkin%27_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/dunkindonuts.com/w/400/h/400',
    color: '#FF671F'
  },
  'dunkin donuts': {
    domain: 'dunkindonuts.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Dunkin%27_logo.svg/512px-Dunkin%27_logo.svg.png',
    color: '#FF671F'
  },
  'costa coffee': {
    domain: 'costa.co.uk',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/Costa_Coffee_logo.svg/512px-Costa_Coffee_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/costa.co.uk/w/400/h/400',
    color: '#6A1024'
  },
  'krispy kreme': {
    domain: 'krispykreme.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/08/Krispy_Kreme_logo.svg/512px-Krispy_Kreme_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/krispykreme.com/w/400/h/400',
    color: '#006B3F'
  },
  'cinnabon': {
    domain: 'cinnabon.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Cinnabon_logo.svg/512px-Cinnabon_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/cinnabon.com/w/400/h/400',
    color: '#34B6E4'
  },
  'gloria jeans': {
    domain: 'gloriajeanscoffees.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/Gloria_Jean%27s_Coffees_logo.svg/512px-Gloria_Jean%27s_Coffees_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/gloriajeanscoffees.com/w/400/h/400',
    color: '#5C311E'
  },
  'texas chicken': {
    domain: 'texaschicken.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Texas_Chicken_Logo.svg/512px-Texas_Chicken_Logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/texaschicken.com/w/400/h/400',
    color: '#E31B23'
  },
  'popeyes': {
    domain: 'popeyes.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Popeyes_logo_2020.svg/512px-Popeyes_logo_2020.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/popeyes.com/w/400/h/400',
    color: '#FA6B00'
  },
  'baskin robbins': {
    domain: 'baskinrobbins.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Baskin-Robbins_logo.svg/512px-Baskin-Robbins_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/baskinrobbins.com/w/400/h/400',
    color: '#E01A4F'
  },
  'chilis': {
    domain: 'chilis.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Chili%27s_logo.svg/512px-Chili%27s_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/chilis.com/w/400/h/400',
    color: '#007A3E'
  },
  'tgi fridays': {
    domain: 'tgifridays.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/TGI_Fridays_logo.svg/512px-TGI_Fridays_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/tgifridays.com/w/400/h/400',
    color: '#D8232A'
  },

  // Safe Pakistani Dining Alternatives
  'daily deli co': {
    domain: 'dailydeli.pk',
    directImage: 'https://dailydeli.pk/wp-content/uploads/2021/04/logo.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/dailydeli.pk/w/400/h/400',
    color: '#E31B23'
  },
  'cheezious': {
    domain: 'cheezious.com',
    directImage: 'https://cheezious.com/images/logo.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/cheezious.com/w/400/h/400',
    color: '#FFB800'
  },
  'ranchers': {
    domain: 'rancherscafe.com',
    directImage: 'https://rancherscafe.com/assets/images/logo.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/rancherscafe.com/w/400/h/400',
    color: '#8B4513'
  },
  'johnny & jugnu': {
    domain: 'johnnyandjugnu.com',
    directImage: 'https://johnnyandjugnu.com/assets/images/logo.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/johnnyandjugnu.com/w/400/h/400',
    color: '#E31B23'
  },
  'howdy': {
    domain: 'howdy.pk',
    directImage: 'https://howdy.pk/wp-content/uploads/2020/09/howdy-logo.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/howdy.pk/w/400/h/400',
    color: '#000000'
  },
  'broadway pizza': {
    domain: 'broadwaypizza.com.pk',
    directImage: 'https://broadwaypizza.com.pk/wp-content/uploads/2021/01/logo.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/broadwaypizza.com.pk/w/400/h/400',
    color: '#E31B23'
  },
  'california pizza': {
    domain: 'californiapizza.com.pk',
    directImage: 'https://californiapizza.com.pk/wp-content/uploads/2021/03/california-pizza-logo.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/californiapizza.com.pk/w/400/h/400',
    color: '#D8232A'
  },
  '14th street pizza': {
    domain: '14thstreetpizza.com',
    directImage: 'https://14thstreetpizza.com/assets/images/logo.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/14thstreetpizza.com/w/400/h/400',
    color: '#D8232A'
  },
  'optp': {
    domain: 'optp.biz',
    directImage: 'https://optp.biz/wp-content/uploads/2020/01/optp-logo.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/optp.biz/w/400/h/400',
    color: '#E31B23'
  },
  'kababjees fried chicken': {
    domain: 'kababjeesfriedchicken.com',
    directImage: 'https://kababjeesfriedchicken.com/images/logo.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/kababjees.com/w/400/h/400',
    color: '#E31B23'
  },
  'kababjees': {
    domain: 'kababjees.com',
    directImage: 'https://kababjees.com/images/logo.png',
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
    directImage: 'https://chaayekhana.com/wp-content/uploads/2021/04/logo.png',
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
    directImage: 'https://coffeewagera.com/wp-content/uploads/2020/08/CW-Logo-Square.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/coffeewagera.com/w/400/h/400',
    color: '#5C311E'
  },
  'second cup': {
    domain: 'secondcup.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/07/Second_Cup_logo.svg/512px-Second_Cup_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/secondcup.com/w/400/h/400',
    color: '#6A1024'
  },

  // Pakistani Celebrities & Endorsers Profile Photos
  'babar azam': {
    domain: 'pcb.com.pk',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Babar_Azam_in_2023.jpg/480px-Babar_Azam_in_2023.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'shaheen afridi': {
    domain: 'pcb.com.pk',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Shaheen_Afridi_2023.jpg/480px-Shaheen_Afridi_2023.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'haris rauf': {
    domain: 'pcb.com.pk',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Haris_Rauf_2022.jpg/480px-Haris_Rauf_2022.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'shadab khan': {
    domain: 'pcb.com.pk',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Shadab_Khan_in_2021.jpg/480px-Shadab_Khan_in_2021.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'mahira khan': {
    domain: 'loreal.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Mahira_Khan_at_the_UK_Asian_Film_Festival_in_2018.jpg/480px-Mahira_Khan_at_the_UK_Asian_Film_Festival_in_2018.jpg',
    color: '#E31B23',
    isAvatar: true
  },
  'fawad khan': {
    domain: 'coca-cola.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Fawad_Khan_at_the_launch_of_The_Legend_of_Maula_Jatt.jpg/480px-Fawad_Khan_at_the_launch_of_The_Legend_of_Maula_Jatt.jpg',
    color: '#F40009',
    isAvatar: true
  },
  'ayeza khan': {
    domain: 'nestle.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Ayeza_Khan_in_2021.jpg/480px-Ayeza_Khan_in_2021.jpg',
    color: '#005CA9',
    isAvatar: true
  },
  'danish taimoor': {
    domain: 'loreal.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Danish_Taimoor_in_2020.jpg/480px-Danish_Taimoor_in_2020.jpg',
    color: '#E31B23',
    isAvatar: true
  },
  'hania aamir': {
    domain: 'unilever.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Hania_Aamir_2022.jpg/480px-Hania_Aamir_2022.jpg',
    color: '#1F36C7',
    isAvatar: true
  },
  'fahad mustafa': {
    domain: 'pepsi.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Fahad_Mustafa_in_2019.jpg/480px-Fahad_Mustafa_in_2019.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'atif aslam': {
    domain: 'coca-cola.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Atif_Aslam_at_o2_arena_on_22_april_2012.jpg/480px-Atif_Aslam_at_o2_arena_on_22_april_2012.jpg',
    color: '#F40009',
    isAvatar: true
  },
  'momina mustehsan': {
    domain: 'coca-cola.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Momina_Mustehsan.jpg/480px-Momina_Mustehsan.jpg',
    color: '#F40009',
    isAvatar: true
  },
  'wasim akram': {
    domain: 'pepsi.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Wasim_Akram_at_a_press_conference.jpg/480px-Wasim_Akram_at_a_press_conference.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'shoaib malik': {
    domain: 'pepsi.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Shoaib_Malik_in_2019.jpg/480px-Shoaib_Malik_in_2019.jpg',
    color: '#004B93',
    isAvatar: true
  },
  'ushna shah': {
    domain: 'instagram.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Ushna_Shah_in_2021.jpg/480px-Ushna_Shah_in_2021.jpg',
    color: '#059669',
    isAvatar: true
  },
  'hamza ali abbasi': {
    domain: 'instagram.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Hamza_Ali_Abbasi_in_2019.jpg/480px-Hamza_Ali_Abbasi_in_2019.jpg',
    color: '#059669',
    isAvatar: true
  },
  'fatima bhutto': {
    domain: 'twitter.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Fatima_Bhutto_2019.jpg/480px-Fatima_Bhutto_2019.jpg',
    color: '#059669',
    isAvatar: true
  },
  'osman khalid butt': {
    domain: 'twitter.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Osman_Khalid_Butt_in_2018.jpg/480px-Osman_Khalid_Butt_in_2018.jpg',
    color: '#059669',
    isAvatar: true
  },

  // Major Boycott Consumer Goods
  'nestle': {
    domain: 'nestle.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Nestl%C3%A9.svg/512px-Nestl%C3%A9.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/nestle.com/w/400/h/400',
    color: '#005CA9'
  },
  'unilever': {
    domain: 'unilever.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Unilever.svg/512px-Unilever.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/unilever.com/w/400/h/400',
    color: '#1F36C7'
  },
  'procter & gamble': {
    domain: 'pg.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Procter_%26_Gamble_logo.svg/512px-Procter_%26_Gamble_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/pg.com/w/400/h/400',
    color: '#003CAE'
  },
  'loreal': {
    domain: 'loreal.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/L%27Or%C3%A9al_logo.svg/512px-L%27Or%C3%A9al_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/loreal.com/w/400/h/400',
    color: '#E31B23'
  },
  'garnier': {
    domain: 'garnier.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Garnier_logo.svg/512px-Garnier_logo.svg.png',
    color: '#8DB900'
  },
  'puma': {
    domain: 'puma.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/37/Puma_AG.svg/512px-Puma_AG.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/puma.com/w/400/h/400',
    color: '#000000'
  },
  'hp': {
    domain: 'hp.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/512px-HP_logo_2012.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/hp.com/w/400/h/400',
    color: '#0096D6'
  },
  'zara': {
    domain: 'zara.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Zara_Logo.svg/512px-Zara_Logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/zara.com/w/400/h/400',
    color: '#000000'
  },
  'carrefour': {
    domain: 'carrefour.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/12/Carrefour_logo_no_text.svg/512px-Carrefour_logo_no_text.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/carrefour.com/w/400/h/400',
    color: '#004E98'
  },
  'disney': {
    domain: 'disney.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Disney%2B_logo.svg/512px-Disney%2B_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/disney.com/w/400/h/400',
    color: '#113CCF'
  },
  'oreo': {
    domain: 'oreo.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Oreo_Wordmark.svg/512px-Oreo_Wordmark.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/oreo.com/w/400/h/400',
    color: '#0033A0'
  },
  'lays': {
    domain: 'lays.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Lay%27s_logo.svg/512px-Lay%27s_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/lays.com/w/400/h/400',
    color: '#FFDE00'
  },
  'doritos': {
    domain: 'doritos.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6c/Doritos_2013.svg/512px-Doritos_2013.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/doritos.com/w/400/h/400',
    color: '#D81E05'
  },
  'kitkat': {
    domain: 'kitkat.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/KitKat_logo.svg/512px-KitKat_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/kitkat.com/w/400/h/400',
    color: '#D71920'
  },
  'dove': {
    domain: 'dove.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/Dove_logo.svg/512px-Dove_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/dove.com/w/400/h/400',
    color: '#003478'
  },
  'sunsilk': {
    domain: 'sunsilk.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Sunsilk_Logo.svg/512px-Sunsilk_Logo.svg.png',
    color: '#E01A4F'
  },
  'lux': {
    domain: 'unilever.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Unilever.svg/512px-Unilever.svg.png',
    color: '#C5A059'
  },
  'surf excel': {
    domain: 'surfexcel.in',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Unilever.svg/512px-Unilever.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/unilever.com/w/400/h/400',
    color: '#F37021'
  },
  'ariel': {
    domain: 'ariel.co.uk',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Procter_%26_Gamble_logo.svg/512px-Procter_%26_Gamble_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/pg.com/w/400/h/400',
    color: '#009247'
  },
  'lipton': {
    domain: 'lipton.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Lipton_logo.svg/512px-Lipton_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/lipton.com/w/400/h/400',
    color: '#FFCC00'
  },
  'head & shoulders': {
    domain: 'headandshoulders.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Procter_%26_Gamble_logo.svg/512px-Procter_%26_Gamble_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/headandshoulders.com/w/400/h/400',
    color: '#0072CE'
  },
  'colgate': {
    domain: 'colgate.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Colgate_logo.svg/512px-Colgate_logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/colgate.com/w/400/h/400',
    color: '#E4002B'
  },
  'sensodyne': {
    domain: 'sensodyne.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Sensodyne_logo.svg/512px-Sensodyne_logo.svg.png',
    color: '#005CA9'
  },
  'pampers': {
    domain: 'pampers.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Pampers_Logo.svg/512px-Pampers_Logo.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/pampers.com/w/400/h/400',
    color: '#00A3A6'
  },
  'cerelac': {
    domain: 'nestle.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Nestl%C3%A9.svg/512px-Nestl%C3%A9.svg.png',
    color: '#005CA9'
  },
  'nido': {
    domain: 'nestle.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d8/Nestl%C3%A9.svg/512px-Nestl%C3%A9.svg.png',
    color: '#FFCC00'
  },
  'intel': {
    domain: 'intel.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Intel_logo_%282020%29.svg/512px-Intel_logo_%282020%29.svg.png',
    brandfetchCdn: 'https://cdn.brandfetch.io/intel.com/w/400/h/400',
    color: '#0068B5'
  },
  'siemens': {
    domain: 'siemens.com',
    directImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Siemens_AG_logo.svg/512px-Siemens_AG_logo.svg.png',
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
  'j.': {
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
  const clean = name.toLowerCase().trim();
  if (BRAND_ASSETS[clean]) return BRAND_ASSETS[clean];

  for (const [key, asset] of Object.entries(BRAND_ASSETS)) {
    if (clean.includes(key) || key.includes(clean)) {
      return asset;
    }
  }

  return undefined;
};
