import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { submitMove, getGameStatus } from "../api";

import Fist from '../../../assets/fists/fist.png'
import Rock from '../../../assets/imgs/stone.png'
import Paper from '../../../assets/imgs/scroll.png'
import Scissors from '../../../assets/imgs/scissors.png'

export default function PlayerInterface() {
    const choices = [
        { name: 'Rock', img: Rock },
        { name: 'Paper', img: Paper },
        { name: 'Scissors', img: Scissors },
    ];

    const FistIMG = Fist /// unnecessary

    const [selectedChoice, setSelectedChoice] = useState(null);
    const [enemyChoice, setEnemyChoice] = useState(null);
    const [winner, setWinner] = useState(null);
    const [loading, setLoading] = useState(true);

    const playerName = localStorage.getItem('playerName');
    const gameId = localStorage.getItem('gameId');

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (selectedChoice && gameId && playerName){
            const submit = async () => {
                try {
                    const response = await submitMove(gameId, playerName, selectedChoice.name);
                    console.log('Move submitted', response);
                } catch (error) {
                    console.error('Error submitting move:', error);
                }
            }

            submit();
        }
    }, [selectedChoice]);

    // Poll
    useEffect(() => {
        if (!selectedChoice) return;

        const interval = setInterval(async () => {
            try {
                const response = await getGameStatus(gameId);
                console.log('Polling for game status', response);

                if(response.winner){
                    const opponentChoice = 
                        playerName === response.player1 
                            ? response.player2_choice 
                            : response.player1_choice;
                    setEnemyChoice(opponentChoice);
                    setWinner(response.winner);
                    clearInterval(interval);
                }
            } catch (error) {
                console.error('Error fetching game status:', error);
            }
        }, 2000);

        return () => clearInterval(interval);
    }, [selectedChoice]);

    const handleChoice = (choice) => {
        if (!selectedChoice) {
            setSelectedChoice(choice);
            console.log(`Selected ${choice.name}`);
        }
    }

  return (
    <>  
        <div className={loading ? 'flex items-center bg-amber-50 justify-center w-full h-full' : 'relative flex items-center bg-amber-50 justify-center w-full h-full shadow-lg'}>
                    {/* Player Hand */}
                    <motion.div className={'absolute bottom-20'}
                        initial={{ x: 0, y: 0 }}
                        animate={ loading 
                        ? { x:0 , y: 0 } 
                        : { x:-300 ,y: -100 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}>
                        <motion.img src={selectedChoice === null ? FistIMG : selectedChoice.img} alt="" 
                            initial={{ rotate: 0 }}
                            animate={ loading 
                                ? { rotate: 360 } 
                                : selectedChoice === null
                                    ? { rotate: [0, -90, 0] } 
                                    : { rotate: 0 } 
                                }
                            transition={ 
                                loading 
                                ? { duration: 1, repeat: Infinity, ease: 'linear' } 
                                : selectedChoice === null
                                    ? { duration: 1, repeat: Infinity, ease: 'easeOut' } 
                                    : { duration: 0.3, ease: 'easeOut' } 
                                }
                            className={ 'w-50 h-50 ' + (loading 
                                ? 'rotate-0'
                                : selectedChoice === null
                                    ? 'rotate-90' 
                                : selectedChoice.name === 'Rock' ? 'rotate-0' :'rotate-90') } 
                    />
                    </motion.div>
                    
                    {/* Enemy Hand Mirrored */}
                    <motion.div className={'absolute bottom-20'}
                        initial={{ x: 0, y: 0 }}
                        animate={ loading 
                            ? { x: 0 , y: 0 } 
                            : { x: 300 , y: -100 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}>
                        <motion.img src={ enemyChoice ? choices.find(choice => choice.name === enemyChoice)?.img : Fist } alt="" 
                            initial={{ rotate: 0, scaleX: -1 }}
                            animate={ loading 
                                ? { rotate: -360 } 
                                : enemyChoice === null
                                    ? { rotate: [0, -90, 0] } 
                                    : { rotate: 0 } 
                                }
                            transition={ 
                                loading 
                                ? { duration: 1, repeat: Infinity, ease: 'linear' } 
                                : enemyChoice === null
                                    ? { duration: 1, repeat: Infinity, ease: 'easeOut' } 
                                    : { duration: 0.3, ease: 'easeOut' }
                                }
                            className={ 'w-50 h-50 ' + (loading ? 'rotate-0' : '-rotate-90') } 
                    />
                    </motion.div>
        </div>
        <div className=' flex w-1/2 items-center justify-center h-[25%] bg-gray-300 rounded-b-md outline-amber-50 outline-2 '>  
            {
                loading ? (
                    <div>
                        <p className='text-center text-8xl font-bold'>Loading...</p>
                    </div>
                ) :
                choices.map((choice, index) => (
                    <div key={index} className='flex flex-col items-center justify-center m-4 outline'>
                        <button className={`bg-gray-200 p-2 rounded-lg hover:bg-gray-300 ${selectedChoice !== null ? 'opacity-50 cursor-not-allowed' : '' }`} onClick={() => handleChoice(choice)} disabled={selectedChoice !== null}>
                            <img src={choice.img} alt={choice.name} className='w-16 h-16' />
                            <span className='text-lg font-bold'>{choice.name}</span>
                        </button>
                    </div>
                ))
            }
        </div>
    </>
    
  )
}