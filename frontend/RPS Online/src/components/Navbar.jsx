export default function Navbar() {
  return (
    <div className="w-full h-16 bg-gray-800 shadow-2xl gap-15 text-white p-4 flex justify-center items-center">
        <div>
            <h1 className="text-4xl font-extrabold">RPS Online</h1>
            <p className="text-sm pl-5">Rock, Paper, Scissors</p>
        </div>
        <nav >
            <ul className="flex space-x-6">
                <li className="text-3xl font-bold"><a href="/play">Play</a></li>
                <li className="text-3xl font-bold"><a href="/about">About</a></li>
                <li className="text-3xl font-bold"><a href="/about">Credits</a></li>
            </ul>
        </nav>
    </div>
  )
}
