import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLeaderboard } from '../../context/LeaderboardContext';
import { submitScore } from '../../services/firestore';

const ScoreSubmission = ({ score, gameData, onClose }) => {
  const { user } = useAuth();
  const { refreshLeaderboard } = useLeaderboard();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async () => {
    if (!user || isSubmitting || isSubmitted) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      await submitScore(user.uid, score, gameData);
      setIsSubmitted(true);
      refreshLeaderboard();
    } catch (err) {
      console.error('Error submitting score:', err);
      setError('Failed to submit score. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (!user) {
    return (
      <div className="bg-github-darker p-6 rounded-lg shadow-lg text-center">
        <h3 className="text-xl font-bold mb-4">Sign In to Submit Score</h3>
        <p className="mb-4 text-github-text">
          You need to sign in with GitHub to submit your score to the leaderboard.
        </p>
        <button
          onClick={() => {
            const event = new CustomEvent('navigate', { 
              detail: { page: 'login' } 
            });
            window.dispatchEvent(event);
          }}
          className="px-4 py-2 bg-github-btn hover:bg-github-btn-hover text-white rounded-md"
        >
          Sign In with GitHub
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-github-darker p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-4">Submit Your Score</h3>
      
      <div className="mb-6 p-4 bg-github-header rounded-lg">
        <div className="text-center">
          <p className="text-github-text">Your Score</p>
          <p className="text-3xl font-bold">{score.toLocaleString()}</p>
        </div>
      </div>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {isSubmitted ? (
        <div className="text-center">
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-md">
            Score submitted successfully!
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-github-btn hover:bg-github-btn-hover text-white rounded-md"
          >
            Close
          </button>
        </div>
      ) : (
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-github-darker text-github-text border border-github-border rounded-md hover:bg-github-header"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`px-4 py-2 bg-github-btn hover:bg-github-btn-hover text-white rounded-md ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <span className="inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2"></span>
                Submitting...
              </span>
            ) : (
              'Submit Score'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default ScoreSubmission;