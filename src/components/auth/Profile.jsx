import { useAuth } from '../../context/AuthContext';
import { useLeaderboard } from '../../context/LeaderboardContext';
import { signOutUser } from '../../services/auth';

const Profile = () => {
  const { user, userProfile, authLoading, profileLoading } = useAuth();
  const { userScores, loading: scoresLoading } = useLeaderboard();
  
  const handleSignOut = async () => {
    try {
      await signOutUser();
      // Navigation will be handled by AuthContext
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  if (authLoading || profileLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-6">
        <div className="w-10 h-10 border-4 border-github-btn border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-github-text">Loading profile...</p>
      </div>
    );
  }
  
  if (!user || !userProfile) {
    return (
      <div className="text-center p-6">
        <p className="text-github-text">Please sign in to view your profile.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-github-darker rounded-lg shadow-lg overflow-hidden">
      {/* Profile Header */}
      <div className="bg-github-header p-6 flex flex-col md:flex-row items-center">
        <img 
          src={userProfile.photoURL} 
          alt={userProfile.displayName} 
          className="w-24 h-24 rounded-full border-4 border-github-border"
        />
        <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
          <h2 className="text-2xl font-bold">{userProfile.displayName}</h2>
          <p className="text-github-text">@{userProfile.username}</p>
          <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-4">
            <div className="bg-github-darker px-3 py-1 rounded-full text-sm">
              Games: {userProfile.gamesPlayed || 0}
            </div>
            <div className="bg-github-darker px-3 py-1 rounded-full text-sm">
              High Score: {userProfile.highestScore?.toLocaleString() || 0}
            </div>
          </div>
        </div>
        <div className="ml-auto mt-4 md:mt-0">
          <button 
            onClick={handleSignOut}
            className="px-4 py-2 bg-github-btn hover:bg-github-btn-hover text-white rounded-md"
          >
            Sign Out
          </button>
        </div>
      </div>
      
      {/* Stats Section */}
      <div className="p-6 border-t border-github-border">
        <h3 className="text-xl font-bold mb-4">Your Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-github-header p-4 rounded-lg">
            <p className="text-github-text text-sm">Total Score</p>
            <p className="text-2xl font-bold">{userProfile.totalScore?.toLocaleString() || 0}</p>
          </div>
          <div className="bg-github-header p-4 rounded-lg">
            <p className="text-github-text text-sm">Highest Score</p>
            <p className="text-2xl font-bold">{userProfile.highestScore?.toLocaleString() || 0}</p>
          </div>
          <div className="bg-github-header p-4 rounded-lg">
            <p className="text-github-text text-sm">Games Played</p>
            <p className="text-2xl font-bold">{userProfile.gamesPlayed || 0}</p>
          </div>
        </div>
      </div>
      
      {/* Recent Scores */}
      <div className="p-6 border-t border-github-border">
        <h3 className="text-xl font-bold mb-4">Recent Scores</h3>
        {scoresLoading ? (
          <div className="flex justify-center p-4">
            <div className="w-6 h-6 border-2 border-github-btn border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : userScores.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-github-border">
                  <th className="py-2 text-left">Score</th>
                  <th className="py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {userScores.map((score) => (
                  <tr key={score.id} className="border-b border-github-border">
                    <td className="py-3 text-left font-medium">{score.score.toLocaleString()}</td>
                    <td className="py-3 text-left text-github-text">
                      {score.timestamp ? new Date(score.timestamp.seconds * 1000).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-github-text text-center py-4">No scores yet. Start playing to record your scores!</p>
        )}
      </div>
    </div>
  );
};

export default Profile;