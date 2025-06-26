import { useEffect, useState } from "react"
import { getAllOpenGames } from "../api";

export default function LfgPanel() {
    const [openGames, setOpenGames] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
          console.log('Looking for Game...');
          getAllOpenGames()
            .then((data) => setOpenGames(data))
            .catch((error) => console.error('Error fetching open games:', error));

        }, 5000);
    
        return () => clearInterval(interval);
      }, []);


  return (
    <aside className="w-100 h-150 border-4 border-gray-900 rounded-lg p-4">
      <h2>Looking For Game</h2>
        {
            openGames.map((game) => (
                <div key={game._id} className="bg-gray-800 p-2 my-2 rounded-md">
                    <p>Game ID: {game._id}</p>
                    <p>Game Name: {game.gameName}</p>
                </div>
            ))
        }

    </aside>
  )
}
