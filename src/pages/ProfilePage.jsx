import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Profile from '../components/auth/Profile';
import Login from '../components/auth/Login';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const ProfilePage = () => {
  const { user, authLoading } = useAuth();
  
  // Redirect to login if not authenticated
  const handleRedirect = () => {
    // This is handled by the ProtectedRoute component
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Profile</h1>
        
        {authLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="w-10 h-10 border-4 border-t-transparent border-github-btn rounded-full animate-spin"></div>
          </div>
        ) : user ? (
          <ProtectedRoute onRedirect={handleRedirect}>
            <Profile />
          </ProtectedRoute>
        ) : (
          <div className="max-w-md mx-auto">
            <Login />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;