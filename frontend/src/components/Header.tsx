import { motion } from 'framer-motion';
import { Crown, CircleDot } from 'lucide-react';

interface HeaderProps {
  playerName: string;
  balance: number;
  inGame: boolean;
}

export default function Header({ playerName, balance, inGame }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="relative z-20 border-b border-gold/20 bg-[#0B0B14]/80 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ rotate: -15, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-gold to-champagne shadow-lg shadow-gold/30"
          >
            <Crown className="h-6 w-6 text-[#09090F]" strokeWidth={2.5} />
          </motion.div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-[0.2em] text-gradient-gold sm:text-xl">
              CASINO ROYALE
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-muted-gold/70">
              Slots
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6">
          <div className="hidden flex-col items-end sm:flex">
            <span className="text-[10px] uppercase tracking-[0.25em] text-muted-gold/60">
              Player
            </span>
            <span className="text-sm font-semibold text-white">{playerName}</span>
          </div>

          <motion.div
            key={balance}
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2 rounded-xl border border-gold/30 bg-black/40 px-4 py-2"
          >
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-gold/60">
              Balance
            </span>
            <motion.span
              key={balance}
              initial={{ opacity: 0.5, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-bold text-gradient-gold tabular-nums sm:text-xl"
            >
              ${balance.toLocaleString()}
            </motion.span>
          </motion.div>

          {inGame && (
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.8, repeat: Infinity }}
              >
                <CircleDot className="h-3.5 w-3.5 text-emerald-400" />
              </motion.span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-300">
                Live
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
