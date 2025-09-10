import Fist from '../../../assets/fists/fist.png'
import Rock from '../../../assets/imgs/stone.png'
import Paper from '../../../assets/imgs/scroll.png'
import Scissors from '../../../assets/imgs/scissors.png'

export default function Credits() {
  return (
        <div>
            <div className='sm:w-[70%] h-full m-auto flex flex-col items-center p-6'>
                <h1 className='text-4xl sm:text-6xl font-extrabold'>Credits</h1>
                <p className='text-xl sm:text-2xl p-1'> This project was made possible with the help of the following resources:</p>
                <div className='flex flex-col items-center justify-center gap-4 p-4'>
                    <img className='h-25 w-25' src={Fist} alt="" />
                    <a href="https://www.flaticon.com/free-icons/fist" title="fist icons" className='text-blue-500'>Fist icons created by Freepik - Flaticon</a>
                    <img className='h-25 w-25' src={Rock} alt="" />
                    <a href="https://www.flaticon.com/free-icons/stone" title="stone icons" className='text-blue-500'>Stone icons created by bastian 5 - Flaticon</a>
                    <img className='h-25 w-25' src={Scissors} alt="" />
                    <a href="https://www.flaticon.com/free-icons/scissors" title="scissors icons" className='text-blue-500'>Scissors icons created by Freepik - Flaticon</a>
                    <img className='h-25 w-25' src={Paper} alt="" />
                    <a href="https://www.flaticon.com/free-icons/paper" title="paper icons" className='text-blue-500'>Paper icons created by Freepik - Flaticon</a>
                </div>
            </div>
        </div>
    )
}
