export type SymbolType = 'A' | 'B' | 'C' | 'D';

export type ReelGrid = SymbolType[][];

export interface StartGameRequest {
  name: string;
}

export interface StartGameResponse {
  name: string;
  balance: number;
  started: boolean;
}

export interface SpinRequest {
  bet: number;
}

export interface SpinResponse {
  spin: ReelGrid;
  winningLines: number[];
  bet: number;
  winnings: number;
  balance: number;
}

export interface GameStateResponse {
  name: string;
  balance: number;
  started: boolean;
}

export const SYMBOL_MULTIPLIERS: Record<SymbolType, number> = {
  A: 20,
  B: 10,
  C: 5,
  D: 2,
};

export const PRESET_BETS = [1, 5, 10, 20, 50];

export const STARTING_BALANCE = 200;
