# Setup and Installation Guide

This document provides detailed instructions for setting up and installing the Git Pusher application for both development and production environments.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 16.x or higher
- **npm**: Version 8.x or higher (comes with Node.js)
- **Git**: For version control

You'll also need:
- A GitHub account (for authentication)
- A Firebase account (for backend services)
- A Vercel account (for deployment)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone https://github.com/rabbit.world/git-pusher.git
cd git-pusher
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Firebase Configuration

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication with GitHub provider
3. Create a Firestore database
4. Register a web application in your Firebase project
5. Copy the Firebase configuration

### 4. Environment Configuration

1. Create a `.env` file in the root directory based on the `.env.example` template:

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

2. Replace the placeholder values with your Firebase configuration

### 5. GitHub OAuth Setup

1. Go to your GitHub account settings
2. Navigate to Developer Settings > OAuth Apps > New OAuth App
3. Fill in the application details:
   - Application name: Git Pusher (or your preferred name)
   - Homepage URL: `http://localhost:5173` (for development)
   - Authorization callback URL: Copy from Firebase Authentication settings
4. Register the application and copy the Client ID and Client Secret
5. In Firebase Authentication, configure the GitHub provider with these credentials

### 6. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Production Deployment

### 1. Vercel Setup

1. Create a Vercel account at [https://vercel.com/](https://vercel.com/)
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Login to Vercel:
   ```bash
   vercel login
   ```

### 2. GitHub Repository Configuration

1. Push your code to a GitHub repository
2. Connect your GitHub repository to Vercel through the Vercel dashboard
3. Configure the build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm ci`

### 3. Environment Variables

Add the following environment variables in the Vercel project settings:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

### 4. GitHub Actions Setup

For automated deployments using GitHub Actions:

1. Get your Vercel token from your Vercel account settings
2. Add the following secrets to your GitHub repository:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
   - All Firebase environment variables (as listed above)

The GitHub Actions workflow is already configured in `.github/workflows/vercel-deploy.yml`

### 5. Manual Deployment

If you prefer to deploy manually:

```bash
npm run build
vercel --prod
```

## Firestore Database Setup

### 1. Create Collections

Create the following collections in your Firestore database:

1. `users`: To store user profiles
   - Fields: `uid`, `displayName`, `email`, `photoURL`, `highestScore`, `totalScore`, `gamesPlayed`, `lastPlayed`

2. `leaderboard`: To store game scores
   - Fields: `userId`, `username`, `photoURL`, `score`, `timestamp`, plus any game-specific data

### 2. Security Rules

Set up the following security rules for your Firestore database:

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

## Troubleshooting

### Common Issues

1. **Firebase Configuration Errors**:
   - Ensure all environment variables are correctly set
   - Check that the Firebase project has the correct services enabled

2. **GitHub Authentication Issues**:
   - Verify the OAuth callback URL matches exactly what's in Firebase
   - Ensure the GitHub OAuth app is properly configured

3. **Build Errors**:
   - Clear the `.cache` directory and node_modules: `rm -rf .cache node_modules && npm install`
   - Ensure all dependencies are installed: `npm ci`

4. **Deployment Issues**:
   - Check that all required environment variables are set in Vercel
   - Verify GitHub Actions secrets are correctly configured

For more detailed troubleshooting, refer to the [Troubleshooting Guide](./troubleshooting.md).