import React from 'react'

export default function CreateJoinGame() {
  return (
    <div className='flex w-[60%] bg-gray-100 items-center gap-4 justify-center'>
        <div className='bg-gray-200 rounded-lg w-100 h-80 flex flex-col items-center justify-center border-gray-900'>
            <form className="space-y-4 w-70 flex flex-col items-center">
                <div>
                    <label className="block text-lg font-medium text-gray-700">Game Name</label>
                    <input type="text" className="mt-1 bg-white p-1 block w-72 h-10 border-gray-300 rounded-md shadow-sm" placeholder="Enter game name" />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Password (optional)</label>
                    <input type="password" className="mt-1 bg-gray-100 p-1 block w-72 h-10 border-gray-300 rounded-md shadow-sm" placeholder="Enter password" />
                </div>
                <button type="submit" className="w-1/2 bg-white text-gray-800 font-bold text-lg outline py-2 rounded-md hover:bg-gray-200">Create Game</button>
            </form>
        </div>
        <div className='bg-gray-200 rounded-lg w-100 h-80 flex flex-col items-center justify-center border-gray-900'>
            <form className="space-y-4 w-70 flex flex-col items-center">
                <div>
                    <label className="block text-lg font-medium text-gray-700">Game ID</label>
                    <input type="text" className="mt-1  bg-white p-1 block w-72 h-10 border-gray-300 rounded-md shadow-sm" placeholder="Enter game ID" />
                </div>
                <div>
                    <label className="block text-lg font-medium text-gray-700">Password (if required)</label>
                    <input type="password" className="mt-1 bg-white p-1 block w-72 h-10 border-gray-300 rounded-md shadow-sm" placeholder="Enter password" />
                </div>
                <button type="submit" className="w-1/2 bg-white text-gray-800 font-bold text-lg outline py-2 rounded-md hover:bg-gray-200">Join Game</button>
            </form>
        </div>
    </div>
  )
}
