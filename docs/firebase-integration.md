# Firebase Integration Guide

This document provides instructions for setting up and using the Firebase authentication and leaderboard functionality in the Git Pusher game.

## Table of Contents

1. [Firebase Project Setup](#firebase-project-setup)
2. [Environment Configuration](#environment-configuration)
3. [Authentication](#authentication)
4. [Leaderboard](#leaderboard)
5. [Deployment](#deployment)
6. [Troubleshooting](#troubleshooting)

## Firebase Project Setup

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Once your project is created, click on "Web" (</>) to add a web app to your project
4. Register your app with a nickname (e.g., "Git Pusher")
5. Copy the Firebase configuration object for later use

### Enable Authentication

1. In the Firebase Console, go to "Authentication" > "Sign-in method"
2. Enable "GitHub" as a sign-in provider
3. You'll need to register your app on GitHub:
   - Go to [GitHub Developer Settings](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Fill in the application details:
     - Application name: Git Pusher
     - Homepage URL: Your application URL (e.g., `https://your-app.vercel.app`)
     - Authorization callback URL: Copy this from the Firebase console
   - Click "Register application"
   - Copy the Client ID and Client Secret
4. Back in Firebase Console, paste the GitHub Client ID and Client Secret
5. Save the changes

### Set Up Firestore Database

1. In the Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Start in production mode or test mode (you can adjust security rules later)
4. Choose a database location close to your target users
5. Create the following collections:
   - `users`: To store user profiles
   - `leaderboard`: To store game scores

6. Set up security rules for your database:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to read leaderboard data
    match /leaderboard/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Allow users to read all profiles but only modify their own
    match /users/{userId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Environment Configuration

1. Create a `.env` file in the root of your project based on the `.env.example` template
2. Fill in the Firebase configuration values from your Firebase project:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

## Authentication

The application uses Firebase Authentication with GitHub as the provider. Here's how it works:

1. Users click the "Sign In with GitHub" button
2. They are redirected to GitHub to authorize the application
3. After successful authorization, they are redirected back to the application
4. A user document is created or updated in the Firestore `users` collection

### Authentication Components

- `AuthButton.jsx`: Button component for signing in/out
- `Login.jsx`: Full login page component
- `Profile.jsx`: User profile display component
- `ProtectedRoute.jsx`: Component to protect routes that require authentication

### Authentication Context

The `AuthContext.jsx` provides authentication state throughout the application:

```jsx
// Example usage
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, authLoading } = useAuth();
  
  if (authLoading) return <p>Loading...</p>;
  
  return isAuthenticated ? <p>Welcome, {user.displayName}!</p> : <p>Please sign in</p>;
}
```

## Leaderboard

The leaderboard functionality allows users to submit scores and view top players.

### Leaderboard Components

- `LeaderboardPreview.jsx`: Compact leaderboard for the homepage
- `LeaderboardList.jsx`: Full leaderboard with filtering options
- `ScoreItem.jsx`: Individual score display component
- `ScoreSubmission.jsx`: Component for submitting new scores

### Leaderboard Context

The `LeaderboardContext.jsx` provides leaderboard data throughout the application:

```jsx
// Example usage
import { useLeaderboard } from '../context/LeaderboardContext';

function MyComponent() {
  const { topScores, userScores, loading, refreshLeaderboard } = useLeaderboard();
  
  if (loading) return <p>Loading scores...</p>;
  
  return (
    <div>
      <h2>Top Scores</h2>
      {topScores.map(score => (
        <div key={score.id}>{score.username}: {score.score}</div>
      ))}
      <button onClick={refreshLeaderboard}>Refresh</button>
    </div>
  );
}
```

### Submitting Scores

To submit a score from the game:

```jsx
import { submitScore } from '../services/firestore';
import { useAuth } from '../context/AuthContext';

function GameComponent() {
  const { user } = useAuth();
  
  const handleGameOver = async (score) => {
    if (user) {
      try {
        await submitScore(user.uid, score, {
          // Additional game data
          level: currentLevel,
          coins: coinsCollected,
          // etc.
        });
        console.log('Score submitted successfully!');
      } catch (error) {
        console.error('Error submitting score:', error);
      }
    }
  };
  
  // Game logic...
}
```

## Deployment

The project is configured for deployment to Vercel using GitHub Actions.

### GitHub Actions Workflow

The `.github/workflows/vercel-deploy.yml` file contains the workflow configuration for automatic deployment to Vercel when changes are pushed to the main branch.

### Environment Variables for CI/CD

For the GitHub Actions workflow to work, you need to add the following secrets to your GitHub repository:

1. `VERCEL_TOKEN`: Your Vercel API token
2. `VERCEL_ORG_ID`: Your Vercel organization ID
3. `VERCEL_PROJECT_ID`: Your Vercel project ID
4. All Firebase environment variables:
   - `FIREBASE_API_KEY`
   - `FIREBASE_AUTH_DOMAIN`
   - `FIREBASE_PROJECT_ID`
   - `FIREBASE_STORAGE_BUCKET`
   - `FIREBASE_MESSAGING_SENDER_ID`
   - `FIREBASE_APP_ID`
   - `FIREBASE_MEASUREMENT_ID`

## Troubleshooting

### Authentication Issues

1. **GitHub OAuth Error**: Ensure your GitHub OAuth app has the correct callback URL and that the client ID and secret are correctly configured in Firebase.

2. **CORS Issues**: If you encounter CORS errors, make sure your Firebase project has the correct authorized domains in the Firebase Console under Authentication > Settings > Authorized Domains.

### Firestore Issues

1. **Permission Denied**: Check your Firestore security rules to ensure they allow the operations you're trying to perform.

2. **Missing Data**: If leaderboard data isn't appearing, check the browser console for errors and verify that your queries are correctly structured.

### Deployment Issues

1. **Environment Variables**: Ensure all required environment variables are set in your Vercel project and GitHub repository secrets.

2. **Build Failures**: Check the GitHub Actions logs for any build errors and fix them accordingly.