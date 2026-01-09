import React from 'react';
import { motion } from 'framer-motion';
import { Home, Compass, MessageCircle, Bell, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatNumber } from '../utils/helpers';
import { analyticsData } from '../data/mockData';

const Sidebar = () => {
  const {
    currentUser,
    activeTab,
    setActiveTab,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    unreadMessagesCount,
    unreadNotificationsCount,
  } = useApp();

  const navItems = [
    { id: 'home', label: 'Home', icon: Home, badge: null },
    { id: 'discover', label: 'Discover', icon: Compass, badge: null },
    { id: 'chats', label: 'Chats', icon: MessageCircle, badge: unreadMessagesCount },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotificationsCount },
  ];

  const maxValue = Math.max(...analyticsData.map(d => d.value));

  const sidebarContent = (
    <div className="flex flex-col gap-6">
      {/* Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-20 h-20 rounded-full object-cover ring-4 ring-gray-100 dark:ring-zinc-800"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400';
              }}
            />
            {currentUser.isOnline && (
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-3 border-white dark:border-zinc-900"></span>
            )}
          </div>
          <h3 className="font-bold text-lg mb-1">{currentUser.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
            {currentUser.jobTitle}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
            {currentUser.company}
          </p>

          {/* Stats */}
          <div className="flex gap-6 w-full justify-center pt-4 border-t border-gray-100 dark:border-zinc-800">
            <div>
              <div className="font-bold text-lg">{formatNumber(currentUser.followers)}</div>
              <div className="text-xs text-gray-500">Followers</div>
            </div>
            <div>
              <div className="font-bold text-lg">{formatNumber(currentUser.following)}</div>
              <div className="text-xs text-gray-500">Following</div>
            </div>
            <div>
              <div className="font-bold text-lg">{formatNumber(currentUser.posts)}</div>
              <div className="text-xs text-gray-500">Posts</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Analytics Widget */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <h3 className="font-semibold text-sm mb-4">Weekly Engagement</h3>
        <div className="flex items-end justify-between gap-2 h-24">
          {analyticsData.map((data, index) => (
            <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(data.value / maxValue) * 100}%` }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className="w-full bg-gradient-primary rounded-t-lg min-h-[8px]"
              ></motion.div>
              <span className="text-xs text-gray-500">{data.day}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-3"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setActiveTab(item.id);
                setIsMobileMenuOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all touch-target focus-ring
                ${isActive
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300'
                }
              `}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
              {item.badge > 0 && (
                <span className={`
                  ml-auto px-2 py-0.5 rounded-full text-xs font-bold
                  ${isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-primary text-white'
                  }
                `}>
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </motion.button>
          );
        })}
      </motion.nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-80 fixed left-0 top-16 bottom-0 overflow-y-auto p-6">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40 top-16"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="lg:hidden fixed left-0 top-16 bottom-0 w-80 bg-gray-50 dark:bg-black z-50 overflow-y-auto p-6 shadow-2xl"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-gray-200 dark:bg-zinc-800 hover:bg-gray-300 dark:hover:bg-zinc-700 transition-colors focus-ring"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
            {sidebarContent}
          </motion.aside>
        </>
      )}
    </>
  );
};

export default Sidebar;
