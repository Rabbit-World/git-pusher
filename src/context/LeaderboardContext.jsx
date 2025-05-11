import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getTopScores, getUserScores } from '../services/firestore';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../services/firebase';

// Create the context
const LeaderboardContext = createContext();

// Provider component
export const LeaderboardProvider = ({ children }) => {
  const { user } = useAuth();
  const [topScores, setTopScores] = useState([]);
  const [userScores, setUserScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch top scores with real-time updates
  useEffect(() => {
    setLoading(true);
    
    // Create query for top 10 scores
    const leaderboardRef = collection(db, 'leaderboard');
    const q = query(leaderboardRef, orderBy('score', 'desc'), limit(10));
    
    // Set up real-time listener
    const unsubscribe = onSnapshot(q, 
      (querySnapshot) => {
        const scores = [];
        let rank = 1;
        
        querySnapshot.forEach((doc) => {
          scores.push({
            id: doc.id,
            rank,
            ...doc.data()
          });
          rank++;
        });
        
        setTopScores(scores);
        setLoading(false);
      },
      (err) => {
        console.error('Error getting leaderboard:', err);
        setError(err);
        setLoading(false);
      }
    );
    
    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  // Fetch user scores when user changes
  useEffect(() => {
    const fetchUserScores = async () => {
      if (user) {
        try {
          const scores = await getUserScores(user.uid);
          setUserScores(scores);
        } catch (err) {
          console.error('Error fetching user scores:', err);
          setError(err);
        }
      } else {
        setUserScores([]);
      }
    };

    fetchUserScores();
  }, [user]);

  // Refresh leaderboard data
  const refreshLeaderboard = async () => {
    try {
      setLoading(true);
      const scores = await getTopScores(10);
      setTopScores(scores);
      
      if (user) {
        const userScoreData = await getUserScores(user.uid);
        setUserScores(userScoreData);
      }
    } catch (err) {
      console.error('Error refreshing leaderboard:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  // Value to be provided to consumers
  const value = {
    topScores,
    userScores,
    loading,
    error,
    refreshLeaderboard
  };

  return (
    <LeaderboardContext.Provider value={value}>
      {children}
    </LeaderboardContext.Provider>
  );
};

// Custom hook to use the leaderboard context
export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext);
  if (context === undefined) {
    throw new Error('useLeaderboard must be used within a LeaderboardProvider');
  }
  return context;
};

export default LeaderboardContext;