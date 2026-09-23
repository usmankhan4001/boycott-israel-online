import { create } from 'zustand';
import { CommunityPost, PostComment, CommunityCategory } from '../types';
import { INITIAL_COMMUNITY_POSTS, INITIAL_POST_COMMENTS } from '../data/communityPosts';
import { api } from '../lib/api';

const STORAGE_KEYS = {
  POSTS: 'bio_community_posts',
  COMMENTS: 'bio_post_comments',
  UPVOTED: 'bio_upvoted_post_ids'
};

const getStoredPosts = (): CommunityPost[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return INITIAL_COMMUNITY_POSTS;
};

const saveStoredPosts = (posts: CommunityPost[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  } catch {}
};

const getStoredComments = (): Record<string, PostComment[]> => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (typeof parsed === 'object' && parsed !== null) return parsed;
    }
  } catch {}
  
  // Group INITIAL_POST_COMMENTS by postId
  const map: Record<string, PostComment[]> = {};
  for (const c of INITIAL_POST_COMMENTS) {
    if (!map[c.postId]) map[c.postId] = [];
    map[c.postId].push(c);
  }
  return map;
};

const saveStoredComments = (comments: Record<string, PostComment[]>) => {
  try {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
  } catch {}
};

const getStoredUpvotes = (): string[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.UPVOTED);
    if (saved) return JSON.parse(saved);
  } catch {}
  return [];
};

const saveStoredUpvotes = (ids: string[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.UPVOTED, JSON.stringify(ids));
  } catch {}
};

interface CommunityState {
  posts: CommunityPost[];
  comments: Record<string, PostComment[]>;
  upvotedPostIds: string[];
  isLoading: boolean;
  searchQuery: string;
  selectedCategory: string;
  selectedTag: string;
  sortBy: 'latest' | 'popular';

  // Setters & Filters
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedTag: (tag: string) => void;
  setSortBy: (sort: 'latest' | 'popular') => void;

  // Actions
  refreshPosts: () => Promise<void>;
  getPostById: (id: string) => CommunityPost | undefined;
  createPost: (postData: {
    title: string;
    content: string;
    authorName: string;
    authorLocation?: string;
    category: CommunityCategory;
    tags: string[];
  }) => Promise<CommunityPost | null>;
  upvotePost: (id: string) => Promise<boolean>;
  hasUpvoted: (id: string) => boolean;
  fetchComments: (postId: string) => Promise<PostComment[]>;
  addComment: (postId: string, commentData: {
    authorName: string;
    authorLocation?: string;
    content: string;
  }) => Promise<PostComment | null>;
  deletePost: (id: string) => Promise<boolean>;
}

export const useCommunityStore = create<CommunityState>((set, get) => ({
  posts: getStoredPosts(),
  comments: getStoredComments(),
  upvotedPostIds: getStoredUpvotes(),
  isLoading: false,
  searchQuery: '',
  selectedCategory: 'All',
  selectedTag: '',
  sortBy: 'latest',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedTag: (tag) => set({ selectedTag: tag }),
  setSortBy: (sort) => set({ sortBy: sort }),

  refreshPosts: async () => {
    try {
      set({ isLoading: true });
      const res = await api.community.posts.list({
        category: get().selectedCategory !== 'All' ? get().selectedCategory : undefined,
        tag: get().selectedTag || undefined,
        q: get().searchQuery || undefined,
        sort: get().sortBy
      });

      if (res?.posts && res.posts.length > 0) {
        set({ posts: res.posts, isLoading: false });
        saveStoredPosts(res.posts);
      } else {
        // Fallback to local
        set({ posts: getStoredPosts(), isLoading: false });
      }
    } catch {
      set({ posts: getStoredPosts(), isLoading: false });
    }
  },

  getPostById: (id: string) => {
    return get().posts.find((p) => p.id === id);
  },

  createPost: async (postData) => {
    const wordCount = postData.content.split(/\s+/).length;
    const readTime = `${Math.max(1, Math.ceil(wordCount / 180))} min read`;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title: postData.title.trim(),
      content: postData.content.trim(),
      authorName: postData.authorName.trim(),
      authorLocation: postData.authorLocation?.trim() || undefined,
      category: postData.category,
      tags: postData.tags || [],
      upvotes: 0,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      status: 'published',
      pinned: false,
      readTime
    };

    // Update local state immediately for instant feedback
    const updatedPosts = [newPost, ...get().posts];
    set({ posts: updatedPosts });
    saveStoredPosts(updatedPosts);

    // Sync to Cloudflare D1 / API in the background
    try {
      const res = await api.community.posts.create(newPost);
      if (res?.post) {
        // Update with server confirmed post if ID changed
        const reconciled = updatedPosts.map((p) => (p.id === newPost.id ? res.post : p));
        set({ posts: reconciled });
        saveStoredPosts(reconciled);
        return res.post;
      }
    } catch {}

    return newPost;
  },

  upvotePost: async (id: string) => {
    const { upvotedPostIds, posts } = get();
    if (upvotedPostIds.includes(id)) {
      return false; // Already upvoted
    }

    const updatedUpvotes = [...upvotedPostIds, id];
    const updatedPosts = posts.map((p) =>
      p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p
    );

    set({ upvotedPostIds: updatedUpvotes, posts: updatedPosts });
    saveStoredUpvotes(updatedUpvotes);
    saveStoredPosts(updatedPosts);

    try {
      await api.community.posts.upvote(id);
    } catch {}

    return true;
  },

  hasUpvoted: (id: string) => {
    return get().upvotedPostIds.includes(id);
  },

  fetchComments: async (postId: string) => {
    try {
      const res = await api.community.comments.list(postId);
      if (res?.comments && res.comments.length > 0) {
        const allComments = { ...get().comments, [postId]: res.comments };
        set({ comments: allComments });
        saveStoredComments(allComments);
        return res.comments;
      }
    } catch {}

    return get().comments[postId] || [];
  },

  addComment: async (postId, commentData) => {
    const newComment: PostComment = {
      id: `c-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      postId,
      authorName: commentData.authorName.trim(),
      authorLocation: commentData.authorLocation?.trim() || undefined,
      content: commentData.content.trim(),
      createdAt: new Date().toISOString()
    };

    // Update local comments & posts count immediately
    const existing = get().comments[postId] || [];
    const updatedPostComments = [...existing, newComment];
    const allComments = { ...get().comments, [postId]: updatedPostComments };

    const updatedPosts = get().posts.map((p) =>
      p.id === postId ? { ...p, commentsCount: (p.commentsCount || 0) + 1 } : p
    );

    set({ comments: allComments, posts: updatedPosts });
    saveStoredComments(allComments);
    saveStoredPosts(updatedPosts);

    try {
      const res = await api.community.comments.create(newComment);
      if (res?.comment) {
        return res.comment;
      }
    } catch {}

    return newComment;
  },

  deletePost: async (id: string) => {
    const updatedPosts = get().posts.filter((p) => p.id !== id);
    const updatedComments = { ...get().comments };
    delete updatedComments[id];

    set({ posts: updatedPosts, comments: updatedComments });
    saveStoredPosts(updatedPosts);
    saveStoredComments(updatedComments);

    try {
      await api.community.posts.delete(id);
    } catch {}

    return true;
  }
}));
