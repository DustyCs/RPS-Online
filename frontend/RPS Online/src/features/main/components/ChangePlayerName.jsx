export default function ChangePlayerName() {
  return (
    <div>
        <h2 className="text-2xl font-bold mb-4">Change Player Name</h2>
        <form className="flex flex-col gap-4">
            <label htmlFor="playerName" className="text-lg">New Player Name:</label>
            <input
            type="text"
            id="playerName"
            name="playerName"
            className="border border-gray-300 rounded p-2"
            placeholder="Enter player name"
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
