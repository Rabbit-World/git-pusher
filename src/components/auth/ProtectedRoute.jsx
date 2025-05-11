import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

/**
 * ProtectedRoute component that redirects to login page if user is not authenticated
 * @param {Object} props Component props
 * @param {React.ReactNode} props.children Child components to render if authenticated
 * @param {Function} props.onRedirect Function to call for redirection if not authenticated
 * @returns {React.ReactNode} Children if authenticated, null if redirecting
 */
const ProtectedRoute = ({ children, onRedirect }) => {
  const { user, authLoading } = useAuth();
  
  useEffect(() => {
    // If authentication check is complete and user is not logged in
    if (!authLoading && !user) {
      // Trigger navigation to login page
      if (onRedirect && typeof onRedirect === 'function') {
        onRedirect();
      } else {
        // Dispatch a custom navigation event as fallback
        const event = new CustomEvent('navigate', { 
          detail: { page: 'login' } 
        });
        window.dispatchEvent(event);
      }
    }
  }, [user, authLoading, onRedirect]);
  
  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <div className="w-10 h-10 border-4 border-github-btn border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-github-text">Checking authentication...</p>
      </div>
    );
  }
  
  // If authenticated, render children
  return user ? children : null;
};

export default ProtectedRoute;