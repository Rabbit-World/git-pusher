# Game Mechanics Documentation

This document explains the mechanics of the Git Pusher coin pusher game, including how the physics simulation works, game rules, and scoring system.

## Overview

Git Pusher is a GitHub-themed coin pusher arcade game where players drop coins onto a moving platform to push other coins and items off the edge for points. The game combines luck and strategy, with GitHub-themed elements integrated throughout the experience.

## Core Game Mechanics

### Coin Dropping

1. **Basic Mechanics**: Players click the "Drop Coin" button to release a coin from the top of the machine.
2. **Positioning**: Players can position where to drop the coin by moving across the top of the machine.
3. **Timing**: Strategic timing is important as the platform below moves back and forth.

### Physics Simulation

The game uses a simplified physics simulation with the following elements:

1. **Gravity**: Coins fall downward at a consistent rate.
2. **Collision**: Coins collide with other coins, the platform, and walls.
3. **Friction**: Coins slow down over time when sliding on surfaces.
4. **Momentum**: Coins can push other coins based on their momentum.

### Platform Movement

1. **Oscillation**: The platform moves back and forth horizontally.
2. **Speed Variation**: Different machines have different platform movement speeds.
3. **Edge Detection**: Coins that fall off the edge are collected and add to the player's score.

## Scoring System

### Basic Scoring

- **Regular Coins**: 10 points each when they fall off the edge
- **Special Items**: Various point values depending on the item

### Multipliers and Bonuses

- **Combo Drops**: Multiple coins falling within a short time window increase the point multiplier
- **Special Zones**: Coins falling into marked zones can earn bonus points
- **GitHub-Themed Bonuses**: Special GitHub-themed items provide unique bonuses:
  - **Pull Request**: Doubles points for a limited time
  - **Star**: Adds bonus coins
  - **Fork**: Splits coins for additional chances
  - **Issue**: Random effect (could be positive or negative)

## Game Progression

### Coin Economy

1. **Starting Coins**: Players begin with 10 coins
2. **Earning More**: Additional coins can be earned through:
   - Successful drops that push many coins off
   - Daily bonuses
   - Completing achievements

### Difficulty Levels

Different machines have varying difficulty levels:

1. **Octocat Pusher** (Easy): Beginner-friendly with predictable platform movement
2. **Pull Request** (Medium): Moderate platform speed with occasional special items
3. **Star Collector** (Medium): Focus on collecting star items for bonuses
4. **Issue Tracker** (Hard): Unpredictable platform movement with obstacles
5. **Merge Conflict** (Expert): Fast platform movement with complex item interactions

## Special Features

### GitHub-Themed Items

The game includes special GitHub-themed items that appear on the platform:

1. **Octocat**: Rare item worth significant points
2. **Pull Request**: Activates a temporary point multiplier
3. **Star**: Adds bonus coins to the player's inventory
4. **Fork**: Splits into multiple coins when pushed
5. **Issue**: Mystery item with random effects

### Machine Themes

Each machine has a unique theme affecting its appearance and gameplay:

1. **Octocat Pusher**: Classic GitHub theme with Octocat mascots
2. **Pull Request**: Themed around code collaboration
3. **Star Collector**: Focus on GitHub repository stars
4. **Issue Tracker**: Bug-themed machine with obstacles
5. **Merge Conflict**: Complex machine with challenging mechanics

## Future Enhancements

The current implementation uses a simplified simulation. Future versions will include:

1. **Advanced Physics**: Implementation of a full Matter.js physics engine
2. **More Interactive Elements**: Moving obstacles, bumpers, and special zones
3. **Progressive Difficulty**: Increasing challenge as players advance
4. **Special Events**: Limited-time themed events with unique rewards
5. **Customization**: Ability to customize coins and machine elements

## Technical Implementation

The game is implemented using:

1. **React**: For the UI components and game state management
2. **CSS Animations**: For visual effects and coin movements
3. **JavaScript Timers**: For game timing and platform movement
4. **Future: Matter.js**: For advanced physics simulation

## Troubleshooting

Common gameplay issues:

1. **Coins Getting Stuck**: If coins appear to get stuck, they will automatically be collected after a timeout period.
2. **Platform Not Moving**: Refresh the game if the platform stops moving.
3. **Score Not Updating**: Scores update after coins fully exit the platform, which may take a moment.