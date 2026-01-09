import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, UserPlus, Share2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatTimeAgo } from '../../utils/helpers';

const Notifications = () => {
  const { notifications, markAllNotificationsRead, setActiveTab } = useApp();

  useEffect(() => {
    // Mark all notifications as read after viewing for 2 seconds
    const timer = setTimeout(() => {
      markAllNotificationsRead();
    }, 2000);

    return () => clearTimeout(timer);
  }, [markAllNotificationsRead]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'like':
        return <Heart size={18} className="text-red-500" fill="currentColor" />;
      case 'comment':
        return <MessageCircle size={18} className="text-blue-500" />;
      case 'follow':
        return <UserPlus size={18} className="text-green-500" />;
      case 'share':
        return <Share2 size={18} className="text-purple-500" />;
      default:
        return <Heart size={18} className="text-gray-500" />;
    }
  };

  const handleNotificationClick = (notification) => {
    if (notification.post) {
      setActiveTab('home');
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay updated with your activity
          </p>
        </div>
      </motion.div>

      {/* Notifications List */}
      <div className="space-y-2">
        {notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="card p-12 text-center"
          >
            <p className="text-gray-500 dark:text-gray-400">
              No notifications yet
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
              We'll notify you when something happens
            </p>
          </motion.div>
        ) : (
          notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleNotificationClick(notification)}
              className={`
                card p-4 flex items-start gap-4 cursor-pointer transition-all hover:shadow-lg
                ${!notification.read ? 'bg-orange-50 dark:bg-orange-950/10 border-l-4 border-primary' : ''}
              `}
            >
              {/* User Avatar */}
              <div className="relative flex-shrink-0">
                <img
                  src={notification.user.avatar}
                  alt={notification.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400';
                  }}
                />
                {/* Icon Badge */}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center shadow-lg">
                  {getNotificationIcon(notification.type)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-relaxed">
                  <span className="font-semibold">{notification.user.name}</span>
                  {' '}
                  <span className="text-gray-700 dark:text-gray-300">
                    {notification.content}
                  </span>
                </p>
                {notification.post && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">
                    "{notification.post.content}"
                  </p>
                )}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  {formatTimeAgo(notification.timestamp)}
                </p>
              </div>

              {/* Unread Indicator */}
              {!notification.read && (
                <div className="flex-shrink-0 mt-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                </div>
              )}

              {/* Post Thumbnail */}
              {notification.post && notification.post.images && notification.post.images.length > 0 && (
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-zinc-800">
                  <img
                    src={notification.post.images[0]}
                    alt="Post thumbnail"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400';
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* End Message */}
      {notifications.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: notifications.length * 0.05 }}
          className="text-center py-8 text-gray-500 dark:text-gray-400"
        >
          <p className="text-sm">You're all caught up!</p>
        </motion.div>
      )}
    </div>
  );
};

export default Notifications;
