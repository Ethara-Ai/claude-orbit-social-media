import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, Link as LinkIcon, Share2, Settings, Grid, Bookmark } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatNumber, copyToClipboard } from '../../utils/helpers';

const Profile = () => {
  const { currentUser, posts } = useApp();
  const [activeTab, setActiveTab] = useState('posts');
  const [showToast, setShowToast] = useState(false);

  const userPosts = posts.filter((post) => post.author.id === currentUser.id);
  const savedPosts = posts.slice(0, 3); // Mock saved posts

  const handleShare = async () => {
    const profileUrl = `https://orbit.app/${currentUser.username}`;
    const success = await copyToClipboard(profileUrl);
    if (success) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Cover Image and Profile Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card overflow-hidden"
      >
        {/* Cover Image */}
        <div className="h-48 md:h-64 bg-gradient-primary relative overflow-hidden">
          <img
            src={currentUser.coverImage}
            alt="Cover"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>

        {/* Profile Info */}
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Avatar */}
            <div className="-mt-20 md:-mt-24 relative z-10">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover ring-8 ring-white dark:ring-zinc-900"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400';
                }}
              />
              {currentUser.isOnline && (
                <span className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-zinc-900"></span>
              )}
            </div>

            {/* Info and Actions */}
            <div className="flex-1 w-full">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold">{currentUser.name}</h1>
                    {currentUser.verified && (
                      <svg
                        className="w-6 h-6 text-primary"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-1">
                    {currentUser.username}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors touch-target focus-ring"
                  >
                    <Share2 size={18} />
                    <span className="text-sm font-medium">Share</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-primary text-white hover:shadow-lg transition-all touch-target focus-ring"
                  >
                    <Settings size={18} />
                    <span className="text-sm font-medium">Edit Profile</span>
                  </motion.button>
                </div>
              </div>

              {/* Job Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Briefcase size={16} />
                  <span>{currentUser.jobTitle} at {currentUser.company}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{currentUser.location}</span>
                </div>
              </div>

              {/* Bio */}
              {currentUser.bio && (
                <p className="text-base leading-relaxed mb-6 max-w-2xl">
                  {currentUser.bio}
                </p>
              )}

              {/* Stats */}
              <div className="flex gap-8 pt-6 border-t border-gray-200 dark:border-zinc-800">
                <div>
                  <div className="text-2xl font-bold">{formatNumber(currentUser.posts)}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Posts</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{formatNumber(currentUser.followers)}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Followers</div>
                </div>
                <div>
                  <div className="text-2xl font-bold">{formatNumber(currentUser.following)}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-2"
      >
        <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('posts')}
            className={`
              flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all touch-target focus-ring
              ${activeTab === 'posts'
                ? 'bg-gradient-primary text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }
            `}
          >
            <Grid size={18} />
            Posts
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('saved')}
            className={`
              flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all touch-target focus-ring
              ${activeTab === 'saved'
                ? 'bg-gradient-primary text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-800'
              }
            `}
          >
            <Bookmark size={18} />
            Saved
          </motion.button>
        </div>
      </motion.div>

      {/* Content Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {activeTab === 'posts' ? (
          <div>
            {userPosts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {userPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800 cursor-pointer group"
                  >
                    {post.images && post.images.length > 0 ? (
                      <div className="relative w-full h-full">
                        <img
                          src={post.images[0]}
                          alt="Post"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/600x600';
                          }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-4 text-white">
                            <div className="flex items-center gap-1">
                              <motion.svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1.2 }}
                              >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                              </motion.svg>
                              <span className="font-semibold">{formatNumber(post.likes)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <motion.svg
                                className="w-6 h-6"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                initial={{ scale: 0 }}
                                whileHover={{ scale: 1.2 }}
                              >
                                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                              </motion.svg>
                              <span className="font-semibold">{formatNumber(post.comments)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gradient-primary p-6 flex items-center justify-center">
                        <p className="text-white text-center font-medium line-clamp-6">
                          {post.content}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="card p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">No posts yet</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Share your first post to get started
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {savedPosts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {savedPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="aspect-square rounded-2xl overflow-hidden bg-gray-100 dark:bg-zinc-800 cursor-pointer group"
                  >
                    {post.images && post.images.length > 0 ? (
                      <img
                        src={post.images[0]}
                        alt="Saved post"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/600x600';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-primary p-6 flex items-center justify-center">
                        <p className="text-white text-center font-medium line-clamp-6">
                          {post.content}
                        </p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="card p-12 text-center">
                <p className="text-gray-500 dark:text-gray-400">No saved posts</p>
                <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                  Save posts to view them here
                </p>
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-6 py-3 rounded-xl shadow-2xl flex items-center gap-2">
            <LinkIcon size={18} />
            <span className="font-medium">Profile link copied to clipboard!</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Profile;
