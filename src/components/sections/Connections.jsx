import React from 'react';
import { motion } from 'framer-motion';
import { UserCheck, UserPlus, Users } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatNumber } from '../../utils/helpers';

const Connections = () => {
  const { users, suggestedUsers, connectUser, setActiveTab, setActiveConversation, conversations } = useApp();

  const handleConnect = (userId) => {
    connectUser(userId);
  };

  const handleMessage = (user) => {
    const existingConv = conversations.find((conv) => conv.user.id === user.id);
    if (existingConv) {
      setActiveConversation(existingConv);
    }
    setActiveTab('chats');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold mb-2">Connections</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your network and discover new people
        </p>
      </motion.div>

      {/* Your Connections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <Users size={24} className="text-primary" />
          <h2 className="text-xl font-bold">Your Connections</h2>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({users.length})
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-gray-100 dark:ring-zinc-800"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400';
                    }}
                  />
                  {user.isOnline && (
                    <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-3 border-white dark:border-zinc-900"></span>
                  )}
                </div>

                <h3 className="font-semibold text-base mb-1">{user.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {user.jobTitle}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                  {user.company}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <span>{formatNumber(user.followers)} followers</span>
                  <span>•</span>
                  <span>{formatNumber(user.posts)} posts</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleMessage(user)}
                  className="w-full px-4 py-2 rounded-xl bg-gradient-primary text-white font-medium hover:shadow-lg transition-all touch-target focus-ring"
                >
                  Message
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Suggested Connections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <UserPlus size={24} className="text-primary" />
          <h2 className="text-xl font-bold">Suggested for You</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {suggestedUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="card p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-gray-100 dark:ring-zinc-800"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400';
                    }}
                  />
                </div>

                <h3 className="font-semibold text-base mb-1">{user.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {user.jobTitle}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                  {user.company}
                </p>

                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                  <Users size={14} />
                  <span>{user.mutualConnections} mutual connections</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleConnect(user.id)}
                  disabled={user.isConnected}
                  className={`
                    w-full px-4 py-2 rounded-xl font-medium transition-all touch-target focus-ring
                    ${user.isConnected
                      ? 'bg-gray-200 dark:bg-zinc-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-primary text-white hover:shadow-lg'
                    }
                  `}
                >
                  {user.isConnected ? (
                    <span className="flex items-center justify-center gap-2">
                      <UserCheck size={18} />
                      Request Sent
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <UserPlus size={18} />
                      Connect
                    </span>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Empty State */}
      {suggestedUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="card p-12 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400">
            No suggestions available right now
          </p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
            Check back later for new connection recommendations
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default Connections;
