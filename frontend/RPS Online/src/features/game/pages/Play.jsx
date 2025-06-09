import PlayerInterface from "../components/player_interface"

export default function Play() {
  return (
    <div className="w-[70%] h-full flex flex-col items-center justify-center mx-auto bg-gray-500">
        <div className="flex flex-col items-center justify-end w-full h-full">
            <PlayerInterface />
        </div>
        <p className="text-lg text-white mt-4">Choose your move and wait for your opponent!</p>
    </div>
  )
}
