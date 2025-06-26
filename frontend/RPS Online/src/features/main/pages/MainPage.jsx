import React from 'react'
import LfgPanel from '../components/LfgPanel'
import CreateJoinGame from '../components/CreateJoinGame'
import ChangePlayerName from '../components/ChangePlayerName'

export default function MainPage() {
  return (
    <div className='flex justify-center h-full gap-4'>
        <div className='flex flex-col items-center justify-center w-[30%] h-full'>
          <LfgPanel />
        </div>
        <div className='flex flex-col items-start justify-center w-[70%] h-full gap-4'>
            <CreateJoinGame />
            <ChangePlayerName />
        </div>
       
    </div>
  )
}
