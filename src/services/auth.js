import { 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import { auth, db, githubProvider } from './firebase';

/**
 * Sign in with GitHub OAuth
 * @returns {Promise} User credential
 */
export const signInWithGithub = async () => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    
    // Create or update user document in Firestore
    const user = result.user;
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    // Get additional GitHub profile info from user
    const githubUser = {
      uid: user.uid,
      displayName: user.displayName || 'GitHub User',
      email: user.email,
      photoURL: user.photoURL,
      username: user.reloadUserInfo.screenName || user.displayName,
      lastLogin: serverTimestamp(),
    };
    
    if (!userSnap.exists()) {
      // Create new user
      await setDoc(userRef, {
        ...githubUser,
        createdAt: serverTimestamp(),
        totalScore: 0,
        highestScore: 0,
        gamesPlayed: 0
      });
    } else {
      // Update existing user
      await setDoc(userRef, {
        ...githubUser
      }, { merge: true });
    }
    
    return result;
  } catch (error) {
    console.error('Error signing in with GitHub:', error);
    throw error;
  }
};

/**
 * Sign out the current user
 * @returns {Promise} Void
 */
export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

/**
 * Get the current authenticated user
 * @returns {Object|null} Current user or null
 */
export const getCurrentUser = () => {
  return auth.currentUser;
};

/**
 * Subscribe to auth state changes
 * @param {Function} callback Function to call when auth state changes
 * @returns {Function} Unsubscribe function
 */
export const onAuthStateChangedListener = (callback) => {
  return onAuthStateChanged(auth, callback);
};