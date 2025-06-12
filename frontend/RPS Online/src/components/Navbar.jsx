export default function Navbar() {
  const handleJoinGame = (e) => {
          e.preventDefault();
          const player2 = player1;
          if (player2) {
              const game = joinGame(player2);
  
              console.log(`Joining game: as ${player2}`);
              e.target.reset(); // Clear the input fields after submission
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
                <li className="text-3xl font-bold"><a href="/play">Play</a></li> {/* Need to quick join game when pressing play */}
                <li className="text-3xl font-bold"><a href="/about">About</a></li>
                <li className="text-3xl font-bold"><a href="/credits">Credits</a></li>
            </ul>
        </nav>
    </div>
  )
}
