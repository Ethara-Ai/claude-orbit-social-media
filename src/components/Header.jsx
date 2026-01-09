import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Header = () => {
  const {
    theme,
    toggleTheme,
    currentUser,
    setActiveTab,
    setIsMobileMenuOpen,
    unreadMessagesCount,
    unreadNotificationsCount,
  } = useApp();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-zinc-800">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => {
            setActiveTab('home');
            setIsMobileMenuOpen((prev) => !prev);
          }}
          className="flex items-center gap-3 focus-ring rounded-lg btn-hover"
          aria-label="Orbit Logo"
        >
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">O</span>
          </div>
          <span className="text-xl font-bold gradient-text hidden sm:inline">
            Orbit
          </span>
        </button>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Connections Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab('connections')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors touch-target focus-ring"
            aria-label="Connections"
          >
            <Users size={20} className="text-gray-700 dark:text-gray-300" />
            <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
              Connections
            </span>
          </motion.button>

          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors touch-target focus-ring"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === 'dark' ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {theme === 'light' ? (
                <Sun size={20} className="text-gray-700" />
              ) : (
                <Moon size={20} className="text-gray-300" />
              )}
            </motion.div>
          </motion.button>

          {/* User Avatar */}
          <button
            onClick={() => setActiveTab('profile')}
            className="relative focus-ring rounded-full touch-target"
            aria-label="Profile"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200 dark:ring-zinc-700"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400';
              }}
            />
            {currentUser.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-black"></span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile notification indicators */}
      {(unreadMessagesCount > 0 || unreadNotificationsCount > 0) && (
        <div className="sm:hidden flex justify-center gap-2 pb-2 px-4">
          {unreadMessagesCount > 0 && (
            <div className="text-xs text-primary font-medium">
              {unreadMessagesCount} new message{unreadMessagesCount > 1 ? 's' : ''}
            </div>
          )}
          {unreadNotificationsCount > 0 && (
            <div className="text-xs text-primary font-medium">
              {unreadNotificationsCount} notification{unreadNotificationsCount > 1 ? 's' : ''}
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
