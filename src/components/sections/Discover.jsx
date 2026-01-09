import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTimeAgo, formatNumber } from '../../utils/helpers';
import { categories } from '../../data/mockData';

const Discover = () => {
  const { posts, toggleLike } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPost, setSelectedPost] = useState(null);

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter((post) => post.category === selectedCategory);

  const featuredPosts = filteredPosts.slice(0, 2);
  const gridPosts = filteredPosts.slice(2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Discover</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Explore trending content and connect with creators
        </p>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {categories.map((category) => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`
              px-6 py-2 rounded-xl font-medium whitespace-nowrap transition-all touch-target focus-ring
              ${selectedCategory === category
                ? 'bg-gradient-primary text-white shadow-lg'
                : 'bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-zinc-700'
              }
            `}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {featuredPosts.map((post) => (
            <motion.article
              key={post.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedPost(post)}
              className="card overflow-hidden cursor-pointer group"
            >
              {post.images && post.images.length > 0 && (
                <div className="aspect-video overflow-hidden bg-gray-100 dark:bg-zinc-800">
                  <img
                    src={post.images[0]}
                    alt="Featured post"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x600';
                    }}
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400';
                    }}
                  />
                  <div>
                    <h3 className="font-semibold text-sm">{post.author.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatTimeAgo(post.timestamp)}
                    </p>
                  </div>
                </div>
                <p className="text-base line-clamp-3 mb-4">{post.content}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Heart size={16} />
                    {formatNumber(post.likes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={16} />
                    {formatNumber(post.comments)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Share2 size={16} />
                    {formatNumber(post.shares)}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}

      {/* Post Grid */}
      {gridPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {gridPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedPost(post)}
              className="card overflow-hidden cursor-pointer group"
            >
              {post.images && post.images.length > 0 ? (
                <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-zinc-800">
                  <img
                    src={post.images[0]}
                    alt="Post"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/600x600';
                    }}
                  />
                </div>
              ) : (
                <div className="aspect-square bg-gradient-primary p-6 flex items-center justify-center">
                  <p className="text-white text-center font-medium line-clamp-6">
                    {post.content}
                  </p>
                </div>
              )}
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400';
                    }}
                  />
                  <span className="font-semibold text-sm truncate">
                    {post.author.name}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Heart size={14} />
                    {formatNumber(post.likes)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={14} />
                    {formatNumber(post.comments)}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      )}

      {/* No Results */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <p className="text-gray-500 dark:text-gray-400">
            No posts found in this category
          </p>
        </motion.div>
      )}

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-6xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row"
            >
              {/* Image Section */}
              {selectedPost.images && selectedPost.images.length > 0 && (
                <div className="lg:flex-1 bg-black flex items-center justify-center">
                  <img
                    src={selectedPost.images[0]}
                    alt="Post detail"
                    className="w-full h-full object-contain max-h-[50vh] lg:max-h-full"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x600';
                    }}
                  />
                </div>
              )}

              {/* Content Section */}
              <div className="lg:w-[450px] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedPost.author.avatar}
                      alt={selectedPost.author.name}
                      className="w-12 h-12 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400';
                      }}
                    />
                    <div>
                      <h3 className="font-semibold">{selectedPost.author.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {selectedPost.author.jobTitle}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors focus-ring"
                    aria-label="Close"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  <p className="text-base leading-relaxed whitespace-pre-wrap mb-4">
                    {selectedPost.content}
                  </p>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formatTimeAgo(selectedPost.timestamp)}
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 border-t border-gray-200 dark:border-zinc-800">
                  <div className="flex items-center gap-2 mb-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleLike(selectedPost.id)}
                      className={`
                        flex items-center gap-2 px-4 py-2 rounded-xl transition-all touch-target focus-ring flex-1 justify-center
                        ${selectedPost.isLiked
                          ? 'text-red-500 bg-red-50 dark:bg-red-950/30'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800'
                        }
                      `}
                    >
                      <Heart
                        size={20}
                        fill={selectedPost.isLiked ? 'currentColor' : 'none'}
                      />
                      <span className="text-sm font-medium">
                        {formatNumber(selectedPost.likes)}
                      </span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all touch-target focus-ring flex-1 justify-center"
                    >
                      <MessageCircle size={20} />
                      <span className="text-sm font-medium">
                        {formatNumber(selectedPost.comments)}
                      </span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all touch-target focus-ring flex-1 justify-center"
                    >
                      <Share2 size={20} />
                      <span className="text-sm font-medium">
                        {formatNumber(selectedPost.shares)}
                      </span>
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Discover;
