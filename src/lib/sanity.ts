import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { ProductItem } from '../types';

// Environment or LocalStorage configuration
const getSanityConfig = () => {
  const metaEnv = (import.meta as any).env || {};
  const projectId = localStorage.getItem('SANITY_PROJECT_ID') || metaEnv.VITE_SANITY_PROJECT_ID || '';
  const dataset = localStorage.getItem('SANITY_DATASET') || metaEnv.VITE_SANITY_DATASET || 'production';
  const apiVersion = metaEnv.VITE_SANITY_API_VERSION || '2024-01-01';
  const token = localStorage.getItem('SANITY_API_TOKEN') || metaEnv.VITE_SANITY_API_TOKEN || '';

  return { projectId, dataset, apiVersion, token };
};

export const getSanityClient = (withToken = false) => {
  const { projectId, dataset, apiVersion, token } = getSanityConfig();
  if (!projectId) return null;

  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: !withToken, // CDN for fast reads, direct for writes
    token: withToken ? token : undefined,
    perspective: 'published'
  });
};

// Image URL Builder
export const getImageUrl = (source: any) => {
  const client = getSanityClient();
  if (!client || !source) return null;
  try {
    const builder = imageUrlBuilder(client);
    return builder.image(source).auto('format').fit('max').url();
  } catch (err) {
    return null;
  }
};

// Check if Sanity is configured
export const isSanityConfigured = (): boolean => {
  const { projectId } = getSanityConfig();
  return Boolean(projectId && projectId.trim().length > 0);
};

// Fetch live products from Sanity
export const fetchSanityProducts = async (): Promise<ProductItem[] | null> => {
  const client = getSanityClient();
  if (!client) return null;

  const query = `*[_type == "product" || _type == "brand"] | order(name asc) {
    _id,
    name,
    category,
    subcategory,
    parentCompany,
    boycottReason,
    severity,
    domain,
    categoryType,
    israelBarcode,
    endorsedBrands,
    behaviorNotes,
    behaviorTimeline[] {
      date,
      action
    },
    image,
    logoUrl,
    alternatives[] {
      name,
      country,
      domain,
      logoUrl,
      verified
    },
    tags
  }`;

  try {
    const data = await client.fetch(query);
    if (!Array.isArray(data) || data.length === 0) return null;

    return data.map((item: any): ProductItem => ({
      id: item._id,
      name: item.name,
      category: item.category || 'General',
      subcategory: item.subcategory || '',
      parentCompany: item.parentCompany || 'Israeli Affiliated Parent',
      boycottReason: item.boycottReason || 'Targeted in global boycott campaigns.',
      severity: (item.severity === 'Caution' ? 'Caution' : item.severity === 'Medium' ? 'Caution' : item.severity === 'Critical' ? 'Critical' : 'High'),
      domain: item.domain,
      categoryType: item.categoryType,
      israelBarcode: item.israelBarcode ? (typeof item.israelBarcode === 'string' ? item.israelBarcode : '729') : null,
      endorsedBrands: item.endorsedBrands || [],
      behaviorNotes: item.behaviorNotes,
      behaviorTimeline: item.behaviorTimeline || [],
      logo: item.image ? getImageUrl(item.image) || item.logoUrl : item.logoUrl,
      alternatives: (item.alternatives || []).map((alt: any) => ({
        name: alt.name,
        country: alt.country || 'Pakistan',
        domain: alt.domain,
        logo: alt.logoUrl,
        verified: alt.verified ?? true
      })),
      tags: item.tags || []
    }));
  } catch (error) {
    console.warn('Failed to fetch products from Sanity, falling back to local database:', error);
    return null;
  }
};

// Push / Sync a product to Sanity
export const syncProductToSanity = async (product: ProductItem): Promise<boolean> => {
  const client = getSanityClient(true);
  if (!client) {
    throw new Error('Sanity API Token is required to write changes. Please add it in Admin Control Panel.');
  }

  const doc = {
    _type: 'product',
    _id: product.id.startsWith('drafts.') ? product.id : `product-${product.id.replace(/[^a-zA-Z0-9_-]/g, '-')}`,
    name: product.name,
    category: product.category,
    subcategory: product.subcategory || '',
    parentCompany: product.parentCompany,
    boycottReason: product.boycottReason,
    severity: product.severity || 'High',
    domain: product.domain || '',
    categoryType: product.categoryType || 'brand',
    israelBarcode: Boolean(product.israelBarcode),
    endorsedBrands: product.endorsedBrands || [],
    behaviorNotes: product.behaviorNotes || '',
    behaviorTimeline: product.behaviorTimeline || [],
    logoUrl: product.logo || '',
    alternatives: product.alternatives.map(alt => ({
      name: alt.name,
      country: alt.country,
      domain: alt.domain || '',
      logoUrl: alt.logo || '',
      verified: alt.verified ?? true
    })),
    tags: product.tags || []
  };

  await client.createOrReplace(doc);
  return true;
};

// Batch Sync entire catalog to Sanity
export const batchSyncAllToSanity = async (
  products: ProductItem[],
  onProgress?: (current: number, total: number) => void
): Promise<{ success: number; failed: number }> => {
  const client = getSanityClient(true);
  if (!client) {
    throw new Error('Sanity Write Token is required for batch sync.');
  }

  let success = 0;
  let failed = 0;

  for (let i = 0; i < products.length; i++) {
    try {
      await syncProductToSanity(products[i]);
      success++;
    } catch (err) {
      console.error(`Failed to sync ${products[i].name} to Sanity:`, err);
      failed++;
    }
    if (onProgress) {
      onProgress(i + 1, products.length);
    }
  }

  return { success, failed };
};
