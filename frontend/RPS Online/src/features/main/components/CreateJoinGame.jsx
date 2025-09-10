import { usePlayerContext } from "../../../context/PlayerDataContext"
import { createGame, joinGame } from "../api";
import { useNavigate } from "react-router-dom";

export default function CreateJoinGame() {
  const { playerData, updatePlayerData } = usePlayerContext()
  const navigate = useNavigate();

  const handleCreateGame = async (e) => {
    e.preventDefault();
    let gameName = e.target.gameName.value.trim();
    const password = e.target.password.value.trim();

    if (!playerData.player1) {
      alert('Please enter your name before creating a game.');
      return;
    }

    if (!gameName) {
      gameName = `Game-${Date.now()}`
    }

    const game = await createGame(playerData.player1, gameName);
    const gameId = game._id;
    localStorage.setItem('gameId', gameId);

    updatePlayerData({ gameId: gameId });

    console.log(`Creating game with player: ${playerData.player1} with id: ${gameId}`);
    e.target.reset();
    navigate(`/play/${gameId}`);
  }

  const handleJoinGame = async (e) => {
    e.preventDefault();
    let player2 = localStorage.getItem('playerName');
    if (!player2) {
      player2 = playerData.player1
    }

    if (!player2) {
      alert('Please enter your name before joining a game.');
      return;
    }

    const game = await joinGame(player2);
    const gameId = game._id;
    updatePlayerData({ gameId: gameId });

    console.log(`Joining game: as ${player2}`);
    e.target.reset();

    navigate(`/play/${gameId}`);
  }

  return (
    <div className="flex flex-col sm:flex-row w-full max-w-4xl bg-gray-100 items-stretch gap-6 justify-center p-4 rounded-lg">
      
      {/* Create Game */}
      <div className="bg-gray-200 rounded-lg flex-1 flex flex-col items-center justify-center p-6 shadow-md">
        <form className="space-y-4 w-full max-w-sm flex flex-col items-center" onSubmit={handleCreateGame}>
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">Game Name (optional)</label>
            <input
              name="gameName"
              id="gameName"
              type="text"
              className="mt-1 bg-white p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter game name"
            />
          </div>
          <div className="w-full">
            <label className="block text-lg font-medium text-gray-700">Password (optional)</label>
            <input
              name="password"
              id="password"
              type="password"
              className="mt-1 bg-gray-100 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-1/2 bg-white text-gray-800 font-bold text-lg outline py-2 rounded-md hover:bg-gray-200 transition"
          >
            Create Game
          </button>
        </form>
      </div>

      {/* Join Game */}
      <div className="bg-gray-200 rounded-lg flex-1 flex flex-col items-center justify-center p-6 shadow-md">
        <form className="space-y-4 w-full max-w-sm flex flex-col items-center" onSubmit={handleJoinGame}>
          <div className="w-full text-center">
            <label className="block text-lg font-medium text-gray-700">Join A Random Game</label>
          </div>
          <button
            type="submit"
            className="w-full sm:w-1/2 bg-white text-gray-800 font-bold text-lg outline py-2 rounded-md hover:bg-gray-200 transition"
          >
            Join Game
          </button>
        </form>
      </div>
    </div>
  )
}