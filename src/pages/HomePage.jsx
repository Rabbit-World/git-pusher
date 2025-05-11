import { useState } from 'react';
import MachineCarousel from '../components/game/MachineCarousel';
import LeaderboardPreview from '../components/leaderboard/LeaderboardPreview';
import AuthButton from '../components/auth/AuthButton';

const HomePage = () => {
  const [selectedMachine, setSelectedMachine] = useState(null);

  const handleSelectMachine = (machine) => {
    setSelectedMachine(machine);
  };

  const navigateToGame = () => {
    const event = new CustomEvent('navigate', { detail: { page: 'game' } });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-4xl font-bold mb-4">Git Pusher</h1>
        <p className="text-xl text-github-text max-w-2xl mx-auto mb-6">
          A GitHub-themed coin pusher arcade game. Select a machine, push coins, and climb the leaderboard!
        </p>
        <div className="flex justify-center space-x-4">
          <AuthButton />
          <button 
            onClick={navigateToGame}
            className="bg-github-btn hover:bg-github-btn-hover text-white px-4 py-2 rounded-md"
          >
            Play Now
          </button>
        </div>
      </section>

      <section className="py-4">
        <div className="flex justify-center mb-8">
          <img 
            src="/assets/contribution-graph.png" 
            alt="GitHub Contribution Graph" 
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        
        <div className="bg-github-header rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">How to Play</h2>
          <ol className="list-decimal list-inside space-y-2 text-github-text">
            <li>Select one of our GitHub-themed coin pusher machines</li>
            <li>Use your coins to push more coins off the edge</li>
            <li>Collect special GitHub items for bonus points</li>
            <li>Compete with other developers on the leaderboard</li>
            <li>Unlock achievements to level up your GitHub profile</li>
          </ol>
        </div>
      </section>

      <section className="py-8">
        <MachineCarousel onSelectMachine={handleSelectMachine} />
        {selectedMachine && (
          <div className="text-center mt-6">
            <button 
              onClick={navigateToGame}
              className="bg-github-btn hover:bg-github-btn-hover text-white px-6 py-3 rounded-md font-medium"
            >
              Play {selectedMachine.name}
            </button>
          </div>
        )}
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="bg-github-header rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Features</h2>
          <div className="grid gap-4">
            <div className="bg-github-darker p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">GitHub Integration</h3>
              <p className="text-github-text">Connect with your GitHub account to track progress and earn special rewards based on your real contributions.</p>
            </div>
            <div className="bg-github-darker p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Global Leaderboard</h3>
              <p className="text-github-text">Compete with developers worldwide to see who can push the most coins and earn the highest score.</p>
            </div>
            <div className="bg-github-darker p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Special Events</h3>
              <p className="text-github-text">Participate in limited-time events themed around GitHub features and milestones.</p>
            </div>
          </div>
        </section>
        
        <section>
          <LeaderboardPreview />
        </section>
      </div>
    </div>
  );
};

export default HomePage;