import { useState, useEffect } from 'react';

const ScoreItem = ({ score, rank, highlight = false, showDate = false }) => {
  const [isNew, setIsNew] = useState(false);
  
  // Check if score is recent (less than 5 minutes old)
  useEffect(() => {
    if (score.timestamp) {
      const scoreTime = score.timestamp.seconds * 1000;
      const now = Date.now();
      const fiveMinutesAgo = now - 5 * 60 * 1000;
      
      if (scoreTime > fiveMinutesAgo) {
        setIsNew(true);
        
        // Remove "new" highlight after 10 seconds
        const timer = setTimeout(() => {
          setIsNew(false);
        }, 10000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [score.timestamp]);
  
  // Format date for display
  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString();
  };
  
  return (
    <tr 
      className={`border-b border-github-border transition-colors duration-300 ${
        highlight ? 'bg-github-highlight bg-opacity-20' : 'hover:bg-github-darker'
      } ${isNew ? 'animate-pulse' : ''}`}
    >
      <td className="py-3 px-4 text-left">
        {rank === 1 && (
          <span className="inline-block mr-1 text-yellow-500">👑</span>
        )}
        {rank}
      </td>
      <td className="py-3 px-4 text-left">
        <div className="flex items-center">
          {score.photoURL && (
            <img 
              src={score.photoURL} 
              alt={score.username} 
              className="w-8 h-8 rounded-full mr-2"
            />
          )}
          <span className="text-github-link">{score.username}</span>
          {isNew && (
            <span className="ml-2 px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">
              New!
            </span>
          )}
        </div>
      </td>
      <td className="py-3 px-4 text-right font-medium">
        {score.score.toLocaleString()}
      </td>
      {showDate && (
        <td className="py-3 px-4 text-right text-github-text">
          {formatDate(score.timestamp)}
        </td>
      )}
    </tr>
  );
};

export default ScoreItem;