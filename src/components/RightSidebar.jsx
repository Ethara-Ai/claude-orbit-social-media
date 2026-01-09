import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

const RightSidebar = () => {
  const { users, setActiveTab, setActiveConversation, conversations } = useApp();

  const onlineUsers = users.filter((user) => user.isOnline);

  const handleUserClick = (user) => {
    // Find or create conversation with this user
    const existingConv = conversations.find((conv) => conv.user.id === user.id);
    if (existingConv) {
      setActiveConversation(existingConv);
    }
    setActiveTab('chats');
  };

  return (
    <aside className="hidden xl:block w-80 fixed right-0 top-16 bottom-0 overflow-y-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h3 className="font-semibold text-sm mb-4 text-gray-700 dark:text-gray-300">
          Online Now ({onlineUsers.length})
        </h3>

        <div className="space-y-3">
          {onlineUsers.map((user, index) => (
            <motion.button
              key={user.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleUserClick(user)}
              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all focus-ring touch-target"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400';
                  }}
                />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
              </div>

              <div className="flex-1 text-left overflow-hidden">
                <div className="font-medium text-sm truncate">{user.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.jobTitle}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {onlineUsers.length === 0 && (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
            No users online right now
          </div>
        )}
      </motion.div>
    </aside>
  );
};

export default RightSidebar;
