# CASINO ROYALE — Slot Machine

A premium, luxurious web-based slot machine game built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

> **Fortune Favours the Bold**

## Features

- Elegant casino-inspired dark/gold UI with glassmorphism and ambient lighting
- Animated 3×3 slot machine with spinning reel effects
- Three horizontal paylines with winning-row highlights
- Bet controls with presets ($1, $5, $10, $20, $50)
- Animated balance counter and win/loss notifications
- Fully responsive (desktop, tablet, mobile)
- Backend-driven results — the frontend never generates outcomes

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion (animations)
- Lucide React (icons)
- Axios (API requests)

## Prerequisites

- Node.js 18+ and npm
- The **Go backend** running on `http://localhost:8080`

## Backend API

The app expects the following endpoints on `http://localhost:8080`:

| Method | Endpoint           | Description                  |
|--------|--------------------|------------------------------|
| POST   | `/api/game/start`  | Start a new game with a name |
| POST   | `/api/game/spin`   | Spin with a bet amount       |
| GET    | `/api/game/state`  | Get current game state       |

See `src/services/gameApi.ts` for request/response shapes.

## Installation

```bash
npm install
```

## Running the App

1. Start the Go backend on port 8080.
2. Start the frontend:

```bash
npm run dev
```

The app will be available at the URL shown in your terminal (typically `http://localhost:5173`).

## Building for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
  components/
    Header.tsx          — Top bar with branding, player, balance, status
    WelcomeScreen.tsx   — Landing / name entry screen
    SlotMachine.tsx     — 3×3 reel grid with metallic frame
    ReelCell.tsx        — Individual reel symbol cell
    BetControls.tsx     — Bet selector + presets + spin button
    BalanceCard.tsx     — Balance display + last spin summary
    WinNotification.tsx — Win / loss modal
    GameRules.tsx       — Rules + payout table footer
  services/
    gameApi.ts          — Centralized Axios API service
  types/
    game.ts             — Shared types and constants
  App.tsx               — Screen flow and game state
  main.tsx              — Entry point
  index.css             — Global styles, fonts, Tailwind
```

## Game Rules

- Three horizontal paylines (one per row).
- A row wins when all three symbols match.
- Payout = bet × symbol multiplier.
- Multiple winning rows are summed.

| Symbol | Multiplier |
|--------|------------|
| A      | 20×        |
| B      | 10×        |
| C      | 5×         |
| D      | 2×         |

**Example:** Bet $10 on three D's → payout $20 (2× multiplier).

## Play Responsibly

This application is for entertainment purposes only.
