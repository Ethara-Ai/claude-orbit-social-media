import React from 'react';
import { motion } from 'framer-motion';
import PostComposer from '../PostComposer';
import PostCard from '../PostCard';
import { useApp } from '../../context/AppContext';

const Home = () => {
  const { posts } = useApp();

  return (
    <div className="space-y-0">
      {/* Post Composer */}
      <PostComposer />

      {/* Feed */}
      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <PostCard post={post} />
          </motion.div>
        ))}
      </div>

      {/* End of Feed Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: posts.length * 0.05 }}
        className="text-center py-8 text-gray-500 dark:text-gray-400"
      >
        <p className="text-sm">You're all caught up! 🎉</p>
        <p className="text-xs mt-1">Check back later for more updates</p>
      </motion.div>
    </div>
  );
};

export default Home;
