import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp,
  where
} from 'firebase/firestore';
import { db } from './firebase';

/**
 * Get top scores from the leaderboard
 * @param {number} limitCount Number of scores to retrieve
 * @returns {Promise<Array>} Array of top scores
 */
export const getTopScores = async (limitCount = 10) => {
  try {
    const leaderboardRef = collection(db, 'leaderboard');
    const q = query(leaderboardRef, orderBy('score', 'desc'), limit(limitCount));
    const querySnapshot = await getDocs(q);
    
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
    
    return scores;
  } catch (error) {
    console.error('Error getting top scores:', error);
    throw error;
  }
};

/**
 * Get user's personal scores
 * @param {string} userId User ID
 * @param {number} limitCount Number of scores to retrieve
 * @returns {Promise<Array>} Array of user scores
 */
export const getUserScores = async (userId, limitCount = 5) => {
  try {
    const userScoresRef = collection(db, 'leaderboard');
    const q = query(
      userScoresRef, 
      where('userId', '==', userId),
      orderBy('score', 'desc'), 
      limit(limitCount)
    );
    
    const querySnapshot = await getDocs(q);
    const scores = [];
    
    querySnapshot.forEach((doc) => {
      scores.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    return scores;
  } catch (error) {
    console.error('Error getting user scores:', error);
    throw error;
  }
};

/**
 * Submit a new score to the leaderboard
 * @param {string} userId User ID
 * @param {number} score Score value
 * @param {Object} gameData Additional game data
 * @returns {Promise<string>} ID of the new score document
 */
export const submitScore = async (userId, score, gameData = {}) => {
  try {
    // Get user data
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error('User not found');
    }
    
    const userData = userSnap.data();
    
    // Create score entry
    const scoreData = {
      userId,
      username: userData.username || userData.displayName,
      photoURL: userData.photoURL,
      score,
      timestamp: serverTimestamp(),
      ...gameData
    };
    
    // Add to leaderboard collection
    const leaderboardRef = collection(db, 'leaderboard');
    const newScoreRef = doc(leaderboardRef);
    await setDoc(newScoreRef, scoreData);
    
    // Update user stats
    const userStats = {
      lastScore: score,
      lastPlayed: serverTimestamp(),
      gamesPlayed: (userData.gamesPlayed || 0) + 1,
      totalScore: (userData.totalScore || 0) + score,
    };
    
    // Update highest score if current score is higher
    if (!userData.highestScore || score > userData.highestScore) {
      userStats.highestScore = score;
    }
    
    await updateDoc(userRef, userStats);
    
    return newScoreRef.id;
  } catch (error) {
    console.error('Error submitting score:', error);
    throw error;
  }
};

/**
 * Get user profile data
 * @param {string} userId User ID
 * @returns {Promise<Object>} User profile data
 */
export const getUserProfile = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      throw new Error('User not found');
    }
    
    return userSnap.data();
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw error;
  }
};