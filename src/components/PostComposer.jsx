import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const PostComposer = () => {
  const { currentUser, createPost } = useApp();
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleContentChange = (e) => {
    setContent(e.target.value);
    // Auto-grow textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...imageUrls].slice(0, 4)); // Max 4 images
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!content.trim() && images.length === 0) return;

    createPost(content, images);
    setContent('');
    setImages([]);
    setIsExpanded(false);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const canPost = content.trim() || images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6 mb-6"
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400';
          }}
        />

        {/* Input Area */}
        <div className="flex-1">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            onFocus={() => setIsExpanded(true)}
            placeholder="What's on your mind?"
            className="w-full resize-none outline-none bg-transparent text-base placeholder:text-gray-400 dark:placeholder:text-gray-600 min-h-[60px] max-h-[300px]"
            rows={1}
          />

          {/* Image Preview */}
          <AnimatePresence>
            {images.length > 0 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 grid gap-2"
                style={{
                  gridTemplateColumns: images.length === 1 ? '1fr' : 'repeat(2, 1fr)',
                }}
              >
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-zinc-800"
                  >
                    <img
                      src={image}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center transition-colors focus-ring"
                      aria-label="Remove image"
                    >
                      <X size={16} className="text-white" />
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actions */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 flex items-center justify-between pt-4 border-t border-gray-100 dark:border-zinc-800"
              >
                <div className="flex items-center gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={images.length >= 4}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed touch-target focus-ring"
                    aria-label="Add images"
                  >
                    <ImageIcon size={20} className="text-gray-600 dark:text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {images.length >= 4 ? 'Max images' : 'Add images'}
                    </span>
                  </motion.button>
                </div>

                <motion.button
                  whileHover={canPost ? { scale: 1.05 } : {}}
                  whileTap={canPost ? { scale: 0.95 } : {}}
                  onClick={handleSubmit}
                  disabled={!canPost}
                  className={`
                    px-6 py-2 rounded-xl font-semibold text-white transition-all touch-target focus-ring
                    ${canPost
                      ? 'bg-gradient-primary hover:shadow-lg'
                      : 'bg-gray-300 dark:bg-zinc-700 cursor-not-allowed'
                    }
                  `}
                >
                  Share
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default PostComposer;
