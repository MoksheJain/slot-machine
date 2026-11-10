import axios from 'axios';
import type {
  StartGameRequest,
  StartGameResponse,
  SpinRequest,
  SpinResponse,
  GameStateResponse,
} from '@/types/game';

const BASE_URL = 'http://localhost:8080';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function startGame(name: string): Promise<StartGameResponse> {
  const request: StartGameRequest = { name };
  const { data } = await api.post<StartGameResponse>('/api/game/start', request);
  return data;
}

export async function spin(bet: number): Promise<SpinResponse> {
  const request: SpinRequest = { bet };
  const { data } = await api.post<SpinResponse>('/api/game/spin', request);
  return data;
}

export async function getGameState(): Promise<GameStateResponse> {
  const { data } = await api.get<GameStateResponse>('/api/game/state');
  return data;
}
