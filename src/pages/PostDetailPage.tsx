import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  Share2, 
  MessageSquare, 
  Send, 
  MapPin, 
  Clock, 
  Sparkles, 
  BookOpen, 
  Flame, 
  CheckCircle2, 
  HelpCircle, 
  Newspaper,
  Check,
  Tag
} from 'lucide-react';
import { useCommunityStore } from '../stores/communityStore';
import { useUIStore } from '../stores/uiStore';
import { useTranslation } from '../i18n/useTranslation';
import { Avatar } from '../components/ui/avatar';
import { CommunityCategory, PostComment } from '../types';

export const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPostById, upvotePost, hasUpvoted, comments, fetchComments, addComment, posts } = useCommunityStore();
  const { showToast } = useUIStore();
  const { t, isUrdu } = useTranslation();

  const post = id ? getPostById(id) : undefined;
  const postComments = id ? (comments[id] || []) : [];

  const [commentName, setCommentName] = useState('');
  const [commentLocation, setCommentLocation] = useState('');
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (id) {
      fetchComments(id);
    }
  }, [id, fetchComments]);

  if (!post) {
    return (
      <div className="p-12 text-center rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-4">
        <MessageSquare className="w-10 h-10 text-zinc-300 dark:text-zinc-600 mx-auto" />
        <h2 className="text-lg font-black text-zinc-900 dark:text-white">
          {isUrdu ? 'کہانی نہیں مل سکی' : 'Story Not Found'}
        </h2>
        <p className="text-xs text-zinc-400">
          {isUrdu ? 'یہ پوسٹ حذف کر دی گئی ہے یا لنک غلط ہے۔' : 'This community post may have been removed or the link is invalid.'}
        </p>
        <Link
          to="/community"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-2xl text-xs font-black shadow-xs hover:bg-emerald-500 transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isUrdu ? 'فورم پر واپس جائیں' : 'Back to Community Forum'}</span>
        </Link>
      </div>
    );
  }

  const upvoted = hasUpvoted(post.id);

  const handleUpvote = () => {
    const success = upvotePost(post.id);
    if (!success) {
      showToast(isUrdu ? 'آپ پہلے ہی تائید کر چکے ہیں' : 'You already upvoted this story', 2000);
    } else {
      showToast(isUrdu ? 'تائید شامل ہو گئی! ❤️' : 'Upvoted! ❤️', 2000);
    }
  };

  const handleShare = async () => {
    const postUrl = window.location.href;
    const shareData = {
      title: `${post.title} | Boycott Israel Online`,
      text: `${post.title} - Read community boycott insights:`,
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
      setHasCopied(true);
      showToast(isUrdu ? 'پوسٹ کا لنک کاپی ہو گیا!' : 'Story link copied to clipboard!', 3000);
      setTimeout(() => setHasCopied(false), 2500);
    } catch {
      showToast(isUrdu ? 'لنک کاپی نہیں ہو سکا' : 'Could not copy link', 3000);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim() || !commentName.trim()) {
      showToast(isUrdu ? 'براہ کرم اپنا نام اور تبصرہ درج کریں' : 'Please provide your name and comment', 3000);
      return;
    }

    setIsSubmitting(true);
    try {
      await addComment(post.id, {
        authorName: commentName.trim(),
        authorLocation: commentLocation.trim() || undefined,
        content: commentText.trim()
      });

      showToast(isUrdu ? 'آپ کا تبصرہ شامل ہو گیا!' : 'Comment posted successfully!', 3000);
      setCommentText('');
    } catch {
      showToast(isUrdu ? 'تبصرہ شامل کرنے میں خرابی پیش آئی' : 'Failed to post comment', 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        return isUrdu ? 'ذاتی کہانی' : 'Personal Story';
      case 'Campaign':
        return isUrdu ? 'مہم و فتح' : 'Campaign & Victory';
      case 'AlternativeReview':
        return isUrdu ? 'پاکستانی متبادل' : 'Alternative Review';
      case 'News':
        return isUrdu ? 'معاشی خبر' : 'Economic News';
      case 'Question':
        return isUrdu ? 'رہنمائی و سوال' : 'Q&A / Advice';
      default:
        return category;
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return '';
    }
  };

  const formatCommentTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMins = Math.floor((now.getTime() - date.getTime()) / 60000);
      if (diffMins < 1) return isUrdu ? 'ابھی' : 'Just now';
      if (diffMins < 60) return isUrdu ? `${diffMins} منٹ پہلے` : `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return isUrdu ? `${diffHours} گھنٹے پہلے` : `${diffHours}h ago`;
      return date.toLocaleDateString();
    } catch {
      return '';
    }
  };

  // Other related stories
  const relatedPosts = posts.filter(p => p.id !== post.id && (p.category === post.category || p.tags?.some(t => post.tags?.includes(t)))).slice(0, 3);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/community"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-2xs active:scale-95"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{isUrdu ? 'تمام کہانیاں' : 'Back to Forum'}</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-2xs active:scale-95"
          >
            {hasCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{hasCopied ? (isUrdu ? 'کاپی ہو گیا' : 'Copied') : (isUrdu ? 'شیئر' : 'Share')}</span>
          </button>
        </div>
      </div>

      {/* Main Story Article Container */}
      <article className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-6">
        {/* Category & Metadata Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider border ${getCategoryBadgeClass(post.category)}`}>
            {getCategoryLabel(post.category)}
          </span>

          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400">
            <span>{formatDate(post.createdAt)}</span>
            {post.readTime && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Story Title */}
        <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-zinc-900 dark:text-white leading-tight tracking-tight" dir="auto">
          {post.title}
        </h1>

        {/* Author Bio Bar */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-zinc-800">
          <Avatar name={post.authorName} size="md" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-xs sm:text-sm text-zinc-900 dark:text-white truncate">
                {post.authorName}
              </span>
              <span className="text-[10px] font-black uppercase text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                {isUrdu ? 'کمیونٹی ممبر' : 'Community Author'}
              </span>
            </div>
            {post.authorLocation && (
              <p className="text-[11px] text-zinc-400 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                <span>{post.authorLocation}</span>
              </p>
            )}
          </div>
        </div>

        {/* Formatted Article Body */}
        <div className="text-sm sm:text-base text-zinc-800 dark:text-zinc-200 leading-relaxed space-y-4 whitespace-pre-line font-normal selection:bg-emerald-100 dark:selection:bg-emerald-950" dir="auto">
          {post.content}
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <span className="text-xs font-black uppercase tracking-wider text-zinc-400 block mb-2">
              {isUrdu ? 'موضوعاتی ٹیگز' : 'Tags & Categories'}
            </span>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-xs font-bold text-zinc-700 dark:text-zinc-300"
                >
                  <Tag className="w-3 h-3 text-zinc-400" />
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Post Footer Action Toolbar */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all active:scale-90 ${
              upvoted
                ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-zinc-700 dark:text-zinc-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${upvoted ? 'fill-white' : ''}`} />
            <span>{post.upvotes || 0}</span>
            <span className="hidden sm:inline">{isUrdu ? 'تائید' : 'Upvotes'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-700 dark:text-zinc-200 text-xs sm:text-sm font-bold transition-all active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>{isUrdu ? 'شیئر کریں' : 'Share Story'}</span>
          </button>
        </div>
      </article>

      {/* 💬 Discussion & Comments Section */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white">
              {isUrdu ? 'عوامی تبصرے و مباحثہ' : 'Discussion & Community Comments'}
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 text-xs font-black">
            {postComments.length}
          </span>
        </div>

        {/* Add Comment Form */}
        <form onSubmit={handleCommentSubmit} className="space-y-3 bg-zinc-50 dark:bg-zinc-800/40 p-4 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/60">
          <span className="text-xs font-black text-zinc-700 dark:text-zinc-300 block">
            {isUrdu ? 'اپنا تبصرہ یا متبادل تجویز شامل کریں' : 'Add Your Thoughts or Alternative Tip'}
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              value={commentName}
              onChange={(e) => setCommentName(e.target.value)}
              placeholder={isUrdu ? 'آپ کا نام *' : 'Your name *'}
              dir="auto"
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <input
              type="text"
              value={commentLocation}
              onChange={(e) => setCommentLocation(e.target.value)}
              placeholder={isUrdu ? 'شہر (اختیاری)' : 'City / Region (optional)'}
              dir="auto"
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <textarea
            rows={3}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder={isUrdu ? 'اپنا تبصرہ یا مشورہ یہاں لکھیں...' : 'Write your comment, support or alternative recommendation...'}
            dir="auto"
            className="w-full px-3 py-2 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm font-medium text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-y"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black flex items-center gap-1.5 shadow-xs active:scale-95 transition-all disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? (isUrdu ? 'بھیج رہا ہے...' : 'Posting...') : (isUrdu ? 'تبصرہ بھیجیں' : 'Post Comment')}</span>
            </button>
          </div>
        </form>

        {/* Comment Items List */}
        <div className="space-y-3 pt-2">
          {postComments.length === 0 ? (
            <div className="p-6 text-center text-zinc-400 text-xs font-semibold">
              {isUrdu ? 'ابھی تک کوئی تبصرہ نہیں ہوا۔ پہلا تبصرہ آپ کریں۔' : 'No comments yet. Be the first to start the conversation!'}
            </div>
          ) : (
            postComments.map((c) => (
              <div
                key={c.id}
                className="p-4 rounded-2xl bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-150 dark:border-zinc-800 space-y-2"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <Avatar name={c.authorName} size="sm" />
                    <div>
                      <span className="font-bold text-xs text-zinc-900 dark:text-white block">
                        {c.authorName}
                      </span>
                      {c.authorLocation && (
                        <span className="text-[10px] text-zinc-400 flex items-center gap-1">
                          <MapPin className="w-2.5 h-2.5" />
                          {c.authorLocation}
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] text-zinc-400">
                    {formatCommentTime(c.createdAt)}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed pl-10" dir="auto">
                  {c.content}
                </p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 📚 Related Stories Section */}
      {relatedPosts.length > 0 && (
        <section className="space-y-3 pt-2">
          <h3 className="text-base font-black text-zinc-900 dark:text-white">
            {isUrdu ? 'دیگر متعلقہ کہانیاں' : 'Related Stories & Reviews'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {relatedPosts.map((rp) => (
              <Link
                key={rp.id}
                to={`/community/${rp.id}`}
                className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500 transition-all space-y-2 shadow-2xs group"
              >
                <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider border ${getCategoryBadgeClass(rp.category)}`}>
                  {getCategoryLabel(rp.category)}
                </span>
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 line-clamp-2 leading-snug">
                  {rp.title}
                </h4>
                <p className="text-[10px] text-zinc-400">
                  {rp.authorName} • {rp.upvotes || 0} {isUrdu ? 'تائید' : 'upvotes'}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
