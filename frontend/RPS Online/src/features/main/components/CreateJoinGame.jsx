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

        if (!playerName){
            alert('Please enter your name before creating a game.');
            return;
        }

        if (!gameName){
            gameName = `Game-${Date.now()}`
        }

        const game =  createGame(gameName, playerData.player1); // add await on prod
        const gameId = game._id;
        localStorage.setItem('gameId', gameId);

        updatePlayerData({ gameId: gameId });

        console.log(`Creating game with player: ${playerData.player1} with id: ${gameId}`);
        e.target.reset(); 
        navigate('/play');
    }

    const handleJoinGame = async (e) => {
        e.preventDefault();
        const player2 = localStorage.getItem('playerName');
        if(!player2){
            player2 = playerData.player1
        }
        
        console.log(player2);

        if (!playerName){
            alert('Please enter your name before creating a game.');
            return;
        }

        if (player2) {
            const game =  joinGame(player2); // add await on prod

            console.log(`Joining game: as ${player2}`);
            e.target.reset();
            
            navigate('/play'); // Redirect to the Play page after joining
        }
    }

  return (
    <div className='flex w-[60%] bg-gray-100 items-center gap-4 justify-center'>

        {/* Create Game */}
        <div className='bg-gray-200 rounded-lg w-100 h-80 flex flex-col items-center justify-center border-gray-900'>
            <form className="space-y-4 w-70 flex flex-col items-center" onSubmit={handleCreateGame}>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Game Name (optional)</label>
                    <input name="gameName" id="gameName" type="text" className="mt-1 bg-white p-1 block w-72 h-10 border-gray-300 rounded-md shadow-sm" placeholder="Enter game name" />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Password (optional)</label>
                    <input name="password" id="password" type="password" className="mt-1 bg-gray-100 p-1 block w-72 h-10 border-gray-300 rounded-md shadow-sm" placeholder="Enter password" />
                </div>
                <button type="submit" className="w-1/2 bg-white text-gray-800 font-bold text-lg outline py-2 rounded-md hover:bg-gray-200">Create Game</button>
            </form>
        </div>

        {/* Join Game */}
        <div className='bg-gray-200 rounded-lg w-100 h-80 flex flex-col items-center justify-center border-gray-900'>
            <form className="space-y-4 w-70 flex flex-col items-center" onSubmit={handleJoinGame}>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Join A Random Game</label>
                </div>
                <button type="submit" className="w-1/2 bg-white text-gray-800 font-bold text-lg outline py-2 rounded-md hover:bg-gray-200">Join Game</button>
            </form>
        </div>
    </div>
  )
}
