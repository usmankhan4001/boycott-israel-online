// High quality vector SVG and Brandfetch CDN mapping for major brands
export interface BrandAsset {
  domain: string;
  brandfetchCdn?: string;
  svgIcon?: string;
  color?: string;
}

export const BRAND_ASSETS: Record<string, BrandAsset> = {
  // Global Boycott Brands
  'coca-cola': {
    domain: 'coca-cola.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/coca-cola.com/w/400/h/400',
    color: '#F40009'
  },
  'pepsi': {
    domain: 'pepsi.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/pepsi.com/w/400/h/400',
    color: '#004B93'
  },
  // Fast Food & Restaurant Chains
  'mcdonalds': {
    domain: 'mcdonalds.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/mcdonalds.com/w/400/h/400',
    color: '#FFBC0D'
  },
  'kfc': {
    domain: 'kfc.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/kfc.com/w/400/h/400',
    color: '#A3080C'
  },
  'pizza hut': {
    domain: 'pizzahut.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/pizzahut.com/w/400/h/400',
    color: '#EE3124'
  },
  'subway': {
    domain: 'subway.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/subway.com/w/400/h/400',
    color: '#008938'
  },
  'dominos': {
    domain: 'dominos.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/dominos.com/w/400/h/400',
    color: '#006491'
  },
  'starbucks': {
    domain: 'starbucks.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/starbucks.com/w/400/h/400',
    color: '#006241'
  },
  'burger king': {
    domain: 'burgerking.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/burgerking.com/w/400/h/400',
    color: '#ED7902'
  },
  'hardees': {
    domain: 'hardees.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/hardees.com/w/400/h/400',
    color: '#D8232A'
  },
  'carls jr': {
    domain: 'carlsjr.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/carlsjr.com/w/400/h/400',
    color: '#D8232A'
  },
  'tim hortons': {
    domain: 'timhortons.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/timhortons.com/w/400/h/400',
    color: '#C8102E'
  },
  'papa johns': {
    domain: 'papajohns.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/papajohns.com/w/400/h/400',
    color: '#007A3E'
  },
  'dunkin': {
    domain: 'dunkindonuts.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/dunkindonuts.com/w/400/h/400',
    color: '#FF671F'
  },
  'dunkin donuts': {
    domain: 'dunkindonuts.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/dunkindonuts.com/w/400/h/400',
    color: '#FF671F'
  },
  'costa coffee': {
    domain: 'costa.co.uk',
    brandfetchCdn: 'https://cdn.brandfetch.io/costa.co.uk/w/400/h/400',
    color: '#6A1024'
  },
  'krispy kreme': {
    domain: 'krispykreme.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/krispykreme.com/w/400/h/400',
    color: '#006B3F'
  },
  'cinnabon': {
    domain: 'cinnabon.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/cinnabon.com/w/400/h/400',
    color: '#34B6E4'
  },
  'gloria jeans': {
    domain: 'gloriajeanscoffees.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/gloriajeanscoffees.com/w/400/h/400',
    color: '#5C311E'
  },
  'texas chicken': {
    domain: 'texaschicken.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/texaschicken.com/w/400/h/400',
    color: '#E31B23'
  },
  'popeyes': {
    domain: 'popeyes.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/popeyes.com/w/400/h/400',
    color: '#FA6B00'
  },
  'baskin robbins': {
    domain: 'baskinrobbins.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/baskinrobbins.com/w/400/h/400',
    color: '#E01A4F'
  },
  'chilis': {
    domain: 'chilis.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/chilis.com/w/400/h/400',
    color: '#007A3E'
  },
  'tgi fridays': {
    domain: 'tgifridays.com',
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

  // Pakistani Celebrities & Endorsers Profile Icons
  'babar azam': {
    domain: 'pcb.com.pk',
    brandfetchCdn: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    color: '#004B93'
  },
  'shaheen afridi': {
    domain: 'pcb.com.pk',
    brandfetchCdn: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    color: '#004B93'
  },
  'haris rauf': {
    domain: 'pcb.com.pk',
    brandfetchCdn: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    color: '#004B93'
  },
  'shadab khan': {
    domain: 'pcb.com.pk',
    brandfetchCdn: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    color: '#004B93'
  },
  'mahira khan': {
    domain: 'loreal.com',
    brandfetchCdn: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
    color: '#E31B23'
  },
  'fawad khan': {
    domain: 'coca-cola.com',
    brandfetchCdn: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&auto=format&fit=crop&q=80',
    color: '#F40009'
  },
  'ayeza khan': {
    domain: 'nestle.com',
    brandfetchCdn: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80',
    color: '#005CA9'
  },
  'danish taimoor': {
    domain: 'loreal.com',
    brandfetchCdn: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    color: '#E31B23'
  },
  'hania aamir': {
    domain: 'unilever.com',
    brandfetchCdn: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80',
    color: '#1F36C7'
  },
  'fahad mustafa': {
    domain: 'pepsi.com',
    brandfetchCdn: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&auto=format&fit=crop&q=80',
    color: '#004B93'
  },
  'atif aslam': {
    domain: 'coca-cola.com',
    brandfetchCdn: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80',
    color: '#F40009'
  },
  'momina mustehsan': {
    domain: 'coca-cola.com',
    brandfetchCdn: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop&q=80',
    color: '#F40009'
  },
  'wasim akram': {
    domain: 'pepsi.com',
    brandfetchCdn: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    color: '#004B93'
  },
  'shoaib malik': {
    domain: 'pepsi.com',
    brandfetchCdn: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80',
    color: '#004B93'
  },
  'siemens': {
    domain: 'siemens.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/siemens.com/w/400/h/400',
    color: '#00646E'
  },
  'chevron': {
    domain: 'chevron.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/chevron.com/w/400/h/400',
    color: '#005480'
  },
  'axa': {
    domain: 'axa.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/axa.com/w/400/h/400',
    color: '#00008F'
  },

  // Pakistani & Regional Safe Alternatives
  'pakola': {
    domain: 'pakola.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/pakola.com.pk/w/400/h/400',
    color: '#007A3D'
  },
  'gourmet': {
    domain: 'gourmetfoods.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/gourmetfoods.com.pk/w/400/h/400',
    color: '#C8102E'
  },
  'tapal': {
    domain: 'tapaltea.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/tapaltea.com/w/400/h/400',
    color: '#E31B23'
  },
  'sufi': {
    domain: 'sufigroup.biz',
    brandfetchCdn: 'https://cdn.brandfetch.io/sufigroup.biz/w/400/h/400',
    color: '#009639'
  },
  'dalda': {
    domain: 'daldafoods.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/daldafoods.com/w/400/h/400',
    color: '#E30613'
  },
  'shan': {
    domain: 'shanfoods.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/shanfoods.com/w/400/h/400',
    color: '#D8232A'
  },
  'national': {
    domain: 'nfoods.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/nfoods.com/w/400/h/400',
    color: '#E30613'
  },
  'hilal': {
    domain: 'hilalfoods.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/hilalfoods.com.pk/w/400/h/400',
    color: '#005CA9'
  },
  'mitchells': {
    domain: 'mitchells.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/mitchells.com.pk/w/400/h/400',
    color: '#007A3D'
  },
  'shezan': {
    domain: 'shezan.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/shezan.com/w/400/h/400',
    color: '#D8232A'
  },
  'olpers': {
    domain: 'engrofoods.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/engrofoods.com/w/400/h/400',
    color: '#005CA9'
  },
  'bake parlor': {
    domain: 'bakeparlor.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/bakeparlor.com/w/400/h/400',
    color: '#D8232A'
  },
  'shield': {
    domain: 'shield.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/shield.com.pk/w/400/h/400',
    color: '#005CA9'
  },
  'english': {
    domain: 'english.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/english.com.pk/w/400/h/400',
    color: '#E30613'
  },
  'canolive': {
    domain: 'canolive.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/canolive.com.pk/w/400/h/400',
    color: '#708238'
  },
  'kolson': {
    domain: 'kolson.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/kolson.pk/w/400/h/400',
    color: '#E31B23'
  },
  'vital': {
    domain: 'vitaltea.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/vitaltea.com.pk/w/400/h/400',
    color: '#007A3D'
  },
  'brite': {
    domain: 'colgate.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/colgate.com.pk/w/400/h/400',
    color: '#005CA9'
  },
  'super crisp': {
    domain: 'tripack.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/tripack.com.pk/w/400/h/400',
    color: '#E31B23'
  },
  'kurleez': {
    domain: 'kurleez.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/kurleez.pk/w/400/h/400',
    color: '#FF9900'
  },
  'k & n\'s': {
    domain: 'kandns.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/kandns.com/w/400/h/400',
    color: '#005CA9'
  },
  'kababjees': {
    domain: 'kababjees.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/kababjees.com/w/400/h/400',
    color: '#C8102E'
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
  'service': {
    domain: 'servis.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/servis.com/w/400/h/400',
    color: '#D8232A'
  },
  'ndure': {
    domain: 'ndure.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/ndure.com/w/400/h/400',
    color: '#000000'
  },
  'dawlance': {
    domain: 'dawlance.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/dawlance.com.pk/w/400/h/400',
    color: '#005CA9'
  },
  'pel': {
    domain: 'pel.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/pel.com.pk/w/400/h/400',
    color: '#E30613'
  },
  'haier': {
    domain: 'haier.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/haier.com/w/400/h/400',
    color: '#005CA9'
  },
  'qmobile': {
    domain: 'qmobile.com.pk',
    brandfetchCdn: 'https://cdn.brandfetch.io/qmobile.com.pk/w/400/h/400',
    color: '#005CA9'
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
