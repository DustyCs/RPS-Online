import { useEffect, useState } from 'react'

export default function PlayerInterface() {
    const choices = [
        { name: 'Rock', img: '' },
        { name: 'Paper', img: '' },
        { name: 'Scissors', img: '' }
    ];
    const [selectedChoice, setSelectedChoice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

  return (
    <div className='flex '>
        {
            loading ? (
                <div className='flex items-center justify-center w-full h-full'>
                    <p className='text-2xl font-bold'>Loading...</p>
                </div>
            ) :
            choices.map((choice, index) => (
                <div key={index} className='flex flex-col items-center justify-center m-4 outline'>
                    <button className='bg-gray-200 p-2 rounded-lg hover:bg-gray-300'>
                        <img src={choice.img} alt={choice.name} className='w-16 h-16' />
                        <span className='text-lg font-bold'>{choice.name}</span>
                    </button>
                </div>
            ))
        }
    </div>
  )
}
