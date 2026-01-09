import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Image as ImageIcon, MoreVertical, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { formatMessageTime } from '../../utils/helpers';

const Chats = () => {
  const {
    conversations,
    activeConversation,
    setActiveConversation,
    sendMessage,
    clearConversation,
    markConversationRead,
    currentUser,
  } = useApp();

  const [messageText, setMessageText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  // Mark conversation as read when viewing
  useEffect(() => {
    if (activeConversation && activeConversation.unread > 0) {
      markConversationRead(activeConversation.id);
    }
  }, [activeConversation, markConversationRead]);

  // Simulate typing indicator
  useEffect(() => {
    if (!activeConversation) return;

    const messages = activeConversation.messages;
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.senderId === currentUser.id) {
      // Show typing indicator for a moment after user sends message
      setTypingUsers([activeConversation.user.id]);
      const timer = setTimeout(() => {
        setTypingUsers([]);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeConversation?.messages, currentUser.id, activeConversation?.user.id]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeConversation) return;

    sendMessage(activeConversation.id, messageText);
    setMessageText('');
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (!file || !activeConversation) return;

    const imageUrl = URL.createObjectURL(file);
    sendMessage(activeConversation.id, '', imageUrl);
  };

  const handleClearConversation = () => {
    if (activeConversation) {
      clearConversation(activeConversation.id);
      setShowMenu(false);
    }
  };

  const sortedConversations = [...conversations].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="flex h-[calc(100vh-4rem)] -m-6 md:m-0 md:rounded-2xl overflow-hidden card">
      {/* Conversations List */}
      <div
        className={`
          w-full md:w-80 lg:w-96 flex-shrink-0 border-r border-gray-200 dark:border-zinc-800 flex flex-col
          ${activeConversation ? 'hidden md:flex' : 'flex'}
        `}
      >
        <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
          <h2 className="text-2xl font-bold">Messages</h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sortedConversations.map((conversation, index) => (
            <motion.button
              key={conversation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setActiveConversation(conversation)}
              className={`
                w-full p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-zinc-800/50 transition-colors border-b border-gray-100 dark:border-zinc-800/50 focus-ring
                ${activeConversation?.id === conversation.id ? 'bg-gray-50 dark:bg-zinc-800/50' : ''}
              `}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={conversation.user.avatar}
                  alt={conversation.user.name}
                  className="w-14 h-14 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400';
                  }}
                />
                {conversation.user.isOnline && (
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                )}
              </div>

              <div className="flex-1 text-left overflow-hidden">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold truncate">{conversation.user.name}</h3>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                    {formatMessageTime(conversation.timestamp)}
                  </span>
                </div>
                <p
                  className={`
                    text-sm truncate
                    ${conversation.unread > 0
                      ? 'text-gray-900 dark:text-white font-medium'
                      : 'text-gray-500 dark:text-gray-400'
                    }
                  `}
                >
                  {conversation.lastMessage}
                </p>
              </div>

              {conversation.unread > 0 && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-white">
                    {conversation.unread}
                  </span>
                </div>
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      {activeConversation ? (
        <div
          className={`
            flex-1 flex flex-col
            ${activeConversation ? 'flex' : 'hidden md:flex'}
          `}
        >
          {/* Chat Header */}
          <div className="p-4 md:p-6 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setActiveConversation(null)}
                className="md:hidden w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors focus-ring touch-target"
                aria-label="Back to conversations"
              >
                <ArrowLeft size={20} />
              </button>

              <div className="relative">
                <img
                  src={activeConversation.user.avatar}
                  alt={activeConversation.user.name}
                  className="w-12 h-12 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400';
                  }}
                />
                {activeConversation.user.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></span>
                )}
              </div>

              <div>
                <h3 className="font-semibold">{activeConversation.user.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {activeConversation.user.isOnline ? 'Active now' : 'Offline'}
                </p>
              </div>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 flex items-center justify-center transition-colors focus-ring touch-target"
                aria-label="More options"
              >
                <MoreVertical size={20} />
              </button>

              <AnimatePresence>
                {showMenu && (
                  <>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowMenu(false)}
                      className="fixed inset-0 z-10"
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-zinc-800 rounded-xl shadow-soft-lg dark:shadow-soft-lg-dark overflow-hidden z-20"
                    >
                      <button
                        onClick={handleClearConversation}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-zinc-700 transition-colors text-red-600 dark:text-red-400 text-sm font-medium"
                      >
                        Clear conversation
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {activeConversation.messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <p className="text-sm">No messages yet</p>
                  <p className="text-xs mt-1">Start the conversation!</p>
                </div>
              </div>
            ) : (
              <>
                {activeConversation.messages.map((message, index) => {
                  const isCurrentUser = message.senderId === currentUser.id;
                  const showAvatar =
                    index === activeConversation.messages.length - 1 ||
                    activeConversation.messages[index + 1]?.senderId !== message.senderId;

                  return (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
                    >
                      <div className="w-8 flex-shrink-0">
                        {showAvatar && !isCurrentUser && (
                          <img
                            src={activeConversation.user.avatar}
                            alt={activeConversation.user.name}
                            className="w-8 h-8 rounded-full object-cover"
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/400';
                            }}
                          />
                        )}
                      </div>

                      <div className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-[70%]`}>
                        {message.image ? (
                          <div
                            className={`
                              rounded-2xl overflow-hidden max-w-sm
                              ${isCurrentUser ? 'bg-gradient-primary' : 'bg-gray-200 dark:bg-zinc-700'}
                            `}
                          >
                            <img
                              src={message.image}
                              alt="Shared"
                              className="w-full h-auto"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400';
                              }}
                            />
                          </div>
                        ) : (
                          <div
                            className={`
                              px-4 py-3 rounded-2xl
                              ${isCurrentUser
                                ? 'bg-gradient-primary text-white'
                                : 'bg-gray-200 dark:bg-zinc-700 text-gray-900 dark:text-white'
                              }
                            `}
                          >
                            <p className="text-sm leading-relaxed">{message.content}</p>
                          </div>
                        )}
                        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
                          {formatMessageTime(message.timestamp)}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Typing Indicator */}
                <AnimatePresence>
                  {typingUsers.includes(activeConversation.user.id) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="flex gap-3"
                    >
                      <img
                        src={activeConversation.user.avatar}
                        alt={activeConversation.user.name}
                        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/400';
                        }}
                      />
                      <div className="px-4 py-3 rounded-2xl bg-gray-200 dark:bg-zinc-700">
                        <div className="flex gap-1">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                            className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                            className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                            className="w-2 h-2 rounded-full bg-gray-500 dark:bg-gray-400"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </>
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 md:p-6 border-t border-gray-200 dark:border-zinc-800">
            <div className="flex items-end gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 flex items-center justify-center transition-colors flex-shrink-0 focus-ring touch-target"
                aria-label="Add image"
              >
                <ImageIcon size={20} className="text-gray-600 dark:text-gray-400" />
              </button>

              <div className="flex-1 relative">
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type a message..."
                  rows={1}
                  className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-primary transition-all resize-none max-h-32"
                  style={{
                    height: 'auto',
                    minHeight: '44px',
                  }}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!messageText.trim()}
                className={`
                  w-10 h-10 rounded-xl flex items-center justify-center transition-all flex-shrink-0 focus-ring touch-target
                  ${messageText.trim()
                    ? 'bg-gradient-primary text-white hover:shadow-lg'
                    : 'bg-gray-300 dark:bg-zinc-700 text-gray-500 cursor-not-allowed'
                  }
                `}
                aria-label="Send message"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      ) : (
        <div className="hidden md:flex flex-1 items-center justify-center text-gray-500 dark:text-gray-400">
          <div className="text-center">
            <p className="text-lg font-medium mb-2">Select a conversation</p>
            <p className="text-sm">Choose a conversation to start messaging</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
