import { motion } from 'framer-motion';
import ReelCell from './ReelCell';
import type { ReelGrid, SymbolType } from '@/types/game';

interface SlotMachineProps {
  grid: ReelGrid;
  spinning: boolean;
  winningRows: number[];
}

const DEFAULT_GRID: ReelGrid = [
  ['A', 'B', 'C'],
  ['D', 'A', 'B'],
  ['C', 'D', 'A'],
];

export default function SlotMachine({ grid, spinning, winningRows }: SlotMachineProps) {
  const displayGrid = spinning || !grid.length ? DEFAULT_GRID : grid;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="relative mx-auto w-full max-w-xl"
    >
      {/* Outer metallic frame */}
      <div className="relative rounded-3xl border border-gold/40 bg-gradient-to-b from-[#15151f] to-[#0b0b12] p-4 shadow-2xl shadow-black/60 sm:p-6">
        {/* Gold top accent line */}
        <div className="absolute left-1/2 top-0 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Ambient glow behind grid */}
        <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gold/[0.04] blur-2xl" />

        {/* Grid header */}
        <div className="relative mb-4 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-gold/60">
            Reels
          </span>
          <div className="flex gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-gold/50" />
            <div className="h-1.5 w-1.5 rounded-full bg-gold/50" />
            <div className="h-1.5 w-1.5 rounded-full bg-gold/50" />
          </div>
        </div>

        {/* 3x3 Grid */}
        <div className="relative grid grid-cols-3 gap-2 sm:gap-3">
          {displayGrid.map((row, rowIndex) =>
            row.map((symbol: SymbolType, colIndex) => {
              const isWinning =
                !spinning && winningRows[rowIndex] > 0;
              return (
                <ReelCell
                  key={`${rowIndex}-${colIndex}`}
                  symbol={symbol}
                  spinning={spinning}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  isWinning={isWinning}
                  revealDelay={colIndex * 0.15 + rowIndex * 0.05}
                />
              );
            })
          )}

          {/* Row highlight overlays */}
          {!spinning &&
            winningRows.map((mult, rowIndex) =>
              mult > 0 ? (
                <motion.div
                  key={`row-glow-${rowIndex}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pointer-events-none absolute left-0 right-0 rounded-xl border-2 border-gold/70 shadow-[0_0_25px_rgba(212,175,55,0.5)]"
                  style={{
                    top: `calc(${(rowIndex / 3) * 100}% + ${rowIndex * 0.5}rem)`,
                    height: `calc(${100 / 3}% - 0.5rem)`,
                  }}
                />
              ) : null
            )}
        </div>

        {/* Gold bottom accent line */}
        <div className="absolute bottom-0 left-1/2 h-[2px] w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-champagne to-transparent" />
      </div>
    </motion.div>
  );
}
