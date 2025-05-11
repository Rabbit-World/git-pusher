import { useState } from 'react';
import { useLeaderboard } from '../../context/LeaderboardContext';
import { useAuth } from '../../context/AuthContext';
import ScoreItem from './ScoreItem';

const LeaderboardList = () => {
  const { topScores, userScores, loading, error, refreshLeaderboard } = useLeaderboard();
  const { user } = useAuth();
  const [filter, setFilter] = useState('all'); // 'all' or 'personal'
  
  const handleRefresh = () => {
    refreshLeaderboard();
  };
  
  if (loading) {
    return (
      <div className="bg-github-header rounded-lg shadow-lg p-6 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-t-transparent border-github-btn rounded-full animate-spin"></div>
        <p className="mt-4 text-github-text">Loading leaderboard data...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-github-header rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          Error loading leaderboard. Please try again later.
        </div>
        <button
          onClick={handleRefresh}
          className="mt-4 px-4 py-2 bg-github-btn hover:bg-github-btn-hover text-white rounded-md"
        >
          Try Again
        </button>
      </div>
    );
  }
  
  const displayScores = filter === 'personal' ? userScores : topScores;
  const isPersonalEmpty = userScores.length === 0;
  
  return (
    <div className="bg-github-header rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        
        <div className="flex items-center mt-4 md:mt-0">
          <div className="flex bg-github-darker rounded-md overflow-hidden mr-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm ${
                filter === 'all' 
                  ? 'bg-github-btn text-white' 
                  : 'text-github-text hover:bg-github-border'
              }`}
            >
              All Players
            </button>
            <button
              onClick={() => setFilter('personal')}
              disabled={!user}
              className={`px-4 py-2 text-sm ${
                !user 
                  ? 'opacity-50 cursor-not-allowed text-github-text' 
                  : filter === 'personal'
                    ? 'bg-github-btn text-white'
                    : 'text-github-text hover:bg-github-border'
              }`}
            >
              My Scores
            </button>
          </div>
          
          <button
            onClick={handleRefresh}
            className="p-2 rounded-md hover:bg-github-darker"
            title="Refresh leaderboard"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
      
      {displayScores.length === 0 ? (
        <div className="text-center py-12 bg-github-darker rounded-lg">
          {filter === 'personal' ? (
            <>
              <p className="text-xl mb-2">You haven't submitted any scores yet.</p>
              <p className="text-github-text">Play the game to get on the leaderboard!</p>
            </>
          ) : (
            <>
              <p className="text-xl mb-2">No scores on the leaderboard yet.</p>
              <p className="text-github-text">Be the first to play and submit your score!</p>
            </>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-github-border">
                <th className="py-2 px-4 text-left">Rank</th>
                <th className="py-2 px-4 text-left">Player</th>
                <th className="py-2 px-4 text-right">Score</th>
                {filter === 'personal' && (
                  <th className="py-2 px-4 text-right">Date</th>
                )}
              </tr>
            </thead>
            <tbody>
              {displayScores.map((score, index) => (
                <ScoreItem 
                  key={score.id}
                  score={score}
                  rank={filter === 'personal' ? index + 1 : score.rank}
                  highlight={user && score.userId === user.uid}
                  showDate={filter === 'personal'}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {filter === 'all' && user && !isPersonalEmpty && (
        <div className="mt-8 pt-6 border-t border-github-border">
          <h3 className="text-xl font-bold mb-4">Your Best Score</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-github-border">
                  <th className="py-2 px-4 text-left">Rank</th>
                  <th className="py-2 px-4 text-left">Player</th>
                  <th className="py-2 px-4 text-right">Score</th>
                  <th className="py-2 px-4 text-right">Date</th>
                </tr>
              </thead>
              <tbody>
                <ScoreItem 
                  score={userScores[0]}
                  rank={1}
                  highlight={true}
                  showDate={true}
                />
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardList;