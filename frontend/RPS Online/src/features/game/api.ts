import apiClient from "../../services/api";

export const submitMove = async (gameId: string, player: string, choice: string) => {
  const response = await apiClient.post('/game/move', { gameId, player, choice });
  return response.data;
};

export const getGameStatus = async (gameId: string) => {
  const response = await apiClient.get(`/game/status/${gameId}`);
  return response.data;
}