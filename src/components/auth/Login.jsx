import { useState } from 'react';
import { signInWithGithub } from '../../services/auth';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGithubLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await signInWithGithub();
      // Navigate to home or previous page would happen automatically
      // through the AuthContext and App component
    } catch (err) {
      console.error('Login error:', err);
      setError('Failed to sign in with GitHub. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-github-darker rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Sign In to Git Pusher</h2>
      
      <p className="text-center mb-6 text-github-text">
        Sign in with your GitHub account to track your scores and compete on the leaderboard.
      </p>
      
      <button
        onClick={handleGithubLogin}
        disabled={isLoading}
        className={`w-full flex items-center justify-center px-4 py-3 rounded-md bg-github-btn hover:bg-github-btn-hover text-white font-medium ${
          isLoading ? 'opacity-70 cursor-not-allowed' : ''
        }`}
      >
        {isLoading ? (
          <span className="inline-block w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
        ) : (
          <svg 
            className="w-6 h-6 mr-2" 
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        )}
        Sign In with GitHub
      </button>
      
      {error && (
        <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <div className="mt-6 text-sm text-github-text">
        <p>By signing in, you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </div>
  );
};

export default Login;