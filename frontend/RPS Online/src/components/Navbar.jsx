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
    <header className="w-full bg-gray-800 shadow-2xl text-white p-4 flex flex-col sm:flex-row sm:justify-center justify-between items-center gap-4 sm:gap-8">
      <div className="text-center sm:text-left">
        <h1
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold cursor-pointer"
          onClick={() => (window.location.href = "/")}
        >
          RPS Online
        </h1>
        <p className="text-xs sm:text-sm pl-0 sm:pl-2">Rock, Paper, Scissors</p>
      </div>
      <nav>
        <ul className="flex flex-wrap justify-center sm:justify-between gap-4 sm:gap-6">
          <li className="text-lg sm:text-2xl font-bold cursor-pointer">
            <a onClick={handleJoinGame}>Play</a>
          </li>
          <li className="text-lg sm:text-2xl font-bold">
            <a href="/about">About</a>
          </li>
          <li className="text-lg sm:text-2xl font-bold">
            <a href="/credits">Credits</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
