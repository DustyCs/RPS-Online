import { useEffect, useState } from "react"
import { getAllOpenGames } from "../api";

export default function LfgPanel() {
  const [openGames, setOpenGames] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Looking for Game...");
      getAllOpenGames()
        .then((data) => setOpenGames(data))
        .catch((error) =>
          console.error("Error fetching open games:", error)
        );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="w-full border-2 border-gray-300 rounded-lg p-4 shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Looking For Game</h2>

      {openGames.length > 0 ? (
        <div className="space-y-3">
          {openGames.map((game) => (
            <div
              key={game._id}
              className="flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition rounded-lg p-3 shadow-sm"
            >
              <div>
                <p className="font-semibold text-gray-800">{game.gameName}</p>
                <p className="text-sm text-gray-500">ID: {game._id}</p>
              </div>
              <button className="px-3 py-1 text-sm bg-rose-500 text-white rounded hover:bg-rose-600">
                Join
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No open games right now...</p>
      )}
    </aside>
  );
}
