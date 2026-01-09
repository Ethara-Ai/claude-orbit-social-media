# Orbit Quick Start Guide

Get Orbit running in under 2 minutes! 🚀

## Installation

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will automatically open at `http://localhost:3000`

## First Look

When you open Orbit, you'll see:
- **Home Feed** - Create and view posts
- **Discover** - Explore content by category
- **Chats** - Message with simulated auto-replies
- **Notifications** - See your activity
- **Connections** - View and manage your network
- **Profile** - Your personal profile page

## Try These Features

### 1. Create a Post
- Click the composer at the top of the Home feed
- Type your message
- (Optional) Click "Add images" to attach photos
- Click "Share" when ready

### 2. Interact with Posts
- ❤️ Click the heart to like/unlike
- 💬 Click the comment icon to view and add comments
- 📤 Click share to simulate sharing

### 3. Send a Message
- Go to "Chats" from the navigation
- Click any conversation
- Type a message and hit Send
- Watch for the typing indicator... someone will reply!

### 4. Explore Discover
- Navigate to "Discover"
- Try different category filters
- Click any post for theater mode view

### 5. Toggle Dark Mode
- Click the sun/moon icon in the header
- Watch the smooth transition
- Your preference is saved automatically

### 6. Mobile View
- Resize your browser window
- On mobile, tap the Orbit logo to open the navigation drawer
- Everything adapts beautifully to smaller screens

## What's Inside?

All the data is **mock data** for demonstration purposes:
- 8 realistic user profiles
- Multiple posts with images
- Active conversations with auto-replies
- Various notification types
- Connection suggestions

## Making It Your Own

### Change the Accent Color
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: {
    DEFAULT: '#YOUR_COLOR',
  }
}
```

### Customize Mock Data
Edit `src/data/mockData.js` to change:
- User profiles
- Post content
- Messages
- Notifications

### Add New Features
1. Create a component in `src/components/`
2. Import it in `src/App.jsx`
3. Add routing logic

## Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Troubleshooting

**Port 3000 already in use?**
Change it in `vite.config.js`:
```javascript
server: {
  port: 3001,
}
```

**Images not loading?**
All images use Unsplash URLs. Check your internet connection.

**Theme not persisting?**
Clear localStorage and refresh:
```javascript
localStorage.clear()
```

## Browser Requirements

- Modern browsers (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- LocalStorage enabled for theme persistence

## Tech Stack

- **React 18** - UI framework
- **Vite 5** - Lightning fast build tool
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

## Next Steps

- Explore the codebase in `src/`
- Customize the design system
- Add your own features
- Deploy to Vercel, Netlify, or your preferred host

## Need Help?

Check out:
- `README.md` for detailed documentation
- Component files for implementation details
- Tailwind/Framer Motion docs for styling and animations

---

**Enjoy building with Orbit! 🌟**