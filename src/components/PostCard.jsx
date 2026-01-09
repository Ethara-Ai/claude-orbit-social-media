import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, MoreHorizontal } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatTimeAgo, formatNumber } from '../utils/helpers';

const PostCard = ({ post }) => {
  const { toggleLike, addComment, postComments } = useApp();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const comments = postComments[post.id] || [];

  const handleLike = () => {
    toggleLike(post.id);
  };

  const handleComment = () => {
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  const handleShare = () => {
    // Simulate share action
    console.log('Sharing post:', post.id);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 mb-4"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400';
            }}
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-base">{post.author.name}</h3>
              {post.author.verified && (
                <svg
                  className="w-4 h-4 text-primary"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{post.author.jobTitle}</span>
              <span>•</span>
              <span>{formatTimeAgo(post.timestamp)}</span>
            </div>
          </div>
        </div>

        <button
          className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors focus-ring"
          aria-label="More options"
        >
          <MoreHorizontal size={18} className="text-gray-500" />
        </button>
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-base leading-relaxed whitespace-pre-wrap">{post.content}</p>
      </div>

      {/* Images */}
      {post.images && post.images.length > 0 && (
        <div
          className={`mb-4 grid gap-2 rounded-2xl overflow-hidden ${
            post.images.length === 1
              ? 'grid-cols-1'
              : post.images.length === 2
              ? 'grid-cols-2'
              : post.images.length === 3
              ? 'grid-cols-2'
              : 'grid-cols-2'
          }`}
        >
          {post.images.map((image, index) => (
            <div
              key={index}
              className={`
                relative bg-gray-100 dark:bg-zinc-800 overflow-hidden
                ${post.images.length === 3 && index === 0 ? 'col-span-2' : ''}
                ${post.images.length === 1 ? 'aspect-[16/10]' : 'aspect-square'}
              `}
            >
              <img
                src={image}
                alt={`Post image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/800x600';
                }}
              />
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-1 mb-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLike}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl transition-all touch-target focus-ring
            ${post.isLiked
              ? 'text-red-500 bg-red-50 dark:bg-red-950/30'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
            }
          `}
          aria-label={post.isLiked ? 'Unlike post' : 'Like post'}
        >
          <motion.div
            animate={post.isLiked ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
          >
            <Heart
              size={20}
              fill={post.isLiked ? 'currentColor' : 'none'}
            />
          </motion.div>
          <span className="text-sm font-medium">{formatNumber(post.likes)}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowComments(!showComments)}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-xl transition-all touch-target focus-ring
            ${showComments
              ? 'text-primary bg-primary/10'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
            }
          `}
          aria-label="View comments"
        >
          <MessageCircle size={20} />
          <span className="text-sm font-medium">{formatNumber(post.comments)}</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all touch-target focus-ring"
          aria-label="Share post"
        >
          <Share2 size={20} />
          <span className="text-sm font-medium">{formatNumber(post.shares)}</span>
        </motion.button>
      </div>

      {/* Comments Section */}
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            {/* Existing Comments */}
            {comments.length > 0 && (
              <div className="space-y-3 mb-4">
                {comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3"
                  >
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400';
                      }}
                    />
                    <div className="flex-1">
                      <div className="bg-gray-100 dark:bg-zinc-800 rounded-2xl px-4 py-3">
                        <div className="font-semibold text-sm mb-1">
                          {comment.author.name}
                        </div>
                        <p className="text-sm leading-relaxed">{comment.content}</p>
                      </div>
                      <div className="flex items-center gap-3 mt-1 px-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>{formatTimeAgo(comment.timestamp)}</span>
                        <button className="hover:text-primary transition-colors">
                          Like
                        </button>
                        <button className="hover:text-primary transition-colors">
                          Reply
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Add Comment */}
            <div className="flex gap-3">
              <img
                src={post.author.avatar}
                alt="Your avatar"
                className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400';
                }}
              />
              <div className="flex-1 flex gap-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleComment()}
                  placeholder="Write a comment..."
                  className="flex-1 px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-primary transition-all"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleComment}
                  disabled={!commentText.trim()}
                  className={`
                    px-4 py-2 rounded-xl font-medium transition-all touch-target focus-ring
                    ${commentText.trim()
                      ? 'bg-gradient-primary text-white'
                      : 'bg-gray-300 dark:bg-zinc-700 text-gray-500 cursor-not-allowed'
                    }
                  `}
                >
                  Post
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default PostCard;
