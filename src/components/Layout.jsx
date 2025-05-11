import { useState } from 'react';

const Layout = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    
    // This would be replaced with actual routing in a more complete implementation
    // For now, we'll use a simple event to communicate with the App component
    const event = new CustomEvent('navigate', { detail: { page } });
    window.dispatchEvent(event);
  };

  return (
    <div className="min-h-screen bg-github-dark text-github-text">
      {/* Header */}
      <header className="bg-github-header border-b border-github-border">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/assets/github-logo.png" 
              alt="Git Pusher Logo" 
              className="h-8 w-8 cursor-pointer"
              onClick={() => navigateTo('home')}
            />
            <h1 
              className="text-xl font-bold cursor-pointer"
              onClick={() => navigateTo('home')}
            >
              Git Pusher
            </h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
              className={`${currentPage === 'home' ? 'text-white' : 'text-github-text hover:text-white'}`}
            >
              Home
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigateTo('game'); }}
              className={`${currentPage === 'game' ? 'text-white' : 'text-github-text hover:text-white'}`}
            >
              Play
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigateTo('leaderboard'); }}
              className={`${currentPage === 'leaderboard' ? 'text-white' : 'text-github-text hover:text-white'}`}
            >
              Leaderboard
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); navigateTo('profile'); }}
              className={`${currentPage === 'profile' ? 'text-white' : 'text-github-text hover:text-white'}`}
            >
              Profile
            </a>
          </nav>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-github-text hover:text-white"
            >
              {isMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-github-header border-t border-github-border">
            <div className="container mx-auto px-4 py-2">
              <nav className="flex flex-col space-y-2">
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); navigateTo('home'); }}
                  className={`py-2 ${currentPage === 'home' ? 'text-white' : 'text-github-text hover:text-white'}`}
                >
                  Home
                </a>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); navigateTo('game'); }}
                  className={`py-2 ${currentPage === 'game' ? 'text-white' : 'text-github-text hover:text-white'}`}
                >
                  Play
                </a>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); navigateTo('leaderboard'); }}
                  className={`py-2 ${currentPage === 'leaderboard' ? 'text-white' : 'text-github-text hover:text-white'}`}
                >
                  Leaderboard
                </a>
                <a 
                  href="#" 
                  onClick={(e) => { e.preventDefault(); navigateTo('profile'); }}
                  className={`py-2 ${currentPage === 'profile' ? 'text-white' : 'text-github-text hover:text-white'}`}
                >
                  Profile
                </a>
              </nav>
            </div>
          </div>
        )}
      </header>
      
      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-github-header border-t border-github-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-github-text">
                &copy; {new Date().getFullYear()} Git Pusher. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-github-text hover:text-white text-sm">Terms</a>
              <a href="#" className="text-github-text hover:text-white text-sm">Privacy</a>
              <a href="#" className="text-github-text hover:text-white text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;