import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import Login from './components/auth/Login';
import { AuthProvider } from './context/AuthContext';
import { LeaderboardProvider } from './context/LeaderboardContext';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleNavigation = (event) => {
      setCurrentPage(event.detail.page);
    };

    window.addEventListener('navigate', handleNavigation);
    
    return () => {
      window.removeEventListener('navigate', handleNavigation);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'game':
        return <GamePage />;
      case 'leaderboard':
        return <LeaderboardPage />;
      case 'profile':
        return <ProfilePage />;
      case 'login':
        return (
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto">
              <h1 className="text-3xl font-bold mb-8 text-center">Sign In</h1>
              <Login />
            </div>
          </div>
        );
      default:
        return <HomePage />;
    }
  };

  return (
    <AuthProvider>
      <LeaderboardProvider>
        <Layout>
          {renderPage()}
        </Layout>
      </LeaderboardProvider>
    </AuthProvider>
  );
}

export default App;