# Git Pusher

A GitHub-themed coin pusher arcade game built with React, Firebase, and Tailwind CSS.

## 🎮 Overview

Git Pusher is an interactive web application that simulates a coin pusher arcade game with GitHub themes. Players can select from different GitHub-themed machines, push coins, and compete on global leaderboards. The game combines the addictive mechanics of coin pusher arcade games with GitHub's visual style and elements.

## ✨ Features

- **GitHub-themed UI** with dark mode styling
- **Multiple Game Machines** with unique themes and difficulty levels
- **Coin Pusher Game Mechanics** with simulated physics
- **User Authentication** via GitHub login
- **Global Leaderboard** to compete with other players
- **Responsive Design** for mobile and desktop play
- **Profile System** to track your progress and achievements

## 🛠️ Tech Stack

- **Frontend**: React with Vite
- **Styling**: Tailwind CSS
- **Backend**: Firebase (Authentication, Firestore)
- **CI/CD**: GitHub Actions
- **Hosting**: Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account (for backend services)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rabbit.world/git-pusher.git
   cd git-pusher
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Firebase configuration:
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

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

## 📚 Documentation

Detailed documentation is available in the `docs` directory:

- [Setup and Installation Guide](./docs/setup.md)
- [Development Workflow](./docs/development.md)
- [Game Mechanics](./docs/game-mechanics.md)
- [Firebase Integration](./docs/firebase-integration.md)
- [Deployment Guide](./docs/deployment.md)
- [Troubleshooting](./docs/troubleshooting.md)

## 🎮 Game Machines

The game features five unique GitHub-themed coin pusher machines:

1. **Octocat Pusher**: Classic GitHub theme with Octocat mascots (Easy)
2. **Pull Request**: Themed around code collaboration (Medium)
3. **Star Collector**: Focus on GitHub repository stars (Medium)
4. **Issue Tracker**: Bug-themed machine with obstacles (Hard)
5. **Merge Conflict**: Complex machine with challenging mechanics (Expert)

## 🔐 Authentication

Git Pusher uses Firebase Authentication with GitHub as the provider:

- Sign in with your GitHub account
- Your GitHub profile information is used to create your game profile
- Authentication state is managed through React Context

## 🏆 Leaderboard

The global leaderboard tracks the highest scores across all players:

- View top scores from all players
- Filter to see your personal best scores
- Scores are automatically submitted when you're signed in
- Real-time updates using Firestore listeners

## 👤 User Profiles

Each user has a profile that displays:

- GitHub profile information
- Game statistics (total score, highest score, games played)
- Recent game history
- Achievement progress (coming soon)

## 🚀 Deployment

The project is configured for automatic deployment to Vercel using GitHub Actions. When code is pushed to the main branch, it will automatically build and deploy to:

[https://rabbit.world.github.io/git-pusher](https://rabbit.world.github.io/git-pusher)

## 🔮 Future Enhancements

- Advanced physics simulation with Matter.js
- More interactive game elements and power-ups
- User achievements and badges
- Custom coin designs
- Daily challenges and rewards
- Multiplayer features

## 🧪 Development

To contribute to the project:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

For more details, see the [Development Workflow](./docs/development.md) guide.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.