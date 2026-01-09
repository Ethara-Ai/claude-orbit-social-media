import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useApp } from './context/AppContext';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import RightSidebar from './components/RightSidebar';
import Home from './components/sections/Home';
import Discover from './components/sections/Discover';
import Chats from './components/sections/Chats';
import Notifications from './components/sections/Notifications';
import Connections from './components/sections/Connections';
import Profile from './components/sections/Profile';

function App() {
  const { activeTab, isMobileMenuOpen } = useApp();

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'discover':
        return <Discover />;
      case 'chats':
        return <Chats />;
      case 'notifications':
        return <Notifications />;
      case 'connections':
        return <Connections />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50 dark:bg-black transition-colors duration-200">
        <Header />

        <div className="max-w-[1600px] mx-auto pt-16">
          <div className="flex">
            {/* Left Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 lg:ml-80 xl:mr-80 min-h-screen">
              <div className="p-6">
                <AnimatePresence mode="wait">
                  <div key={activeTab}>
                    {renderContent()}
                  </div>
                </AnimatePresence>
              </div>
            </main>

            {/* Right Sidebar */}
            <RightSidebar />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
