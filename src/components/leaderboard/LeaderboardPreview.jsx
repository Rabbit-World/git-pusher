import { useLeaderboard } from '../../context/LeaderboardContext';

const LeaderboardPreview = () => {
  const { topScores, loading, error } = useLeaderboard();

  if (loading) {
    return (
      <div className="bg-github-header rounded-lg shadow-lg p-4 flex flex-col items-center justify-center min-h-[300px]">
        <div className="w-8 h-8 border-3 border-t-transparent border-github-btn rounded-full animate-spin"></div>
        <p className="mt-3 text-github-text">Loading leaderboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-github-header rounded-lg shadow-lg p-4">
        <h2 className="text-xl font-bold mb-4">Top Players</h2>
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          Error loading leaderboard. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-github-header rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold mb-4">Top Players</h2>
      
      {topScores.length === 0 ? (
        <p className="text-center py-8 text-github-text">
          No scores yet. Be the first to play and get on the leaderboard!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-github-border">
                <th className="py-2 text-left">Rank</th>
                <th className="py-2 text-left">Username</th>
                <th className="py-2 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              {topScores.map((player) => (
                <tr 
                  key={player.id} 
                  className="border-b border-github-border hover:bg-github-darker"
                >
                  <td className="py-3 text-left">{player.rank}</td>
                  <td className="py-3 text-left">
                    <div className="flex items-center">
                      {player.photoURL && (
                        <img 
                          src={player.photoURL} 
                          alt={player.username} 
                          className="w-6 h-6 rounded-full mr-2"
                        />
                      )}
                      <span className="text-github-link">{player.username}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right">{player.score.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-4 text-center">
        <button 
          onClick={() => {
            const event = new CustomEvent('navigate', { 
              detail: { page: 'leaderboard' } 
            });
            window.dispatchEvent(event);
          }}
          className="text-github-link hover:underline text-sm"
        >
          View Full Leaderboard
        </button>
      </div>
    </div>
  );
};

export default LeaderboardPreview;