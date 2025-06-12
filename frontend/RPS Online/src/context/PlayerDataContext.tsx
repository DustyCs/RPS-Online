import { createContext, useContext, useState } from 'react';

type PlayerData = {
    player1: string | null;
    player2: string | null;
    gameId: string | null;
    player1Choice: string | null;
    player2Choice: string | null;
    winner: string | null;
};

type PlayerDataContextType = {
    playerData: PlayerData;
    updatePlayerData: (data: Partial<PlayerData>) => void;
};

const PlayerDataContext = createContext<PlayerDataContextType | undefined>(undefined);

export const PlayerDataProvider = ({ children }) => {
        const [playerData, setPlayerData] = useState<PlayerData>({
            player1: null,
            player2: null,
            gameId: null,
            player1Choice: null,
            player2Choice: null,
            winner: null,
        });

        const updatePlayerData = (data: Partial<PlayerData>) => {
            setPlayerData((prevData) => ({
                ...prevData,
                ...data,
            }));
        }
    return (
        <PlayerDataContext.Provider value={{ playerData, updatePlayerData }}>
            {children}
        </PlayerDataContext.Provider>
    );
}

export function usePlayerContext() {
  const context = useContext(PlayerDataContext);
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerDataProvider');
  }
  return context;
}
