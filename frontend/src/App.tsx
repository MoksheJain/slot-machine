import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import WelcomeScreen from '@/components/WelcomeScreen';
import SlotMachine from '@/components/SlotMachine';
import BetControls from '@/components/BetControls';
import BalanceCard from '@/components/BalanceCard';
import WinNotification from '@/components/WinNotification';
import GameRules from '@/components/GameRules';
import {
  startGame as apiStartGame,
  spin as apiSpin,
  getGameState,
} from '@/services/gameApi';
import type { ReelGrid } from '@/types/game';
import { PRESET_BETS } from '@/types/game';

type Screen = 'welcome' | 'game';

export default function App() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [playerName, setPlayerName] = useState('');
  const [balance, setBalance] = useState(200);
  const [bet, setBet] = useState(10);
  const [grid, setGrid] = useState<ReelGrid>([]);
  const [winningRows, setWinningRows] = useState<number[]>([0, 0, 0]);
  const [spinning, setSpinning] = useState(false);
  const [starting, setStarting] = useState(false);
  const [welcomeError, setWelcomeError] = useState<string | null>(null);
  const [spinError, setSpinError] = useState<string | null>(null);
  const [lastWinnings, setLastWinnings] = useState<number | null>(null);
  const [lastBet, setLastBet] = useState<number | null>(null);
  const [notification, setNotification] = useState<{
    show: boolean;
    winnings: number;
    isWin: boolean;
  }>({ show: false, winnings: 0, isWin: false });

  // On mount, check if a game is already in progress via GET /api/game/state
  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const state = await getGameState();
        if (active && state.started) {
          setPlayerName(state.name);
          setBalance(state.balance);
          setScreen('game');
        }
      } catch {
        // No game in progress yet — stay on welcome screen
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const handleEnter = useCallback(async (name: string) => {
    setStarting(true);
    setWelcomeError(null);
    try {
      const res = await apiStartGame(name);
      setPlayerName(res.name);
      setBalance(res.balance);
      setScreen('game');
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Unable to connect to the casino server.';
      setWelcomeError(
        `${message}. Make sure the backend is running on http://localhost:8080.`
      );
    } finally {
      setStarting(false);
    }
  }, []);

  const handleSpin = useCallback(async () => {
    if (spinning || bet > balance) return;
    setSpinning(true);
    setSpinError(null);
    setWinningRows([0, 0, 0]);
    try {
      const res = await apiSpin(bet);
      // Wait briefly so the spinning animation is visible before reveal
      await new Promise((r) => setTimeout(r, 700));
      setGrid(res.spin);
      setWinningRows(res.winningLines);
      setBalance(res.balance);
      setLastWinnings(res.winnings);
      setLastBet(res.bet);
      setSpinning(false);
      setNotification({
        show: true,
        winnings: res.winnings,
        isWin: res.winnings > 0,
      });
    } catch (err) {
      setSpinning(false);
      const message =
        err instanceof Error ? err.message : 'Spin failed.';
      setSpinError(
        `${message}. Please ensure the backend is running and try again.`
      );
    }
  }, [spinning, bet, balance]);

  const handleBetChange = useCallback(
    (newBet: number) => {
      if (spinning) return;
      if (newBet > balance) return;
      setBet(newBet);
    },
    [spinning, balance]
  );

  // Keep bet within valid bounds if balance drops below current bet
  useEffect(() => {
    if (bet > balance && balance > 0) {
      const valid = [...PRESET_BETS].reverse().find((b) => b <= balance);
      if (valid) setBet(valid);
    }
  }, [balance, bet]);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#09090F] text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gold/[0.06] blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[600px] rounded-full bg-champagne/[0.04] blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 h-[400px] w-[500px] rounded-full bg-gold/[0.03] blur-[120px]" />
      </div>

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {screen === 'welcome' ? (
            <motion.div
              key="welcome"
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
            >
              <WelcomeScreen
                onEnter={handleEnter}
                loading={starting}
                error={welcomeError}
              />
            </motion.div>
          ) : (
            <motion.div
              key="game"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Header
                playerName={playerName}
                balance={balance}
                inGame={screen === 'game'}
              />

              <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
                <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
                  {/* Left: Slot machine + result */}
                  <div className="flex flex-col items-center">
                    <SlotMachine
                      grid={grid}
                      spinning={spinning}
                      winningRows={winningRows}
                    />

                    {/* Winning lines breakdown */}
                    <div className="mt-5 flex w-full max-w-xl flex-wrap justify-center gap-2">
                      {winningRows.map((mult, i) =>
                        mult > 0 ? (
                          <motion.div
                            key={`win-${i}`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-2 rounded-lg border border-gold/40 bg-gold/10 px-3 py-1.5"
                          >
                            <span className="text-xs uppercase tracking-wider text-muted-gold/70">
                              Row {i + 1}
                            </span>
                            <span className="text-sm font-bold text-gradient-gold">
                              {mult}x
                            </span>
                          </motion.div>
                        ) : null
                      )}
                    </div>

                    {spinError && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-4 max-w-xl rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-center text-sm text-red-400"
                      >
                        {spinError}
                      </motion.p>
                    )}
                  </div>

                  {/* Right: Controls panel */}
                  <div className="flex flex-col gap-5">
                    <BalanceCard
                      balance={balance}
                      lastWinnings={lastWinnings}
                      lastBet={lastBet}
                    />
                    <div className="rounded-2xl border border-gold/25 bg-white/[0.03] p-5 backdrop-blur-xl">
                      <BetControls
                        bet={bet}
                        balance={balance}
                        onBetChange={handleBetChange}
                        onSpin={handleSpin}
                        spinning={spinning}
                      />
                    </div>
                  </div>
                </div>

                <GameRules />
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <WinNotification
        show={notification.show}
        winnings={notification.winnings}
        isWin={notification.isWin}
        onClose={() => setNotification((n) => ({ ...n, show: false }))}
      />
    </div>
  );
}
