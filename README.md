# Orbit - Modern Social Media Platform

A premium, fully-featured social media application built with React, Vite, Tailwind CSS, and Framer Motion. Orbit combines the best aspects of Twitter and Instagram with integrated messaging, all wrapped in a beautiful, modern interface.

![Orbit](https://img.shields.io/badge/React-18.2.0-blue)
![Orbit](https://img.shields.io/badge/Vite-5.0.0-purple)
![Orbit](https://img.shields.io/badge/Tailwind-3.3.5-cyan)

## Features

### Core Functionality
- **Home Feed** - Create posts with text and multiple images, like and comment on posts
- **Discover** - Explore trending content with category filters and immersive theater mode
- **Messaging** - Real-time chat interface with typing indicators and auto-reply simulation
- **Notifications** - Stay updated with likes, comments, follows, and shares
- **Connections** - Manage your network and discover new people
- **Profile** - Customizable profile with cover images, stats, and post grid

### Design & UX
- **Premium Design** - Soft grays and whites for light mode, true black for dark mode
- **Smooth Animations** - Powered by Framer Motion for buttery-smooth transitions
- **Responsive Layout** - Three-column desktop layout that adapts seamlessly to mobile
- **Hidden Scrollbars** - Clean, modern aesthetic with invisible but functional scrolling
- **Theme Toggle** - Smooth transitions between light and dark modes with localStorage persistence
- **Gradient Accent** - Warm orange to amber gradient used strategically throughout

### Mobile Experience
- **Touch-Optimized** - 44px minimum touch targets for comfortable interaction
- **No Zoom on Input** - 16px input font size prevents iOS auto-zoom
- **Slide-Out Navigation** - Spring-animated mobile drawer with backdrop
- **Safe Area Support** - Proper handling of notched devices
- **Responsive Grid** - Adapts from three columns to single column seamlessly

### Technical Highlights
- **Error Boundary** - Graceful error handling with recovery options
- **Auto-Reply System** - Simulated conversations with realistic delays and responses
- **Image Fallbacks** - Robust error handling for failed image loads
- **Optimized Rendering** - Staggered animations and lazy rendering for performance
- **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation, visible focus states

## Getting Started

### Prerequisites
- Node.js 16+ installed on your system
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory:**
```bash
cd "C:\orbit testing"
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser:**
The app will automatically open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

The optimized production build will be in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
orbit/
├── public/
│   └── orbit-icon.svg          # App icon/favicon
├── src/
│   ├── components/
│   │   ├── sections/           # Main content sections
│   │   │   ├── Home.jsx        # Home feed
│   │   │   ├── Discover.jsx    # Discover with filters
│   │   │   ├── Chats.jsx       # Messaging interface
│   │   │   ├── Notifications.jsx
│   │   │   ├── Connections.jsx
│   │   │   └── Profile.jsx     # User profile
│   │   ├── ErrorBoundary.jsx   # Error handling
│   │   ├── Header.jsx          # Top navigation
│   │   ├── Sidebar.jsx         # Left sidebar
│   │   ├── RightSidebar.jsx    # Online users
│   │   ├── PostCard.jsx        # Post display
│   │   └── PostComposer.jsx    # Create posts
│   ├── context/
│   │   └── AppContext.jsx      # Global state management
│   ├── data/
│   │   └── mockData.js         # Realistic mock data
│   ├── utils/
│   │   └── helpers.js          # Utility functions
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## Design System

### Colors
- **Primary**: #FF8C42 (Warm Orange)
- **Amber**: #FFA500
- **Light Mode**: Soft grays and whites
- **Dark Mode**: True black (#000000) with zinc accents

### Typography
- **Font Family**: Urbanist (loaded from Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800

### Border Radius
- Cards: 16-24px (rounded-2xl to rounded-3xl)
- Buttons: 12px (rounded-xl)
- Avatars: 50% (fully rounded)

### Shadows
- Light Mode: Subtle soft shadows
- Dark Mode: Deeper, more pronounced shadows

## Key Features Explained

### Adaptive Theme System
The theme automatically detects system preferences and persists user choice to localStorage. Theme changes are applied before the first render to prevent flashing.

### Auto-Reply Messaging
When you send a message, the system simulates typing indicators and generates contextual replies after a random delay (1.5-2.5s), making the demo feel alive.

### Theater Mode
Clicking any post in Discover opens it in an immersive modal with the image large on one side and details on the other. Backdrop clicks and ESC key close the modal.

### Staggered Animations
Lists and grids animate items with sequential delays, creating a smooth, professional appearance as content loads.

### Smart Mobile Navigation
On mobile devices, tapping the logo toggles the slide-out navigation drawer. The drawer has a spring animation and closes automatically when selecting a nav item.

## Technologies Used

- **React 18.2** - UI library
- **Vite 5.0** - Build tool and dev server
- **Tailwind CSS 3.3** - Utility-first CSS framework
- **Framer Motion 10.16** - Animation library
- **Lucide React 0.292** - Icon library

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Portfolio-Ready Features

This project demonstrates:
- Complex state management without external libraries
- Responsive design patterns
- Animation best practices
- Accessibility considerations
- Error boundary implementation
- Clean code architecture
- Mock data generation
- Real-world UX patterns

## Customization

### Changing the Accent Color
Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    DEFAULT: '#YOUR_COLOR',
    // ...
  }
}
```

### Adding New Sections
1. Create a new component in `src/components/sections/`
2. Add it to the navigation in `src/components/Sidebar.jsx`
3. Import and route it in `src/App.jsx`

### Modifying Mock Data
Edit `src/data/mockData.js` to change users, posts, messages, etc.

## Contributing

This is a portfolio project, but feel free to fork and customize it for your own needs!

## License

MIT License - feel free to use this project for your portfolio or learning purposes.

## Acknowledgments

- Images from Unsplash
- Icons from Lucide
- Font from Google Fonts (Urbanist)

---

**Built with care as a portfolio piece showcasing modern React development practices**