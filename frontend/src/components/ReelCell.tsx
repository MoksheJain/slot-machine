import { motion } from 'framer-motion';
import type { SymbolType } from '@/types/game';

interface ReelCellProps {
  symbol: SymbolType;
  spinning: boolean;
  rowIndex: number;
  colIndex: number;
  isWinning: boolean;
  revealDelay: number;
}

const SYMBOL_STYLES: Record<SymbolType, { gradient: string; glow: string }> = {
  A: {
    gradient: 'from-amber-300 via-yellow-200 to-amber-400',
    glow: 'shadow-[0_0_30px_rgba(245,217,139,0.55)]',
  },
  B: {
    gradient: 'from-yellow-200 via-amber-200 to-yellow-300',
    glow: 'shadow-[0_0_25px_rgba(212,175,55,0.45)]',
  },
  C: {
    gradient: 'from-amber-200 via-yellow-100 to-amber-200',
    glow: 'shadow-[0_0_20px_rgba(245,217,139,0.35)]',
  },
  D: {
    gradient: 'from-yellow-100 via-amber-50 to-yellow-200',
    glow: 'shadow-[0_0_18px_rgba(212,175,55,0.3)]',
  },
};

export default function ReelCell({
  symbol,
  spinning,
  rowIndex,
  colIndex,
  isWinning,
  revealDelay,
}: ReelCellProps) {
  if (spinning) {
    return (
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-gold/20 bg-gradient-to-b from-[#1a1a2e] to-[#0f0f1a]">
        <motion.div
          animate={{ y: ['-100%', '100%'] }}
          transition={{
            duration: 0.4,
            repeat: Infinity,
            ease: 'linear',
            delay: colIndex * 0.1,
          }}
          className="flex flex-col items-center gap-2"
        >
          {(['A', 'B', 'C', 'D', 'A', 'B'] as SymbolType[]).map((s, i) => (
            <span
              key={i}
              className={`text-4xl font-black bg-gradient-to-br ${SYMBOL_STYLES[s].gradient} bg-clip-text text-transparent sm:text-5xl`}
            >
              {s}
            </span>
          ))}
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f0f1a] via-transparent to-[#0f0f1a]" />
      </div>
    );
  }

  const style = SYMBOL_STYLES[symbol];

  return (
    <motion.div
      initial={{ rotateX: 90, opacity: 0 }}
      animate={{ rotateX: 0, opacity: 1 }}
      transition={{ delay: revealDelay, duration: 0.4, ease: 'easeOut' }}
      className={`relative flex aspect-square items-center justify-center rounded-xl border bg-gradient-to-b from-[#181828] to-[#10101a] ${
        isWinning
          ? 'border-gold shadow-[0_0_35px_rgba(212,175,55,0.6)]'
          : 'border-gold/20'
      }`}
    >
      {isWinning && (
        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="absolute inset-0 rounded-xl bg-gradient-to-br from-gold/15 to-champagne/10"
        />
      )}
      <motion.span
        animate={
          isWinning
            ? { scale: [1, 1.15, 1] }
            : { scale: 1 }
        }
        transition={{ duration: 0.8, repeat: isWinning ? Infinity : 0 }}
        className={`relative text-5xl font-black bg-gradient-to-br ${style.gradient} bg-clip-text text-transparent sm:text-6xl ${style.glow}`}
      >
        {symbol}
      </motion.span>
    </motion.div>
  );
}
