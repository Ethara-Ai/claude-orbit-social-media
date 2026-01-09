import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  currentUser as initialCurrentUser,
  users as initialUsers,
  posts as initialPosts,
  comments as initialComments,
  conversations as initialConversations,
  notifications as initialNotifications,
  suggestedUsers as initialSuggestedUsers,
  autoReplyMessages,
} from '../data/mockData';
import { generateId } from '../utils/helpers';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('orbit-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // User state
  const [currentUser] = useState(initialCurrentUser);
  const [users] = useState(initialUsers);

  // Posts state
  const [posts, setPosts] = useState(initialPosts);
  const [postComments, setPostComments] = useState(initialComments);

  // Conversations state
  const [conversations, setConversations] = useState(initialConversations);
  const [activeConversation, setActiveConversation] = useState(null);

  // Notifications state
  const [notifications, setNotifications] = useState(initialNotifications);

  // Connections state
  const [suggestedUsers, setSuggestedUsers] = useState(initialSuggestedUsers);

  // UI state
  const [activeTab, setActiveTab] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  // Theme toggle
  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('orbit-theme', next);
      return next;
    });
  };

  // Apply theme class to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Post actions
  const createPost = (content, images = []) => {
    const newPost = {
      id: generateId(),
      author: currentUser,
      content,
      images,
      likes: 0,
      comments: 0,
      shares: 0,
      timestamp: new Date(),
      isLiked: false,
      category: 'Technology',
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  };

  const toggleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const addComment = (postId, content) => {
    const newComment = {
      id: generateId(),
      author: currentUser,
      content,
      timestamp: new Date(),
      likes: 0,
    };

    setPostComments((prev) => ({
      ...prev,
      [postId]: [...(prev[postId] || []), newComment],
    }));

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, comments: post.comments + 1 } : post
      )
    );

    return newComment;
  };

  // Message actions
  const sendMessage = (conversationId, content, image = null) => {
    const newMessage = {
      id: generateId(),
      senderId: currentUser.id,
      content,
      image,
      timestamp: new Date(),
    };

    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: content || 'Sent an image',
            timestamp: new Date(),
          };
        }
        return conv;
      })
    );

    // Simulate auto-reply after a delay
    const conversation = conversations.find((c) => c.id === conversationId);
    if (conversation) {
      const otherUserId = conversation.user.id;
      const replies = autoReplyMessages[otherUserId];

      if (replies) {
        const randomReply = replies[Math.floor(Math.random() * replies.length)];

        setTimeout(() => {
          const autoReply = {
            id: generateId(),
            senderId: otherUserId,
            content: randomReply,
            timestamp: new Date(),
          };

          setConversations((prev) =>
            prev.map((conv) => {
              if (conv.id === conversationId) {
                return {
                  ...conv,
                  messages: [...conv.messages, autoReply],
                  lastMessage: randomReply,
                  timestamp: new Date(),
                  unread: activeConversation?.id === conversationId ? 0 : 1,
                };
              }
              return conv;
            })
          );
        }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5s
      }
    }

    return newMessage;
  };

  const clearConversation = (conversationId) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId
          ? {
              ...conv,
              messages: [],
              lastMessage: '',
            }
          : conv
      )
    );
  };

  const markConversationRead = (conversationId) => {
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === conversationId ? { ...conv, unread: 0 } : conv
      )
    );
  };

  // Notification actions
  const markAllNotificationsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, read: true }))
    );
  };

  const markNotificationRead = (notificationId) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  // Connection actions
  const connectUser = (userId) => {
    setSuggestedUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, isConnected: true } : user
      )
    );
  };

  // Get unread counts
  const unreadMessagesCount = conversations.reduce(
    (total, conv) => total + conv.unread,
    0
  );

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const value = {
    // State
    theme,
    currentUser,
    users,
    posts,
    postComments,
    conversations,
    activeConversation,
    notifications,
    suggestedUsers,
    activeTab,
    isMobileMenuOpen,
    selectedPost,
    unreadMessagesCount,
    unreadNotificationsCount,

    // Actions
    toggleTheme,
    createPost,
    toggleLike,
    addComment,
    sendMessage,
    clearConversation,
    markConversationRead,
    setActiveConversation,
    markAllNotificationsRead,
    markNotificationRead,
    connectUser,
    setActiveTab,
    setIsMobileMenuOpen,
    setSelectedPost,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
