import apiClient from "../../services/api";

export const submitMove = async (gameId: string, player: string, choice: string) => {
  const response = await apiClient.post('/game/move', { gameId, player, choice });
  return response.data;
};

