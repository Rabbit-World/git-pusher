import { useState, useEffect } from 'react';
import CoinPusherGame from '../components/game/CoinPusherGame';
import MachineCarousel from '../components/game/MachineCarousel';

const GamePage = () => {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handleSelectMachine = (machine) => {
    setSelectedMachine(machine);
    setIsPlaying(false);
  };
  
  const startGame = () => {
    if (selectedMachine) {
      setIsPlaying(true);
    }
  };
  
  return (
    <div className="space-y-8">
      <section className="text-center py-4">
        <h1 className="text-3xl font-bold mb-2">Git Pusher Arcade</h1>
        <p className="text-github-text">Select a machine and start pushing coins!</p>
      </section>
      
      {!isPlaying ? (
        <div className="space-y-8">
          <MachineCarousel onSelectMachine={handleSelectMachine} />
          
          {selectedMachine && (
            <div className="text-center">
              <button 
                onClick={startGame}
                className="bg-github-btn hover:bg-github-btn-hover text-white px-8 py-3 rounded-md font-medium text-lg"
              >
                Start Game
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-8">
          <CoinPusherGame machine={selectedMachine} />
          
          <div className="text-center">
            <button 
              onClick={() => setIsPlaying(false)}
              className="bg-github-darker hover:bg-github-header text-github-text px-6 py-2 rounded-md border border-github-border"
            >
              Change Machine
            </button>
          </div>
        </div>
      )}
      
      <section className="bg-github-header rounded-lg p-6 shadow-lg max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-4">Game Tips</h2>
        <ul className="list-disc list-inside space-y-2 text-github-text">
          <li>Time your coin drops carefully to maximize your returns</li>
          <li>Look for special GitHub items that give bonus points</li>
          <li>Some machines have different physics and payout rates</li>
          <li>Connect your GitHub account to save your progress</li>
          <li>Complete daily challenges to earn extra coins</li>
        </ul>
      </section>
    </div>
  );
};

export default GamePage;