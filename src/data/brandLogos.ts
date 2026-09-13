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
  'starbucks': {
    domain: 'starbucks.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/starbucks.com/w/400/h/400',
    color: '#006241'
  },
  'nestle': {
    domain: 'nestle.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/nestle.com/w/400/h/400',
    color: '#005CA9'
  },
  'unilever': {
    domain: 'unilever.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/unilever.com/w/400/h/400',
    color: '#1F36C7'
  },
  'procter & gamble': {
    domain: 'pg.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/pg.com/w/400/h/400',
    color: '#003CAE'
  },
  'loreal': {
    domain: 'loreal.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/loreal.com/w/400/h/400',
    color: '#E31B23'
  },
  'puma': {
    domain: 'puma.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/puma.com/w/400/h/400',
    color: '#000000'
  },
  'hp': {
    domain: 'hp.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/hp.com/w/400/h/400',
    color: '#0096D6'
  },
  'zara': {
    domain: 'zara.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/zara.com/w/400/h/400',
    color: '#000000'
  },
  'carrefour': {
    domain: 'carrefour.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/carrefour.com/w/400/h/400',
    color: '#004E98'
  },
  'disney': {
    domain: 'disney.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/disney.com/w/400/h/400',
    color: '#113CCF'
  },
  'danone': {
    domain: 'danone.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/danone.com/w/400/h/400',
    color: '#005B94'
  },
  'sabra': {
    domain: 'sabra.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/sabra.com/w/400/h/400',
    color: '#E01E26'
  },
  'sodastream': {
    domain: 'sodastream.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/sodastream.com/w/400/h/400',
    color: '#002C6C'
  },
  'ahava': {
    domain: 'ahava.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/ahava.com/w/400/h/400',
    color: '#283238'
  },
  'pampers': {
    domain: 'pampers.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/pampers.com/w/400/h/400',
    color: '#00A3A6'
  },
  'oreo': {
    domain: 'oreo.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/oreo.com/w/400/h/400',
    color: '#0033A0'
  },
  'lays': {
    domain: 'lays.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/lays.com/w/400/h/400',
    color: '#FFDE00'
  },
  'doritos': {
    domain: 'doritos.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/doritos.com/w/400/h/400',
    color: '#D81E05'
  },
  'kitkat': {
    domain: 'kitkat.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/kitkat.com/w/400/h/400',
    color: '#D71920'
  },
  'dove': {
    domain: 'dove.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/dove.com/w/400/h/400',
    color: '#003478'
  },
  'surf excel': {
    domain: 'surfexcel.in',
    brandfetchCdn: 'https://cdn.brandfetch.io/unilever.com/w/400/h/400',
    color: '#F37021'
  },
  'ariel': {
    domain: 'ariel.co.uk',
    brandfetchCdn: 'https://cdn.brandfetch.io/pg.com/w/400/h/400',
    color: '#009247'
  },
  'lipton': {
    domain: 'lipton.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/lipton.com/w/400/h/400',
    color: '#FFCC00'
  },
  'head & shoulders': {
    domain: 'headandshoulders.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/headandshoulders.com/w/400/h/400',
    color: '#0072CE'
  },
  'colgate': {
    domain: 'colgate.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/colgate.com/w/400/h/400',
    color: '#E4002B'
  },
  'pizza hut': {
    domain: 'pizzahut.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/pizzahut.com/w/400/h/400',
    color: '#EE3124'
  },
  'burger king': {
    domain: 'burgerking.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/burgerking.com/w/400/h/400',
    color: '#ED7902'
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
  'intel': {
    domain: 'intel.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/intel.com/w/400/h/400',
    color: '#0068B5'
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
  'optp': {
    domain: 'optp.biz',
    brandfetchCdn: 'https://cdn.brandfetch.io/optp.biz/w/400/h/400',
    color: '#FFCC00'
  },
  'cheezious': {
    domain: 'cheezious.com',
    brandfetchCdn: 'https://cdn.brandfetch.io/cheezious.com/w/400/h/400',
    color: '#E31B23'
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
