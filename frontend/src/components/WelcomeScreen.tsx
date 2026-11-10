import { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, Coins, ArrowRight, Loader2 } from 'lucide-react';
import { STARTING_BALANCE } from '@/types/game';

interface WelcomeScreenProps {
  onEnter: (name: string) => void;
  loading: boolean;
  error: string | null;
}

export default function WelcomeScreen({ onEnter, loading, error }: WelcomeScreenProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && !loading) {
      onEnter(name.trim());
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Ambient light orbs */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="pointer-events-none absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-gold/10 blur-[120px]"
      />
      <motion.div
        animate={{ opacity: [0.2, 0.45, 0.2] }}
        transition={{ duration: 7, repeat: Infinity, delay: 1 }}
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-champagne/10 blur-[120px]"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo / Crown */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-gold via-champagne to-gold shadow-2xl shadow-gold/40"
        >
          <Crown className="h-12 w-12 text-[#09090F]" strokeWidth={2.5} />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-center text-4xl font-black tracking-[0.15em] text-gradient-gold sm:text-5xl"
        >
          CASINO ROYALE
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 text-center text-xs font-medium uppercase tracking-[0.4em] text-muted-gold sm:text-sm"
        >
          Fortune Favours the Bold
        </motion.p>

        {/* Form card */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="mt-10 rounded-2xl border border-gold/25 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8"
        >
          <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.25em] text-muted-gold/80">
            Enter Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name..."
            disabled={loading}
            maxLength={20}
            className="w-full rounded-xl border border-gold/25 bg-black/40 px-4 py-3.5 text-base text-white placeholder-muted-gold/40 outline-none transition-all focus:border-gold/60 focus:ring-2 focus:ring-gold/20 disabled:opacity-50"
          />

          {error && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 text-sm text-red-400"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={!name.trim() || loading}
            whileHover={{ scale: name.trim() && !loading ? 1.02 : 1 }}
            whileTap={{ scale: name.trim() && !loading ? 0.98 : 1 }}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold to-champagne py-4 text-base font-bold uppercase tracking-[0.15em] text-[#09090F] shadow-lg shadow-gold/25 transition-all disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
          >
            {loading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Entering...
              </>
            ) : (
              <>
                Enter Casino
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </motion.button>

          {/* Starting balance */}
          <div className="mt-6 flex items-center justify-center gap-2 border-t border-gold/15 pt-5">
            <Coins className="h-4 w-4 text-gold" />
            <span className="text-sm text-muted-gold/80">Starting Balance</span>
            <span className="text-base font-bold text-gradient-gold">
              ${STARTING_BALANCE}
            </span>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
}
