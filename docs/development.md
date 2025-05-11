# Development Workflow

This document outlines the development workflow for the Git Pusher application, including code organization, best practices, and tools used in the development process.

## Development Environment

### Tools and Technologies

- **React**: Frontend library for building user interfaces
- **Vite**: Build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Firebase**: Backend services (Authentication, Firestore)
- **ESLint**: Code linting
- **GitHub Actions**: CI/CD pipeline

### Editor Setup

We recommend using Visual Studio Code with the following extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Firebase Explorer

## Project Structure

The project follows a feature-based organization:

```
git-pusher/
├── public/                      # Static assets
│   └── assets/                  # Game assets (images, animations)
├── src/                         # Source code
│   ├── components/              # React components
│   │   ├── auth/                # Authentication components
│   │   ├── game/                # Game mechanics components
│   │   └── leaderboard/         # Leaderboard components
│   ├── pages/                   # Page components
│   ├── hooks/                   # Custom React hooks
│   ├── context/                 # React context providers
│   ├── services/                # Firebase services
│   └── styles/                  # CSS/SCSS files
├── .github/                     # GitHub configuration
│   └── workflows/               # GitHub Actions workflows
└── docs/                        # Documentation
```

### Key Directories and Files

- **components/**: Reusable UI components
  - **auth/**: Authentication-related components
  - **game/**: Game mechanics and UI components
  - **leaderboard/**: Leaderboard display and submission components
- **pages/**: Top-level page components
- **context/**: React context providers for state management
- **services/**: Firebase and other external service integrations
- **hooks/**: Custom React hooks for shared logic

## Development Workflow

### 1. Setting Up for Development

1. Clone the repository and install dependencies as described in [Setup Guide](./setup.md)
2. Create a `.env` file with your Firebase configuration
3. Start the development server: `npm run dev`

### 2. Making Changes

#### Component Development

1. Create or modify components in the appropriate directory
2. Follow the existing component structure:
   ```jsx
   import { useState } from 'react';
   
   const MyComponent = ({ prop1, prop2 }) => {
     const [state, setState] = useState(initialValue);
     
     // Component logic
     
     return (
       <div className="tailwind-classes">
         {/* Component JSX */}
       </div>
     );
   };
   
   export default MyComponent;
   ```

3. Use Tailwind CSS for styling
4. Import and use the component where needed

#### Firebase Integration

When working with Firebase services:

1. Use the existing service functions in `services/firebase.js` and `services/firestore.js`
2. For new functionality, add methods to these service files
3. Use React contexts (`AuthContext`, `LeaderboardContext`) to access Firebase data throughout the app

### 3. Testing Changes

Currently, the project uses manual testing:

1. Test your changes in the development environment
2. Verify functionality across different screen sizes
3. Check for console errors and warnings

Future improvements will include:
- Unit tests with Jest
- Component tests with React Testing Library
- End-to-end tests with Cypress

### 4. Code Quality

Maintain code quality by:

1. Following ESLint rules: `npm run lint`
2. Using consistent naming conventions:
   - PascalCase for components
   - camelCase for variables and functions
   - kebab-case for CSS classes
3. Writing meaningful comments for complex logic
4. Keeping components focused on a single responsibility

### 5. Submitting Changes

1. Create a feature branch: `git checkout -b feature/your-feature-name`
2. Make your changes and commit them with descriptive messages
3. Push your branch: `git push origin feature/your-feature-name`
4. Create a pull request to the `main` branch
5. Wait for CI checks to pass
6. Request a code review

## State Management

The application uses React Context API for state management:

1. **AuthContext**: Manages user authentication state
   - User information
   - Authentication status
   - Profile data

2. **LeaderboardContext**: Manages leaderboard data
   - Top scores
   - User scores
   - Leaderboard loading state

## Styling Guidelines

The project uses Tailwind CSS with a GitHub-inspired theme:

1. Use the predefined color variables in `tailwind.config.js`:
   - `github-darker`: Dark background
   - `github-dark`: Main background
   - `github-header`: Header background
   - `github-text`: Text color
   - `github-border`: Border color
   - `github-btn`: Button color
   - `github-btn-hover`: Button hover color

2. Follow responsive design principles:
   - Mobile-first approach
   - Use Tailwind's responsive prefixes: `sm:`, `md:`, `lg:`, `xl:`

3. Maintain consistent spacing and sizing

## Performance Considerations

To ensure good performance:

1. Use React's memo, useMemo, and useCallback for expensive operations
2. Optimize re-renders by keeping component state local when possible
3. Use proper key props in lists to avoid unnecessary re-renders
4. Lazy load components and routes for better initial load time
5. Optimize images and assets

## Adding New Features

When adding new features:

1. Plan the feature and discuss implementation approach
2. Create new components in the appropriate directories
3. Update or create contexts if needed for state management
4. Add any required Firebase functionality to service files
5. Update documentation to reflect the new feature

## Build and Deployment

The development workflow integrates with the CI/CD pipeline:

1. Changes to the `main` branch trigger automatic builds
2. Pull requests generate preview deployments
3. Successful builds on `main` deploy to production

For more details on deployment, see the [Deployment Guide](./deployment.md).