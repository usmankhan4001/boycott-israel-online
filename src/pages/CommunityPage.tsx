import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  Plus, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  Search, 
  X, 
  Pin, 
  MapPin, 
  Tag, 
  Layers, 
  Flame, 
  BookOpen, 
  CheckCircle2, 
  HelpCircle, 
  Newspaper,
  ArrowRight
} from 'lucide-react';
import { useCommunityStore } from '../stores/communityStore';
import { useUIStore } from '../stores/uiStore';
import { useTranslation } from '../i18n/useTranslation';
import { Avatar } from '../components/ui/avatar';
import { StoryComposerModal } from '../components/community/StoryComposerModal';
import { CommunityCategory, CommunityPost } from '../types';

const CATEGORY_TABS: { id: string; labelEn: string; labelUr: string; icon: React.ReactNode }[] = [
  { id: 'All', labelEn: 'All Posts', labelUr: 'تمام پوسٹس', icon: <Layers className="w-3.5 h-3.5" /> },
  { id: 'Story', labelEn: 'Stories', labelUr: 'کہانیاں و تجربات', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: 'Campaign', labelEn: 'Campaigns', labelUr: 'مہمات و فتوحات', icon: <Flame className="w-3.5 h-3.5" /> },
  { id: 'AlternativeReview', labelEn: 'Reviews', labelUr: 'متبادل ریویوز', icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
  { id: 'News', labelEn: 'News', labelUr: 'معاشی خبریں', icon: <Newspaper className="w-3.5 h-3.5" /> },
  { id: 'Question', labelEn: 'Q&A', labelUr: 'رہنمائی و سوالات', icon: <HelpCircle className="w-3.5 h-3.5" /> }
];

export const CommunityPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { posts, upvotePost, hasUpvoted, searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, selectedTag, setSelectedTag, sortBy, setSortBy } = useCommunityStore();
  const { showToast } = useUIStore();
  const { t, isUrdu } = useTranslation();

  const [isComposerOpen, setIsComposerOpen] = useState(() => searchParams.get('compose') === 'true');

  const getCategoryBadgeClass = (category: CommunityCategory) => {
    switch (category) {
      case 'Story':
        return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/20';
      case 'Campaign':
        return 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/20';
      case 'AlternativeReview':
        return 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border-blue-500/20';
      case 'News':
        return 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/20';
      case 'Question':
        return 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border-purple-500/20';
      default:
        return 'bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300';
    }
  };

  const getCategoryLabel = (category: CommunityCategory) => {
    switch (category) {
      case 'Story':
        return isUrdu ? 'ذاتی کہانی' : 'Story';
      case 'Campaign':
        return isUrdu ? 'مہم و فتح' : 'Campaign';
      case 'AlternativeReview':
        return isUrdu ? 'پاکستانی متبادل' : 'Review';
      case 'News':
        return isUrdu ? 'معاشی خبر' : 'News';
      case 'Question':
        return isUrdu ? 'رہنمائی / سوال' : 'Q&A';
      default:
        return category;
    }
  };

  const handleShare = async (e: React.MouseEvent, post: CommunityPost) => {
    e.preventDefault();
    e.stopPropagation();

    const postUrl = `${window.location.origin}/community/${post.id}`;
    const shareData = {
      title: `${post.title} | Boycott Israel Online`,
      text: `${post.title} - Read on Boycott Israel Online:`,
      url: postUrl
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {}
    }

    try {
      await navigator.clipboard.writeText(postUrl);
      showToast(isUrdu ? 'پوسٹ کا لنک کاپی ہو گیا!' : 'Story link copied to clipboard!', 3000);
    } catch {
      showToast(isUrdu ? 'لنک کاپی نہیں ہو سکا' : 'Could not copy link', 3000);
    }
  };

  const handleUpvote = (e: React.MouseEvent, postId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const success = upvotePost(postId);
    if (!success) {
      showToast(isUrdu ? 'آپ پہلے ہی تائید کر چکے ہیں' : 'You already upvoted this story', 2000);
    } else {
      showToast(isUrdu ? 'تائید شامل ہو گئی! ❤️' : 'Upvoted! ❤️', 2000);
    }
  };

  // Filtered and Sorted Posts
  const displayedPosts = useMemo(() => {
    let list = [...posts];

    // Category Filter
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Tag Filter
    if (selectedTag) {
      list = list.filter((p) => p.tags?.includes(selectedTag));
    }

    // Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.authorName.toLowerCase().includes(q) ||
          p.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    list.sort((a, b) => {
      // Pinned posts always stay on top
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;

      if (sortBy === 'popular') {
        return (b.upvotes || 0) - (a.upvotes || 0);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return list;
  }, [posts, selectedCategory, selectedTag, searchQuery, sortBy]);

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* 🇵🇸 Hero Community Header */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white shadow-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-100 text-xs font-black">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isUrdu ? 'عوامی بائیکاٹ تحریک' : 'Grassroots Solidarity Hub'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {isUrdu ? 'کمیونٹی فورم اور عوامی کہانیاں' : 'Community Voices & Boycott Stories'}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed font-medium">
              {isUrdu 
                ? 'پاکستانی عوام کے سچے تجربات، گھروں میں متبادل اشیاء کا کامیاب استعمال، اور بائیکاٹ مہمات کی فتوحات۔'
                : 'Read real stories of Pakistani households switching to ethical local goods, product reviews, and BDS campaign milestones.'}
            </p>
          </div>

          <button
            onClick={() => setIsComposerOpen(true)}
            className="self-start md:self-auto px-5 py-3 rounded-2xl bg-white text-emerald-900 hover:bg-emerald-50 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-black/10 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 text-emerald-700" />
            <span>{isUrdu ? '+ کہانی شیئر کریں' : '+ Share Your Story'}</span>
          </button>
        </div>
      </div>

      {/* 🔍 Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isUrdu ? 'کہانیاں، تجربات یا ٹیگز تلاش کریں...' : 'Search stories, reviews, or tags...'}
            dir="auto"
            className="w-full pl-10 pr-10 py-2.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-1 rounded-full text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 absolute right-3 top-1/2 -translate-y-1/2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60 shrink-0 self-end sm:self-auto">
          <button
            onClick={() => setSortBy('latest')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              sortBy === 'latest'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-black'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'تازہ ترین' : 'Latest'}</span>
          </button>
          <button
            onClick={() => setSortBy('popular')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              sortBy === 'popular'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-black'
                : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{isUrdu ? 'مقبول' : 'Popular'}</span>
          </button>
        </div>
      </div>

      {/* 🏷️ Category Filter Pills */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center gap-2 shadow-2xs active:scale-95 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                }`}
              >
                {tab.icon}
                <span>{isUrdu ? tab.labelUr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Tag Clear Badge */}
        {selectedTag && (
          <div className="flex items-center gap-2 pt-1">
            <span className="text-xs text-zinc-500 font-bold">{isUrdu ? 'ٹیگ فلٹر:' : 'Active Tag:'}</span>
            <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-xs font-black flex items-center gap-1.5 border border-emerald-500/30">
              #{selectedTag}
              <button onClick={() => setSelectedTag('')} className="hover:text-rose-600">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          </div>
        )}
      </div>

      {/* 📖 Stories Feed */}
      <div className="space-y-4">
        {displayedPosts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-3">
            <MessageSquare className="w-10 h-10 text-zinc-300 dark:text-zinc-600 mx-auto" />
            <h3 className="font-black text-base text-zinc-700 dark:text-zinc-300">
              {isUrdu ? 'اس کیٹیگری میں کوئی پوسٹ نہیں ملی' : 'No community stories found'}
            </h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              {isUrdu ? 'سب سے پہلے اپنی کہانی شائع کریں اور دوسروں کی رہنمائی کریں۔' : 'Be the first to share your boycott switch experience and inspire others.'}
            </p>
            <button
              onClick={() => setIsComposerOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-2xl text-xs font-black shadow-xs hover:bg-emerald-500 active:scale-95 transition-all mt-2"
            >
              <Plus className="w-4 h-4" />
              <span>{isUrdu ? 'پہلی کہانی لکھیں' : 'Write First Story'}</span>
            </button>
          </div>
        ) : (
          displayedPosts.map((post) => {
            const upvoted = hasUpvoted(post.id);
            return (
              <article
                key={post.id}
                className={`group p-5 rounded-3xl border transition-all bg-white dark:bg-zinc-900/90 shadow-2xs hover:shadow-md ${
                  post.pinned 
                    ? 'border-emerald-500/40 dark:border-emerald-500/30 ring-1 ring-emerald-500/10' 
                    : 'border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                {/* Pinned Pill */}
                {post.pinned && (
                  <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 text-xs font-black mb-3">
                    <Pin className="w-3.5 h-3.5 fill-emerald-600 dark:fill-emerald-400" />
                    <span>{isUrdu ? 'پن کی گئی اہم پوسٹ' : 'Pinned Feature'}</span>
                  </div>
                )}

                {/* Author Info & Category Badge */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={post.authorName} size="md" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white truncate">
                          {post.authorName}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                        {post.authorLocation && (
                          <span className="flex items-center gap-1 truncate">
                            <MapPin className="w-3 h-3 shrink-0" />
                            {post.authorLocation}
                          </span>
                        )}
                        <span>•</span>
                        <span>{formatDate(post.createdAt)}</span>
                        {post.readTime && (
                          <>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider border shrink-0 ${getCategoryBadgeClass(post.category)}`}>
                    {getCategoryLabel(post.category)}
                  </span>
                </div>

                {/* Story Title & Content */}
                <Link to={`/community/${post.id}`} className="block group/link space-y-2">
                  <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white group-hover/link:text-emerald-600 dark:group-hover/link:text-emerald-400 transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 line-clamp-3 leading-relaxed">
                    {post.content}
                  </p>
                </Link>

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSelectedTag(tag)}
                        className="text-[11px] font-bold text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 bg-zinc-100 dark:bg-zinc-800/80 hover:bg-emerald-50 px-2 py-0.5 rounded-lg transition-colors"
                      >
                        #{tag}
                      </button>
                    ))}
                  </div>
                )}

                {/* Action Bar */}
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/60 text-xs font-bold text-zinc-500">
                  <div className="flex items-center gap-3">
                    {/* Upvote Button */}
                    <button
                      onClick={(e) => handleUpvote(e, post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all active:scale-90 ${
                        upvoted
                          ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-600 dark:text-rose-400 font-black ring-1 ring-rose-500/20'
                          : 'hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                      }`}
                      title="Upvote"
                    >
                      <Heart className={`w-4 h-4 ${upvoted ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span>{post.upvotes || 0}</span>
                    </button>

                    {/* Comments Button */}
                    <Link
                      to={`/community/${post.id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.commentsCount || 0}</span>
                      <span className="hidden sm:inline text-[11px]">{isUrdu ? 'تبصرے' : 'comments'}</span>
                    </Link>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => handleShare(e, post)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
                      title="Share"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">{isUrdu ? 'شیئر' : 'Share'}</span>
                    </button>

                    <Link
                      to={`/community/${post.id}`}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 font-bold hover:bg-emerald-100 transition-colors text-xs"
                    >
                      <span>{isUrdu ? 'مکمل پڑھیں' : 'Read'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {/* Floating Action Button for Mobile */}
      <button
        onClick={() => setIsComposerOpen(true)}
        className="md:hidden fixed bottom-20 right-4 z-40 p-4 rounded-full bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 ring-4 ring-white dark:ring-zinc-900 active:scale-90 transition-transform"
        aria-label="Share Story"
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Story Composer Modal */}
      <StoryComposerModal
        isOpen={isComposerOpen}
        onClose={() => setIsComposerOpen(false)}
      />
    </div>
  );
};
