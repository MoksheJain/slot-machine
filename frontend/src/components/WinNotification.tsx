import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Frown, X } from 'lucide-react';

interface WinNotificationProps {
  show: boolean;
  winnings: number;
  isWin: boolean;
  onClose: () => void;
}

export default function WinNotification({
  show,
  winnings,
  isWin,
  onClose,
}: WinNotificationProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            initial={{ scale: 0.5, y: 40, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.7, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative w-full max-w-sm overflow-hidden rounded-3xl border p-8 text-center backdrop-blur-xl ${
              isWin
                ? 'border-gold/50 bg-gradient-to-b from-[#1a1a14] to-[#0f0f0a] shadow-2xl shadow-gold/30'
                : 'border-white/15 bg-gradient-to-b from-[#15151f] to-[#0b0b12] shadow-2xl shadow-black/50'
            }`}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-muted-gold/50 transition-colors hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {isWin ? (
              <>
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                  className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold to-champagne shadow-lg shadow-gold/40"
                >
                  <Trophy className="h-10 w-10 text-[#09090F]" strokeWidth={2.5} />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-2xl font-black uppercase tracking-[0.15em] text-gradient-gold"
                >
                  You Win!
                </motion.h2>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.35, type: 'spring' }}
                  className="mt-4 text-5xl font-black text-gradient-gold"
                >
                  ${winnings.toLocaleString()}
                </motion.div>

                {/* Confetti-like gold sparkles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-1.5 w-1.5 rounded-full bg-gold"
                    initial={{
                      x: 0,
                      y: 0,
                      opacity: 1,
                    }}
                    animate={{
                      x: (Math.random() - 0.5) * 300,
                      y: (Math.random() - 0.5) * 300,
                      opacity: 0,
                      scale: 0,
                    }}
                    transition={{ duration: 1.5, delay: 0.3 }}
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                  />
                ))}
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                  className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-white/15 bg-white/5"
                >
                  <Frown className="h-10 w-10 text-muted-gold/60" strokeWidth={2} />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-2xl font-black uppercase tracking-[0.15em] text-white/80"
                >
                  No Win
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.35 }}
                  className="mt-4 text-sm text-muted-gold/60"
                >
                  Better luck on the next spin.
                </motion.p>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
