import { motion } from 'framer-motion';
import { Minus, Plus, Loader2 } from 'lucide-react';
import { PRESET_BETS } from '@/types/game';

interface BetControlsProps {
  bet: number;
  balance: number;
  onBetChange: (bet: number) => void;
  onSpin: () => void;
  spinning: boolean;
}

export default function BetControls({
  bet,
  balance,
  onBetChange,
  onSpin,
  spinning,
}: BetControlsProps) {
  const decreaseBet = () => {
    const idx = PRESET_BETS.indexOf(bet);
    if (idx > 0) onBetChange(PRESET_BETS[idx - 1]);
  };

  const increaseBet = () => {
    const idx = PRESET_BETS.indexOf(bet);
    if (idx >= 0 && idx < PRESET_BETS.length - 1) {
      const next = PRESET_BETS[idx + 1];
      if (next <= balance) onBetChange(next);
    }
  };

  const canSpin = !spinning && bet <= balance && bet > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      {/* Bet amount display + stepper */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-gold/70">
          Bet Amount
        </span>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={decreaseBet}
            disabled={spinning || bet === PRESET_BETS[0]}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/30 bg-black/40 text-gold transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Minus className="h-4 w-4" />
          </motion.button>

          <motion.div
            key={bet}
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            className="min-w-[88px] rounded-lg border border-gold/40 bg-gradient-to-b from-black/60 to-black/30 px-4 py-2 text-center"
          >
            <span className="text-xl font-bold text-gradient-gold tabular-nums">
              ${bet}
            </span>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={increaseBet}
            disabled={
              spinning ||
              bet === PRESET_BETS[PRESET_BETS.length - 1] ||
              bet >= balance
            }
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gold/30 bg-black/40 text-gold transition-colors hover:bg-gold/10 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <Plus className="h-4 w-4" />
          </motion.button>
        </div>
      </div>

      {/* Preset bet buttons */}
      <div className="mb-6 grid grid-cols-5 gap-2">
        {PRESET_BETS.map((preset) => {
          const active = bet === preset;
          const disabled = spinning || preset > balance;
          return (
            <motion.button
              key={preset}
              whileHover={!disabled ? { scale: 1.05 } : undefined}
              whileTap={!disabled ? { scale: 0.95 } : undefined}
              onClick={() => !disabled && onBetChange(preset)}
              disabled={disabled}
              className={`rounded-lg py-2.5 text-sm font-bold transition-all disabled:cursor-not-allowed disabled:opacity-30 ${
                active
                  ? 'border border-gold bg-gradient-to-b from-gold/30 to-gold/10 text-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                  : 'border border-gold/20 bg-black/30 text-muted-gold/70 hover:border-gold/40 hover:text-gold'
              }`}
            >
              ${preset}
            </motion.button>
          );
        })}
      </div>

      {/* Spin button */}
      <motion.button
        whileHover={canSpin ? { scale: 1.02 } : undefined}
        whileTap={canSpin ? { scale: 0.98 } : undefined}
        onClick={onSpin}
        disabled={!canSpin}
        className="relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-gold via-champagne to-gold py-5 text-lg font-black uppercase tracking-[0.2em] text-[#09090F] shadow-xl shadow-gold/30 transition-all disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
      >
        {canSpin && (
          <motion.div
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent"
          />
        )}
        {spinning ? (
          <>
            <Loader2 className="h-6 w-6 animate-spin" />
            Spinning
          </>
        ) : (
          <>Spin</>
        )}
      </motion.button>

      {bet > balance && (
        <p className="mt-3 text-center text-sm text-red-400">
          Insufficient balance for this bet.
        </p>
      )}
    </motion.div>
  );
}
