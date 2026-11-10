import { motion } from 'framer-motion';
import { BookOpen, Info } from 'lucide-react';
import { SYMBOL_MULTIPLIERS, type SymbolType } from '@/types/game';

const SYMBOL_COLORS: Record<SymbolType, string> = {
  A: 'from-amber-300 to-yellow-400',
  B: 'from-yellow-200 to-amber-300',
  C: 'from-amber-200 to-yellow-200',
  D: 'from-yellow-100 to-amber-200',
};

export default function GameRules() {
  const symbols: SymbolType[] = ['A', 'B', 'C', 'D'];

  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="mx-auto mt-8 w-full max-w-5xl px-4 pb-10 sm:px-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Rules */}
        <div className="rounded-2xl border border-gold/20 bg-white/[0.02] p-5 backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-gold" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gradient-gold">
              Game Rules
            </h3>
          </div>
          <ul className="space-y-2 text-sm text-muted-gold/70">
            <li className="flex gap-2">
              <span className="text-gold/50">•</span>
              Match three identical symbols in a horizontal row to win.
            </li>
            <li className="flex gap-2">
              <span className="text-gold/50">•</span>
              Three horizontal paylines are evaluated each spin.
            </li>
            <li className="flex gap-2">
              <span className="text-gold/50">•</span>
              Multiple winning rows add their payouts together.
            </li>
            <li className="flex gap-2">
              <span className="text-gold/50">•</span>
              Payout = bet × symbol multiplier.
            </li>
          </ul>
        </div>

        {/* Payout table */}
        <div className="rounded-2xl border border-gold/20 bg-white/[0.02] p-5 backdrop-blur-xl">
          <div className="mb-3 flex items-center gap-2">
            <Info className="h-4 w-4 text-gold" />
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-gradient-gold">
              Payout Multipliers
            </h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {symbols.map((s) => (
              <div
                key={s}
                className="flex flex-col items-center rounded-xl border border-gold/15 bg-black/30 py-3"
              >
                <span
                  className={`text-2xl font-black bg-gradient-to-br ${SYMBOL_COLORS[s]} bg-clip-text text-transparent`}
                >
                  {s}
                </span>
                <span className="mt-1 text-xs font-bold text-gold">
                  {SYMBOL_MULTIPLIERS[s]}x
                </span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-gold/50">
            Example: Bet $10 on three D's = $20 payout (2× multiplier).
          </p>
        </div>
      </div>

      {/* Play responsibly */}
      <p className="mt-6 text-center text-[11px] uppercase tracking-[0.3em] text-muted-gold/40">
        Play Responsibly — For Entertainment Only
      </p>
    </motion.footer>
  );
}
