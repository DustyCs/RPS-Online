import { usePlayerContext } from "../../../context/PlayerDataContext"

export default function ChangePlayerName() {
    const { updatePlayerData } = usePlayerContext()
    const handleSubmit = (e) => {
      e.preventDefault();
      const newName = e.target.playerName.value.trim();
      if (newName) {
        updatePlayerData({ player1: newName });
        localStorage.setItem('playerName', newName);
        console.log(`Player name changed to: ${newName}`);
        e.target.reset();
      }
  }
  return (
    <div className="flex flex-col self-center">
        <h2 className="text-2xl font-bold mb-4">Change Player Name</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="playerName" className="text-lg">Player Name: {localStorage.getItem('playerName')  ? localStorage.getItem('playerName') : 'Enter Name'}</label>
            <input
            type="text"
            id="playerName"
            name="playerName"
            className="border border-gray-300 rounded p-2"
            placeholder="Change Name"
            />
            <button
            type="submit"
            className="w-1/2 bg-white text-gray-800 font-bold text-lg outline py-2 rounded-md hover:bg-gray-200"
            >
            Enter Name
            </button>
        </form>
    </div>
  )
}
