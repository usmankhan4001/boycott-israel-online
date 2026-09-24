export interface AlternativeItem {
  name: string;
  country: string;
  verified: boolean;
  domain?: string;
  logo?: string;
}

export interface ProductItem {
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
  behaviorNotes?: string;
  behaviorTimeline?: { date: string; action: string; source?: string }[];
  endorsedBrands?: string[];
  categoryType?: 'brand' | 'restaurant' | 'celebrity';
}

export interface GroceryItem {
  id: string;
  name: string;
  category: string;
  isBoycott: boolean;
  parentCompany?: string;
  boycottReason?: string;
  chosenAlternative?: string;
  alternativeCountry?: string;
  suggestedAlternatives?: AlternativeItem[];
  checked: boolean;
  quantity: number;
  unit: string;
  note?: string;
  logo?: string;
}

export interface UserSuggestion {
  id: string;
  type: 'boycott' | 'alternative';
  brandName: string;
  parentCompany?: string;
  category: string;
  subcategory?: string;
  alternativeName?: string;
  alternativeCountry?: string;
  reasonOrProof: string;
  createdAt: string;
}

export interface NotificationSettings {
  enabled: boolean;
  monthlyDay: number; // 1 to 28
  reminderTime: string; // "10:00"
  lastTriggered?: string;
}

export type CommunityCategory = 'Story' | 'Campaign' | 'AlternativeReview' | 'News' | 'Question';

export interface CommunityPost {
  id: string;
  title: string;
  content: string;
  authorName: string;
  authorLocation?: string;
  category: CommunityCategory;
  tags: string[];
  upvotes: number;
  commentsCount: number;
  createdAt: string;
  status: 'published' | 'pending';
  pinned?: boolean;
  readTime?: string;
}

export interface PostComment {
  id: string;
  postId: string;
  authorName: string;
  authorLocation?: string;
  content: string;
  createdAt: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'post' | 'comment' | 'system' | 'reminder';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

// ==========================================
// TAKWEYAT MASTER ARCHITECTURE DATA TYPES
// ==========================================

export type DemographicLens = 'general' | 'students' | 'mothers' | 'men' | 'elders';
export type MentalState = 'action' | 'skeptical' | 'scholar';
export type ComplexityLevel = 'beginner' | 'undergrad' | 'scholar';

export interface GeopoliticalZone {
  id: string;
  zoneName: string;
  historicalColonialActor: string;
  rootCauseSummary: string;
  currentStatus: string;
  keyExtractionResources: string[];
  flagEmoji?: string;
  coordinates?: [number, number];
  affectedPopulation?: string;
  crisisSummary?: string;
  unResolutions?: string[];
}

export interface RawResource {
  id: string;
  resourceName: string;
  primaryExtractionZoneId: string;
  humanCostMetric: string;
  exploitationRatio: string;
  isConflictMineral: boolean;
  description: string;
  primaryApplications?: string[];
  environmentalCostSummary?: string;
}

export interface ParentConglomerate {
  id: string;
  entityName: string;
  headquartersCountry: string;
  annualRevenueUsd: number;
  lobbyingSpendUsd: number;
  isDefenseContractor: boolean;
  topShareholders: string[];
  subsidiaries?: string[];
  marketCapUsd?: number;
  complicitySummary?: string;
  logo?: string;
  website?: string;
}

export interface ComplicityEdge {
  id: string;
  conglomerateId: string;
  geopoliticalZoneId?: string;
  resourceId?: string;
  complicityType: string;
  evidenceDossier: string;
  financialValueUsd?: number;
  evidenceUrls: string[];
  severity?: 'Critical' | 'High' | 'Caution';
  verifiedSource?: string;
}

export interface RetailBrand {
  id: string;
  name: string;
  slug: string;
  brandType: 'boycotted' | 'alternative';
  parentCompanyId?: string;
  countryOfOrigin: string;
  category: string;
  subcategory: string;
  boycottReason?: string;
  severityTier?: number;
  directSubstitutes?: string[];
  logo?: string;
  domain?: string;
  toxicAdditiveFlags?: string[];
  isHalalCertified?: boolean;
  isTayyibCertified?: boolean;
}

export interface AlternativeProfile {
  id: string;
  brandId: string;
  ingredientBreakdown: string;
  isHalalCertified: boolean;
  isOrganic: boolean;
  isTayyib: boolean;
  packagingType: string;
  editorialBadge: 'fully_recommended' | 'conditionally_recommended' | 'toxic_swap_warning';
  originCountry: string;
  directSubstituteFor: string[];
  toxicWarnings?: string[];
  producerName?: string;
  farmToTable?: boolean;
  cleanScore?: number;
}

export interface MarketGap {
  id: string;
  category: string;
  productName: string;
  unmetDemandCount: number;
  pledgedMonthlySpendPkr: number;
  description: string;
  votesCount: number;
  urgency: 'High' | 'Medium' | 'Critical';
  suggestedPakistaniMakers?: string[];
  targetMarketPricePkr?: number;
  pledgedUserIds?: string[];
  createdAt?: string;
}

export interface ToxicAdditive {
  id: string;
  code: string;
  name: string;
  commonProducts: string[];
  healthRisks: string[];
  tayyibVerdict: string;
  saferAlternatives?: string[];
  category?: 'Preservative' | 'Artificial Color' | 'Sweetener' | 'Emulsifier' | 'Flavor Enhancer';
}

export interface UserImpactRecord {
  id: string;
  date: string;
  boycottedBrandId: string;
  boycottedBrandName: string;
  alternativeBrandId: string;
  alternativeBrandName: string;
  amountSavedPkr: number;
  amountDivertedUsd: number;
  multiplierEffectPkr: number; // 2.5x of amountSavedPkr
  category: string;
  notes?: string;
}

export interface UserImpactSummary {
  totalBoycottTransactions: number;
  totalDivertedUsd: number;
  totalRetainedPkr: number;
  communityCirculationValuePkr: number;
  currentStreakDays: number;
  records: UserImpactRecord[];
}
