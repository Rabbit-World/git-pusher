# Git Pusher - GitHub-themed Coin Pusher Game

A web application that simulates a GitHub-themed coin pusher arcade game with user authentication, leaderboard, and deployment capabilities.

## Project Overview

Git Pusher is an interactive web game that combines the addictive mechanics of coin pusher arcade games with GitHub themes and elements. Players can select from different GitHub-themed machines, push coins, and compete on leaderboards.

## Setup and Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/git-pusher.git
   cd git-pusher
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

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

## Development

### Key Features

1. **GitHub-themed UI**: The application uses GitHub's color scheme and design elements
2. **Carousel of Machines**: Five different coin pusher machines with unique themes
3. **Authentication**: User authentication using Firebase (to be implemented)
4. **Leaderboard**: Global leaderboard to track high scores (to be implemented)
5. **Game Mechanics**: Physics-based coin pushing gameplay (to be implemented)

### Technologies Used

- React (with Vite)
- Tailwind CSS for styling
- React Slick for carousel functionality
- Firebase for authentication and database (to be implemented)

## Deployment

The project is configured for automatic deployment to Vercel using GitHub Actions. When code is pushed to the main branch, it will automatically build and deploy to Vercel.

### Deployment Configuration

1. Set up a Vercel account and create a new project
2. Add the following secrets to your GitHub repository:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`

## Future Enhancements

- Implement Firebase authentication
- Add physics-based coin pusher game mechanics
- Create user profiles and progression system
- Implement real-time leaderboard
- Add special GitHub-themed items and achievements