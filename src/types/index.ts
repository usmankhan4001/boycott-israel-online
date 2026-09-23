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
