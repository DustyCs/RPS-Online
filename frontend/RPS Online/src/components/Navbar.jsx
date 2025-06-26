import { joinGame } from "../features/main/api";

export default function Navbar() {
  const handleJoinGame = async (e) => {
          e.preventDefault();
          let player2 = localStorage.getItem('playerName');
          if(!player2){
              player2 = playerData.player1
          }
          
          console.log(player2);
  
          if (!playerName){
              alert('Please enter your name before creating a game.');
              return;
          }
  
          if (player2) {
              try {
                const game = await joinGame(player2); // add await on prod
                const gameId = game._id;
                updatePlayerData({ gameId: gameId });
    
                console.log(`Joining game: as ${player2}`);
                e.target.reset();
                
                navigate(`/play/${gameId}`); // Redirect to the Play page after joining
              } catch (error) {
                console.error('Error joining game:', error);
              }
          }
      }

  return (
    <div className="w-full h-16 bg-gray-800 shadow-2xl gap-15 text-white p-4 flex justify-center items-center">
        <div>
            <h1 className="text-4xl font-extrabold cursor-pointer" onClick={() => window.location.href = "/"}>RPS Online</h1>
            <p className="text-sm pl-5">Rock, Paper, Scissors</p>
        </div>
        <nav >
            <ul className="flex space-x-6">
                <li className="text-3xl font-bold cursor-pointer"><a onClick={handleJoinGame}>Play</a></li> {/* Need to quick join game when pressing play */}
                <li className="text-3xl font-bold"><a href="/about">About</a></li>
                <li className="text-3xl font-bold"><a href="/credits">Credits</a></li>
            </ul>
        </nav>
    </div>
  )
}
