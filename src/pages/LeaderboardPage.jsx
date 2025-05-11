import LeaderboardList from '../components/leaderboard/LeaderboardList';

const LeaderboardPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Git Pusher Leaderboard</h1>
        <LeaderboardList />
      </div>
    </div>
  );
};

export default LeaderboardPage;