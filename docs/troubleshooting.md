# Troubleshooting Guide

This document provides solutions for common issues you might encounter when setting up, developing, or deploying the Git Pusher application.

## Table of Contents

1. [Development Environment Issues](#development-environment-issues)
2. [Firebase Configuration Issues](#firebase-configuration-issues)
3. [Authentication Problems](#authentication-problems)
4. [Game Mechanics Issues](#game-mechanics-issues)
5. [Deployment Problems](#deployment-problems)
6. [Performance Issues](#performance-issues)

## Development Environment Issues

### Vite Development Server Won't Start

**Symptoms:**
- Error when running `npm run dev`
- Server starts but with errors

**Solutions:**
1. Check Node.js version (should be v16+):
   ```bash
   node --version
   ```

2. Clear npm cache and reinstall dependencies:
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

3. Check for port conflicts:
   ```bash
   # Find and kill process using port 5173
   lsof -i :5173
   kill -9 [PID]
   ```

4. Verify Vite configuration in `vite.config.js`

### Tailwind CSS Styles Not Applied

**Symptoms:**
- UI elements missing styling
- Default HTML styles showing instead of Tailwind styles

**Solutions:**
1. Check if Tailwind is properly imported in `src/main.jsx`

2. Verify Tailwind configuration:
   ```bash
   cat tailwind.config.js
   ```

3. Rebuild the Tailwind CSS:
   ```bash
   npx tailwindcss -i ./src/styles/input.css -o ./src/styles/output.css
   ```

4. Check browser console for CSS-related errors

## Firebase Configuration Issues

### Firebase Initialization Failed

**Symptoms:**
- Console errors about Firebase configuration
- Authentication or database operations failing

**Solutions:**
1. Verify environment variables in `.env` file:
   ```bash
   cat .env | grep FIREBASE
   ```

2. Ensure all required Firebase configuration values are present:
   - API Key
   - Auth Domain
   - Project ID
   - Storage Bucket
   - Messaging Sender ID
   - App ID
   - Measurement ID

3. Check if Firebase project exists and services are enabled in Firebase Console

4. Verify Firebase initialization in `src/services/firebase.js`

### Firestore Permission Denied

**Symptoms:**
- Console errors about insufficient permissions
- Data not loading or saving

**Solutions:**
1. Check Firestore security rules in Firebase Console

2. Verify user authentication state when accessing Firestore

3. Ensure the collections and documents structure matches the security rules

4. For development, you can temporarily set permissive rules (not recommended for production):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if true;
       }
     }
   }
   ```

## Authentication Problems

### GitHub Authentication Fails

**Symptoms:**
- Error when clicking "Sign in with GitHub"
- Redirect back to application without being signed in

**Solutions:**
1. Verify GitHub OAuth app configuration:
   - Check client ID and secret in Firebase Console
   - Ensure callback URL is correct

2. Check Firebase Authentication settings:
   - GitHub provider is enabled
   - Domain is whitelisted in authorized domains

3. Clear browser cookies and cache

4. Check browser console for specific authentication errors

### User Profile Not Loading

**Symptoms:**
- User is authenticated but profile data is missing
- Console errors related to user document

**Solutions:**
1. Check if user document exists in Firestore `users` collection

2. Verify the user document structure matches what the application expects

3. Check permissions for reading user documents in Firestore rules

4. Ensure `getUserProfile` function in `services/firestore.js` is working correctly

## Game Mechanics Issues

### Game Canvas Not Rendering

**Symptoms:**
- Blank game area
- Error messages in console related to game rendering

**Solutions:**
1. Check browser compatibility (should support modern JavaScript features)

2. Verify that game component is receiving proper props

3. Check for JavaScript errors in the browser console

4. Try clearing browser cache and reloading

### Coins Not Dropping or Moving

**Symptoms:**
- Clicking "Drop Coin" button has no effect
- Coins appear but don't move

**Solutions:**
1. Check game state in React DevTools

2. Verify that the game loop is running

3. Check for errors in the physics simulation

4. Ensure the game component is not in a frozen state

### Score Not Updating

**Symptoms:**
- Coins fall off the edge but score doesn't change
- Score updates incorrectly

**Solutions:**
1. Check the score calculation logic in the game component

2. Verify that state updates are working correctly

3. Check for race conditions in score updates

4. Ensure leaderboard submission is working properly

## Deployment Problems

### GitHub Actions Build Failure

**Symptoms:**
- Red X on GitHub Actions workflow
- Build errors in the workflow logs

**Solutions:**
1. Check the specific error in the GitHub Actions logs

2. Verify that all environment secrets are properly set in GitHub repository settings

3. Ensure the workflow file `.github/workflows/vercel-deploy.yml` is correctly configured

4. Try running the build locally to reproduce and fix the issue:
   ```bash
   npm run build
   ```

### Vercel Deployment Issues

**Symptoms:**
- Deployment fails or shows errors
- Application doesn't work after deployment

**Solutions:**
1. Check Vercel deployment logs for specific errors

2. Verify environment variables are set in Vercel project settings

3. Ensure build settings are correct:
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. Check if the base path in `vite.config.js` matches the deployment URL

### Routing Issues in Production

**Symptoms:**
- 404 errors when navigating to routes directly
- Links work but refreshing the page fails

**Solutions:**
1. Ensure your Vercel project is configured for single-page applications

2. Add a `vercel.json` file with the following configuration:
   ```json
   {
     "routes": [
       { "handle": "filesystem" },
       { "src": "/(.*)", "dest": "/index.html" }
     ]
   }
   ```

3. Check that the base path in `vite.config.js` is correctly set

## Performance Issues

### Slow Initial Load

**Symptoms:**
- Application takes a long time to load initially
- High loading times reported in browser DevTools

**Solutions:**
1. Implement code splitting and lazy loading for routes:
   ```jsx
   import { lazy, Suspense } from 'react';
   
   const LazyComponent = lazy(() => import('./Component'));
   
   function App() {
     return (
       <Suspense fallback={<div>Loading...</div>}>
         <LazyComponent />
       </Suspense>
     );
   }
   ```

2. Optimize image sizes and use proper formats (WebP, SVG)

3. Implement proper caching strategies

4. Consider using a CDN for static assets

### Game Performance Lags

**Symptoms:**
- Game animation is not smooth
- Delays in coin movement or interactions

**Solutions:**
1. Optimize the game loop and rendering cycle

2. Use `requestAnimationFrame` for smooth animations

3. Implement performance monitoring to identify bottlenecks

4. Reduce the number of physics objects when not needed

5. Use React's `useCallback` and `useMemo` for expensive calculations

## Getting Additional Help

If you're still experiencing issues after trying these troubleshooting steps:

1. Check the GitHub repository issues to see if others have reported similar problems

2. Create a new issue with detailed information:
   - Description of the problem
   - Steps to reproduce
   - Expected vs. actual behavior
   - Browser and OS information
   - Screenshots or error logs

3. For Firebase-specific issues, consult the [Firebase documentation](https://firebase.google.com/docs)

4. For React and Vite issues, refer to their respective documentation:
   - [React Documentation](https://reactjs.org/docs/getting-started.html)
   - [Vite Documentation](https://vitejs.dev/guide/)