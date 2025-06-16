import apiClient from "../../services/api";

export const submitMove = async (gameId, player, choice) => {
  const response = await apiClient.post('/game/move', { gameId, player, choice });
  return response.data;
};

export const getGameStatus = async (gameId) => {
  const response = await apiClient.get(`/game/status/${gameId}`);
  return response.data;
}