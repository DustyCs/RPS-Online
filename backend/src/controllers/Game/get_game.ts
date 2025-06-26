import { Game } from "../../models/Game";
import { Request, Response } from "express";
export const getGameStatus = async (req: Request, res: Response) => {
    try {
        const game = await Game.findById(req.params.id);

        if (!game) {
            res.status(404).json({ message: "Game not found" });
            console.log('Game not found');
            return;
        }

        res.json(game);
        console.log(`Fetching game status for game ${game._id}`);
    } catch (error) {
        console.error('Error fetching game status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getAllOpenGames = async (req: Request, res: Response) => {
    try {
        const games = await Game.find({ player2: null, isClosed: false });

        if (!games) {
            res.status(404).json({ message: "No games found" });
            console.log('Game not found');
            return;
        }

        
        res.json(games);
    } catch (error) {
        console.error('Error fetching open games:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}