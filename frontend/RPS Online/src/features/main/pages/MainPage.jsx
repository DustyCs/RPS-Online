import React from 'react'
import LfgPanel from '../components/LfgPanel'
import CreateJoinGame from '../components/CreateJoinGame'
import ChangePlayerName from '../components/ChangePlayerName'

export default function MainPage() {
  return (
    <div className="flex flex-col md:flex-row justify-center h-full gap-4 p-4">
      {/* Left panel */}
      <div className="flex flex-col items-center w-full md:w-1/3 h-full">
        <LfgPanel />
      </div>

      {/* Right panel */}
      <div className="flex flex-col items-start justify-center w-full md:w-2/3 h-full gap-4">
        <CreateJoinGame />
        <ChangePlayerName />
      </div>
    </div>
  )
}
