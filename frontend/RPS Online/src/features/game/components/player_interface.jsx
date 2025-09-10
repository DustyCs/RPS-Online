import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useParams } from 'react-router-dom';

import { submitMove, getGameStatus, closeGame } from "../api";

import Fist from '../../../assets/fists/fist.png'
import Rock from '../../../assets/imgs/stone.png'
import Paper from '../../../assets/imgs/scroll.png'
import Scissors from '../../../assets/imgs/scissors.png'
import { usePlayerContext } from '../../../context/PlayerDataContext';

export default function PlayerInterface() {
    const choices = [
        { name: 'Rock', img: Rock },
        { name: 'Paper', img: Paper },
        { name: 'Scissors', img: Scissors },
    ];

    const FistIMG = Fist /// unnecessary
    const { updatePlayerData } = usePlayerContext()

    const [selectedChoice, setSelectedChoice] = useState(null);
    const [enemyChoice, setEnemyChoice] = useState(null);
    const [winner, setWinner] = useState(null);
    const [loading, setLoading] = useState(true);

    const playerName = localStorage.getItem('playerName');
    // const gameId = localStorage.getItem('gameId');
    const { gameId } = useParams();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (gameId) {
        updatePlayerData({ gameId });
        }
    }, [gameId]);

    // Handle player leave to close the game
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            // Send the close request
            closeGame(gameId).catch(console.error);
            // Optionally: show a confirmation
            // e.preventDefault();
            // e.returnValue = '';
            };
    
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            closeGame(gameId).catch(console.error); // Clean up
        };
    }, [gameId]);


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
        {/* Arena */}
        <div
            className={
                loading
                ? "flex items-center bg-amber-50 justify-center w-full min-h-[60vh]"
                : "relative flex items-center bg-amber-50 justify-center w-full min-h-[60vh] shadow-lg"
        }
        >
        {/* Player Hand */}
        <motion.div
            className="absolute bottom-10 sm:bottom-20"
            initial={{ x: 0, y: 0 }}
            animate={
            loading ? { x: 0, y: 0 } : { x: -120, y: -80 } // smaller shift for mobile
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.img
            src={selectedChoice === null ? FistIMG : selectedChoice.img}
            alt=""
            initial={{ rotate: 0 }}
            animate={
                loading
                ? { rotate: 360 }
                : selectedChoice === null
                ? { rotate: [0, -90, 0] }
                : { rotate: 0 }
            }
            transition={
                loading
                ? { duration: 1, repeat: Infinity, ease: "linear" }
                : selectedChoice === null
                ? { duration: 1, repeat: Infinity, ease: "easeOut" }
                : { duration: 0.3, ease: "easeOut" }
            }
            className={
                "w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 " +
                (loading
                ? "rotate-0"
                : selectedChoice === null
                ? "rotate-90"
                : selectedChoice.name === "Rock"
                ? "rotate-0"
                : "rotate-90")
            }
            />
        </motion.div>

        {/* Enemy Hand */}
        <motion.div
            className="absolute bottom-10 sm:bottom-20"
            initial={{ x: 0, y: 0 }}
            animate={
            loading ? { x: 0, y: 0 } : { x: 120, y: -80 } // mirror smaller shift
            }
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <motion.img
            src={
                enemyChoice
                ? choices.find((choice) => choice.name === enemyChoice)?.img
                : Fist
            }
            alt=""
            initial={{ rotate: 0, scaleX: -1 }}
            animate={
                loading
                ? { rotate: -360 }
                : enemyChoice === null
                ? { rotate: [0, -90, 0] }
                : { rotate: 0 }
            }
            transition={
                loading
                ? { duration: 1, repeat: Infinity, ease: "linear" }
                : enemyChoice === null
                ? { duration: 1, repeat: Infinity, ease: "easeOut" }
                : { duration: 0.3, ease: "easeOut" }
            }
            className={
                "w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 " +
                (loading ? "rotate-0" : "-rotate-90")
            }
            />
        </motion.div>
        </div>

        {/* Controls */}
        <div className="flex sm:flex-row flex-wrap w-full sm:w-3/4 items-center justify-center min-h-[25vh] bg-gray-300 rounded-b-md outline-amber-50 outline-2 p-4 gap-4">
        {loading ? (
            <p className="text-center text-4xl sm:text-6xl md:text-8xl font-bold">
            Loading...
            </p>
        ) : (
            choices.map((choice, index) => (
            <div
                key={index}
                className="flex flex-col items-center justify-center"
            >
                <button
                className={`bg-gray-200 p-2 rounded-lg hover:bg-gray-300 ${
                    selectedChoice !== null ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => handleChoice(choice)}
                disabled={selectedChoice !== null}
                >
                <img
                    src={choice.img}
                    alt={choice.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                />
                <span className="text-sm sm:text-lg font-bold">
                    {choice.name}
                </span>
                </button>
            </div>
            ))
        )}
        </div>
    </>
    
  )
}