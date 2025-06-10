import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'


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

    const FistIMG = Fist
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

  return (
    <>  
        <div className={loading ? 'flex items-center bg-amber-50 justify-center w-full h-full' : 'relative flex items-center bg-amber-50 justify-center w-full h-full'}>
                    <motion.div className={'absolute bottom-20'}
                        initial={{ x: 0, y: 0 }}
                        animate={ loading 
                        ? { x:0 , y: 0 } 
                        : { x:-300 ,y: -100 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}>
                        <motion.img src={FistIMG} alt="" 
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
                            className={ 'w-50 h-50 ' + (loading ? 'rotate-0' : 'rotate-90') } 
                    />
                    </motion.div>
                    {/* Enemy Hand Mirrored */}
                    <motion.div className={'absolute bottom-20'}
                        initial={{ x: 0, y: 0 }}
                        animate={ loading 
                            ? { x: 0 , y: 0 } 
                            : { x: 300 , y: -100 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}>
                        <motion.img src={FistIMG} alt="" 
                            initial={{ rotate: 0, scaleX: -1 }}
                            animate={ loading 
                                ? { rotate: -360 } 
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
                            className={ 'w-50 h-50 ' + (loading ? 'rotate-0' : '-rotate-90') } 
                    />
                    </motion.div>
        </div>
        <div className=' flex w-1/2 items-center justify-center h-[25%] bg-gray-300 '>  
            {
                loading ? (
                    <div>
                        <p className='text-center text-8xl font-bold'>Loading...</p>
                    </div>
                ) :
                choices.map((choice, index) => (
                    <div key={index} className='flex flex-col items-center justify-center m-4 outline'>
                        <button className='bg-gray-200 p-2 rounded-lg hover:bg-gray-300' onClick={() => setSelectedChoice(choice)}>
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
