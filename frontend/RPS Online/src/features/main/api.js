import apiClient from "../../services/api";

export const createGame = async (player1, gameName) => {
  const response = await apiClient.post('/game/create', { player1, gameName });
  return response.data;
};

export const joinGame = async (player2) => {
  const response = await apiClient.post('/game/join', { player2 });
  return response.data;
};
