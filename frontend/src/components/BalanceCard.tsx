import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Wallet, TrendingUp, TrendingDown, Coins } from 'lucide-react';

interface BalanceCardProps {
  balance: number;
  lastWinnings: number | null;
  lastBet: number | null;
}

function AnimatedNumber({ value }: { value: number }) {
  const count = useMotionValue(value);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const controls = animate(count, value, {
      duration: 0.8,
      ease: 'easeOut',
    });
    const unsub = rounded.on('change', (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [value, count, rounded]);

  return <span className="tabular-nums">${display.toLocaleString()}</span>;
}

export default function BalanceCard({
  balance,
  lastWinnings,
  lastBet,
}: BalanceCardProps) {
  const net =
    lastWinnings !== null && lastBet !== null ? lastWinnings - lastBet : null;
  const isProfit = net !== null && net > 0;
  const isLoss = net !== null && net < 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="rounded-2xl border border-gold/25 bg-white/[0.03] p-5 backdrop-blur-xl"
    >
      {/* Balance */}
      <div className="flex items-center gap-2">
        <Wallet className="h-5 w-5 text-gold" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-gold/70">
          Current Balance
        </span>
      </div>
      <motion.div
        key={balance}
        initial={{ scale: 1.03 }}
        animate={{ scale: 1 }}
        className="mt-2 text-3xl font-black text-gradient-gold sm:text-4xl"
      >
        <AnimatedNumber value={balance} />
      </motion.div>

      {/* Last spin summary */}
      {lastWinnings !== null && lastBet !== null && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 space-y-2 border-t border-gold/15 pt-4"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-gold/60">
              <Coins className="h-3.5 w-3.5" />
              Winnings
            </span>
            <span className="text-sm font-bold text-champagne">
              ${lastWinnings.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-muted-gold/60">
              Bet
            </span>
            <span className="text-sm font-semibold text-white/80">
              ${lastBet.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-muted-gold/60">
              {isProfit && <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />}
              {isLoss && <TrendingDown className="h-3.5 w-3.5 text-red-400" />}
              Net
            </span>
            <span
              className={`text-sm font-bold ${
                isProfit
                  ? 'text-emerald-400'
                  : isLoss
                    ? 'text-red-400'
                    : 'text-white/70'
              }`}
            >
              {net !== null && net > 0 ? '+' : ''}
              ${net !== null ? net.toLocaleString() : 0}
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
